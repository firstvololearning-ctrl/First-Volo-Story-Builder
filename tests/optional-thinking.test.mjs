import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source = fs.readFileSync(new URL('../script.js', import.meta.url), 'utf8');
const handler = source.slice(source.indexOf('    getElement("includeThinkingInStory")?.addEventListener'), source.indexOf('    connectAutoSaveEvents();', source.indexOf('    getElement("includeThinkingInStory")?.addEventListener')));
function setup(thought, text, start = text.length, end = start) {
  let click;
  const writing = { value:text, selectionStart:start, selectionEnd:end, setSelectionRange(a,b){this.selectionStart=a;this.selectionEnd=b;}, dispatchEvent(){this.saved=true;}, focus(){this.focused=true;} };
  const elements = { includeThinkingInStory:{addEventListener(_,fn){click=fn;}}, plannerThinkingNotes:{value:thought}, storyWriting:writing, thinkingStatus:{} };
  vm.runInNewContext(handler,{ getElement:id=>elements[id], Event:class {} });
  return {click,writing,elements};
}
test('Thinking inserts only on choice and preserves surrounding writing at chosen location',()=>{
  const q=setup('Mira thinks the box is empty.','Before. After.',8,8);
  assert.equal(q.writing.value,'Before. After.');
  q.click();
  assert.equal(q.writing.value,'Before. Mira thinks the box is empty.\nAfter.');
  assert.equal(q.writing.saved,true);
  assert.equal(q.writing.focused,true);
});
test('empty optional thought leaves the whole story unchanged',()=>{
  const q=setup('  ','Whole story.');q.click();assert.equal(q.writing.value,'Whole story.');assert.equal(q.writing.saved,undefined);
});
test('Thinking uses the existing planner save, restore and reset paths',()=>{
  assert.equal(source.match(/\[\.\.\.plannerCategories, "attempt", "resolution", "thinking"\]/g).length,3);
});
