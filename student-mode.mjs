import { supabase, getCurrentAccess } from "./access-gate.mjs";
import { supportOptionsForTarget, STUDENT_SUPPORTS, STUDENT_SUPPORT_RELEVANT_PARTS } from "./student-support-content.mjs";
import { createStudentDraftCloud } from "./student-draft-cloud.mjs";

const STUDENT_PRODUCT_KEY = "first-volo-story-builder";
const STUDENT_LOGIN_URL = "https://firstvololearning-ctrl.github.io/First-Volo-Account/student-login.html";

const visualIdeas = {
  character: {
    title: "Who?",
    question: "Who is your story about?",
    starter: "assets/categories/category-01.png",
    folder: "assets/characters",
    entries: [
      ["character-01.png", "Explorer"],
      ["character-03.png", "Bear"],
      ["character-05.png", "Robot"],
      ["character-10.png", "Dinosaur"],
      ["character-15.png", "Dog"]
    ]
  },
  setting: {
    title: "Where?",
    question: "Where does the story happen?",
    starter: "assets/categories/category-02.png",
    folder: "assets/settings",
    entries: [
      ["setting-02.png", "School"],
      ["setting-04.png", "Tropical Island"],
      ["setting-08.png", "Castle"],
      ["setting-09.png", "Outer Space"],
      ["setting-13.png", "Beach"]
    ]
  },
  problem: {
    title: "What happens?",
    question: "What problem or surprise happens?",
    starter: "assets/categories/category-03.png",
    folder: "assets/problems",
    entries: [
      ["problem-03.png", "Mysterious message"],
      ["problem-07.png", "Broken bridge"],
      ["problem-09.png", "Buried treasure"],
      ["problem-10.png", "Powerful storm"],
      ["problem-21.png", "Locked door"]
    ]
  },
  feeling: {
    title: "Feeling",
    question: "How does the character feel?",
    starter: "assets/categories/category-04.png",
    folder: "assets/feelings",
    entries: [
      ["feeling-03.png", "Surprised"],
      ["feeling-05.png", "Excited"],
      ["feeling-10.png", "Happy"],
      ["feeling-13.png", "Scared"],
      ["feeling-20.png", "Hopeful"]
    ]
  },
  plan: {
    title: "Plan idea",
    question: "What might the character decide to do?",
    starter: "assets/categories/category-05.png",
    folder: "assets/plans",
    entries: [
      ["plan-06.png", "Help"],
      ["plan-09.png", "Use magic"],
      ["plan-12.png", "Swim"],
      ["plan-18.png", "Experiment"],
      ["plan-21.png", "Search"]
    ]
  }
};

const plannerPrompts = [
  ["character", "Who is your story about?"],
  ["setting", "Where does the story happen?"],
  ["problem", "What happens or goes wrong?"],
  ["feeling", "How does the character feel?"],
  ["plan", "What does the character decide to do?"],
  ["attempt", "What does the character do or try?"],
  ["resolution", "How does the story end?"]
];

let mountedRoot = null;
let cleanup = [];
let mountGeneration = 0;

function element(tag, className, text = "") {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function button(label, className = "") {
  const node = element("button", className, label);
  node.type = "button";
  return node;
}

function currentKey(access) {
  return access.studentStorageKeys?.draft || "";
}

function readDraft(access) {
  const key = currentKey(access);
  if (!key) return {};
  try {
    const value = JSON.parse(localStorage.getItem(key) || "{}");
    return value && typeof value === "object" ? value : {};
  } catch {
    return {};
  }
}

function writeDraft(access, draft) {
  const key = currentKey(access);
  if (!key) return;
  try {
    localStorage.setItem(key, JSON.stringify(draft));
  } catch {
    // A full or unavailable browser store must not interrupt storytelling.
  }
}

function selectedEntry(category, index) {
  const source = visualIdeas[category];
  const entry = source.entries[index % source.entries.length];
  return {
    image: `${source.folder}/${entry[0]}`,
    label: entry[1],
    index: index % source.entries.length
  };
}

function buildCard(category, draft, updateDraft, showImageLabels) {
  const source = visualIdeas[category];
  const card = element("article", "student-idea-card");
  const heading = element("h3", "student-idea-title", source.title);
  const imageFrame = element("div", "student-idea-image-frame");
  const image = document.createElement("img");
  image.alt = source.question;
  image.loading = "lazy";
  imageFrame.append(image);
  const label = element("p", "student-idea-label");
  const roll = button("↻ Roll", "student-roll-button");
  const render = () => {
    const selection = draft.selections?.[category];
    if (!selection) {
      image.src = source.starter;
      image.alt = `${source.title}: roll to choose an idea`;
      label.textContent = "Roll to choose an idea";
      return;
    }
    image.src = selection.image;
    image.alt = `${source.title}: ${selection.label}`;
    label.textContent = showImageLabels ? selection.label : "";
  };
  const rollIdea = () => {
    const current = draft.selections?.[category]?.index ?? -1;
    draft.selections = { ...(draft.selections || {}), [category]: selectedEntry(category, current + 1) };
    updateDraft();
    render();
  };
  roll.addEventListener("click", rollIdea);
  cleanup.push(() => roll.removeEventListener("click", rollIdea));
  card.append(heading, imageFrame, label, element("p", "student-idea-question", source.question), roll);
  render();
  return { card, rollIdea };
}

async function loadStudentSupports() {
  if (getCurrentAccess().mode !== "student") return null;
  const result = await supabase.rpc("get_story_builder_student_supports");
  if (result.error) return null;
  const row = Array.isArray(result.data) ? result.data[0] : result.data;
  if (!row || (row.target_key && !STUDENT_SUPPORTS[row.target_key])) return null;
  const options = supportOptionsForTarget(row.target_key);
  const supports = (Array.isArray(row.support_keys) ? row.support_keys : [])
    .map((key) => options[key] ? { key, ...options[key] } : null)
    .filter(Boolean);
  return {
    targetLabel: row.target_key && STUDENT_SUPPORTS[row.target_key] ? STUDENT_SUPPORTS[row.target_key].label : "",
    studentGoal: row.target_key && STUDENT_SUPPORTS[row.target_key] ? STUDENT_SUPPORTS[row.target_key].studentGoal : "",
    studentLookFor: row.target_key && STUDENT_SUPPORTS[row.target_key] ? STUDENT_SUPPORTS[row.target_key].studentLookFor : "",
    supports,
    supportKeys: Array.isArray(row.support_keys) ? row.support_keys.slice() : [],
    supportParts: row.target_key && STUDENT_SUPPORTS[row.target_key]?.parts || {},
    relevantParts: row.target_key ? (STUDENT_SUPPORT_RELEVANT_PARTS[row.target_key] || []) : [],
    showImageLabels: row.show_image_labels === true
  };
}

function buildPlannerHelp(supportPackage, category) {
  if (!supportPackage?.supports.length || !supportPackage.relevantParts.includes(category)) return null;
  const partContent = supportPackage.supportParts[category];
  if (!partContent) return null;
  const help = element("details", "student-planner-help");
  help.append(element("summary", "student-planner-help-summary", "Need help?"));
  const list = element("div", "student-planner-help-list");
  const enabledKeys = new Set(supportPackage.supportKeys || []);
  supportPackage.supports.filter((support) => enabledKeys.has(support.key)).forEach((support) => {
    const content = partContent[support.key];
    if (!content) return;
    const item = element("article", "student-planner-help-item");
    item.append(element("h4", "student-planner-help-label", support.label), element("p", "student-planner-help-text", content));
    list.append(item);
  });
  help.append(list);
  return help;
}

async function mountStudentMode(shell, access) {
  unmountStudentMode();
  const generation = ++mountGeneration;
  if (getCurrentAccess().mode !== "student" || !access.studentContext?.student_id) return;

  const supportPackage = await loadStudentSupports();
  if (generation !== mountGeneration || getCurrentAccess().mode !== "student") return;

  const localDraft = readDraft(access);
  let cloudDraft = null;
  try {
    const loader = createStudentDraftCloud({ supabase, delay: 700 });
    cloudDraft = await loader.load();
    loader.stop();
  } catch {
    // Keep the device copy available if cloud service is temporarily unavailable.
  }
  const draft = cloudDraft || localDraft;
  writeDraft(access, draft);
  const root = element("div", "student-mode-root");
  mountedRoot = root;
  const context = access.studentContext;
  const saveStatus = element("span", "student-mode-save-status", cloudDraft ? "Saved to First Volo" : "Ready to save");
  const cloud = createStudentDraftCloud({
    supabase,
    delay: 700,
    onStatus(status) {
      saveStatus.textContent = status === "saving"
        ? "Saving…"
        : status === "saved"
          ? "Saved to First Volo"
          : "Saved on this device; cloud save will retry when you make another change.";
    }
  });
  cleanup.push(() => cloud.stop());
  if (!cloudDraft && Object.keys(localDraft).length) cloud.schedule(draft);
  const updateDraft = () => {
    writeDraft(access, draft);
    cloud.schedule(draft);
  };

  const header = element("header", "student-mode-header");
  header.append(
    element("p", "student-mode-eyebrow", "FIRST VOLO STORY BUILDER"),
    element("h1", "student-mode-title", "Build your story."),
    element("p", "student-mode-identity", `Hi, ${context.display_name || "student"}!`),
    element("p", "student-mode-class", context.class_name || "")
  );

  const topActions = element("div", "student-mode-actions");
  const startOver = button("Start a new story", "student-secondary-button");
  const signOut = button("Sign out", "student-secondary-button");
  const signOutStatus = element("p", "student-mode-intro", "");
  signOutStatus.hidden = true;
  signOutStatus.setAttribute("role", "status");
  signOutStatus.setAttribute("aria-live", "polite");
  topActions.append(startOver, signOut, signOutStatus);

  if (supportPackage?.studentGoal) {
    const goalSection = element("section", "student-mode-goal", "");
    goalSection.append(
      element("p", "student-mode-goal-kicker", "STORY GOAL"),
      element("h2", "student-mode-goal-title", "I am working on…"),
      element("p", "student-mode-goal-text", supportPackage.studentGoal)
    );
    if (supportPackage.studentLookFor) {
      goalSection.append(element("p", "student-mode-goal-look-for", `I can check: ${supportPackage.studentLookFor}`));
    }
    root.append(goalSection);
  }

  const ideasSection = element("section", "student-mode-section");
  ideasSection.append(element("h2", "student-mode-section-title", "1. Roll story ideas"));
  ideasSection.append(element("p", "student-mode-intro", "Roll a card for an idea, or use your own idea."));
  const rollAll = button("🎲 Roll all ideas", "student-primary-button");
  const ideasGrid = element("div", "student-ideas-grid");
  const cards = Object.keys(visualIdeas).map((category) => buildCard(category, draft, updateDraft, supportPackage?.showImageLabels === true));
  cards.forEach(({ card }) => ideasGrid.append(card));
  ideasSection.append(rollAll, ideasGrid);

  const plannerSection = element("section", "student-mode-section");
  plannerSection.append(element("h2", "student-mode-section-title", "2. Plan your story"));
  plannerSection.append(element("p", "student-mode-intro", "Jot down a word or sentence for each part. You can also tell your ideas aloud."));
  const plannerGrid = element("div", "student-planner-grid");
  plannerPrompts.forEach(([key, prompt]) => {
    const field = element("label", "student-planner-field");
    field.append(element("span", "student-planner-prompt", prompt));
    const textarea = document.createElement("textarea");
    textarea.rows = 2;
    textarea.placeholder = "Type or say your idea...";
    textarea.value = draft.planner?.[key] || "";
    const onInput = () => {
      draft.planner = { ...(draft.planner || {}), [key]: textarea.value };
      updateDraft();
    };
    textarea.addEventListener("input", onInput);
    cleanup.push(() => textarea.removeEventListener("input", onInput));
    field.append(textarea);
    const help = buildPlannerHelp(supportPackage, key);
    if (help) field.append(help);
    plannerGrid.append(field);
  });
  plannerSection.append(plannerGrid);

  const writeSection = element("section", "student-mode-section student-writing-section");
  writeSection.append(element("h2", "student-mode-section-title", "3. Tell or write your story"));
  writeSection.append(element("p", "student-mode-intro", "Tell it aloud, or write it here when you are ready."));
  const titleLabel = element("label", "student-writing-label", "Story title (optional)");
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.maxLength = 100;
  titleInput.placeholder = "Give your story a title...";
  titleInput.value = draft.title || "";
  titleLabel.append(titleInput);
  const storyLabel = element("label", "student-writing-label", "Your story");
  const storyText = document.createElement("textarea");
  storyText.rows = 10;
  storyText.placeholder = "Once upon a time...";
  storyText.value = draft.story || "";
  storyLabel.append(storyText);
  const onTitle = () => { draft.title = titleInput.value; updateDraft(); };
  const onStory = () => { draft.story = storyText.value; updateDraft(); };
  titleInput.addEventListener("input", onTitle);
  storyText.addEventListener("input", onStory);
  cleanup.push(() => titleInput.removeEventListener("input", onTitle));
  cleanup.push(() => storyText.removeEventListener("input", onStory));
  writeSection.append(titleLabel, storyLabel);

  const checkSection = element("section", "student-mode-section student-check-section");
  checkSection.append(element("h2", "student-mode-section-title", "4. Check your story"));
  checkSection.append(element("p", "student-mode-intro", "Does your story have a beginning, something that happens, and an ending?"));
  const check = document.createElement("label");
  check.className = "student-check-option";
  const checkInput = document.createElement("input");
  checkInput.type = "checkbox";
  checkInput.checked = draft.checked === true;
  const onCheck = () => { draft.checked = checkInput.checked; updateDraft(); };
  checkInput.addEventListener("change", onCheck);
  cleanup.push(() => checkInput.removeEventListener("change", onCheck));
  check.append(checkInput, element("span", "student-check-text", "I checked my story."));
  checkSection.append(check);

  const footer = element("div", "student-mode-footer");
  const saveNote = element("p", "student-mode-footer-note");
  saveNote.append(saveStatus);
  footer.append(saveNote, element("a", "student-mode-account-link", "Return to First Volo"));
  footer.querySelector(".student-mode-account-link").href = STUDENT_LOGIN_URL;

  const rollAllIdeas = () => {
    cards.forEach(({ rollIdea }) => rollIdea());
  };
  rollAll.addEventListener("click", rollAllIdeas);
  cleanup.push(() => rollAll.removeEventListener("click", rollAllIdeas));

  const onStartOver = async () => {
    if (!window.confirm("Start a new story? Your current draft will be cleared.")) return;
    const key = currentKey(access);
    if (key) {
      try {
        localStorage.removeItem(key);
      } catch {
        // A restricted browser store must not block starting a new story.
      }
    }
    cloud.schedule({});
    try { await cloud.flush(); } catch { /* The cleared device copy remains authoritative locally. */ }
    mountStudentMode(shell, access);
  };
  startOver.addEventListener("click", onStartOver);
  cleanup.push(() => startOver.removeEventListener("click", onStartOver));

  const onSignOut = async () => {
    signOut.disabled = true;
    signOutStatus.hidden = false;
    signOutStatus.textContent = "Signing out…";
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      window.location.replace(STUDENT_LOGIN_URL);
    } catch (error) {
      signOut.disabled = false;
      signOutStatus.textContent = "Could not sign out. Please try again.";
    }
  };
  signOut.addEventListener("click", onSignOut);
  cleanup.push(() => signOut.removeEventListener("click", onSignOut));

  root.prepend(header, topActions);
  root.append(ideasSection);
  root.append(plannerSection, writeSection, checkSection, footer);
  shell.append(root);
}

function unmountStudentMode() {
  mountGeneration += 1;
  cleanup.forEach((remove) => remove());
  cleanup = [];
  mountedRoot?.remove();
  mountedRoot = null;
}

export { mountStudentMode, unmountStudentMode, STUDENT_PRODUCT_KEY };
