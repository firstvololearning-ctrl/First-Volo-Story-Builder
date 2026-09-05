import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const gate = await readFile(new URL("../access-gate.mjs", import.meta.url), "utf8");
const studentMode = await readFile(new URL("../student-mode.mjs", import.meta.url), "utf8");

test("locked Story Builder routes both roles through My First Volo", () => {
  assert.match(gate, /\?returnTo=storyBuilder/);
  assert.match(gate, /student-login\.html\?returnTo=storyBuilder/);
  assert.match(gate, /Educator sign in/);
  assert.match(gate, /Student sign in/);
});

test("Story Builder student sign-out returns to the neutral student hub", () => {
  assert.match(studentMode, /student-login\.html";/);
  assert.doesNotMatch(studentMode, /student-login\.html\?returnTo=/);
  assert.match(studentMode, /await supabase\.auth\.signOut\(\)/);
  assert.match(studentMode, /window\.location\.replace\(STUDENT_LOGIN_URL\)/);
});
