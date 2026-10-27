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
