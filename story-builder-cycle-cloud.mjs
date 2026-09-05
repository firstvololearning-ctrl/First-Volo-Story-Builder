import { ENABLE_STORY_BUILDER_CYCLE_CLOUD } from "./story-builder-cycle-config.mjs";

export const STUDENT_MODE_CYCLE_WRITES = false;
export const CYCLE_CONFLICT_MESSAGE =
  "This student cycle was updated elsewhere. Review the current saved version before saving again.";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const STORY_BUILDER_TARGET_KEYS = Object.freeze({
  "story-organization": "story_organization",
  "connections-cohesion": "connections_cohesion",
  "cause-effect": "cause_effect",
  "sentence-formulation": "sentence_formulation",
  elaboration: "elaboration",
  "perspective-internal-state": "perspective_internal_state",
  "vocabulary-precision": "vocabulary_precision",
  off: null,
  "observe-first": null
});

const REFLECTION_KEYS = Object.freeze({
  yes: "yes",
  sometimes: "sometimes",
  "not-yet": "not_yet"
});

const SUPPORT_KEYS_BY_LEVEL = Object.freeze([
  null,
  "look_here",
  "think_about_it",
  "clue",
  "words_to_try",
  "sentence_start"
]);

const SUCCESS_CODES = new Set(["created", "updated", "completed", "abandoned"]);
const BOUNDARY_LABELS = Object.freeze({
  first_tell: "First Tell",
  revision: "Revised Version",
  tell_again: "Tell Again"
});
let activeCycleCleanup = null;

export function suspendStoryBuilderCycleCloud() {
  activeCycleCleanup?.();
  activeCycleCleanup = null;
}

export function isUuid(value) {
  return UUID_PATTERN.test(String(value || "").trim());
}

export function educatorStudentHint(locationLike = globalThis.location) {
  const raw = new URLSearchParams(locationLike?.search || "").get("studentId");
  if (raw === null || raw.trim() === "") return { status: "absent", studentId: null };
  const studentId = raw.trim();
  return isUuid(studentId)
    ? { status: "valid", studentId }
    : { status: "invalid", studentId: null };
}

export function serverTargetKey(runtimeTarget) {
  return Object.hasOwn(STORY_BUILDER_TARGET_KEYS, runtimeTarget)
    ? STORY_BUILDER_TARGET_KEYS[runtimeTarget]
    : null;
}

export function runtimeTargetKey(serverTarget) {
  if (!serverTarget) return null;
  return Object.entries(STORY_BUILDER_TARGET_KEYS).find(
    ([, canonical]) => canonical === serverTarget
  )?.[0] || null;
}

export function serverReflectionKey(runtimeReflection) {
  return REFLECTION_KEYS[runtimeReflection] || null;
}

export function buildPromptProvenance(story = {}) {
  const selections = {};
  const allowed = [
    "character",
    "setting",
    "problem",
    "feeling",
    "plan",
    "attempt",
    "item",
    "resolution"
  ];
  allowed.forEach((category) => {
    const id = story?.selections?.[category]?.id;
    if (typeof id === "string" && /^[A-Za-z0-9][A-Za-z0-9_-]{0,79}$/.test(id)) {
      selections[category] = { id };
    }
  });
  return {
    version: 1,
    source: Object.keys(selections).length ? "story_builder_visual_cards" : "unspecified",
    selections
  };
}

export function buildSupportEvidence(instruction = {}) {
  const levels = instruction?.supportLevels || {};
  const observations = Object.entries(levels)
    .filter(([storyPart, level]) =>
      ["character", "setting", "problem", "feeling", "plan", "attempt", "item", "resolution"].includes(storyPart) &&
      Number.isInteger(Number(level)) &&
      Number(level) >= 1 &&
      Number(level) <= 5
    )
    .map(([storyPart, level]) => ({
      story_part: storyPart,
      support_key: SUPPORT_KEYS_BY_LEVEL[Number(level)],
      level: Number(level),
      used: true
    }));

  if (!observations.length) return {};
  return {
    version: 1,
    recording_method: "educator_documented",
    tell_again_planner: instruction?.sessionPhase === "tell-again"
      ? instruction?.tellAgainPlannerAvailable === false ? "not_available" : "available"
      : "not_documented",
    observations
  };
}

function firstRow(data) {
  return Array.isArray(data) ? data[0] || null : data || null;
}

async function educatorStudentName(supabase, studentId) {
  if (!supabase?.from || !isUuid(studentId)) return "Student";
  try {
    const { data, error } = await supabase
      .from("students")
      .select("display_name")
      .eq("id", studentId)
      .is("archived_at", null)
      .limit(1);
    if (error) return "Student";
    return firstRow(data)?.display_name || "Student";
  } catch {
    return "Student";
  }
}

function normalizeRpcResult(data) {
  const row = firstRow(data);
  if (!row) return { result_code: "not_found", cycle: null };
  if (Object.hasOwn(row, "result_code")) {
    return { result_code: row.result_code, cycle: row.cycle || null };
  }
  return { result_code: "loaded", cycle: row };
}

export class StoryBuilderCycleTransportError extends Error {
  constructor() {
    super("Story Builder cycle service is unavailable.");
    this.name = "StoryBuilderCycleTransportError";
  }
}

export function createStoryBuilderCycleClient({
  supabase,
  enabled = ENABLE_STORY_BUILDER_CYCLE_CLOUD
} = {}) {
  async function call(name, args) {
    if (!enabled) return { result_code: "feature_disabled", cycle: null };
    if (!supabase?.rpc) throw new StoryBuilderCycleTransportError();
    // Mutations are deliberately single-attempt. An ambiguous network failure
    // must be reconciled with a fresh authorized read, never replayed blindly.
    const { data, error } = await supabase.rpc(name, args);
    if (error) throw new StoryBuilderCycleTransportError();
    return normalizeRpcResult(data);
  }

  return Object.freeze({
    enabled,
    getActive(studentId) {
      return call("get_active_story_builder_student_cycle", {
        p_student_id: studentId
      });
    },
    getCycle(cycleId) {
      return call("get_story_builder_student_cycle", {
        p_cycle_id: cycleId
      });
    },
    start(studentId, clientUpdatedAt = null) {
      return call("start_story_builder_student_cycle", {
        p_student_id: studentId,
        p_client_updated_at: clientUpdatedAt
      });
    },
    saveMetadata(cycleId, expectedRevision, title, promptProvenance, clientUpdatedAt = null) {
      return call("save_story_builder_student_cycle_metadata", {
        p_cycle_id: cycleId,
        p_expected_revision: expectedRevision,
        p_title: title,
        p_prompt_provenance: promptProvenance,
        p_client_updated_at: clientUpdatedAt
      });
    },
    recordEvidence(cycleId, expectedRevision, evidence) {
      return call("record_story_builder_evidence", {
        p_cycle_id: cycleId,
        p_expected_revision: expectedRevision,
        p_boundary: evidence.boundary,
        p_status: evidence.status,
        p_mode: evidence.mode ?? null,
        p_text: evidence.text ?? null,
        p_skip_reason: evidence.skipReason ?? null,
        p_client_updated_at: evidence.clientUpdatedAt ?? null
      });
    },
    setTarget(cycleId, expectedRevision, targetKey, confirmReplace = false) {
      return call("set_story_builder_cycle_target", {
        p_cycle_id: cycleId,
        p_expected_revision: expectedRevision,
        p_target_key: targetKey,
        p_confirm_replace: confirmReplace
      });
    },
    setContext(cycleId, expectedRevision, supportEvidence = {}, studentReflection = null) {
      return call("set_story_builder_cycle_context", {
        p_cycle_id: cycleId,
        p_expected_revision: expectedRevision,
        p_support_evidence: supportEvidence,
        p_student_reflection: studentReflection
      });
    },
    complete(cycleId, expectedRevision) {
      return call("complete_story_builder_student_cycle", {
        p_cycle_id: cycleId,
        p_expected_revision: expectedRevision
      });
    },
    abandon(cycleId, expectedRevision) {
      return call("abandon_story_builder_student_cycle", {
        p_cycle_id: cycleId,
        p_expected_revision: expectedRevision
      });
    }
  });
}

export function createStoryBuilderCycleCoordinator({ client, studentId }) {
  const state = {
    studentId: isUuid(studentId) ? studentId : null,
    cycle: null,
    conflict: null,
    lastResult: null
  };

  function adopt(result) {
    state.lastResult = result?.result_code || null;
    if (result?.cycle) state.cycle = structuredClone(result.cycle);
    if (result?.result_code === "revision_conflict") {
      state.conflict = CYCLE_CONFLICT_MESSAGE;
    } else if (SUCCESS_CODES.has(result?.result_code) || result?.result_code === "loaded") {
      state.conflict = null;
    }
    return result;
  }

  async function mutate(operation) {
    if (!state.cycle?.id || !Number.isInteger(Number(state.cycle.record_revision))) {
      return { result_code: "no_active_cycle", cycle: state.cycle };
    }
    const result = await operation(state.cycle.id, Number(state.cycle.record_revision));
    return adopt(result);
  }

  return Object.freeze({
    state,
    async recover() {
      if (!state.studentId) return { result_code: "student_binding_required", cycle: null };
      return adopt(await client.getActive(state.studentId));
    },
    async start() {
      if (!state.studentId) return { result_code: "student_binding_required", cycle: null };
      return adopt(await client.start(state.studentId, new Date().toISOString()));
    },
    saveMetadata(title, promptProvenance) {
      return mutate((id, revision) =>
        client.saveMetadata(id, revision, title || null, promptProvenance, new Date().toISOString())
      );
    },
    recordEvidence(evidence) {
      return mutate((id, revision) =>
        client.recordEvidence(id, revision, evidence)
      );
    },
    setTarget(targetKey, confirmReplace = false) {
      return mutate((id, revision) =>
        client.setTarget(id, revision, targetKey, confirmReplace)
      );
    },
    setContext(supportEvidence, studentReflection) {
      return mutate((id, revision) =>
        client.setContext(id, revision, supportEvidence, studentReflection)
      );
    },
    complete() {
      return mutate((id, revision) => client.complete(id, revision));
    },
    abandon() {
      return mutate((id, revision) => client.abandon(id, revision));
    },
    adoptCanonical(cycle) {
      if (cycle) {
        state.cycle = structuredClone(cycle);
        state.conflict = null;
      }
    },
    clear() {
      state.cycle = null;
      state.conflict = null;
      state.lastResult = null;
    }
  });
}

function element(tag, className = "", text = "") {
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

function currentStory() {
  return globalThis.FirstVoloStoryState?.build?.() || {};
}

function currentInstruction() {
  return globalThis.FirstVoloInstructionalSupport?.getState?.() || {};
}

function evidenceText() {
  return document.getElementById("storyWriting")?.value || "";
}

function summaryFor(cycle, boundary) {
  const prefix = boundary === "first_tell"
    ? "first_tell"
    : boundary === "tell_again"
      ? "tell_again"
      : "revision";
  const status = cycle?.[`${prefix}_status`];
  const mode = cycle?.[`${prefix}_mode`];
  if (!status || status === "pending" || status === "not_started") return "Not saved";
  if (status === "skipped") return "Skipped";
  return mode === "oral_not_captured" ? "Told aloud · no text stored" : "Written snapshot saved";
}

function evidenceTextFor(cycle, boundary) {
  const key = boundary === "first_tell"
    ? "first_tell_text"
    : boundary === "tell_again"
      ? "tell_again_text"
      : "revision_text";
  return cycle?.[key] || "";
}

function createEvidenceControls(boundary, onSave, onSkip, onRestore) {
  const section = element("fieldset", "cycle-boundary");
  const legend = element("legend", "cycle-boundary-title", BOUNDARY_LABELS[boundary]);
  const status = element("p", "cycle-boundary-status", "Not saved");
  status.dataset.cycleBoundaryStatus = boundary;

  const modeLabel = element("label", "cycle-field", "Evidence format");
  const mode = document.createElement("select");
  mode.dataset.cycleMode = boundary;
  [
    ["student_typed", "Student typed"],
    ["educator_scribed", "Educator scribed"],
    ["oral_not_captured", "Told aloud · no text captured"]
  ].forEach(([value, label]) => {
    const option = element("option", "", label);
    option.value = value;
    mode.append(option);
  });
  modeLabel.append(mode);

  const save = button(
    boundary === "first_tell"
      ? "Save First Tell"
      : boundary === "revision"
        ? "Save Revised Version"
        : "Save Tell Again",
    "cycle-primary-action"
  );
  save.addEventListener("click", () => onSave(boundary, mode.value));

  const skipLabel = element("label", "cycle-field", "If this step was not captured");
  const reason = document.createElement("select");
  reason.dataset.cycleSkipReason = boundary;
  const reasons = boundary === "first_tell"
    ? [["target_already_known", "Target already known"], ["not_administered", "Not administered"]]
    : boundary === "revision"
      ? [["not_needed", "Not needed"], ["not_administered", "Not administered"], ["cycle_ended_early", "Cycle ended early"]]
      : [["not_administered", "Not administered"], ["cycle_ended_early", "Cycle ended early"]];
  reasons.forEach(([value, label]) => {
    const option = element("option", "", label);
    option.value = value;
    reason.append(option);
  });
  skipLabel.append(reason);
  const skip = button(`Skip ${BOUNDARY_LABELS[boundary]}`, "cycle-secondary-action");
  skip.addEventListener("click", () => onSkip(boundary, reason.value));

  const restore = button("Use saved text in writing area", "cycle-link-action");
  restore.dataset.cycleRestore = boundary;
  restore.hidden = true;
  restore.addEventListener("click", () => onRestore(boundary));

  const actions = element("div", "cycle-actions");
  actions.append(save, skip, restore);
  section.append(legend, status, modeLabel, skipLabel, actions);
  return section;
}

function createCyclePanel({ coordinator, hintStatus }) {
  const panel = element("section", "story-cycle-panel");
  panel.setAttribute("aria-labelledby", "storyCycleHeading");
  panel.append(
    element("p", "story-cycle-kicker", "SHARED STUDENT CYCLE"),
    element("h2", "story-cycle-heading", "Student narrative evidence")
  );
  panel.querySelector("h2").id = "storyCycleHeading";
  const intro = element(
    "p",
    "story-cycle-intro",
    "Save explicit instructional snapshots. Your working story remains a separate local draft."
  );
  const status = element("p", "story-cycle-status", "");
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  panel.append(intro, status);

  if (hintStatus === "invalid") {
    status.textContent = "The student link is invalid. Shared cycle tools are unavailable.";
    status.classList.add("is-error");
    return { panel, render() {} };
  }

  const start = button("Start Student Cycle", "cycle-primary-action");
  start.dataset.cycleStart = "true";
  const metadata = button("Save cycle title & story cards", "cycle-secondary-action");
  const boundaries = element("div", "cycle-boundaries");
  const terminal = element("div", "cycle-terminal-actions");
  const complete = button("Complete Cycle", "cycle-primary-action");
  const abandon = button("Abandon Cycle", "cycle-danger-action");
  terminal.append(complete, abandon);
  panel.append(start, metadata, boundaries, terminal);

  function setBusy(busy) {
    panel.querySelectorAll("button, select").forEach((control) => {
      control.disabled = busy;
    });
  }

  function showResult(result, fallback = "Saved.") {
    if (result?.result_code === "revision_conflict") {
      status.textContent = CYCLE_CONFLICT_MESSAGE;
      status.classList.add("is-conflict");
      return;
    }
    if (result?.result_code === "terminal_cycle_immutable") {
      status.textContent = "This completed or abandoned cycle can no longer be changed.";
      return;
    }
    if (result?.result_code === "completion_requirements_not_met") {
      status.textContent = "Resolve First Tell, choose a target, and resolve Tell Again before completing.";
      return;
    }
    status.classList.remove("is-error", "is-conflict");
    status.textContent = fallback;
  }

  async function run(operation, fallback) {
    setBusy(true);
    try {
      const result = await operation();
      showResult(result, fallback);
      render();
      return result;
    } catch {
      status.textContent = "The cycle could not be saved. Your local writing is unchanged. Check your connection before trying again.";
      status.classList.add("is-error");
      return null;
    } finally {
      setBusy(false);
    }
  }

  async function saveEvidence(boundary, mode) {
    const text = mode === "oral_not_captured" ? null : evidenceText();
    if (mode !== "oral_not_captured" && !text.trim()) {
      status.textContent = "Add writing before saving this written snapshot, or choose told aloud.";
      return;
    }
    await run(
      () => coordinator.recordEvidence({
        boundary,
        status: "captured",
        mode,
        text,
        skipReason: null,
        clientUpdatedAt: new Date().toISOString()
      }),
      `${BOUNDARY_LABELS[boundary]} saved.`
    );
  }

  async function skipEvidence(boundary, reason) {
    await run(
      () => coordinator.recordEvidence({
        boundary,
        status: "skipped",
        mode: null,
        text: null,
        skipReason: reason,
        clientUpdatedAt: new Date().toISOString()
      }),
      `${BOUNDARY_LABELS[boundary]} marked skipped.`
    );
  }

  function restoreEvidence(boundary) {
    const saved = evidenceTextFor(coordinator.state.cycle, boundary);
    if (!saved) return;
    const writing = document.getElementById("storyWriting");
    if (!writing) return;
    if (writing.value.trim() && writing.value !== saved) {
      const approved = window.confirm(
        "Replace the current local writing area with this saved snapshot? The saved cycle evidence will not be changed."
      );
      if (!approved) return;
    }
    writing.value = saved;
    writing.dispatchEvent(new Event("input", { bubbles: true }));
    status.textContent = "Saved text copied into the local writing area. Cycle evidence is unchanged.";
  }

  ["first_tell", "revision", "tell_again"].forEach((boundary) => {
    boundaries.append(createEvidenceControls(boundary, saveEvidence, skipEvidence, restoreEvidence));
  });

  function render() {
    const cycle = coordinator.state.cycle;
    const active = cycle && ["draft", "in_progress"].includes(cycle.status);
    start.hidden = Boolean(active);
    metadata.hidden = !active;
    boundaries.hidden = !active;
    terminal.hidden = !active;
    panel.dataset.cycleActive = active ? "true" : "false";
    panel.querySelectorAll("[data-cycle-boundary-status]").forEach((node) => {
      const boundary = node.dataset.cycleBoundaryStatus;
      node.textContent = summaryFor(cycle, boundary);
      const restore = panel.querySelector(`[data-cycle-restore="${boundary}"]`);
      if (restore) restore.hidden = !evidenceTextFor(cycle, boundary);
    });
    if (cycle?.status === "completed") status.textContent = "Cycle completed. Saved evidence is read-only.";
    if (cycle?.status === "abandoned") status.textContent = "Cycle abandoned. Saved evidence is read-only.";
  }

  start.addEventListener("click", async () => {
    const started = await run(
      () => coordinator.start(),
      "Student cycle ready. No evidence has been saved yet."
    );
    const target = serverTargetKey(currentInstruction().target);
    if (
      target &&
      started?.cycle &&
      ["created", "active_cycle_exists"].includes(started.result_code) &&
      started.cycle.selected_target_key !== target
    ) {
      await run(
        () => coordinator.setTarget(target, false),
        "Student cycle and narrative target ready."
      );
    }
  });
  metadata.addEventListener("click", () => {
    const story = currentStory();
    return run(
      () => coordinator.saveMetadata(story.title || null, buildPromptProvenance(story)),
      "Cycle title and story-card IDs saved."
    );
  });
  complete.addEventListener("click", async () => {
    const instruction = currentInstruction();
    const contextResult = await run(
      () => coordinator.setContext(
        buildSupportEvidence(instruction),
        serverReflectionKey(instruction.studentReflection)
      ),
      "Instructional context saved."
    );
    if (!contextResult || contextResult.result_code === "revision_conflict") return null;
    return run(() => coordinator.complete(), "Cycle completed.");
  });
  abandon.addEventListener("click", () => {
    if (!window.confirm("Abandon this student cycle? Saved terminal cycles cannot be reopened.")) return;
    return run(() => coordinator.abandon(), "Cycle abandoned.");
  });

  render();
  return { panel, render, run };
}

export async function initializeStoryBuilderCycleCloud({
  access,
  supabase,
  locationLike = globalThis.location,
  enabled = ENABLE_STORY_BUILDER_CYCLE_CLOUD
} = {}) {
  suspendStoryBuilderCycleCloud();
  if (!enabled) {
    return { enabled: false, reason: "feature_disabled" };
  }
  if (access?.mode !== "educator") {
    return { enabled: false, reason: "student_mode_writes_deferred" };
  }

  const hint = educatorStudentHint(locationLike);
  if (hint.status === "absent") {
    return { enabled: true, reason: "student_binding_absent" };
  }

  const identity = element("div", "story-builder-selected-student");
  identity.setAttribute("aria-label", "Current selected student");
  identity.textContent = hint.status === "valid"
    ? `Working with ${await educatorStudentName(supabase, hint.studentId)}`
    : "Selected student unavailable";

  const client = createStoryBuilderCycleClient({ supabase, enabled: true });
  const coordinator = createStoryBuilderCycleCoordinator({
    client,
    studentId: hint.studentId
  });
  const view = createCyclePanel({ coordinator, hintStatus: hint.status });
  const anchor = document.getElementById("instructionalSessionPanel");
  if (anchor) {
    anchor.insertAdjacentElement("beforebegin", identity);
    anchor.insertAdjacentElement("beforebegin", view.panel);
  } else {
    document.querySelector(".controls-panel")?.append(identity, view.panel);
  }
  activeCycleCleanup = () => {
    coordinator.clear();
    identity.remove();
    view.panel.remove();
  };

  if (hint.status === "invalid") {
    return { enabled: true, reason: "invalid_student_binding", coordinator };
  }

  try {
    const result = await coordinator.recover();
    const recoveredTarget = runtimeTargetKey(result.cycle?.selected_target_key);
    if (recoveredTarget) {
      globalThis.FirstVoloInstructionalSupport?.restoreState?.({
        ...currentInstruction(),
        target: recoveredTarget
      });
    }
    view.render();
    if (result.cycle) {
      view.panel.querySelector(".story-cycle-status").textContent =
        "An active student cycle was recovered. Local writing was left unchanged.";
    }
  } catch {
    view.panel.querySelector(".story-cycle-status").textContent =
      "The student cycle could not be loaded. Shared cycle tools are unavailable.";
    view.panel.querySelector(".story-cycle-status").classList.add("is-error");
    view.panel.querySelectorAll("button, select").forEach((control) => {
      control.disabled = true;
    });
  }

  let observedTarget = serverTargetKey(currentInstruction().target);
  let observedReflection = serverReflectionKey(currentInstruction().studentReflection);
  let observedSupportEvidence = JSON.stringify(buildSupportEvidence(currentInstruction()));
  let instructionalSaveQueue = Promise.resolve();
  const synchronizeInstructionalState = async () => {
    const cycle = coordinator.state.cycle;
    if (!cycle || !["draft", "in_progress"].includes(cycle.status)) return;

    const instruction = currentInstruction();
    const target = serverTargetKey(instruction.target);
    if (target && target !== observedTarget) {
      const first = await view.run(
        () => coordinator.setTarget(target, false),
        "Narrative target saved."
      );
      if (first?.result_code === "target_replace_confirmation_required") {
        const confirmed = window.confirm(
          "This cycle already has revision or Tell Again evidence. Replace its selected target?"
        );
        if (confirmed) {
          await view.run(
            () => coordinator.setTarget(target, true),
            "Narrative target replaced."
          );
        }
      }
      if (
        first?.result_code === "updated" ||
        coordinator.state.cycle?.selected_target_key === target
      ) {
        observedTarget = target;
      }
    }

    const reflection = serverReflectionKey(instruction.studentReflection);
    const supportEvidence = buildSupportEvidence(instruction);
    const serializedSupportEvidence = JSON.stringify(supportEvidence);
    if (
      serializedSupportEvidence !== observedSupportEvidence ||
      (reflection && reflection !== observedReflection)
    ) {
      const contextResult = await view.run(
        () => coordinator.setContext(supportEvidence, reflection),
        reflection && reflection !== observedReflection
          ? "Student self-reflection saved."
          : "Instructional support use saved."
      );
      if (contextResult?.result_code === "updated") {
        observedSupportEvidence = serializedSupportEvidence;
        observedReflection = reflection;
      }
    }
  };
  const handleInstructionalChange = () => {
    instructionalSaveQueue = instructionalSaveQueue.then(synchronizeInstructionalState);
  };
  window.addEventListener("firstvolo:instructional-support-changed", handleInstructionalChange);
  activeCycleCleanup = () => {
    window.removeEventListener("firstvolo:instructional-support-changed", handleInstructionalChange);
    coordinator.clear();
    view.panel.remove();
  };

  return { enabled: true, reason: "ready", coordinator };
}
