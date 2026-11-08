import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
test('educator task switch changes visibility without changing draft, teaching phase or access',()=>{
 const root={dataset:{},draft:'Learner story',phase:'part'},setup={hidden:true};
 const buttons=['teach','setup'].map(task=>({dataset:{educatorTask:task},attributes:{},setAttribute(k,v){this.attributes[k]=v;},addEventListener(_,fn){this.click=fn;}}));
 const document={getElementById:id=>id==='storyBuilderApp'?root:id==='studentSetupWorkspace'?setup:null,querySelectorAll:()=>buttons};
 vm.runInNewContext(fs.readFileSync(new URL('../educator-workspace.js',import.meta.url),'utf8'),{document});
 assert.equal(root.dataset.educatorWorkspace,'teach');assert.equal(setup.hidden,true);
 buttons[1].click();assert.equal(root.dataset.educatorWorkspace,'setup');assert.equal(setup.hidden,false);assert.equal(buttons[1].attributes['aria-pressed'],'true');
 buttons[0].click();assert.equal(setup.hidden,true);assert.equal(root.draft,'Learner story');assert.equal(root.phase,'part');
});

test('focus view is reversible and independent-practice setup exits it without changing the draft',()=>{
 const root={dataset:{},draft:'Fictional story',phase:'tell-again'},setup={hidden:true};
 const focus={attributes:{},setAttribute(k,v){this.attributes[k]=v;},addEventListener(_,fn){this.click=fn;}};
 const buttons=['teach','setup'].map(task=>({dataset:{educatorTask:task},setAttribute(){},addEventListener(_,fn){this.click=fn;}}));
 const document={getElementById:id=>({storyBuilderApp:root,studentSetupWorkspace:setup,focusViewButton:focus}[id]||null),querySelectorAll:()=>buttons};
 vm.runInNewContext(fs.readFileSync(new URL('../educator-workspace.js',import.meta.url),'utf8'),{document});
 focus.click();assert.equal(root.dataset.focusView,'true');assert.equal(focus.attributes['aria-pressed'],'true');
 focus.click();assert.equal(root.dataset.focusView,'false');
 focus.click();buttons[1].click();assert.equal(root.dataset.focusView,'false');assert.equal(setup.hidden,false);
 assert.equal(root.draft,'Fictional story');assert.equal(root.phase,'tell-again');
});
