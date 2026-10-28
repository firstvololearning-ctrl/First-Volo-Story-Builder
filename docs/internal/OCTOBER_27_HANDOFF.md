# October 27 First Volo handoff

## Saved in Git

Story Builder: approved 35-sequence target wording, optional Explore Thinking with planner persistence and explicit insertion into writing, two educator tasks (Teach with a learner / Set up a student’s view), separate student sign-in labeling, optional picture ideas with no roll-first prerequisite, clearer teaching navigation, matching user guide/resource/About/target-builder text, and three aligned printables. Forty-one automated tests pass; local browser checks cover the two-task switch without losing the draft, Whole → Part → Whole navigation without rolling, planner visibility, and 375px layout.

Morphology: storage/assessment linking fixes (919d438), protected-word-safe content repair (686ac7d), and spreadsheet/context reconciliation (41e04a7). Added 33 contextual inference items across 27 targets and six runtime word entries. All 16 reward sets have reachable practice in All Flights and their own Flight, using the unchanged reward engine and protected-word filters. Sixty-six script regressions plus five Flight regressions pass. The master lexical workbook, dated Learn/Activity workbook, exact 33-row CSV and reconciliation notes are under audits/lexical in the Morphology repository. Historical snapshots and unfinished external source/clinical fields remain labeled.

No database/schema/policy changes were made for these content and interface releases. Git stores code, content, documentation and inventory files. Supabase stores authorized app data under the existing application rules, not these source files. Working browser drafts are local; My Stories / Cloud Sync and learner-cycle evidence use separate explicit save workflows. Do not infer a learner/cloud save merely from a source-code release.

## Still unfinished

- Morphology live earning, saving/reopening and reward duplicate-prevention through actual learner UI. Isolated production-engine tests pass; this does not replace live/cloud proof.
- Morphology print QA for student forms and reports: clipping, page breaks, readability and answer-key separation. Story Builder printable wording/layout review is complete for the three revised static PDFs; that does not complete Morphology printing QA.
- Chrome/Safari synchronization with the fictional learner. Safari previously showed an unrelated private document and automatic review rejected reading it. The user must open Morphology and sign in directly there before task-scoped Safari QA. Never request credentials in chat.
- Authenticated Story Builder student end-to-end QA: no active shared student was available in the educator account. Educator-path checks do not establish that student cloud workflow is verified.
- Detailed SLP review and remaining external linguistic/accessibility source checks. Educator approved initial Story Builder wording for later fine review; software tests do not close clinical/source queues.

Generated curriculum CSVs can be rebuilt with curriculum-map.js. Local report screenshots/logs are supporting evidence; essential source and reconciled inventory files are in Git. Do not declare the full Morphology pilot QA complete.


## Teaching activity order correction
Moved the phase-advance action from the cycle overview to after the planner, target practice and writing area. The overview remains navigation; Tell Again follows the work. The completion section hides when the cycle is off or the educator is configuring student supports. Oral responses require no written completion gate. Updated the guide and release cache version together. All 43 Story Builder tests pass.


First Volo — October 27, 2026 handoff

ACCOMPLISHED AND PUBLISHED
• Story Builder: approved 35 narrative prompt sequences; removed forced success/lesson assumptions; preserved student meaning and educator judgment.
• Sentence Formulation: three instructional prompts, selectable Sentence Help/More Help, both formulation pathways, relationship menu and grammatical support levels.
• Optional Explore Thinking distinguishes belief/knowledge from intention; preserves optional entry and explicit insertion into writing.
• Educator tasks clearly separated: Teach with a learner versus Set up a student’s view. Student sign-in opens a separate student workspace. Picture rolling is optional at any point.
• First Tell → Work on Target → Tell Again retained. Corrected next-step placement: after planner/practice/writing, not above the actual work. The top overview remains navigation. Oral storytelling requires no written completion gate.
• Updated User Guide, resources, target guidance and three planner PDFs. Story Builder: 43 tests pass. Live activity-order release e745bac deployed successfully and browser checked.
• Morphology: repaired protected-assessment reward coverage distinction; added 33 ordinary practice items across 27 targets, including six new lexical entries. Corrected absentee usage and preserved conditional language supports.
• Morphology authored-ID routing and reachability checks cover 95 active reward word parts, with no measured coverage gaps. 71 tests pass. These automated checks do not establish live reward earning/cloud persistence.
• Updated master lexical workbook, Learn and Activity Inventory, exact 33-item CSV, and source-review notes. Morphology release 41e04a7 published successfully.

SAVE / PUBLICATION STATUS
• Story Builder source and internal handoff are in firstvololearning-ctrl/First-Volo-Story-Builder, main. No uncommitted source changes before this handoff append.
• Morphology source, updated workbooks, practice additions CSV and durable audit notes are in firstvololearning-ctrl/First-Volo-Morphology, main, 41e04a7. Four untracked root curriculum-map CSV files are regenerable audit outputs, not unsaved source or learner records.
• Review HTML, test logs, screenshots and downloadable copies remain in this chat’s outputs folder. Canonical project changes and inventories are committed in their repositories.
• No Supabase schema/policy changes were needed. Earlier fictional-learner backup succeeded. This is not confirmation that every current draft or evidence record is in Supabase.
• Story Builder working drafts are browser-local; My Stories / Cloud Sync and explicit learner-cycle evidence are separate saves. Morphology assessment records observed in this QA remain browser-local. Do not clear browser storage assuming all records are cloud backed up.

NEXT STEPS — IN ORDER
1. Morphology live reward QA: use fictional learner MORPHOLOGY QA; earn a token through available practice, save, reopen, repeat the activity, confirm one award, then verify saved cloud state. Do not count isolated engine tests as live proof.
2. Morphology printing: inspect actual student forms/reports for clipping, page breaks, readability and answer-key separation. Story Builder’s revised PDF assets were rendered and inspected; that does not complete Morphology printing QA.
3. Chrome ↔ Safari synchronization: open Morphology in Safari and let the user sign in directly. Compare the same fictional learner and distinguish cloud-backed records from browser-local assessment records. Never request credentials in chat.
4. Story Builder authenticated student QA: use an active shared student account to test educator support settings and the actual student workspace. Current educator account had no active shared students.
5. Clinical/source review: user’s detailed SLP review of approved Story Builder prompts remains for later. Complete the documented source/accessibility checks for new Morphology vocabulary; do not label all 33 entries fully source verified.

BLOCKERS / LIMITS
• Safari inspection previously encountered an unrelated private document and automatic approval review rejected reading it. No bypass was attempted. User must open the relevant Morphology page for scoped testing.
• No active shared student was available for Story Builder student-account testing.
• Full Morphology pilot QA is NOT complete. Live rewards, printing and cross-browser synchronization remain unverified.



## Picture choices and guidance simplification
Grouped picture controls within Story elements & picture ideas. Added own/pictures/both teaching choices saved with project settings; own mode hides supplied picture grid and planner picture/selection labels without deleting draft work. Student setup saves picture mode separately from labels via v2 RPCs; own mode removes picture cards from the student workspace. Existing records default to both. Added database-review/add_story_builder_picture_modes.sql; applied to Supabase with old RPCs kept compatible, the existing ownership/entitlement/class/permission checks copied into v2, no new table grants, RLS retained. Work on Target now shows student goal plus one closed Educator guidance dropdown. Guide updated. Full student login QA remains pending an active shared student account.

Verification: 46 Node tests pass; actual student-support form exercised with fictional mocked student and RPC for all three mode/save payloads; browser reopened own-ideas mode with fictional writing intact. Supabase checks confirm mode default both, RLS on, empty function search paths, anon denied and authenticated execution gated by copied checks; unsigned setter rejected. Security advisor warnings for the three new authenticated SECURITY DEFINER RPCs are expected for this established gated API design; existing unrelated warnings were not changed. Automatic approval review rejected a proposed rollback test selecting an arbitrary existing learner; it was not run or retried. User clarified there are no live learners. Actual authenticated student setting roundtrip remains pending fictional-only testing.
