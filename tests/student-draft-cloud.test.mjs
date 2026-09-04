import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { createStudentDraftCloud } from "../student-draft-cloud.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const migration = fs.readFileSync(path.join(root, "supabase/migrations/20260904164500_add_story_builder_student_drafts.sql"), "utf8");

test("student draft client loads and saves only through protected RPCs", async () => {
  const calls = [];
  const supabase = { rpc: async (name, args) => {
    calls.push({ name, args });
    if (name === "get_my_story_builder_student_draft") return { data: [{ draft: { version: 1, story: "Saved" } }], error: null };
    return { data: [{ draft: args.p_draft }], error: null };
  }};
  const statuses = [];
  const cloud = createStudentDraftCloud({ supabase, delay: 10000, onStatus: value => statuses.push(value) });
  assert.deepEqual(await cloud.load(), { version: 1, story: "Saved" });
  cloud.schedule({ story: "New draft", checked: false });
  const saved = await cloud.flush();
  cloud.stop();
  assert.equal(calls[1].name, "save_my_story_builder_student_draft");
  assert.deepEqual(calls[1].args.p_draft, { version: 1, story: "New draft", checked: false });
  assert.deepEqual(statuses, ["saving", "saved"]);
  assert.deepEqual(saved.draft, calls[1].args.p_draft);
});

test("failed cloud save keeps the draft queued and reports a recoverable state", async () => {
  let attempts = 0;
  const statuses = [];
  const supabase = { rpc: async () => {
    attempts += 1;
    return attempts === 1 ? { data: null, error: new Error("offline") } : { data: [{}], error: null };
  }};
  const cloud = createStudentDraftCloud({ supabase, delay: 10000, onStatus: value => statuses.push(value) });
  cloud.schedule({ story: "Do not lose me" });
  await assert.rejects(cloud.flush());
  await cloud.flush();
  cloud.stop();
  assert.deepEqual(statuses, ["saving", "error", "saving", "saved"]);
});

test("database contract binds anonymous students and educators to the owning student", () => {
  assert.match(migration, /force row level security/i);
  assert.match(migration, /revoke all on table public\.story_builder_student_drafts from public, anon, authenticated/i);
  assert.match(migration, /private\.story_builder_resolve_student\(null, true\)/i);
  assert.match(migration, /private\.story_builder_resolve_student\(p_student_id, false\)/i);
  assert.match(migration, /v_identity\.owner_user_id <> \(select auth\.uid\(\)\)/i);
  assert.doesNotMatch(migration, /grant (select|insert|update|delete|all) on table public\.story_builder_student_drafts to authenticated/i);
});
