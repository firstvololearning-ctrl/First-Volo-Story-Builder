# October 27 instructional support update

Applied the supplied 169f282 patch against unchanged main 093bffc. Added previous-prompt navigation, keyboard focus restoration after rendering, explicit meaning/educator-judgment guidance, oral/written Build prompts, flexible starting-response guidance for Expand/Combine, full-model reproduction, and narrow-select sizing. Whole → Part → Whole remains intact.

## Instructional review still required

The non-Sentence-Formulation prompt content was retained, not rewritten without clinical review. Its original fourth item is now More Help and its fifth item Sentence Help. These need clinician review before treating the whole catalog as finalized:

- Story Organization: More Help often supplies a story-function arrow chain; confirm that clinician-guided instruction is sufficiently explicit. Some frames require a causal link that may not fit every story.
- Connections & Cohesion: word lists and frames may mix temporal and causal alternatives. Select the actual relationship; do not imply interchangeable connectives or add unsupported causal links. Referential cohesion needs separate attention.
- Cause & Effect: the resolution word list mixes “so”, “because”, “finally”, and “as a result”. These do not express the same relationship. Preserve distinctions among cause, intention, action, and consequence.
- Elaboration: frames such as “The problem becomes harder when ___” presume escalation; use only if supported. Useful details should clarify meaning rather than add length or complexity.
- Perspective & Internal State: some prompts/frames presume a thought, knowledge, or changed understanding. Require story evidence and allow uncertainty; do not manufacture internal states.

The new universal educator reminder instructs selection only when language fits the student's meaning/story. This is a safeguard, not a substitute for reviewing the retained catalog.

## Persistence boundaries

Complete instructional state remains in existing story JSON/draft persistence. The existing cloud cycle support-evidence summary still records the three prompt levels only; it is not a complete record of optional-support selections, pathway, relationship, or grammar level. No database schema or student-facing predefined support catalog was changed. Student account view still uses its separate predefined-support renderer.

## Validation

33 automated tests pass across eight test files, including 80 combinations of pathway × relationship × grammar level and invalid-state normalization. Local browser fixture uses production markup/scripts/styles but excludes account/cloud modules; it is outside the repository. Chrome checked both pathways, all eight relationship options, all five grammar levels, optional support order/both open, retry/reconnect, keyboard focus, reload restoration, and Tell Again hiding targeted controls. In-app browser checked 375/768/1280 widths: no horizontal overflow and selects fit cards. No application JavaScript errors observed in local fixture; Chrome extension errors were excluded.

Authenticated educator route is available in Chrome. Learner-bound cloud saving, student-account rendering, and cross-account restoration still require separate live QA. Do not treat isolated UI tests as proof of these workflows.


## Approved initial wording update

The educator approved the 35 proposed target sequences for initial use on October 27, 2026, with detailed SLP review to follow. These replace the retained catalog discussed above. Prompts allow unresolved outcomes, unchanged beliefs, and uncertainty. Optional Explore Thinking beside Feeling distinguishes beliefs/knowledge from intentions, includes evidence and uncertainty cues, saves with planner notes, and inserts into story writing only on student choice. No additional required narrative step or scoring is introduced.
