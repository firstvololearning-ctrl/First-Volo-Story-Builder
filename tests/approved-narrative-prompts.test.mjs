import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const approved=JSON.parse(fs.readFileSync(new URL('./fixtures/approved-narrative-prompts.json',import.meta.url),'utf8')).rows;
const targetKeys={'Story Organization':'story-organization','Connections & Cohesion':'connections-cohesion','Cause & Effect':'cause-effect','Elaboration':'elaboration','Perspective & Internal State':'perspective-internal-state'};
const categoryKeys={'Character':'character','Setting':'setting','Problem':'problem','Feeling':'feeling','Plan':'plan','Action / Attempt':'attempt','Item':'item','Resolution':'resolution'};
function runtime(){
  const source=fs.readFileSync(new URL('../instructional-support.js',import.meta.url),'utf8');
  const sandbox={window:{},document:{readyState:'loading',addEventListener(){},getElementById(){return null;}},console};
  vm.runInNewContext(source.replace('  let initialized = false;','  window.reviewSupport = supportFor; window.reviewReconnect = reconnectPrompt;\n  let initialized = false;'),sandbox);
  return sandbox.window;
}
test('all 35 approved sequences reach the correct prompts, independent support types, retry and reconnection',()=>{
  const w=runtime();assert.equal(approved.length,35);
  for(const row of approved){
    w.FirstVoloInstructionalSupport.restoreState({target:targetKeys[row.target],sessionPhase:'part'});
    const category=categoryKeys[row.storyElement];
    const support=JSON.parse(JSON.stringify(w.reviewSupport(category)));
    assert.deepEqual(support.steps,[row.lookListen,row.think,row.clue],`${row.target}/${row.storyElement}`);
    assert.equal(new Set(support.steps).size,3);
    assert.equal(support.sentence,row.sentenceHelp);
    assert.equal(support.more,row.moreHelp);
    assert.equal(support.retry,row.retry);
    assert.equal(w.reviewReconnect(category),row.reconnect);
  }
});
test('irrelevant story parts do not gain targeted supports',()=>{
  const w=runtime();
  for(const [target,category] of [['story-organization','item'],['cause-effect','character'],['perspective-internal-state','setting']]){
    w.FirstVoloInstructionalSupport.restoreState({target,sessionPhase:'part'});
    assert.equal(w.reviewSupport(category),null);
  }
});
