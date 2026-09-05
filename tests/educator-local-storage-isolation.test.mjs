import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const accessGate = fs.readFileSync(path.join(root, "access-gate.mjs"), "utf8");
const storyRuntime = fs.readFileSync(path.join(root, "script.js"), "utf8");

test("educator drafts and story libraries are scoped to the signed-in educator", () => {
  assert.match(accessGate, /FirstVoloStoryEducatorStorageScope\s*=\s*access\?\.user\?\.id/);
  assert.match(storyRuntime, /firstVoloStoryBuilderSavedWork:\$\{window\.FirstVoloStoryEducatorStorageScope/);
  assert.match(storyRuntime, /firstVoloStoryBuilderMyStoriesV1:\$\{window\.FirstVoloStoryEducatorStorageScope/);
});
