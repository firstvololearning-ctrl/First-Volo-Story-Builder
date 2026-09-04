import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const html=fs.readFileSync(path.join(root,"story-builder-progress.html"),"utf8");
const source=fs.readFileSync(path.join(root,"story-builder-progress.mjs"),"utf8");

test("educator report is read-only, student-bound, and uses protected cycle RPCs",()=>{
  assert.match(html,/Educator Progress/);
  assert.match(source,/Looking at/);
  assert.match(source,/studentId/);
  assert.match(source,/list_story_builder_student_cycles_for_educator/);
  assert.match(source,/get_story_builder_student_cycle_for_educator/);
  assert.match(source,/get_story_builder_student_draft_for_educator/);
  assert.match(source,/Student-created draft/);
  assert.match(source,/separate from educator-led instructional cycles/);
  assert.match(source,/support_evidence/);
  assert.match(source,/Supports documented/);
  assert.match(source,/first_tell_recorded_at/);
  assert.match(source,/Tell Again planner/);
  assert.match(source,/is_anonymous===true/);
  assert.match(source,/does not provide a standardized score or diagnosis/);
  assert.doesNotMatch(source,/insert\(|update\(|delete\(/i);
});
