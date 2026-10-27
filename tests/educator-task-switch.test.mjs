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
