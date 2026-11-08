import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
function runtime(){const sandbox={window:{},document:{readyState:'loading',addEventListener(){},getElementById(){return null;}},console};let source=fs.readFileSync(new URL('../instructional-support.js',import.meta.url),'utf8');source=source.replace('  let initialized = false;','  window.workflowActionFor = workflowActionFor;\n  let initialized = false;');vm.runInNewContext(source,sandbox);return sandbox.window;}
test('observe-first directs the educator to a goal without choosing a target or requiring pictures',()=>{const w=runtime();w.FirstVoloInstructionalSupport.restoreState({target:'observe-first',sessionPhase:'first-tell'});const action=w.workflowActionFor('observe-first','first-tell');assert.equal(action.chooseGoal,true);assert.equal(action.phase,undefined);assert.equal(w.FirstVoloInstructionalSupport.getState().target,'observe-first');});
test('next-step policy preserves whole-part-whole without a picture-selection prerequisite',()=>{const w=runtime();for(const target of ['story-organization','connections-cohesion','cause-effect','sentence-formulation','elaboration','perspective-internal-state']){assert.equal(w.workflowActionFor(target,'first-tell').phase,'part');assert.equal(w.workflowActionFor(target,'part').phase,'tell-again');assert.equal(w.workflowActionFor(target,'tell-again').phase,'first-tell');}});

test('completion action follows the story, target practice, and writing rather than the cycle overview',()=>{const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');const action=html.indexOf('id="storyNextStep"');for(const id of ['storyGrid','instructionalFocusPanel','storyPlannerPanel','storyWriting']) assert.ok(action>html.indexOf(`id="${id}"`),`${id} must precede completion`);assert.equal(html.match(/id="storyNextStep"/g).length,1);});

test('print guidance follows the selected goal and excludes hidden story parts', () => {
  const support = runtime().FirstVoloInstructionalSupport;
  assert.equal(support.getPrintGuidance(["problem"]), null);
  support.restoreState({ target: "cause-effect", sessionPhase: "first-tell" });
  const guidance = support.getPrintGuidance(["attempt", "resolution"]);
  assert.equal(guidance.goal, "Cause & Effect");
  assert.equal(guidance.part, "attempt");
  assert.equal(guidance.prompts.length, 5);
  assert.equal(support.getPrintGuidance([]).prompts.length, 0);
});

test('goal ratings restore separately for each tell and reject a skill from another goal', () => {
  const support = runtime().FirstVoloInstructionalSupport;
  support.restoreState({
    target: "cause-effect",
    goalRatings: {
      "cause-effect": {
        item: "cause",
        "first-tell": { rating: "Not observed", note: "No opportunity." },
        "tell-again": { rating: "Independent", note: "Explained why the map fell." }
      },
      elaboration: { item: "cause" }
    }
  });
  const ratings = support.getState().goalRatings;
  assert.equal(ratings["cause-effect"]["first-tell"].rating, "Not observed");
  assert.equal(ratings["cause-effect"]["tell-again"].rating, "Independent");
  assert.equal(ratings["cause-effect"]["tell-again"].note, "Explained why the map fell.");
  assert.equal(ratings.elaboration, undefined);
  support.restoreState({ target: "elaboration" });
  assert.equal(Object.keys(support.getState().goalRatings).length, 0);
});

test('recovered learner ratings replace unrelated local ratings and keep the new-story observation separate', () => {
  const support = runtime().FirstVoloInstructionalSupport;
  support.restoreState({ target:'cause-effect', goalRatings:{'cause-effect':{item:'cause','first-tell':{rating:'Independent',note:'Unrelated local story'}}} });
  const skill = support.getState().selectedSkill;
  support.restoreCycleEvidence('cause-effect', {version:2,skill_snapshot:{skill,'first-tell':{rating:'With support',note:'Saved first tell'},'tell-again':{rating:'Independent',note:'Saved retell'},given:['problem: Look / Listen'],followup:{rating:'Not observed',note:'No opportunity',story:'Different fictional story'}}});
  const saved = support.getState();
  assert.equal(saved.goalRatings['cause-effect']['first-tell'].note,'Saved first tell');
  assert.equal(saved.goalRatings['cause-effect'].followup.story,'Different fictional story');
  assert.equal(saved.goalRatings['cause-effect']['tell-again'].rating,'Independent');
  assert.deepEqual(Array.from(saved.givenPrompts['cause-effect']),['problem: Look / Listen']);
  support.restoreCycleEvidence('cause-effect', {});
  assert.equal(support.getState().goalRatings['cause-effect'],undefined);
});
