import test from "node:test";
import assert from "node:assert/strict";
import { buildSupportEvidence } from "../story-builder-cycle-cloud.mjs";
import { skillRatingReportHtml, skillComparisonRowHtml } from "../story-builder-rating-report.mjs";

test("opened support does not become given support in new cycle records", () => {
  const evidence = buildSupportEvidence({
    target: "cause-effect", supportLevels: { problem: 3 }, givenPrompts: {},
    selectedSkill: "Explain a reason?", goalRatings: {}
  });
  assert.equal(evidence.version, 2);
  assert.deepEqual(evidence.observations, []);
  assert.deepEqual(evidence.skill_snapshot.given, []);
});

test("cycle snapshot preserves ratings, explicit given support and separate new-story evidence", () => {
  const evidence = buildSupportEvidence({
    target: "cause-effect", selectedSkill: "Explain a reason?",
    givenPrompts: { "cause-effect": ["Problem · A Clue", "Problem · A Clue"] },
    goalRatings: { "cause-effect": {
      "first-tell": { rating: "Not observed", note: "<script>bad</script>" },
      "tell-again": { rating: "Independent", note: "First story" },
      followup: { rating: "With support", story: "A different story", note: "Choice given" }
    }}
  });
  assert.deepEqual(evidence.skill_snapshot.given, ["Problem · A Clue"]);
  assert.equal(evidence.skill_snapshot.followup.story, "A different story");
  const html = skillRatingReportHtml(evidence);
  assert.match(html, /Not observed/);
  assert.match(html, /A different story/);
  assert.match(html, /&lt;script&gt;/);
  assert.doesNotMatch(html, /<script>/);
  const row = skillComparisonRowHtml({ support_evidence: evidence }, "Cause & Effect", "Today");
  assert.match(row, /Independent/);
  assert.match(row, /With support/);
});

test("older sessions show absence of rating and cannot imply mastery", () => {
  assert.equal(skillRatingReportHtml({ version: 1 }), "");
  assert.match(skillComparisonRowHtml({}, "Goal", "Today"), /No skill rating saved/);
});
