import { supabase, accessReady } from "./access-gate.mjs";
const STORY_TABLE = "story_builder_stories";
const DELETE_QUEUE_KEY =
  "firstVoloStoryBuilderCloudDeleteQueueV1";
const CLOUD_SAVE_DELAY_MS = 3500;

const storyState = window.FirstVoloStoryState;
const localLibrary = window.FirstVoloStoryLibrary?.local;

const cloudSyncBadge =
  document.getElementById("cloudSyncBadge");
const cloudSyncSummary =
  document.getElementById("cloudSyncSummary");
const cloudSignInForm =
  document.getElementById("cloudSignInForm");
const cloudEmail =
  document.getElementById("cloudEmail");
const cloudSignInButton =
  document.getElementById("cloudSignInButton");
const cloudSignedIn =
  document.getElementById("cloudSignedIn");
const cloudUserEmail =
  document.getElementById("cloudUserEmail");
const cloudSyncNow =
  document.getElementById("cloudSyncNow");
const cloudSignOut =
  document.getElementById("cloudSignOut");
const cloudSyncStatus =
  document.getElementById("cloudSyncStatus");
const myStoriesEyebrow =
  document.getElementById("myStoriesEyebrow");
const myStoriesStorageNote =
  document.getElementById("myStoriesStorageNote");

let currentSession = null;
let applyingCloudMerge = false;
let fullSyncInProgress = false;
let saveTimer = null;
let pendingStory = null;
let statusTimer = null;

if (
  !storyState ||
  !localLibrary ||
  !cloudSyncBadge ||
  !cloudSyncSummary ||
  !cloudSignInForm ||
  !cloudEmail ||
  !cloudSignInButton ||
  !cloudSignedIn ||
  !cloudUserEmail ||
  !cloudSyncNow ||
  !cloudSignOut ||
  !cloudSyncStatus ||
  !myStoriesEyebrow ||
  !myStoriesStorageNote
) {
  console.warn(
    "Cloud Sync could not start because required Story Builder elements are missing."
  );
} else {
  accessReady.then((approved) => {
    if (approved) {
      initializeCloudSync();
    }
  });
}

function isSignedIn() {
  return Boolean(currentSession?.user);
}

function setStatus(
  message = "",
  {
    error = false,
    duration = 0
  } = {}
) {
  window.clearTimeout(statusTimer);
  cloudSyncStatus.textContent = message;
  cloudSyncStatus.classList.toggle("is-error", error);

  if (duration > 0) {
    statusTimer = window.setTimeout(() => {
      cloudSyncStatus.textContent = "";
      cloudSyncStatus.classList.remove("is-error");
    }, duration);
  }
}

function setBadge(state) {
  cloudSyncBadge.classList.remove(
    "is-on",
    "is-syncing"
  );

  if (state === "syncing") {
    cloudSyncBadge.textContent = "Syncing";
    cloudSyncBadge.classList.add("is-syncing");
    return;
  }

  if (state === "on") {
    cloudSyncBadge.textContent = "On";
    cloudSyncBadge.classList.add("is-on");
    return;
  }

  cloudSyncBadge.textContent = "Off";
}

function updateAuthUI() {
  const signedIn = isSignedIn();

  cloudSignInForm.hidden = signedIn;
  cloudSignedIn.hidden = !signedIn;

  if (signedIn) {
    cloudUserEmail.textContent =
      currentSession.user.email || "signed-in account";

    cloudSyncSummary.textContent =
      "My Stories are kept on this device and synced to your signed-in account.";

    myStoriesEyebrow.textContent =
      "Saved + synced across devices";

    myStoriesStorageNote.innerHTML =
      "<strong>My Stories are kept on this device and synced across signed-in devices.</strong> " +
      "For an extra backup, choose <strong>Download Backup</strong>. " +
      "To use a downloaded backup later, return to Story Builder and choose " +
      "<strong>Restore Backup</strong>.";

    setBadge("on");
  } else {
    cloudUserEmail.textContent = "";

    cloudSyncSummary.textContent =
      "Sign in to make My Stories available across your devices. " +
      "Local saving still works without an account.";

    myStoriesEyebrow.textContent =
      "Saved on this device";

    myStoriesStorageNote.innerHTML =
      "<strong>Stories in My Stories are saved on this device.</strong> " +
      "For an extra backup, choose <strong>Download Backup</strong>. " +
      "To use a downloaded backup later, return to Story Builder and choose " +
      "<strong>Restore Backup</strong>.";

    setBadge("off");
  }
}

function normalizeStory(story) {
  return storyState.migrate(story);
}

function storyTimestamp(story) {
  return (
    Date.parse(story?.updatedAt || story?.createdAt || "") ||
    0
  );
}

function cloudRowForStory(story) {
  const normalized = normalizeStory(story);

  return {
    user_id: currentSession.user.id,
    story_id: normalized.storyId,
    title: normalized.title || "",
    schema_version: normalized.schemaVersion,
    story_data: normalized,
    created_at: normalized.createdAt,
    updated_at: normalized.updatedAt,
    synced_at: new Date().toISOString()
  };
}

function readDeleteQueue() {
  try {
    const value = JSON.parse(
      localStorage.getItem(DELETE_QUEUE_KEY) || "[]"
    );

    return Array.isArray(value)
      ? value.filter(
          (item) =>
            item &&
            typeof item.storyId === "string" &&
            item.storyId
        )
      : [];
  } catch (error) {
    console.error(
      "Could not read cloud deletion queue:",
      error
    );
    return [];
  }
}

function writeDeleteQueue(queue) {
  localStorage.setItem(
    DELETE_QUEUE_KEY,
    JSON.stringify(queue)
  );
}

function queueDeletion(storyId) {
  const queue = readDeleteQueue().filter(
    (item) => item.storyId !== storyId
  );

  queue.push({
    storyId,
    deletedAt: new Date().toISOString()
  });

  writeDeleteQueue(queue);
}

function removeQueuedDeletion(storyId) {
  const queue = readDeleteQueue();
  const nextQueue = queue.filter(
    (item) => item.storyId !== storyId
  );

  if (nextQueue.length !== queue.length) {
    writeDeleteQueue(nextQueue);
  }
}

async function flushDeleteQueue() {
  if (!isSignedIn()) {
    return;
  }

  const queue = readDeleteQueue();

  if (!queue.length) {
    return;
  }

  const remaining = [];

  for (const item of queue) {
    if (!navigator.onLine) {
      remaining.push(item);
      continue;
    }

    const { error } = await supabase
      .from(STORY_TABLE)
      .delete()
      .eq("user_id", currentSession.user.id)
      .eq("story_id", item.storyId);

    if (error) {
      console.error(
        "Could not sync Story Builder deletion:",
        error
      );
      remaining.push(item);
    }
  }

  writeDeleteQueue(remaining);
}

async function fetchCloudStories() {
  const { data, error } = await supabase
    .from(STORY_TABLE)
    .select(
      "story_id, story_data, created_at, updated_at"
    )
    .eq("user_id", currentSession.user.id);

  if (error) {
    throw error;
  }

  return (data || [])
    .map((row) => {
      try {
        return normalizeStory(row.story_data);
      } catch (error) {
        console.warn(
          "Skipping unreadable cloud story:",
          row.story_id,
          error
        );
        return null;
      }
    })
    .filter(Boolean);
}

function chooseNewest(localStory, cloudStory) {
  if (!localStory) {
    return cloudStory;
  }

  if (!cloudStory) {
    return localStory;
  }

  const localTime = storyTimestamp(localStory);
  const cloudTime = storyTimestamp(cloudStory);

  if (cloudTime > localTime) {
    return cloudStory;
  }

  return localStory;
}

async function upsertStories(stories) {
  if (!stories.length) {
    return;
  }

  const rows = stories.map(cloudRowForStory);

  const { error } = await supabase
    .from(STORY_TABLE)
    .upsert(rows, {
      onConflict: "user_id,story_id"
    });

  if (error) {
    throw error;
  }
}

async function syncAllStories({
  showMessage = true
} = {}) {
  if (!isSignedIn()) {
    if (showMessage) {
      setStatus(
        "Sign in to sync My Stories across devices."
      );
    }
    return false;
  }

  if (fullSyncInProgress) {
    return false;
  }

  if (!navigator.onLine) {
    if (showMessage) {
      setStatus(
        "You’re offline. My Stories will sync when you’re back online."
      );
    }
    return false;
  }

  fullSyncInProgress = true;
  setBadge("syncing");

  try {
    await flushDeleteQueue();

    const deletedIds = new Set(
      readDeleteQueue().map((item) => item.storyId)
    );

    const localStories = localLibrary.list();
    const cloudStories = await fetchCloudStories();

    const localMap = new Map(
      localStories.map((story) => [
        story.storyId,
        story
      ])
    );

    const cloudMap = new Map(
      cloudStories.map((story) => [
        story.storyId,
        story
      ])
    );

    const allIds = new Set([
      ...localMap.keys(),
      ...cloudMap.keys()
    ]);

    const winners = [];

    applyingCloudMerge = true;

    try {
      for (const storyId of allIds) {
        if (deletedIds.has(storyId)) {
          continue;
        }

        const winner = chooseNewest(
          localMap.get(storyId),
          cloudMap.get(storyId)
        );

        if (!winner) {
          continue;
        }

        localLibrary.save(winner);
        winners.push(winner);
      }
    } finally {
      applyingCloudMerge = false;
    }

    await upsertStories(winners);

    window.dispatchEvent(
      new CustomEvent(
        "firstvolo:cloud-library-updated"
      )
    );

    if (showMessage) {
      setStatus(
        winners.length
          ? "✓ My Stories are synced across devices."
          : "✓ Cloud Sync is up to date.",
        { duration: 2600 }
      );
    }

    return true;
  } catch (error) {
    console.error("Cloud sync failed:", error);

    if (showMessage) {
      setStatus(
        "Cloud Sync couldn’t finish. Your stories are still saved on this device.",
        {
          error: true,
          duration: 4200
        }
      );
    }

    return false;
  } finally {
    fullSyncInProgress = false;
    updateAuthUI();
  }
}

async function syncOneStory(story) {
  if (
    !isSignedIn() ||
    !navigator.onLine ||
    applyingCloudMerge
  ) {
    return false;
  }

  try {
    const normalized = normalizeStory(story);

    removeQueuedDeletion(normalized.storyId);

    const { error } = await supabase
      .from(STORY_TABLE)
      .upsert(cloudRowForStory(normalized), {
        onConflict: "user_id,story_id"
      });

    if (error) {
      throw error;
    }

    setStatus(
      "✓ My Stories synced",
      { duration: 1300 }
    );

    return true;
  } catch (error) {
    console.error(
      "Could not sync Story Builder story:",
      error
    );

    setStatus(
      "Saved on this device. Cloud Sync will try again.",
      {
        error: true,
        duration: 2800
      }
    );

    return false;
  }
}

function scheduleStorySync(story) {
  if (
    !isSignedIn() ||
    applyingCloudMerge
  ) {
    return;
  }

  pendingStory = story;
  window.clearTimeout(saveTimer);

  saveTimer = window.setTimeout(() => {
    const storyToSync = pendingStory;
    pendingStory = null;

    if (storyToSync) {
      syncOneStory(storyToSync);
    }
  }, CLOUD_SAVE_DELAY_MS);
}

async function handleLibraryRemoval(storyId) {
  if (!storyId) {
    return;
  }

  queueDeletion(storyId);

  if (!isSignedIn()) {
    return;
  }

  if (!navigator.onLine) {
    setStatus(
      "Story removed here. Cloud deletion will sync when you’re back online."
    );
    return;
  }

  await flushDeleteQueue();

  if (
    readDeleteQueue().some(
      (item) => item.storyId === storyId
    )
  ) {
    setStatus(
      "Story removed here. Cloud deletion will retry.",
      {
        error: true,
        duration: 3000
      }
    );
    return;
  }

  setStatus(
    "✓ Story removed from synced devices.",
    { duration: 1800 }
  );
}

async function sendMagicLink(event) {
  event.preventDefault();

  const email = cloudEmail.value.trim();

  if (!email) {
    cloudEmail.focus();
    return;
  }

  cloudSignInButton.disabled = true;
  setStatus("Sending sign-in link…");

  try {
    const redirectTo =
      `${window.location.origin}${window.location.pathname}`;

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
        shouldCreateUser: true
      }
    });

    if (error) {
      throw error;
    }

    setStatus(
      "Check your email for the Story Builder sign-in link."
    );
  } catch (error) {
    console.error(
      "Could not send cloud sign-in link:",
      error
    );

    setStatus(
      "Couldn’t send the sign-in link. Check the email address and try again.",
      {
        error: true,
        duration: 4200
      }
    );
  } finally {
    cloudSignInButton.disabled = false;
  }
}

async function signOut() {
  cloudSignOut.disabled = true;

  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    setStatus(
      "Signed out. My Stories are still saved on this device.",
      { duration: 2600 }
    );
  } catch (error) {
    console.error("Could not sign out:", error);

    setStatus(
      "Couldn’t sign out. Please try again.",
      {
        error: true,
        duration: 3000
      }
    );
  } finally {
    cloudSignOut.disabled = false;
  }
}

function handleSession(session) {
  currentSession = session || null;
  updateAuthUI();

  if (isSignedIn()) {
    window.setTimeout(() => {
      syncAllStories({ showMessage: false });
    }, 0);
  }
}

async function initializeCloudSync() {
  updateAuthUI();

  cloudSignInForm.addEventListener(
    "submit",
    sendMagicLink
  );

  cloudSyncNow.addEventListener(
    "click",
    () => syncAllStories({ showMessage: true })
  );

  cloudSignOut.addEventListener(
    "click",
    signOut
  );

  window.addEventListener(
    "firstvolo:library-saved",
    (event) => {
      if (applyingCloudMerge) {
        return;
      }

      const story = event.detail?.story;

      if (story) {
        scheduleStorySync(story);
      }
    }
  );

  window.addEventListener(
    "firstvolo:library-removed",
    (event) => {
      if (applyingCloudMerge) {
        return;
      }

      handleLibraryRemoval(
        event.detail?.storyId
      );
    }
  );

  window.addEventListener("online", () => {
    if (isSignedIn()) {
      syncAllStories({ showMessage: true });
    }
  });

  const {
    data: { session },
    error
  } = await supabase.auth.getSession();

  if (error) {
    console.error(
      "Could not restore cloud session:",
      error
    );
  }

  handleSession(session);

  supabase.auth.onAuthStateChange(
    (event, nextSession) => {
      window.setTimeout(() => {
        currentSession = nextSession || null;
        updateAuthUI();

        if (
          event === "SIGNED_IN" ||
          event === "INITIAL_SESSION"
        ) {
          syncAllStories({ showMessage: true });
        }

        if (event === "SIGNED_OUT") {
          setStatus(
            "Signed out. My Stories are still saved on this device.",
            { duration: 2600 }
          );
        }
      }, 0);
    }
  );
}

window.FirstVoloStoryCloud = Object.freeze({
  isSignedIn,
  syncNow: () =>
    syncAllStories({ showMessage: true }),
  getSession: () => currentSession
});
