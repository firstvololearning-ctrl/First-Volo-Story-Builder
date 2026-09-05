import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { ENABLE_STORY_BUILDER_CYCLE_CLOUD } from "../story-builder-cycle-config.mjs";
import {
  CYCLE_CONFLICT_MESSAGE,
  STUDENT_MODE_CYCLE_WRITES,
  STORY_BUILDER_TARGET_KEYS,
  buildPromptProvenance,
  createStoryBuilderCycleClient,
  createStoryBuilderCycleCoordinator,
  educatorStudentHint,
  initializeStoryBuilderCycleCloud,
  runtimeTargetKey,
  serverReflectionKey,
  serverTargetKey
} from "../story-builder-cycle-cloud.mjs";

const STUDENT_ID = "20000000-0000-4000-8000-000000000001";
const CYCLE_ID = "30000000-0000-4000-8000-000000000001";

function cycle(overrides = {}) {
  return {
    id: CYCLE_ID,
    student_id: STUDENT_ID,
    record_revision: 1,
    status: "draft",
    stage_reached: "cycle_started",
    first_tell_status: "pending",
    first_tell_text: null,
    revision_status: "not_started",
    revision_text: null,
    tell_again_status: "pending",
    tell_again_text: null,
    ...overrides
  };
}

function mockSupabase(resolver) {
  const calls = [];
  return {
    calls,
    async rpc(name, args) {
      calls.push({ name, args });
      const response = await resolver(name, args, calls.length);
      return response?.error
        ? { data: null, error: response.error }
        : { data: response?.data ?? response ?? [], error: null };
    }
  };
}

test("educator cycle cloud is enabled while Student Mode writes remain disabled", async () => {
  assert.equal(ENABLE_STORY_BUILDER_CYCLE_CLOUD, true);
  assert.equal(STUDENT_MODE_CYCLE_WRITES, false);
  const supabase = mockSupabase(() => {
    throw new Error("RPC must not run");
  });
  const result = await initializeStoryBuilderCycleCloud({
    access: { mode: "educator" },
    supabase,
    locationLike: { search: `?studentId=${STUDENT_ID}` },
    enabled: false
  });
  assert.deepEqual(result, { enabled: false, reason: "feature_disabled" });
  assert.equal(supabase.calls.length, 0);
});

test("disabled transport makes zero RPCs for every operation", async () => {
  const supabase = mockSupabase(() => {
    throw new Error("RPC must not run");
  });
  const client = createStoryBuilderCycleClient({ supabase, enabled: false });
  await Promise.all([
    client.getActive(STUDENT_ID),
    client.getCycle(CYCLE_ID),
    client.start(STUDENT_ID),
    client.saveMetadata(CYCLE_ID, 1, null, {}),
    client.recordEvidence(CYCLE_ID, 1, { boundary: "first_tell", status: "captured" }),
    client.setTarget(CYCLE_ID, 1, "story_organization"),
    client.setContext(CYCLE_ID, 1, null),
    client.complete(CYCLE_ID, 1),
    client.abandon(CYCLE_ID, 1)
  ]);
  assert.equal(supabase.calls.length, 0);
});

test("enabled integration remains dormant without an educator student binding", async () => {
  const supabase = mockSupabase(() => {
    throw new Error("RPC must not run");
  });
  const result = await initializeStoryBuilderCycleCloud({
    access: { mode: "educator" },
    supabase,
    locationLike: { search: "" },
    enabled: true
  });
  assert.deepEqual(result, { enabled: true, reason: "student_binding_absent" });
  assert.equal(supabase.calls.length, 0);
});

test("Student Mode cycle writes remain deferred even in a QA-enabled integration", async () => {
  const supabase = mockSupabase(() => {
    throw new Error("RPC must not run");
  });
  const result = await initializeStoryBuilderCycleCloud({
    access: { mode: "student", studentContext: { student_id: STUDENT_ID } },
    supabase,
    locationLike: { search: `?studentId=${STUDENT_ID}` },
    enabled: true
  });
  assert.deepEqual(result, {
    enabled: false,
    reason: "student_mode_writes_deferred"
  });
  assert.equal(supabase.calls.length, 0);
});

test("studentId hint is optional, UUID-only, and never name-based", () => {
  assert.deepEqual(educatorStudentHint({ search: "" }), {
    status: "absent",
    studentId: null
  });
  assert.deepEqual(educatorStudentHint({ search: "?studentId=Same%20Display%20Name" }), {
    status: "invalid",
    studentId: null
  });
  assert.deepEqual(educatorStudentHint({ search: `?studentId=${STUDENT_ID}` }), {
    status: "valid",
    studentId: STUDENT_ID
  });
});

test("selected educator activity wording is Working with, never Looking at", () => {
  const source = fs.readFileSync(new URL("../story-builder-cycle-cloud.mjs", import.meta.url), "utf8");
  assert.match(source, /`Working with \$\{await educatorStudentName/);
  assert.doesNotMatch(source, /`Looking at \$\{await educatorStudentName/);
});

test("target and reflection mappings are frozen and canonical", () => {
  assert.equal(Object.isFrozen(STORY_BUILDER_TARGET_KEYS), true);
  assert.deepEqual(
    Object.entries(STORY_BUILDER_TARGET_KEYS),
    [
      ["story-organization", "story_organization"],
      ["connections-cohesion", "connections_cohesion"],
      ["cause-effect", "cause_effect"],
      ["sentence-formulation", "sentence_formulation"],
      ["elaboration", "elaboration"],
      ["perspective-internal-state", "perspective_internal_state"],
      ["vocabulary-precision", "vocabulary_precision"],
      ["off", null],
      ["observe-first", null]
    ]
  );
  assert.equal(serverTargetKey("unknown"), null);
  assert.equal(runtimeTargetKey("perspective_internal_state"), "perspective-internal-state");
  assert.equal(runtimeTargetKey(null), null);
  assert.equal(serverReflectionKey("not-yet"), "not_yet");
});

test("prompt provenance includes stable IDs only", () => {
  assert.deepEqual(
    buildPromptProvenance({
      selections: {
        character: {
          id: "character-03",
          label: "Bear",
          imagePath: "assets/characters/character-03.png"
        },
        setting: { id: "<script>", label: "unsafe" }
      },
      plannerNotes: { problem: "free-form text" }
    }),
    {
      version: 1,
      source: "story_builder_visual_cards",
      selections: { character: { id: "character-03" } }
    }
  );
});

test("recovery hydrates canonical state without automatically starting", async () => {
  const active = cycle({ record_revision: 4, status: "in_progress" });
  const supabase = mockSupabase((name) => {
    assert.equal(name, "get_active_story_builder_student_cycle");
    return [active];
  });
  const client = createStoryBuilderCycleClient({ supabase, enabled: true });
  const coordinator = createStoryBuilderCycleCoordinator({ client, studentId: STUDENT_ID });
  const result = await coordinator.recover();
  assert.equal(result.result_code, "loaded");
  assert.deepEqual(coordinator.state.cycle, active);
  assert.deepEqual(supabase.calls.map(({ name }) => name), [
    "get_active_story_builder_student_cycle"
  ]);
});

test("explicit start adopts created and active-cycle-exists responses", async () => {
  const responses = [
    [{ result_code: "created", cycle: cycle() }],
    [{ result_code: "active_cycle_exists", cycle: cycle({ record_revision: 3 }) }]
  ];
  const supabase = mockSupabase(() => responses.shift());
  const coordinator = createStoryBuilderCycleCoordinator({
    client: createStoryBuilderCycleClient({ supabase, enabled: true }),
    studentId: STUDENT_ID
  });
  assert.equal((await coordinator.start()).result_code, "created");
  assert.equal((await coordinator.start()).result_code, "active_cycle_exists");
  assert.equal(coordinator.state.cycle.record_revision, 3);
  assert.equal(supabase.calls.every(({ name }) => name === "start_story_builder_student_cycle"), true);
});

test("First Tell modes and skip reason use explicit evidence payloads", async () => {
  const supabase = mockSupabase((_name, _args, count) => [{
    result_code: "updated",
    cycle: cycle({ record_revision: count + 1 })
  }]);
  const client = createStoryBuilderCycleClient({ supabase, enabled: true });
  await client.recordEvidence(CYCLE_ID, 1, {
    boundary: "first_tell",
    status: "captured",
    mode: "student_typed",
    text: "Student text"
  });
  await client.recordEvidence(CYCLE_ID, 2, {
    boundary: "first_tell",
    status: "captured",
    mode: "educator_scribed",
    text: "Scribed text"
  });
  await client.recordEvidence(CYCLE_ID, 3, {
    boundary: "first_tell",
    status: "captured",
    mode: "oral_not_captured",
    text: null
  });
  await client.recordEvidence(CYCLE_ID, 4, {
    boundary: "first_tell",
    status: "skipped",
    skipReason: "target_already_known"
  });
  assert.deepEqual(
    supabase.calls.map(({ args }) => [
      args.p_mode,
      args.p_text,
      args.p_skip_reason
    ]),
    [
      ["student_typed", "Student text", null],
      ["educator_scribed", "Scribed text", null],
      ["oral_not_captured", null, null],
      [null, null, "target_already_known"]
    ]
  );
});

test("revision and Tell Again remain distinct from committed First Tell", async () => {
  const first = cycle({
    record_revision: 2,
    status: "in_progress",
    first_tell_status: "captured",
    first_tell_mode: "student_typed",
    first_tell_text: "First snapshot"
  });
  const revised = {
    ...first,
    record_revision: 3,
    revision_status: "captured",
    revision_mode: "student_typed",
    revision_text: "Revised snapshot"
  };
  const retold = {
    ...revised,
    record_revision: 4,
    tell_again_status: "captured",
    tell_again_mode: "educator_scribed",
    tell_again_text: "Tell Again snapshot"
  };
  const responses = [
    [{ result_code: "created", cycle: first }],
    [{ result_code: "updated", cycle: revised }],
    [{ result_code: "updated", cycle: retold }]
  ];
  const supabase = mockSupabase(() => responses.shift());
  const coordinator = createStoryBuilderCycleCoordinator({
    client: createStoryBuilderCycleClient({ supabase, enabled: true }),
    studentId: STUDENT_ID
  });
  await coordinator.start();
  await coordinator.recordEvidence({
    boundary: "revision",
    status: "captured",
    mode: "student_typed",
    text: "Revised snapshot"
  });
  await coordinator.recordEvidence({
    boundary: "tell_again",
    status: "captured",
    mode: "educator_scribed",
    text: "Tell Again snapshot"
  });
  assert.equal(coordinator.state.cycle.first_tell_text, "First snapshot");
  assert.equal(coordinator.state.cycle.revision_text, "Revised snapshot");
  assert.equal(coordinator.state.cycle.tell_again_text, "Tell Again snapshot");
});

test("target replacement confirmation is returned without automatic retry", async () => {
  const supabase = mockSupabase(() => [{
    result_code: "target_replace_confirmation_required",
    cycle: cycle({ record_revision: 8, selected_target_key: "cause_effect" })
  }]);
  const coordinator = createStoryBuilderCycleCoordinator({
    client: createStoryBuilderCycleClient({ supabase, enabled: true }),
    studentId: STUDENT_ID
  });
  coordinator.adoptCanonical(cycle({ record_revision: 8 }));
  const result = await coordinator.setTarget("elaboration");
  assert.equal(result.result_code, "target_replace_confirmation_required");
  assert.equal(supabase.calls.length, 1);
  assert.equal(supabase.calls[0].args.p_confirm_replace, false);
});

test("mutations use exact revision and conflicts adopt canonical data without merging", async () => {
  const canonical = cycle({
    record_revision: 10,
    first_tell_status: "captured",
    first_tell_text: "Saved elsewhere"
  });
  const supabase = mockSupabase(() => [{
    result_code: "revision_conflict",
    cycle: canonical
  }]);
  const coordinator = createStoryBuilderCycleCoordinator({
    client: createStoryBuilderCycleClient({ supabase, enabled: true }),
    studentId: STUDENT_ID
  });
  coordinator.adoptCanonical(cycle({ record_revision: 9 }));
  const localWorkingText = "Keep this local draft";
  const result = await coordinator.recordEvidence({
    boundary: "first_tell",
    status: "captured",
    mode: "student_typed",
    text: localWorkingText
  });
  assert.equal(supabase.calls[0].args.p_expected_revision, 9);
  assert.equal(result.result_code, "revision_conflict");
  assert.equal(coordinator.state.conflict, CYCLE_CONFLICT_MESSAGE);
  assert.equal(coordinator.state.cycle.first_tell_text, "Saved elsewhere");
  assert.equal(localWorkingText, "Keep this local draft");
  assert.equal(supabase.calls.length, 1);
});

test("terminal and incomplete completion results remain explicit", async () => {
  const responses = [
    [{ result_code: "completion_requirements_not_met", cycle: cycle({ record_revision: 2 }) }],
    [{ result_code: "terminal_cycle_immutable", cycle: cycle({ record_revision: 3, status: "completed" }) }]
  ];
  const supabase = mockSupabase(() => responses.shift());
  const coordinator = createStoryBuilderCycleCoordinator({
    client: createStoryBuilderCycleClient({ supabase, enabled: true }),
    studentId: STUDENT_ID
  });
  coordinator.adoptCanonical(cycle({ record_revision: 2 }));
  assert.equal((await coordinator.complete()).result_code, "completion_requirements_not_met");
  coordinator.adoptCanonical(cycle({ record_revision: 3 }));
  assert.equal((await coordinator.abandon()).result_code, "terminal_cycle_immutable");
});

test("cycle context never copies configured supports and reflection is canonical", async () => {
  const supabase = mockSupabase(() => [{
    result_code: "updated",
    cycle: cycle({ record_revision: 6, student_reflection: "not_yet" })
  }]);
  const client = createStoryBuilderCycleClient({ supabase, enabled: true });
  await client.setContext(CYCLE_ID, 5, "not_yet");
  assert.deepEqual(supabase.calls[0].args.p_support_evidence, {});
  assert.equal(supabase.calls[0].args.p_student_reflection, "not_yet");
  assert.equal(Object.hasOwn(supabase.calls[0].args, "supportLevels"), false);
  assert.equal(Object.hasOwn(supabase.calls[0].args, "retryRequested"), false);
});
