# First Volo Story Builder — Target + Goal + Evidence Builder

Replacement parity-complete development package.

## Public flow

**WHO? → WHAT? → WHY? → HOW MUCH HELP?**

## Core architecture

- Grades 2–3 / 4–5 / 6–8
- Exactly 7 canonical Story Builder targets
- Observe First remains workflow, not a student objective
- 21 distinct objectives
- 21 target-specific developmental expectations
- 21 grade-band × target evidence records
- Standards separated into Direct / Related
- No unverified Massachusetts exact codes
- Access supports separated from target/instructional supports
- Story Planner availability explicit
- Target-work monitoring separated from Retell/whole-story transfer
- Optional clinician-controlled IEP wording
- No hard-coded mastery threshold
- Full instructional cycle:
  **First Tell → Select a Target → Teach & Revise with Dynamic Support → Retell**
- **Whole → Part → Whole**

## Evidence status

**Mapped and claim-bounded; final source-by-source full-text verification pending.**

The current evidence mapping is intentionally cautious. It does not claim direct efficacy for First Volo Story Builder and does not turn grade bands into hard developmental cutoffs.

## Files

- `story-builder-target-builder.html`
- `story-builder-target-builder.css`
- `story-builder-target-builder.js`
- `docs/internal/STORY_BUILDER_SLP_TARGET_EVIDENCE_MAP.md`
- `PARITY_AUDIT.md`

## Integration

This package is standalone and does not touch Story Builder cloud/auth/account code. Integrate into the Story Builder repository only after visual QA and comparison with the current site shell/navigation.

## Current-product grounding

This revision was checked against the current Story Builder product implementation.

Important: the app currently uses one common target/support engine across grades. The grade-band selector in this educator builder changes suggested objectives and developmental expectations only.

See `PRODUCT_GROUNDING_AUDIT.md` for the exact boundary between current Story Builder capabilities and future product gaps.
