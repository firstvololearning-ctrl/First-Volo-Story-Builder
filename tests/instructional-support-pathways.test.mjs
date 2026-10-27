import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const source = fs.readFileSync(new URL('../instructional-support.js', import.meta.url), 'utf8');

test('two sentence pathways cover every story element with three sequential prompts', () => {
  for (const objectName of ['buildSentencePrompts', 'combineSentencePrompts']) {
    const beginning = source.indexOf(`const ${objectName} = {`);
    assert.ok(beginning > 0, `${objectName} exists`);
    const ending = source.indexOf('\n  };', beginning);
    const body = source.slice(beginning, ending);
    for (const category of ['character', 'setting', 'problem', 'feeling', 'plan', 'attempt', 'item', 'resolution']) {
      assert.match(body, new RegExp(`\\b${category}: \\["`), `${objectName} includes ${category}`);
    }
  }
  assert.match(source, /sentencePathway === "combine" \? combineSentencePrompts\[category\] : buildSentencePrompts\[category\]/);
});

test('support after the clue branches into independently selectable options', () => {
  assert.match(source, /\[\["sentence", "Sentence Help"\], \["more", "More Help"\]\]/);
  assert.match(source, /optionalSupports\[category\]\[key\] = !optionalSupports\[category\]\[key\]/);
  assert.match(source, /"Look \/ Listen Here"/);
  assert.match(source, /"Grammatical support level"/);
  assert.match(source, /"Intended sentence relationship"/);
});

test('saved instructional state includes educator selections', () => {
  for (const key of ['optionalSupports', 'sentencePathway', 'selectedRelationship', 'selectedGrammarLevel']) {
    assert.match(source, new RegExp(`\\b${key}\\b`));
  }
});
