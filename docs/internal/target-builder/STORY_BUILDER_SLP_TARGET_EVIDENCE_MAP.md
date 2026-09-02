# First Volo Story Builder — SLP Target + Evidence Map

**Status:** internal development reference.

**Product grounding status:** checked against the current Story Builder `main` implementation.

**Evidence status:** product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.

## Critical product-grounding rule

The grade bands in the educator Target + Goal + Evidence Builder **do not represent three different Story Builder runtimes**. The current app uses one target/support engine. Grade band changes the educator-facing objective/developmental expectation only.

Current in-app phases:

**First Tell → Work on Target → Tell Again**

Story Goal selection is a separate educator control. **Observe First · Choose After First Tell** is the default.

Current progressive educator support hierarchy:

**Look here → Think about it → A clue → Words to try → Sentence start → Retry the same language demand**

During Tell Again, targeted help stays closed. The educator may allow Story Planner reference or hide the Planner for an independent whole-story tell.

## Current product scope — seven canonical targets

### Story Organization

**Current product construct:** Organize the important parts of the story into a coherent narrative: who/where → problem and feeling → plan → action/attempt → resolution.

**Current Student Mode support types:** Question prompt, Story-part reminder, Sentence starter.

**Current Story Builder implementation:**
- First Tell captures the complete story before the Planner or targeted support is opened.
- Work on Target focuses on the selected story function where repair is needed.
- After Retry, the repaired part is reconnected to the surrounding story before Tell Again.

### Connections & Cohesion

**Current product construct:** Connect ideas and events rather than produce isolated statements, using clear relationships, sequencing, connectors, and referents.

**Current Student Mode support types:** Question prompt, Connecting words, Sentence starter.

**Current Story Builder implementation:**
- Connections & Cohesion support is available across the Story Planner categories.
- Current built-in language includes temporal/causal connectors such as when, while, after, because, so, but, suddenly, finally, and as a result when they fit the intended meaning.
- The current product watches for unclear referents, but it does not contain a dedicated pronoun/referent-repair module.

### Cause & Effect

**Current product construct:** Explain why important events or feelings occur, how the problem and feeling lead to a plan, and what happens because of the character’s attempt.

**Current Student Mode support types:** Question prompt, Connecting words, Sentence starter.

**Current Story Builder implementation:**
- Current Cause & Effect support targets problem, feeling, plan, attempt, optional item, and resolution relationships.
- Built-in prompts include because, so, finally, as a result, to, and in order to when they fit the intended relationship.
- The current product does not include a dedicated multi-step causal-chain, competing-cause, or counterfactual module.

### Sentence Formulation

**Current product construct:** Turn an intended idea into a complete, organized spoken or written sentence.

**Current Student Mode support types:** Question prompt, Sentence reminder, Sentence starter.

**Current Story Builder implementation:**
- Sentence Formulation begins with the student’s intended idea rather than a new clinician-generated sentence.
- The current built-in reminder is Who? → did what? → what or whom? → where or why?, with story-part sentence starters.
- The current product does not contain a systematic sentence-combining or advanced syntax hierarchy.

### Elaboration

**Current product construct:** Add useful information that clarifies or develops an important story idea or event.

**Current Student Mode support types:** Question prompt, Detail reminder, Sentence starter.

**Current Story Builder implementation:**
- Current Elaboration prompts ask for one useful detail tied to the selected story part.
- The program explicitly distinguishes useful detail from extra information that does not help the important story idea.
- The current product does not include dedicated dialogue, pacing, reflection, or literary-craft modules.

### Perspective & Internal State

**Current product construct:** Explain what characters feel, think, know, want, expect, wonder, or intend and connect those ideas to story events when appropriate.

**Current Student Mode support types:** Question prompt, Words to try, Sentence starter.

**Current Story Builder implementation:**
- Current Perspective & Internal State prompts target character, problem, feeling, plan, attempt, and resolution.
- Built-in word support includes wants, knows, thinks, hopes, wonders, expects, planned, decided, realized, learned, and understood.
- The current product does not include a dedicated two-character perspective-comparison or systematic perspective-change module.

### Vocabulary Precision

**Current product construct:** Choose words that communicate the intended meaning more specifically.

**Current Student Mode support types:** Question prompt, Word reminder, Sentence starter.

**Current Story Builder implementation:**
- Current Vocabulary Precision support works inside the student’s narrative rather than as a decontextualized vocabulary lesson.
- The built-in prompt asks How? What kind? How strong? What exactly happened? and supports comparison among candidate words.
- The current product does not include dedicated connotation, register, tone, or broad vocabulary-intervention modules.

## Explicit current product gaps — DO NOT silently turn these into generated Story Builder capabilities

- No dedicated advanced multi-episode/plot-architecture module.
- No dedicated pronoun/referent-repair scaffold, although unclear referents are monitored under Connections & Cohesion.
- No dedicated multi-step causal-chain, competing-cause, or counterfactual causal-reasoning module.
- No systematic sentence-combining or comprehensive older-student syntax hierarchy.
- No dedicated dialogue, pacing, reflection, or literary-craft module.
- No dedicated two-character perspective-comparison, false-belief, or systematic perspective-change module.
- No dedicated connotation/register/tone or broad decontextualized vocabulary module.

## Standards guardrail

Direct standards may be empty. The current builder treats verified CCSS narrative-writing standards as **Related** because Story Builder targets oral and/or written narrative language and the clinical targets are more specific than those writing standards. Massachusetts remains **crosswalk in development** until exact grade-and-target matches are independently verified.

## 21 grade-band × target educator-guidance records

### Grades 2–3

#### Story Organization

**Suggested objective:** The student will organize the important parts of a story into a coherent narrative, including the character/setting, problem and feeling, plan, action/attempt, and resolution as relevant.

**At this level:** Use the current Story Builder core episode structure with concrete, visible relationships among character/setting, problem/feeling, plan, attempt, and resolution. Support may be explicit while the student learns to reconnect repaired parts to the whole story.

**Research synthesis:** Younger elementary narrative-intervention evidence supports explicit attention to story structure within complete narratives, with visual/verbal scaffolds and repeated opportunities to produce or reconstruct stories. This supports Story Builder's current core organization target; it does not establish one required story template for every child.

**Product/evidence status:** Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.

**Direct standards:** None displayed.

**Related verified standards:** CCSS.ELA-Literacy.W.2.3, CCSS.ELA-Literacy.W.3.3

**Massachusetts:** Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.

#### Connections & Cohesion

**Suggested objective:** The student will connect story ideas and events using clear relationships, sequencing, connectors, and referents so the listener can follow the narrative.

**At this level:** Emphasize clear nearby relationships among story ideas using the current connector and sentence-support options. The current product can flag unclear referents, but it does not provide a dedicated pronoun-repair module.

**Research synthesis:** Narrative-intervention research and clinical guidance support helping younger students make relationships among story events and ideas clearer. The evidence is broader than Story Builder's exact connector/referent prompts, so the rationale supports the target without claiming that the current cohesion support sequence itself has been validated.

**Product/evidence status:** Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.

**Direct standards:** None displayed.

**Related verified standards:** CCSS.ELA-Literacy.W.2.3, CCSS.ELA-Literacy.W.3.3

**Massachusetts:** Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.

#### Cause & Effect

**Suggested objective:** The student will explain why important events or feelings occur, how the problem and feeling lead to a plan, and what happens because of the character’s attempt.

**At this level:** Emphasize the current supported relationships: problem/event → feeling, problem/feeling → plan, plan → attempt, and attempt → outcome/resolution. Keep the focus on one relationship at a time when needed.

**Research synthesis:** School-age narrative intervention includes work on causal relationships among events, feelings, plans, actions, and outcomes. This supports Story Builder's current cause-and-effect target; it does not justify adding unsupported multi-step or counterfactual causal demands.

**Product/evidence status:** Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.

**Direct standards:** None displayed.

**Related verified standards:** CCSS.ELA-Literacy.W.2.3, CCSS.ELA-Literacy.W.3.3

**Massachusetts:** Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.

#### Sentence Formulation

**Suggested objective:** The student will turn an intended story idea into a complete, organized spoken or written sentence.

**At this level:** Emphasize expressing one intended story idea in a complete, organized sentence using oral rehearsal, the current sentence reminder, and story-part sentence starters when needed.

**Research synthesis:** Narrative intervention can address the language used to express story ideas within connected discourse. Direct evidence for Story Builder's exact one-main-idea/sentence-starter sequence is limited, so the research supports sentence formulation as a narrative-language target rather than proving the current support sequence.

**Product/evidence status:** Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.

**Direct standards:** None displayed.

**Related verified standards:** CCSS.ELA-Literacy.W.2.3, CCSS.ELA-Literacy.W.3.3

**Massachusetts:** Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.

#### Elaboration

**Suggested objective:** The student will add useful information that clarifies or develops an important story idea or event.

**At this level:** Emphasize adding one useful detail that clarifies or develops the selected story part. Relevance matters more than quantity.

**Research synthesis:** Narrative intervention supports developing important story information with relevant detail. This is consistent with Story Builder's current emphasis on adding one useful detail to a selected story part rather than simply making the narrative longer.

**Product/evidence status:** Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.

**Direct standards:** None displayed.

**Related verified standards:** CCSS.ELA-Literacy.W.2.3, CCSS.ELA-Literacy.W.3.3

**Massachusetts:** Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.

#### Perspective & Internal State

**Suggested objective:** The student will explain what a character feels, thinks, knows, wants, expects, wonders, or intends and connect that information to story events when appropriate.

**At this level:** Emphasize basic character feelings, thoughts, knowledge, wants, expectations, or intentions and their relationship to the current story event.

**Research synthesis:** School-age narrative intervention supports attention to mental/internal-state language as part of explaining characters and story events. This supports Story Builder's current internal-state target without implying advanced perspective modules that are not in the product.

**Product/evidence status:** Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.

**Direct standards:** None displayed.

**Related verified standards:** CCSS.ELA-Literacy.W.2.3, CCSS.ELA-Literacy.W.3.3

**Massachusetts:** Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.

#### Vocabulary Precision

**Suggested objective:** The student will choose words that communicate the intended story meaning more specifically.

**At this level:** Emphasize replacing very general/repeated words with a more specific known word that fits the intended meaning, then reintegrating it into the sentence/story idea.

**Research synthesis:** Narrative intervention may include vocabulary support inside connected stories. This supports Story Builder's current goal of choosing a more specific word in context, but it should not be presented as evidence for a broad standalone vocabulary program.

**Product/evidence status:** Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.

**Direct standards:** None displayed.

**Related verified standards:** CCSS.ELA-Literacy.W.2.3, CCSS.ELA-Literacy.W.3.3

**Massachusetts:** Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.

### Grades 4–5

#### Story Organization

**Suggested objective:** The student will organize the important story functions into a coherent narrative and make the relationships among the problem/feeling, plan, action/attempt, and resolution increasingly clear.

**At this level:** Use the same current Story Builder episode structure while expecting clearer integration among problem/feeling, plan, attempt, and resolution and less support for maintaining the whole sequence.

**Research synthesis:** School-age narrative-intervention evidence supports explicit story-structure work, repeated narrative production, and reconstruction with support fading. This supports continued work on Story Builder's existing core episode structure with increasing independence.

**Product/evidence status:** Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.

**Direct standards:** None displayed.

**Related verified standards:** CCSS.ELA-Literacy.W.4.3, CCSS.ELA-Literacy.W.5.3

**Massachusetts:** Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.

#### Connections & Cohesion

**Suggested objective:** The student will connect story ideas and events consistently using clear relationships, sequencing, connectors, and referents.

**At this level:** Use the current prompts/connectors with increasing consistency across the story. Do not imply a separate long-discourse cohesion curriculum beyond the supports actually present.

**Research synthesis:** Later-elementary discourse and narrative-intervention evidence supports improving how story ideas and events are connected for a listener. This is consistent with Story Builder's current relationship, sequencing, connector, and referent target, while direct evidence for each specific built-in prompt remains limited.

**Product/evidence status:** Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.

**Direct standards:** None displayed.

**Related verified standards:** CCSS.ELA-Literacy.W.4.3, CCSS.ELA-Literacy.W.5.3

**Massachusetts:** Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.

#### Cause & Effect

**Suggested objective:** The student will make important causal relationships explicit by explaining why events or feelings occur, how the problem and feeling lead to a plan, and what happens because of the attempt.

**At this level:** Expect clearer and more independent explanation of the current supported causal relationships across problem, feeling, plan, attempt, and resolution. Do not imply a separate multi-step causal-chain module.

**Research synthesis:** School-age narrative intervention supports making causal relationships among events, motivations, actions, and consequences explicit. This supports Story Builder's current cause-and-effect relationships without requiring a separate advanced causal-chain curriculum.

**Product/evidence status:** Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.

**Direct standards:** None displayed.

**Related verified standards:** CCSS.ELA-Literacy.W.4.3, CCSS.ELA-Literacy.W.5.3

**Massachusetts:** Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.

#### Sentence Formulation

**Suggested objective:** The student will formulate complete, organized spoken or written sentences that preserve and clearly express the intended narrative idea.

**At this level:** Expect clearer, more independent formulation of the student's intended sentence using the current one-main-idea reminder and sentence starters as needed. Story Builder does not currently provide a systematic sentence-combining progression.

**Research synthesis:** Narrative-intervention guidance supports working on clear language formulation within complete narratives. Story Builder's current Sentence Formulation support focuses on one intended idea and a complete organized sentence; it should not be represented as a validated sentence-combining curriculum.

**Product/evidence status:** Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.

**Direct standards:** None displayed.

**Related verified standards:** CCSS.ELA-Literacy.W.4.3, CCSS.ELA-Literacy.W.5.3

**Massachusetts:** Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.

#### Elaboration

**Suggested objective:** The student will select and add useful information that clarifies or develops important story ideas or events without adding unrelated detail.

**At this level:** Expect students to choose details that are useful for understanding the selected story part and to avoid unrelated additions, with reduced prompting.

**Research synthesis:** Narrative intervention supports developing important story content with relevant information. This aligns with Story Builder's current useful-detail prompts and the distinction between relevant elaboration and unrelated extra information.

**Product/evidence status:** Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.

**Direct standards:** None displayed.

**Related verified standards:** CCSS.ELA-Literacy.W.4.3, CCSS.ELA-Literacy.W.5.3

**Massachusetts:** Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.

#### Perspective & Internal State

**Suggested objective:** The student will explain relevant character thoughts, feelings, knowledge, wants, expectations, wonders, or intentions and connect them to story events and actions.

**At this level:** Expect more explicit links between relevant internal states and what the character does or experiences, using the current mental-state prompts/word supports.

**Research synthesis:** School-age narrative intervention supports causal and mental-state language that helps explain character actions and events. This supports Story Builder's current internal-state prompts while exact grade-specific cutoffs and advanced perspective demands remain uncertain.

**Product/evidence status:** Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.

**Direct standards:** None displayed.

**Related verified standards:** CCSS.ELA-Literacy.W.4.3, CCSS.ELA-Literacy.W.5.3

**Massachusetts:** Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.

#### Vocabulary Precision

**Suggested objective:** The student will select more specific words that fit the intended narrative meaning and use them in the whole sentence or story idea.

**At this level:** Expect more consistent selection of specific words for character, setting, problem, feeling, plan, attempt, item use, and resolution while preserving the intended meaning.

**Research synthesis:** Narrative intervention may support word learning and more precise language within discourse. Story Builder's current Vocabulary Precision target is appropriately narrow: choose a more specific known word that fits the intended story meaning and use it in context.

**Product/evidence status:** Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.

**Direct standards:** None displayed.

**Related verified standards:** CCSS.ELA-Literacy.W.4.3, CCSS.ELA-Literacy.W.5.3

**Massachusetts:** Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.

### Grades 6–8

#### Story Organization

**Suggested objective:** The student will independently organize and connect the important story functions into a coherent narrative using the Story Builder episode structure as appropriate.

**At this level:** Increase independence and coherence within Story Builder's current core episode architecture. The current product does not teach advanced multi-episode plot structure as a separate module.

**Research synthesis:** Secondary and later-school-age discourse-intervention evidence supports continued narrative intervention beyond the early elementary grades. This supports using Story Builder's existing organization target with greater independence, not adding advanced plot architecture that the product does not currently teach.

**Product/evidence status:** Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.

**Direct standards:** None displayed.

**Related verified standards:** CCSS.ELA-Literacy.W.6.3, CCSS.ELA-Literacy.W.7.3, CCSS.ELA-Literacy.W.8.3

**Massachusetts:** Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.

#### Connections & Cohesion

**Suggested objective:** The student will maintain clear relationships among story ideas and events using sequencing, connectors, and clear referents with decreasing support.

**At this level:** Increase independence in making story relationships, sequencing, connectors, and referents clear across the complete Story Builder narrative. The product does not currently provide systematic advanced cohesion instruction.

**Research synthesis:** Later-school-age discourse intervention supports continued work on connected narrative language and coherence. This supports Story Builder's current cohesion target, while the product does not claim a comprehensive advanced cohesion curriculum.

**Product/evidence status:** Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.

**Direct standards:** None displayed.

**Related verified standards:** CCSS.ELA-Literacy.W.6.3, CCSS.ELA-Literacy.W.7.3, CCSS.ELA-Literacy.W.8.3

**Massachusetts:** Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.

#### Cause & Effect

**Suggested objective:** The student will explain the important causal relationships supported by the story, including why events or feelings occur and how plans, attempts, and outcomes relate, with decreasing support.

**At this level:** Increase independence and precision in explaining the causal relationships that Story Builder already targets. Do not extend the objective to competing causes, counterfactuals, or a dedicated multi-step causal-chain curriculum.

**Research synthesis:** Later-school-age narrative/discourse evidence supports work on causal coherence and relationships among motivations, actions, and outcomes. This supports Story Builder's current cause-and-effect target; more advanced causal reasoning should not be implied unless the product adds such supports.

**Product/evidence status:** Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.

**Direct standards:** None displayed.

**Related verified standards:** CCSS.ELA-Literacy.W.6.3, CCSS.ELA-Literacy.W.7.3, CCSS.ELA-Literacy.W.8.3

**Massachusetts:** Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.

#### Sentence Formulation

**Suggested objective:** The student will formulate clear, complete, organized spoken or written narrative sentences that preserve the intended idea with decreasing support.

**At this level:** Increase independence in formulating clear, complete narrative sentences that preserve the intended idea. The current product does not contain a comprehensive older-student syntax or sentence-combining hierarchy.

**Research synthesis:** Older students can continue to receive narrative/discourse intervention addressing language formulation. Story Builder currently targets clear complete narrative sentences, not a comprehensive older-student syntax or sentence-combining program.

**Product/evidence status:** Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.

**Direct standards:** None displayed.

**Related verified standards:** CCSS.ELA-Literacy.W.6.3, CCSS.ELA-Literacy.W.7.3, CCSS.ELA-Literacy.W.8.3

**Massachusetts:** Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.

#### Elaboration

**Suggested objective:** The student will independently select useful, listener-relevant information that clarifies or develops important story ideas or events.

**At this level:** Increase independence in selecting useful details that clarify/develop the story. Story Builder does not currently teach dialogue, pacing, reflection, or literary craft as dedicated targets.

**Research synthesis:** Older students may continue to benefit from narrative intervention, but the evidence does not require literary-craft instruction as a clinical target. Story Builder's current elaboration target remains useful, listener-relevant information tied to the story.

**Product/evidence status:** Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.

**Direct standards:** None displayed.

**Related verified standards:** CCSS.ELA-Literacy.W.6.3, CCSS.ELA-Literacy.W.7.3, CCSS.ELA-Literacy.W.8.3

**Massachusetts:** Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.

#### Perspective & Internal State

**Suggested objective:** The student will explain relevant character internal states and connect them to story events/actions with increasing specificity and independence.

**At this level:** Increase independence and specificity in explaining internal states across the current story parts. Do not imply a dedicated two-character comparison, false-belief, or perspective-change curriculum.

**Research synthesis:** School-age narrative/discourse evidence supports work with internal-state and mental-state language. This supports Story Builder's current character-focused prompts without implying a dedicated multi-character perspective or false-belief curriculum.

**Product/evidence status:** Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.

**Direct standards:** None displayed.

**Related verified standards:** CCSS.ELA-Literacy.W.6.3, CCSS.ELA-Literacy.W.7.3, CCSS.ELA-Literacy.W.8.3

**Massachusetts:** Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.

#### Vocabulary Precision

**Suggested objective:** The student will independently select specific words that best fit the intended narrative meaning and reintegrate them into connected story language.

**At this level:** Increase independence and specificity within the current semantic-fit prompts. Do not imply dedicated instruction in connotation, register, tone, or broad decontextualized vocabulary.

**Research synthesis:** Secondary narrative/vocabulary intervention evidence supports narrative-language work, while broad vocabulary gains should not be assumed. Story Builder's current target is precise semantic fit within the narrative, not broad decontextualized vocabulary instruction.

**Product/evidence status:** Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.

**Direct standards:** None displayed.

**Related verified standards:** CCSS.ELA-Literacy.W.6.3, CCSS.ELA-Literacy.W.7.3, CCSS.ELA-Literacy.W.8.3

**Massachusetts:** Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.
