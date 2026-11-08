import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync(new URL('../script.js',import.meta.url),'utf8');
function attemptSave(fails){
 const messages=[];
 const context={console:{error(){}},localStoryStorage:{save(){if(fails)throw new Error('Storage full');}},buildStorySaveData:()=>({storyId:'fictional'}),showSaveStatus:message=>messages.push(message),window:{clearTimeout(){},setTimeout(fn){fn();return 1;}}};
 const start=source.indexOf('  function saveToBrowser('),end=source.indexOf('  function updatePlannerPrompts()',start);
 vm.runInNewContext('let isRestoringStory=false,autoSaveTimer;'+source.slice(start,end)+';scheduleAutoSave();',context);
 return messages;
}
test('a failed automatic draft save never announces success',()=>{
 const messages=attemptSave(true);
 assert.equal(messages.length,1);
 assert.match(messages[0],/Not saved on this device/);
 assert.doesNotMatch(messages[0],/✓|Draft saved/);
});
test('successful local saving identifies the device rather than implying a learner or cloud save',()=>{
 assert.deepEqual(attemptSave(false),['✓ Draft saved on this device']);
});
