import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://apkvvspubolyxlqtlkto.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_0O4rNLfhuW18xYRZSPkLpw_xyXR9d3n";
const ACCOUNT_URL = "https://firstvololearning-ctrl.github.io/First-Volo-Account/?returnTo=storyBuilder";
const ACCOUNT_HOME_URL = "https://firstvololearning-ctrl.github.io/First-Volo-Account/";
const STUDENT_LOGIN_URL = "https://firstvololearning-ctrl.github.io/First-Volo-Account/student-login.html";
const PRODUCT_KEY = "first-volo-story-builder";
const AUTH_EVENTS_TO_VERIFY = new Set([
  "INITIAL_SESSION",
  "SIGNED_IN",
  "SIGNED_OUT",
  "TOKEN_REFRESHED",
  "USER_UPDATED"
]);

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
});

const accessShell = document.getElementById("storyBuilderAccess");
const accessSupport = accessShell?.querySelector(".story-builder-access-support");
const accessStatus = document.getElementById("storyBuilderAccessStatus");
const accessActions = document.getElementById("storyBuilderAccessActions");
const app = document.getElementById("storyBuilderApp");
const accessChrome = accessShell?.querySelectorAll(
  ".story-builder-access-logo, .story-builder-access-eyebrow, .story-builder-access-title, .story-builder-access-support, .story-builder-access-status, .story-builder-access-actions, .story-builder-access-helper"
);

const lockedAccess = Object.freeze({
  mode: "locked",
  user: null,
  studentContext: null,
  productKeys: Object.freeze([]),
  studentStorageKeys: null
});

let currentAccess = lockedAccess;
let authorizationGeneration = 0;
let educatorRuntimeStarted = false;
let educatorRuntimePromise = null;
let educatorCloudModule = null;
let educatorSupportsModule = null;
let studentRuntimeStarted = false;
let studentRuntimeModule = null;

function setLocked() {
  app?.setAttribute("inert", "");
  app?.setAttribute("aria-hidden", "true");
  if (accessShell) accessShell.hidden = false;
}

function setApproved() {
  app?.removeAttribute("inert");
  app?.setAttribute("aria-hidden", "false");
  if (accessShell) accessShell.hidden = true;
}

function clearAccessState() {
  setLocked();
  currentAccess = lockedAccess;
  educatorCloudModule?.suspendEducatorCloudSync?.();
  studentRuntimeModule?.unmountStudentMode?.();
}

function setAccessChromeHidden(hidden) {
  accessChrome?.forEach((node) => {
    node.hidden = hidden;
  });
}

function makeLink({ label, href = "#", primary = false, retry = false }) {
  const link = document.createElement("a");
  link.className = "story-builder-access-link";
  if (primary) link.classList.add("is-primary");
  link.href = href;
  link.textContent = label;
  if (retry) {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.reload();
    });
  }
  return link;
}

function showState(message, actions = []) {
  setLocked();
  setAccessChromeHidden(false);
  if (accessSupport) {
    accessSupport.textContent = "Your Story Builder access is connected to My First Volo.";
  }
  if (accessStatus) {
    accessStatus.replaceChildren();
    accessStatus.textContent = message;
  }
  if (!accessActions) return;
  const items = Array.isArray(actions) ? actions : [actions];
  const visibleItems = items.filter(Boolean);
  accessActions.replaceChildren(...visibleItems.map(makeLink));
  accessActions.hidden = visibleItems.length === 0;
}

function firstRow(data) {
  return Array.isArray(data) ? (data[0] || null) : (data || null);
}

function studentStorageKeys(studentContext) {
  const studentId = String(studentContext?.student_id || "").trim();
  if (!studentId) return null;
  const prefix = `firstVoloStoryBuilderStudent:${studentId}`;
  return Object.freeze({
    draft: `${prefix}:SavedWork`,
    library: `${prefix}:MyStoriesV1`,
    deleteQueue: `${prefix}:CloudDeleteQueueV1`
  });
}

function isAnonymousUser(user) {
  return user?.is_anonymous === true;
}

async function authorizeEducator(user) {
  const result = await supabase
    .from("product_entitlements")
    .select("product_key,status,starts_at,expires_at")
    .eq("owner_user_id", user.id)
    .eq("product_key", PRODUCT_KEY)
    .eq("status", "active")
    .limit(20);

  if (result.error) return lockedAccess;

  const now = Date.now();
  const active = (result.data || []).some((row) => {
    const starts = Date.parse(row.starts_at);
    const expires = Date.parse(row.expires_at);
    return Number.isFinite(starts) && Number.isFinite(expires) && starts <= now && expires > now;
  });

  if (!active) return lockedAccess;

  return Object.freeze({
    mode: "educator",
    user,
    studentContext: null,
    productKeys: Object.freeze([PRODUCT_KEY]),
    studentStorageKeys: null
  });
}

async function authorizeStudent(user) {
  const contextResult = await supabase.rpc("get_student_session_context");
  if (contextResult.error) return lockedAccess;

  const studentContext = firstRow(contextResult.data);
  if (!studentContext?.student_id || !studentContext?.class_id) return lockedAccess;

  const accessResult = await supabase.rpc("get_student_product_access");
  if (accessResult.error) return lockedAccess;

  const productKeys = Object.freeze(
    (accessResult.data || [])
      .map((row) => row?.product_key)
      .filter((key) => typeof key === "string")
  );

  if (!productKeys.includes(PRODUCT_KEY)) return lockedAccess;

  return Object.freeze({
    mode: "student",
    user,
    studentContext: Object.freeze({ ...studentContext }),
    productKeys,
    studentStorageKeys: studentStorageKeys(studentContext)
  });
}

async function determineAccess(session) {
  const user = session?.user;
  if (!user) return lockedAccess;
  return isAnonymousUser(user)
    ? authorizeStudent(user)
    : authorizeEducator(user);
}

function loadClassicScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.addEventListener("load", resolve, { once: true });
    script.addEventListener("error", () => reject(new Error(`Could not load ${src}`)), { once: true });
    document.body.appendChild(script);
  });
}

async function startEducatorRuntime(access) {
  if (!educatorRuntimePromise) {
    educatorRuntimeStarted = true;
    educatorRuntimePromise = (async () => {
      await loadClassicScript("./script.js");
      await loadClassicScript("./instructional-support.js");
      educatorSupportsModule = await import("./student-supports.mjs");
      await educatorSupportsModule.initializeStudentSupports(access);
      educatorCloudModule = await import("./cloud-sync.mjs");
      await educatorCloudModule.initializeEducatorCloudSync(access);
    })();
  } else {
    await educatorRuntimePromise;
    await educatorCloudModule?.resumeEducatorCloudSync?.(access);
  }
}

async function showStudentShell(access) {
  setLocked();
  setAccessChromeHidden(true);
  if (!studentRuntimeModule) return;
  await studentRuntimeModule.mountStudentMode(accessShell, access);
}

function showLockedForSession(session) {
  if (!session?.user) {
    showState("Sign in to continue to Story Builder", [
      { label: "Educator sign in", href: ACCOUNT_URL, primary: true },
      { label: "Student sign in", href: STUDENT_LOGIN_URL }
    ]);
    return;
  }

  if (isAnonymousUser(session.user)) {
    showState("Story Builder student access could not be verified.", [
      { label: "Return to Student Sign In", href: STUDENT_LOGIN_URL, primary: true }
    ]);
    return;
  }

  showState("Story Builder is not included in the current First Volo access for this account.", [
    { label: "View My First Volo", href: ACCOUNT_HOME_URL, primary: true }
  ]);
}

function sameIdentity(left, right) {
  return left?.mode === right?.mode && left?.user?.id === right?.user?.id;
}

async function publishAccess(access, session, generation, previousAccess) {
  if (generation !== authorizationGeneration) return lockedAccess;

  currentAccess = access;

  if (educatorRuntimeStarted && !sameIdentity(previousAccess, access)) {
    window.location.reload();
    return access;
  }

  if (studentRuntimeStarted && access.mode !== "student") {
    window.location.reload();
    return access;
  }

  if (access.mode === "educator") {
    try {
      await startEducatorRuntime(access);
    } catch (error) {
      if (generation !== authorizationGeneration) return lockedAccess;
      currentAccess = lockedAccess;
      showState("First Volo access could not be verified. Please try again.", [
        { label: "Try again", retry: true, primary: true },
        { label: "View My First Volo", href: ACCOUNT_HOME_URL }
      ]);
      return lockedAccess;
    }
    if (generation === authorizationGeneration) setApproved();
    return access;
  }

  if (access.mode === "student") {
    try {
      if (!studentRuntimeModule) {
        studentRuntimeModule = await import("./student-mode.mjs");
        studentRuntimeStarted = true;
      }
    } catch (error) {
      if (generation !== authorizationGeneration) return lockedAccess;
      currentAccess = lockedAccess;
      showState("Story Builder student access could not be verified.", [
        { label: "Return to Student Sign In", href: STUDENT_LOGIN_URL, primary: true }
      ]);
      return lockedAccess;
    }
    await showStudentShell(access);
    return access;
  }

  showLockedForSession(session);
  return lockedAccess;
}

export async function reauthorize(session = undefined) {
  const generation = ++authorizationGeneration;
  const previousAccess = currentAccess;
  clearAccessState();
  showState("Checking your First Volo access…");

  let activeSession = session;
  if (activeSession === undefined) {
    const sessionResult = await supabase.auth.getSession();
    if (generation !== authorizationGeneration) return lockedAccess;
    if (sessionResult.error) {
      showState("First Volo access could not be verified. Please try again.", [
        { label: "Try again", retry: true, primary: true },
        { label: "View My First Volo", href: ACCOUNT_HOME_URL }
      ]);
      return lockedAccess;
    }
    activeSession = sessionResult.data.session;
  }

  let access = lockedAccess;
  try {
    access = await determineAccess(activeSession);
  } catch (error) {
    access = lockedAccess;
  }

  return publishAccess(access, activeSession, generation, previousAccess);
}

export function getCurrentAccess() {
  return currentAccess;
}

export const accessReady = reauthorize();

supabase.auth.onAuthStateChange((event, session) => {
  if (!AUTH_EVENTS_TO_VERIFY.has(event)) return;
  window.setTimeout(() => {
    reauthorize(session);
  }, 0);
});
