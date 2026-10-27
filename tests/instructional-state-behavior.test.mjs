import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

function runtime() {
  const window = {};
  const sandbox = { window, document: { readyState: 'loading', addEventListener() {} }, console };
  vm.runInNewContext(fs.readFileSync(new URL('../instructional-support.js', import.meta.url), 'utf8'), sandbox);
  return window.FirstVoloInstructionalSupport;
}

test('saved story instructional settings round-trip both pathways, every relationship and grammar level', () => {
  for (const sentencePathway of ['build', 'combine']) {
    for (const selectedRelationship of ['time','cause','result','contrast','condition','purpose','mental','description']) {
      for (let selectedGrammarLevel = 1; selectedGrammarLevel <= 5; selectedGrammarLevel++) {
        const api = runtime();
        const state = { target:'sentence-formulation', sessionPhase:'part', sentencePathway, selectedRelationship, selectedGrammarLevel,
          supportLevels:{character:3}, optionalSupports:{character:{sentence:true,more:true}}, retryRequested:{character:true} };
        api.restoreState(state);
        const restored = JSON.parse(JSON.stringify(api.getState()));
        for (const key of ['target','sessionPhase','sentencePathway','selectedRelationship','selectedGrammarLevel']) assert.equal(restored[key], state[key]);
        assert.deepEqual(restored.optionalSupports.character, state.optionalSupports.character);
        assert.equal(restored.retryRequested.character, true);
        restored.optionalSupports.character.more = false;
        assert.equal(api.getState().optionalSupports.character.more, true, 'snapshot is independent');
      }
    }
  }
});

test('untrusted saved settings normalize to safe defaults without exceeding three prompts', () => {
  const api = runtime();
  api.restoreState({target:'invalid',sessionPhase:'invalid',sentencePathway:'invalid',selectedRelationship:'invalid',selectedGrammarLevel:99,supportLevels:{character:5,setting:-1}});
  const state = api.getState();
  assert.equal(state.target,'off'); assert.equal(state.sessionPhase,'first-tell');
  assert.equal(state.sentencePathway,'build'); assert.equal(state.selectedRelationship,'cause'); assert.equal(state.selectedGrammarLevel,1);
  assert.equal(state.supportLevels.character,3); assert.equal(state.supportLevels.setting,0);
});
