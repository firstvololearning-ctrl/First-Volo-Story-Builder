import { supabase, getCurrentAccess } from "./access-gate.mjs";
import { STUDENT_SUPPORTS, STUDENT_SUPPORT_TARGET_KEYS, supportOptionsForTarget } from "./student-support-content.mjs";

let panel = null;
let studentSelect = null;
let targetSelect = null;
let supportOptions = null;
let imageLabelsCheckbox = null;
let status = null;
let currentStudents = [];
let savedState = null;
let isLoading = false;

function element(tag, className, text = "") {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function button(text, className = "") {
  const node = element("button", className, text);
  node.type = "button";
  return node;
}

function setStatus(message, isError = false) {
  if (!status) return;
  status.textContent = message;
  status.classList.toggle("is-error", isError);
  if (message !== "Unsaved changes") status.classList.remove("is-dirty");
}

function selectedStudentId() {
  return studentSelect?.value || "";
}

function selectedStudentName() {
  return currentStudents.find((student) => student.id === selectedStudentId())?.display_name || "student";
}

function currentState() {
  return JSON.stringify({
    targetKey: targetSelect?.value || null,
    supportKeys: selectedSupportKeys().slice().sort(),
    showImageLabels: imageLabelsCheckbox?.checked === true
  });
}

function updateSaveState() {
  const saveButton = panel?.querySelector("[data-save-student-supports]");
  if (saveButton) saveButton.disabled = isLoading || !selectedStudentId() || savedState === null || currentState() === savedState;
  const clearButton = panel?.querySelector("[data-clear-student-supports]");
  if (clearButton) clearButton.disabled = isLoading || !selectedStudentId();
}

function markDirty() {
  if (!isLoading) {
    const dirty = currentState() !== savedState;
    setStatus(dirty ? "Unsaved changes" : "");
    status?.classList.toggle("is-dirty", dirty);
  }
  updateSaveState();
}

function renderSupportOptions(selectedKeys = []) {
  if (!supportOptions) return;
  supportOptions.replaceChildren();
  const options = supportOptionsForTarget(targetSelect?.value);
  Object.entries(options).forEach(([key, support]) => {
    const label = element("label", "student-support-option");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = key;
    checkbox.dataset.supportKey = key;
    checkbox.checked = selectedKeys.includes(key);
    label.append(checkbox, element("span", "student-support-option-label", support.label));
    supportOptions.append(label);
  });
}

async function loadSavedSupports() {
  isLoading = true;
  savedState = null;
  updateSaveState();
  if (!selectedStudentId()) {
    renderSupportOptions();
    isLoading = false;
    updateSaveState();
    return;
  }
  setStatus("Loading current supports…");
  const result = await supabase.rpc("get_story_builder_student_supports_for_educator", {
    p_student_id: selectedStudentId()
  });
  if (result.error) {
    renderSupportOptions();
    setStatus("Current supports could not be loaded.", true);
    isLoading = false;
    updateSaveState();
    return;
  }
  const row = Array.isArray(result.data) ? result.data[0] : result.data;
  if (row?.target_key && STUDENT_SUPPORTS[row.target_key]) {
    targetSelect.value = row.target_key;
    renderSupportOptions(Array.isArray(row.support_keys) ? row.support_keys : []);
  } else {
    targetSelect.value = "";
    renderSupportOptions();
    setStatus(row?.show_image_labels ? "Image labels are enabled." : "No supports configured yet.");
  }
  if (imageLabelsCheckbox) imageLabelsCheckbox.checked = row?.show_image_labels === true;
  savedState = currentState();
  isLoading = false;
  updateSaveState();
}

function selectedSupportKeys() {
  return Array.from(supportOptions?.querySelectorAll("input:checked") || [], (input) => input.dataset.supportKey || input.value);
}

async function saveSupports() {
  if (!selectedStudentId()) return;
  const saveButton = panel.querySelector("[data-save-student-supports]");
  saveButton.disabled = true;
  setStatus("Saving supports…");
  const result = await supabase.rpc("set_story_builder_student_supports", {
    p_student_id: selectedStudentId(),
    p_target_key: targetSelect.value || null,
    p_support_keys: selectedSupportKeys(),
    p_show_image_labels: imageLabelsCheckbox?.checked === true
  });
  saveButton.disabled = false;
  if (result.error) {
    setStatus("Supports could not be saved. Please try again.", true);
    return;
  }
  savedState = currentState();
  setStatus(`Saved for ${selectedStudentName()}`);
  updateSaveState();
}

async function clearSupports() {
  if (!selectedStudentId()) return;
  const clearButton = panel.querySelector("[data-clear-student-supports]");
  clearButton.disabled = true;
  setStatus("Clearing supports…");
  const result = await supabase.rpc("set_story_builder_student_supports", {
    p_student_id: selectedStudentId(),
    p_target_key: null,
    p_support_keys: [],
    p_show_image_labels: false
  });
  clearButton.disabled = false;
  if (result.error) {
    setStatus("Supports could not be cleared. Please try again.", true);
    return;
  }
  renderSupportOptions();
  if (imageLabelsCheckbox) imageLabelsCheckbox.checked = false;
  savedState = currentState();
  setStatus(`Supports cleared for ${selectedStudentName()}`);
  updateSaveState();
}

async function loadStudents() {
  const result = await supabase
    .from("students")
    .select("id,display_name")
    .is("archived_at", null)
    .order("display_name");
  if (result.error) {
    setStatus("Students could not be loaded.", true);
    return;
  }
  currentStudents = result.data || [];
  studentSelect.replaceChildren();
  currentStudents.forEach((student) => {
    const option = element("option", "", student.display_name || "Student");
    option.value = student.id;
    studentSelect.append(option);
  });
  const requestedStudentId = new URLSearchParams(globalThis.location?.search || "").get("studentId");
  if (requestedStudentId && currentStudents.some((student) => student.id === requestedStudentId)) {
    studentSelect.value = requestedStudentId;
  }
  const hasStudents = currentStudents.length > 0;
  studentSelect.disabled = !hasStudents;
  targetSelect.disabled = !hasStudents;
  panel.querySelectorAll("[data-support-action]").forEach((control) => {
    control.disabled = !hasStudents;
  });
  if (!hasStudents) {
    setStatus("No active students yet. Add students in My First Volo.");
    renderSupportOptions();
    return;
  }
  await loadSavedSupports();
}

function createPanel() {
  panel = element("section", "student-supports-panel");
  panel.setAttribute("aria-labelledby", "studentSupportsHeading");
  panel.append(element("p", "student-supports-eyebrow", "EDUCATOR TOOL"), element("h2", "student-supports-title", "Student Mode Supports"), element("p", "student-supports-intro", "Choose predefined student-facing help for one of your students. These supports are optional and do not change educator guidance."));

  const studentLabel = element("label", "student-supports-field", "Student");
  studentSelect = document.createElement("select");
  studentSelect.setAttribute("data-support-action", "true");
  studentLabel.append(studentSelect);

  const targetLabel = element("label", "student-supports-field", "Narrative target");
  targetSelect = document.createElement("select");
  targetSelect.setAttribute("data-support-action", "true");
  targetSelect.append(element("option", "", "No narrative target"));
  STUDENT_SUPPORT_TARGET_KEYS.forEach((key) => {
    const option = element("option", "", STUDENT_SUPPORTS[key].label);
    option.value = key;
    targetSelect.append(option);
  });
  targetLabel.append(targetSelect);

  const optionsField = element("fieldset", "student-supports-options");
  optionsField.append(element("legend", "student-supports-legend", "Available student-facing supports"));
  supportOptions = element("div", "student-support-options-list");
  optionsField.append(supportOptions);

  const visualField = element("fieldset", "student-supports-options student-visual-support-options");
  visualField.append(element("legend", "student-supports-legend", "Visual support"));
  const visualLabel = element("label", "student-support-option");
  imageLabelsCheckbox = document.createElement("input");
  imageLabelsCheckbox.type = "checkbox";
  imageLabelsCheckbox.setAttribute("data-support-action", "true");
  visualLabel.append(imageLabelsCheckbox, element("span", "student-support-option-label", "Show image labels"));
  visualField.append(visualLabel);

  const actions = element("div", "student-supports-actions");
  const save = button("Save supports", "student-supports-save");
  save.dataset.supportAction = "true";
  save.dataset.saveStudentSupports = "true";
  const clear = button("Clear", "student-supports-clear");
  clear.dataset.supportAction = "true";
  clear.dataset.clearStudentSupports = "true";
  actions.append(save, clear);
  status = element("p", "student-supports-status");
  status.setAttribute("role", "status");
  panel.append(studentLabel, targetLabel, optionsField, visualField, actions, status);

  studentSelect.addEventListener("change", loadSavedSupports);
  targetSelect.addEventListener("change", () => { renderSupportOptions(); markDirty(); });
  imageLabelsCheckbox.addEventListener("change", markDirty);
  supportOptions.addEventListener("change", markDirty);
  save.addEventListener("click", saveSupports);
  clear.addEventListener("click", clearSupports);
  renderSupportOptions();
  return panel;
}

export async function initializeStudentSupports(access) {
  if (access?.mode !== "educator" || getCurrentAccess().mode !== "educator") return false;
  if (panel) return true;
  const controls = document.querySelector(".controls-panel");
  const storyGoal = controls?.querySelector(".story-goal-control");
  if (!controls) return false;
  const created = createPanel();
  if (storyGoal) controls.insertBefore(created, storyGoal);
  else controls.prepend(created);
  await loadStudents();
  return true;
}
