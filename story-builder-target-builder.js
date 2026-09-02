"use strict";

(function () {
  const DATA = {
  "grades": {
    "2-3": "Grades 2–3",
    "4-5": "Grades 4–5",
    "6-8": "Grades 6–8"
  },
  "targets": {
    "organization": {
      "label": "Story Organization",
      "short": "Story Organization",
      "icon": "🧭",
      "description": "Organize the important story parts so the story is easy to follow.",
      "clinical": "Organize the important parts of the story into a coherent narrative: who/where → problem and feeling → plan → action/attempt → resolution.",
      "teaching": [
        "Listen for a missing or misplaced story function.",
        "Work on the selected story part: character, setting, problem, feeling, plan, action/attempt, or resolution.",
        "Retry the same story part and reconnect the repaired idea to the surrounding story."
      ],
      "monitor": [
        "Whether important story functions are present and logically connected",
        "Whether the plan grows from the problem/feeling",
        "Whether the action/attempt carries out the plan",
        "Whether the ending follows from the attempt and resolves the problem"
      ],
      "transfer": [
        "Whether the repaired story organization appears in Tell Again",
        "Whether the student maintains the organization with targeted help closed",
        "Whether the Planner is available or hidden during Tell Again"
      ],
      "in_story_builder": [
        "Begins with the student’s complete story during First Tell.",
        "Focuses prompts on the selected story function only when needed.",
        "Uses same-demand Retry after support.",
        "Reconnects the repaired story part to the whole story during Tell Again."
      ],
      "built_in_supports": [
        "Question prompt",
        "Story reminder",
        "Sentence starter"
      ]
    },
    "cohesion": {
      "label": "Connections & Cohesion",
      "short": "Connections & Cohesion",
      "icon": "🔗",
      "description": "Make relationships among story ideas and events clear enough for the listener to follow.",
      "clinical": "Connect ideas and events rather than produce isolated statements, using clear relationships, sequencing, connectors, and referents.",
      "teaching": [
        "Listen for story ideas that are present but not clearly connected.",
        "Use the current Story Builder prompts to clarify the relationship between the selected story parts.",
        "Retry the same ideas so the connection is clearer, then reconnect them to the story."
      ],
      "monitor": [
        "Whether the relationship between ideas/events is clear",
        "Whether sequencing/connectors fit the intended meaning",
        "Whether referents are clear enough for the listener to follow",
        "Whether the student can reconnect the repaired ideas to the story"
      ],
      "transfer": [
        "Whether repaired connections remain clear in Tell Again",
        "Whether targeted connector/help is no longer needed during Tell Again",
        "Whether the Planner is available or hidden during Tell Again"
      ],
      "in_story_builder": [
        "Uses the student’s own story ideas across Story Planner categories.",
        "Provides target-specific prompts and connecting words only when needed.",
        "Uses same-demand Retry after support.",
        "Reconnects clearer relationships to the whole story during Tell Again."
      ],
      "built_in_supports": [
        "Question prompt",
        "Connecting words",
        "Sentence starter"
      ]
    },
    "cause": {
      "label": "Cause & Effect",
      "short": "Cause & Effect",
      "icon": "➡️",
      "description": "Make important why/result relationships in the story clear.",
      "clinical": "Explain why important events or feelings occur, how the problem and feeling lead to a plan, and what happens because of the character’s attempt.",
      "teaching": [
        "Identify the current story relationship whose cause or result is unclear.",
        "Use the built-in problem/feeling/plan/attempt/item/resolution prompts to make the relationship explicit.",
        "Retry the same causal relationship and reconnect it to the story."
      ],
      "monitor": [
        "Whether the cause/result relationship fits the story",
        "Whether the student explains why a feeling, plan, or action occurs when needed",
        "Whether the attempt is connected to an outcome/resolution",
        "Whether causal language supports rather than replaces the reasoning"
      ],
      "transfer": [
        "Whether the repaired causal relationship appears in Tell Again",
        "Whether the student expresses the relationship with targeted help closed",
        "Whether the Planner is available or hidden during Tell Again"
      ],
      "in_story_builder": [
        "Uses the student’s own problem, feeling, plan, attempt, item, and resolution ideas.",
        "Provides causal prompts and connecting words only when needed.",
        "Uses same-demand Retry after support.",
        "Reconnects the clarified cause-and-effect relationship to the whole story during Tell Again."
      ],
      "built_in_supports": [
        "Question prompt",
        "Connecting words",
        "Sentence starter"
      ]
    },
    "sentence": {
      "label": "Sentence Formulation",
      "short": "Sentence Formulation",
      "icon": "💬",
      "description": "Say or write the intended story idea in a clear, complete sentence.",
      "clinical": "Turn an intended idea into a complete, organized spoken or written sentence.",
      "teaching": [
        "Keep the student’s intended story idea.",
        "Have the student say the idea aloud and identify the one main idea.",
        "Use the current Who? → did what? → what/whom? → where/why? reminder or a story-part sentence starter, then retry the same idea."
      ],
      "monitor": [
        "Whether the intended idea is expressed in a complete, organized sentence",
        "Whether important sentence information is missing",
        "Whether support preserves rather than replaces the student’s intended idea",
        "Whether the same idea can be retried with less support"
      ],
      "transfer": [
        "Whether clearer sentence formulation appears in Tell Again",
        "Whether the student formulates complete narrative sentences with targeted help closed",
        "Whether the Planner is available or hidden during Tell Again"
      ],
      "in_story_builder": [
        "Uses the student’s own intended story idea.",
        "Provides the Who? → did what? → what or whom? → where or why? reminder and sentence starters only when needed.",
        "Uses same-demand Retry after support.",
        "Reconnects the clearer sentence to the whole story during Tell Again."
      ],
      "built_in_supports": [
        "Question prompt",
        "Sentence reminder",
        "Sentence starter"
      ]
    },
    "elaboration": {
      "label": "Elaboration",
      "short": "Elaboration",
      "icon": "✨",
      "description": "Add a useful detail that helps the listener understand or picture an important story part.",
      "clinical": "Add useful information that clarifies or develops an important story idea or event.",
      "teaching": [
        "Choose one important story idea that needs more information.",
        "Use the story-part-specific question to add one useful detail.",
        "Retry the same idea with the detail added and reconnect it to the story."
      ],
      "monitor": [
        "Whether the added detail is relevant to the selected story idea",
        "Whether it clarifies or develops the story",
        "Whether extra information becomes unrelated",
        "Whether the student can add a useful detail with less support"
      ],
      "transfer": [
        "Whether useful elaboration appears in Tell Again",
        "Whether added details remain relevant in the complete story",
        "Whether the Planner is available or hidden during Tell Again"
      ],
      "in_story_builder": [
        "Uses the student’s own important story idea.",
        "Prompts for one useful, relevant detail only when needed.",
        "Uses same-demand Retry after support.",
        "Reconnects the elaborated idea to the whole story during Tell Again."
      ],
      "built_in_supports": [
        "Question prompt",
        "Detail reminder",
        "Sentence starter"
      ]
    },
    "perspective": {
      "label": "Perspective & Internal State",
      "short": "Perspective & Internal State",
      "icon": "🧠",
      "description": "Help the listener understand what the character thinks, feels, knows, wants, or expects.",
      "clinical": "Explain what characters feel, think, know, want, expect, wonder, or intend and connect those ideas to story events when appropriate.",
      "teaching": [
        "Identify the relevant thought, feeling, knowledge, want, expectation, wonder, or intention.",
        "Use the current story-part question and mental-state words to connect the internal state to the story event/action.",
        "Retry the same story part with the internal-state information included."
      ],
      "monitor": [
        "Whether internal-state language fits the character and event",
        "Whether the internal state is connected to what happens or what the character does",
        "Whether actions are explained only when the story supports the interpretation",
        "Whether the student can use internal-state language with less support"
      ],
      "transfer": [
        "Whether relevant internal-state language appears in Tell Again",
        "Whether the relationship between internal state and event/action remains clear",
        "Whether the Planner is available or hidden during Tell Again"
      ],
      "in_story_builder": [
        "Uses the student’s own character and story-event ideas.",
        "Provides mental-state prompts and words to try only when needed.",
        "Uses same-demand Retry after support.",
        "Reconnects the character’s internal state to the whole story during Tell Again."
      ],
      "built_in_supports": [
        "Question prompt",
        "Words to try",
        "Sentence starter"
      ]
    },
    "vocabulary": {
      "label": "Vocabulary Precision",
      "short": "Vocabulary Precision",
      "icon": "🎯",
      "description": "Choose a more specific known word that better communicates the intended story meaning.",
      "clinical": "Choose words that communicate the intended meaning more specifically.",
      "teaching": [
        "Find one word that is too general or repeated.",
        "Use the current prompts: How? What kind? How strong? What exactly happened?",
        "Choose the word that best fits the intended meaning and put it back into the whole sentence/story idea."
      ],
      "monitor": [
        "Whether the selected word is more specific and semantically appropriate",
        "Whether the word matches the student’s intended meaning",
        "Whether the student can reintegrate the word into the whole sentence/story idea",
        "Whether precision improves without changing the intended story content"
      ],
      "transfer": [
        "Whether the more precise word is retained in Tell Again",
        "Whether the student selects specific words with targeted help closed",
        "Whether the Planner is available or hidden during Tell Again"
      ],
      "in_story_builder": [
        "Uses the student’s own intended story meaning.",
        "Prompts with How? What kind? How strong? and What exactly happened? only when needed.",
        "Uses same-demand Retry after support.",
        "Reconnects the more precise word to the whole sentence and story during Tell Again."
      ],
      "built_in_supports": [
        "Question prompt",
        "Word reminder",
        "Sentence starter"
      ]
    }
  },
  "objectives": {
    "2-3": {
      "organization": "The student will organize the important parts of a story into a coherent narrative, including the character/setting, problem and feeling, plan, action/attempt, and resolution as relevant.",
      "cohesion": "The student will connect story ideas and events using clear relationships, sequencing, connectors, and referents so the listener can follow the narrative.",
      "cause": "The student will explain why important events or feelings occur, how the problem and feeling lead to a plan, and what happens because of the character’s attempt.",
      "sentence": "The student will turn an intended story idea into a complete, organized spoken or written sentence.",
      "elaboration": "The student will add useful information that clarifies or develops an important story idea or event.",
      "perspective": "The student will explain what a character feels, thinks, knows, wants, expects, wonders, or intends and connect that information to story events when appropriate.",
      "vocabulary": "The student will choose words that communicate the intended story meaning more specifically."
    },
    "4-5": {
      "organization": "The student will organize the important story functions into a coherent narrative and make the relationships among the problem/feeling, plan, action/attempt, and resolution increasingly clear.",
      "cohesion": "The student will connect story ideas and events consistently using clear relationships, sequencing, connectors, and referents.",
      "cause": "The student will make important causal relationships explicit by explaining why events or feelings occur, how the problem and feeling lead to a plan, and what happens because of the attempt.",
      "sentence": "The student will formulate complete, organized spoken or written sentences that preserve and clearly express the intended narrative idea.",
      "elaboration": "The student will select and add useful information that clarifies or develops important story ideas or events without adding unrelated detail.",
      "perspective": "The student will explain relevant character thoughts, feelings, knowledge, wants, expectations, wonders, or intentions and connect them to story events and actions.",
      "vocabulary": "The student will select more specific words that fit the intended narrative meaning and use them in the whole sentence or story idea."
    },
    "6-8": {
      "organization": "The student will independently organize and connect important story functions into a coherent narrative with decreasing support.",
      "cohesion": "The student will maintain clear relationships among story ideas and events using sequencing, connectors, and clear referents with decreasing support.",
      "cause": "The student will explain the important causal relationships supported by the story, including why events or feelings occur and how plans, attempts, and outcomes relate, with decreasing support.",
      "sentence": "The student will formulate clear, complete, organized spoken or written narrative sentences that preserve the intended idea with decreasing support.",
      "elaboration": "The student will independently select useful, listener-relevant information that clarifies or develops important story ideas or events.",
      "perspective": "The student will explain relevant character internal states and connect them to story events/actions with increasing specificity and independence.",
      "vocabulary": "The student will independently select specific words that best fit the intended narrative meaning and reintegrate them into connected story language."
    }
  },
  "developmental": {
    "2-3": {
      "organization": "Emphasize concrete, visible relationships among character/setting, problem/feeling, plan, attempt, and resolution. Support may be explicit while the student learns to reconnect repaired parts to the whole story.",
      "cohesion": "Emphasize clear nearby relationships among story ideas using connector and sentence-support options as needed.",
      "cause": "Emphasize the current supported relationships: problem/event → feeling, problem/feeling → plan, plan → attempt, and attempt → outcome/resolution. Keep the focus on one relationship at a time when needed.",
      "sentence": "Emphasize expressing one intended story idea in a complete, organized sentence using oral rehearsal, the current sentence reminder, and story-part sentence starters when needed.",
      "elaboration": "Emphasize adding one useful detail that clarifies or develops the selected story part. Relevance matters more than quantity.",
      "perspective": "Emphasize basic character feelings, thoughts, knowledge, wants, expectations, or intentions and their relationship to the current story event.",
      "vocabulary": "Emphasize replacing very general/repeated words with a more specific known word that fits the intended meaning, then reintegrating it into the sentence/story idea."
    },
    "4-5": {
      "organization": "Expect clearer integration among problem/feeling, plan, attempt, and resolution, with less support for maintaining the whole sequence.",
      "cohesion": "Expect increasingly consistent use of sequencing, connectors, and clear referents across the story.",
      "cause": "Expect clearer and more independent explanation of causal relationships across problem, feeling, plan, attempt, and resolution.",
      "sentence": "Expect clearer, more independent formulation of the student’s intended sentence using the one-main-idea reminder and sentence starters as needed.",
      "elaboration": "Expect students to choose details that are useful for understanding the selected story part and to avoid unrelated additions, with reduced prompting.",
      "perspective": "Expect more explicit links between relevant internal states and what the character does or experiences, using the current mental-state prompts/word supports.",
      "vocabulary": "Expect more consistent selection of specific words for character, setting, problem, feeling, plan, attempt, item use, and resolution while preserving the intended meaning."
    },
    "6-8": {
      "organization": "Increase independence and coherence while working with the core story relationships supported in Story Builder.",
      "cohesion": "Increase independence in making story relationships, sequencing, connectors, and referents clear across the complete narrative.",
      "cause": "Increase independence and precision in explaining causal relationships among problems, feelings, plans, attempts, and outcomes.",
      "sentence": "Increase independence in formulating clear, complete narrative sentences that preserve the intended idea.",
      "elaboration": "Increase independence in selecting useful details that clarify or develop important story ideas.",
      "perspective": "Increase independence and specificity in explaining internal states across the core story parts.",
      "vocabulary": "Increase independence and specificity when choosing words that fit the intended story meaning."
    }
  },
  "standards": {
    "2-3": {
      "organization": {
        "summary": "Verified grade-level narrative-writing standards are relevant to narrative production, but Story Builder's clinical/oral-written narrative-language target is more specific than the standard itself.",
        "direct": [],
        "related": [
          "CCSS.ELA-Literacy.W.2.3",
          "CCSS.ELA-Literacy.W.3.3"
        ],
        "massachusetts": "Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.",
        "note": "Exact codes are shown only when verified. Direct may be empty. Related standards are not presented as one-to-one clinical targets. Standards alignment establishes instructional relevance, not efficacy for First Volo Story Builder."
      },
      "cohesion": {
        "summary": "Verified grade-level narrative-writing standards are relevant to narrative production, but Story Builder's clinical/oral-written narrative-language target is more specific than the standard itself.",
        "direct": [],
        "related": [
          "CCSS.ELA-Literacy.W.2.3",
          "CCSS.ELA-Literacy.W.3.3"
        ],
        "massachusetts": "Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.",
        "note": "Exact codes are shown only when verified. Direct may be empty. Related standards are not presented as one-to-one clinical targets. Standards alignment establishes instructional relevance, not efficacy for First Volo Story Builder."
      },
      "cause": {
        "summary": "Verified grade-level narrative-writing standards are relevant to narrative production, but Story Builder's clinical/oral-written narrative-language target is more specific than the standard itself.",
        "direct": [],
        "related": [
          "CCSS.ELA-Literacy.W.2.3",
          "CCSS.ELA-Literacy.W.3.3"
        ],
        "massachusetts": "Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.",
        "note": "Exact codes are shown only when verified. Direct may be empty. Related standards are not presented as one-to-one clinical targets. Standards alignment establishes instructional relevance, not efficacy for First Volo Story Builder."
      },
      "sentence": {
        "summary": "Verified grade-level narrative-writing standards are relevant to narrative production, but Story Builder's clinical/oral-written narrative-language target is more specific than the standard itself.",
        "direct": [],
        "related": [
          "CCSS.ELA-Literacy.W.2.3",
          "CCSS.ELA-Literacy.W.3.3"
        ],
        "massachusetts": "Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.",
        "note": "Exact codes are shown only when verified. Direct may be empty. Related standards are not presented as one-to-one clinical targets. Standards alignment establishes instructional relevance, not efficacy for First Volo Story Builder."
      },
      "elaboration": {
        "summary": "Verified grade-level narrative-writing standards are relevant to narrative production, but Story Builder's clinical/oral-written narrative-language target is more specific than the standard itself.",
        "direct": [],
        "related": [
          "CCSS.ELA-Literacy.W.2.3",
          "CCSS.ELA-Literacy.W.3.3"
        ],
        "massachusetts": "Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.",
        "note": "Exact codes are shown only when verified. Direct may be empty. Related standards are not presented as one-to-one clinical targets. Standards alignment establishes instructional relevance, not efficacy for First Volo Story Builder."
      },
      "perspective": {
        "summary": "Verified grade-level narrative-writing standards are relevant to narrative production, but Story Builder's clinical/oral-written narrative-language target is more specific than the standard itself.",
        "direct": [],
        "related": [
          "CCSS.ELA-Literacy.W.2.3",
          "CCSS.ELA-Literacy.W.3.3"
        ],
        "massachusetts": "Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.",
        "note": "Exact codes are shown only when verified. Direct may be empty. Related standards are not presented as one-to-one clinical targets. Standards alignment establishes instructional relevance, not efficacy for First Volo Story Builder."
      },
      "vocabulary": {
        "summary": "Verified grade-level narrative-writing standards are relevant to narrative production, but Story Builder's clinical/oral-written narrative-language target is more specific than the standard itself.",
        "direct": [],
        "related": [
          "CCSS.ELA-Literacy.W.2.3",
          "CCSS.ELA-Literacy.W.3.3"
        ],
        "massachusetts": "Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.",
        "note": "Exact codes are shown only when verified. Direct may be empty. Related standards are not presented as one-to-one clinical targets. Standards alignment establishes instructional relevance, not efficacy for First Volo Story Builder."
      }
    },
    "4-5": {
      "organization": {
        "summary": "Verified grade-level narrative-writing standards are relevant to narrative production, but Story Builder's clinical/oral-written narrative-language target is more specific than the standard itself.",
        "direct": [],
        "related": [
          "CCSS.ELA-Literacy.W.4.3",
          "CCSS.ELA-Literacy.W.5.3"
        ],
        "massachusetts": "Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.",
        "note": "Exact codes are shown only when verified. Direct may be empty. Related standards are not presented as one-to-one clinical targets. Standards alignment establishes instructional relevance, not efficacy for First Volo Story Builder."
      },
      "cohesion": {
        "summary": "Verified grade-level narrative-writing standards are relevant to narrative production, but Story Builder's clinical/oral-written narrative-language target is more specific than the standard itself.",
        "direct": [],
        "related": [
          "CCSS.ELA-Literacy.W.4.3",
          "CCSS.ELA-Literacy.W.5.3"
        ],
        "massachusetts": "Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.",
        "note": "Exact codes are shown only when verified. Direct may be empty. Related standards are not presented as one-to-one clinical targets. Standards alignment establishes instructional relevance, not efficacy for First Volo Story Builder."
      },
      "cause": {
        "summary": "Verified grade-level narrative-writing standards are relevant to narrative production, but Story Builder's clinical/oral-written narrative-language target is more specific than the standard itself.",
        "direct": [],
        "related": [
          "CCSS.ELA-Literacy.W.4.3",
          "CCSS.ELA-Literacy.W.5.3"
        ],
        "massachusetts": "Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.",
        "note": "Exact codes are shown only when verified. Direct may be empty. Related standards are not presented as one-to-one clinical targets. Standards alignment establishes instructional relevance, not efficacy for First Volo Story Builder."
      },
      "sentence": {
        "summary": "Verified grade-level narrative-writing standards are relevant to narrative production, but Story Builder's clinical/oral-written narrative-language target is more specific than the standard itself.",
        "direct": [],
        "related": [
          "CCSS.ELA-Literacy.W.4.3",
          "CCSS.ELA-Literacy.W.5.3"
        ],
        "massachusetts": "Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.",
        "note": "Exact codes are shown only when verified. Direct may be empty. Related standards are not presented as one-to-one clinical targets. Standards alignment establishes instructional relevance, not efficacy for First Volo Story Builder."
      },
      "elaboration": {
        "summary": "Verified grade-level narrative-writing standards are relevant to narrative production, but Story Builder's clinical/oral-written narrative-language target is more specific than the standard itself.",
        "direct": [],
        "related": [
          "CCSS.ELA-Literacy.W.4.3",
          "CCSS.ELA-Literacy.W.5.3"
        ],
        "massachusetts": "Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.",
        "note": "Exact codes are shown only when verified. Direct may be empty. Related standards are not presented as one-to-one clinical targets. Standards alignment establishes instructional relevance, not efficacy for First Volo Story Builder."
      },
      "perspective": {
        "summary": "Verified grade-level narrative-writing standards are relevant to narrative production, but Story Builder's clinical/oral-written narrative-language target is more specific than the standard itself.",
        "direct": [],
        "related": [
          "CCSS.ELA-Literacy.W.4.3",
          "CCSS.ELA-Literacy.W.5.3"
        ],
        "massachusetts": "Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.",
        "note": "Exact codes are shown only when verified. Direct may be empty. Related standards are not presented as one-to-one clinical targets. Standards alignment establishes instructional relevance, not efficacy for First Volo Story Builder."
      },
      "vocabulary": {
        "summary": "Verified grade-level narrative-writing standards are relevant to narrative production, but Story Builder's clinical/oral-written narrative-language target is more specific than the standard itself.",
        "direct": [],
        "related": [
          "CCSS.ELA-Literacy.W.4.3",
          "CCSS.ELA-Literacy.W.5.3"
        ],
        "massachusetts": "Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.",
        "note": "Exact codes are shown only when verified. Direct may be empty. Related standards are not presented as one-to-one clinical targets. Standards alignment establishes instructional relevance, not efficacy for First Volo Story Builder."
      }
    },
    "6-8": {
      "organization": {
        "summary": "Verified grade-level narrative-writing standards are relevant to narrative production, but Story Builder's clinical/oral-written narrative-language target is more specific than the standard itself.",
        "direct": [],
        "related": [
          "CCSS.ELA-Literacy.W.6.3",
          "CCSS.ELA-Literacy.W.7.3",
          "CCSS.ELA-Literacy.W.8.3"
        ],
        "massachusetts": "Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.",
        "note": "Exact codes are shown only when verified. Direct may be empty. Related standards are not presented as one-to-one clinical targets. Standards alignment establishes instructional relevance, not efficacy for First Volo Story Builder."
      },
      "cohesion": {
        "summary": "Verified grade-level narrative-writing standards are relevant to narrative production, but Story Builder's clinical/oral-written narrative-language target is more specific than the standard itself.",
        "direct": [],
        "related": [
          "CCSS.ELA-Literacy.W.6.3",
          "CCSS.ELA-Literacy.W.7.3",
          "CCSS.ELA-Literacy.W.8.3"
        ],
        "massachusetts": "Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.",
        "note": "Exact codes are shown only when verified. Direct may be empty. Related standards are not presented as one-to-one clinical targets. Standards alignment establishes instructional relevance, not efficacy for First Volo Story Builder."
      },
      "cause": {
        "summary": "Verified grade-level narrative-writing standards are relevant to narrative production, but Story Builder's clinical/oral-written narrative-language target is more specific than the standard itself.",
        "direct": [],
        "related": [
          "CCSS.ELA-Literacy.W.6.3",
          "CCSS.ELA-Literacy.W.7.3",
          "CCSS.ELA-Literacy.W.8.3"
        ],
        "massachusetts": "Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.",
        "note": "Exact codes are shown only when verified. Direct may be empty. Related standards are not presented as one-to-one clinical targets. Standards alignment establishes instructional relevance, not efficacy for First Volo Story Builder."
      },
      "sentence": {
        "summary": "Verified grade-level narrative-writing standards are relevant to narrative production, but Story Builder's clinical/oral-written narrative-language target is more specific than the standard itself.",
        "direct": [],
        "related": [
          "CCSS.ELA-Literacy.W.6.3",
          "CCSS.ELA-Literacy.W.7.3",
          "CCSS.ELA-Literacy.W.8.3"
        ],
        "massachusetts": "Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.",
        "note": "Exact codes are shown only when verified. Direct may be empty. Related standards are not presented as one-to-one clinical targets. Standards alignment establishes instructional relevance, not efficacy for First Volo Story Builder."
      },
      "elaboration": {
        "summary": "Verified grade-level narrative-writing standards are relevant to narrative production, but Story Builder's clinical/oral-written narrative-language target is more specific than the standard itself.",
        "direct": [],
        "related": [
          "CCSS.ELA-Literacy.W.6.3",
          "CCSS.ELA-Literacy.W.7.3",
          "CCSS.ELA-Literacy.W.8.3"
        ],
        "massachusetts": "Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.",
        "note": "Exact codes are shown only when verified. Direct may be empty. Related standards are not presented as one-to-one clinical targets. Standards alignment establishes instructional relevance, not efficacy for First Volo Story Builder."
      },
      "perspective": {
        "summary": "Verified grade-level narrative-writing standards are relevant to narrative production, but Story Builder's clinical/oral-written narrative-language target is more specific than the standard itself.",
        "direct": [],
        "related": [
          "CCSS.ELA-Literacy.W.6.3",
          "CCSS.ELA-Literacy.W.7.3",
          "CCSS.ELA-Literacy.W.8.3"
        ],
        "massachusetts": "Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.",
        "note": "Exact codes are shown only when verified. Direct may be empty. Related standards are not presented as one-to-one clinical targets. Standards alignment establishes instructional relevance, not efficacy for First Volo Story Builder."
      },
      "vocabulary": {
        "summary": "Verified grade-level narrative-writing standards are relevant to narrative production, but Story Builder's clinical/oral-written narrative-language target is more specific than the standard itself.",
        "direct": [],
        "related": [
          "CCSS.ELA-Literacy.W.6.3",
          "CCSS.ELA-Literacy.W.7.3",
          "CCSS.ELA-Literacy.W.8.3"
        ],
        "massachusetts": "Massachusetts alignment: crosswalk in development. No exact Massachusetts code is displayed unless the exact grade-and-target match has been separately verified.",
        "note": "Exact codes are shown only when verified. Direct may be empty. Related standards are not presented as one-to-one clinical targets. Standards alignment establishes instructional relevance, not efficacy for First Volo Story Builder."
      }
    }
  },
  "sources": {
    "pico2021": {
      "citation": "Pico, D. L., et al. (2021). Interventions Designed to Improve Narrative Language in School-Age Children: A Systematic Review With Meta-Analyses.",
      "type": "Systematic review/meta-analysis",
      "relevance": "Broad school-age narrative intervention evidence; includes narrative production/comprehension outcomes and common intervention features such as narrative production opportunities, verbal/visual supports, and story-grammar instruction.",
      "limitation": "Broad synthesis; does not validate Story Builder or every target/grade combination individually."
    },
    "spencer2020": {
      "citation": "Spencer, T. D., & Petersen, D. B. (2020). Narrative Intervention: Principles to Practice.",
      "type": "Clinical tutorial/practice guidance",
      "relevance": "Supports whole-narrative work, targeted story parts, reconstruction, complex language, vocabulary, and inferencing within narrative intervention.",
      "limitation": "Practice/tutorial guidance; not direct efficacy evidence for First Volo Story Builder."
    },
    "hessling2020": {
      "citation": "Hessling, A., & Schuele, C. M. (2020). Individualized narrative intervention with second graders.",
      "type": "Intervention study",
      "relevance": "Directly relevant to younger elementary narrative intervention, individualized support, visual/verbal scaffolding, and fading.",
      "limitation": "Small, younger-grade intervention evidence; should not be generalized as proof of older-grade effects."
    },
    "gillam2025": {
      "citation": "Gillam, S. L., et al. (2025). SKILL multisite narrative intervention research, Grades 1–4.",
      "type": "Intervention/impact study",
      "relevance": "Relevant to younger elementary story structure, connecting/elaborating narrative language, and increasing independence.",
      "limitation": "Grades 1–4 evidence; older-grade application requires cautious extrapolation."
    },
    "gillam2015": {
      "citation": "Gillam, S. L., et al. (2015). Narrative intervention targeting causal and mental-state language in children ages 8–12 with ASD.",
      "type": "Intervention study — population-specific",
      "relevance": "Relevant to causal language and mental/internal-state language for school-age children.",
      "limitation": "Population-specific ASD evidence; not general evidence for all students or all narrative targets."
    },
    "peterson2020": {
      "citation": "Peterson, D. B., Fox, C., & Israelsen, M. (2020). Discourse intervention evidence for ages 9–14.",
      "type": "Review",
      "relevance": "Relevant to later-elementary/middle-grade discourse intervention and the need to measure generalization/transfer rather than assume it.",
      "limitation": "Review-level and age-bounded evidence; target-specific effects vary."
    },
    "joffe2019": {
      "citation": "Joffe, V. L., Rixon, L., & Hulme, C. (2019). Narrative/vocabulary intervention in secondary students with language disorder.",
      "type": "Randomized controlled intervention study",
      "relevance": "Direct secondary-school narrative intervention evidence and useful later-grade evidence for connected discourse work.",
      "limitation": "Language-disorder sample; narrative outcomes should not be generalized to all language/vocabulary outcomes. Standardized vocabulary effects were not significant."
    }
  },
  "evidence": {
    "2-3": {
      "organization": {
        "research": "Younger elementary narrative-intervention evidence supports explicit attention to story structure within complete narratives, with visual/verbal scaffolds and repeated opportunities to produce or reconstruct stories. This supports Story Builder's current core organization target; it does not establish one required story template for every child.",
        "sourceIds": [
          "gillam2025",
          "hessling2020",
          "pico2021",
          "spencer2020"
        ],
        "gradePopulationRelevance": "Younger-elementary relevance prioritized. Broader school-age syntheses are used where direct Grade 2–3 target-specific evidence is limited.",
        "claimStatus": "Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.",
        "requiredLimitation": "Do not present this mapping as direct efficacy evidence for First Volo Story Builder, a hard developmental grade cutoff, or evidence for product features that are not currently implemented."
      },
      "cohesion": {
        "research": "Narrative-intervention research and clinical guidance support helping younger students make relationships among story events and ideas clearer. The evidence is broader than Story Builder's exact connector/referent prompts, so the rationale supports the target without claiming that the current cohesion support sequence itself has been validated.",
        "sourceIds": [
          "gillam2025",
          "spencer2020",
          "pico2021"
        ],
        "gradePopulationRelevance": "Younger-elementary relevance prioritized. Broader school-age syntheses are used where direct Grade 2–3 target-specific evidence is limited.",
        "claimStatus": "Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.",
        "requiredLimitation": "Do not present this mapping as direct efficacy evidence for First Volo Story Builder, a hard developmental grade cutoff, or evidence for product features that are not currently implemented."
      },
      "cause": {
        "research": "School-age narrative intervention includes work on causal relationships among events, feelings, plans, actions, and outcomes. This supports Story Builder's current cause-and-effect target; it does not justify adding unsupported multi-step or counterfactual causal demands.",
        "sourceIds": [
          "gillam2025",
          "spencer2020",
          "pico2021"
        ],
        "gradePopulationRelevance": "Younger-elementary relevance prioritized. Broader school-age syntheses are used where direct Grade 2–3 target-specific evidence is limited.",
        "claimStatus": "Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.",
        "requiredLimitation": "Do not present this mapping as direct efficacy evidence for First Volo Story Builder, a hard developmental grade cutoff, or evidence for product features that are not currently implemented."
      },
      "sentence": {
        "research": "Narrative intervention can address the language used to express story ideas within connected discourse. Direct evidence for Story Builder's exact one-main-idea/sentence-starter sequence is limited, so the research supports sentence formulation as a narrative-language target rather than proving the current support sequence.",
        "sourceIds": [
          "spencer2020",
          "pico2021",
          "hessling2020"
        ],
        "gradePopulationRelevance": "Younger-elementary relevance prioritized. Broader school-age syntheses are used where direct Grade 2–3 target-specific evidence is limited.",
        "claimStatus": "Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.",
        "requiredLimitation": "Do not present this mapping as direct efficacy evidence for First Volo Story Builder, a hard developmental grade cutoff, or evidence for product features that are not currently implemented."
      },
      "elaboration": {
        "research": "Narrative intervention supports developing important story information with relevant detail. This is consistent with Story Builder's current emphasis on adding one useful detail to a selected story part rather than simply making the narrative longer.",
        "sourceIds": [
          "gillam2025",
          "spencer2020",
          "pico2021"
        ],
        "gradePopulationRelevance": "Younger-elementary relevance prioritized. Broader school-age syntheses are used where direct Grade 2–3 target-specific evidence is limited.",
        "claimStatus": "Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.",
        "requiredLimitation": "Do not present this mapping as direct efficacy evidence for First Volo Story Builder, a hard developmental grade cutoff, or evidence for product features that are not currently implemented."
      },
      "perspective": {
        "research": "School-age narrative intervention supports attention to mental/internal-state language as part of explaining characters and story events. This supports Story Builder's current internal-state target without implying advanced perspective modules that are not in the product.",
        "sourceIds": [
          "gillam2025",
          "spencer2020",
          "pico2021"
        ],
        "gradePopulationRelevance": "Younger-elementary relevance prioritized. Broader school-age syntheses are used where direct Grade 2–3 target-specific evidence is limited.",
        "claimStatus": "Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.",
        "requiredLimitation": "Do not present this mapping as direct efficacy evidence for First Volo Story Builder, a hard developmental grade cutoff, or evidence for product features that are not currently implemented."
      },
      "vocabulary": {
        "research": "Narrative intervention may include vocabulary support inside connected stories. This supports Story Builder's current goal of choosing a more specific word in context, but it should not be presented as evidence for a broad standalone vocabulary program.",
        "sourceIds": [
          "gillam2025",
          "spencer2020",
          "pico2021"
        ],
        "gradePopulationRelevance": "Younger-elementary relevance prioritized. Broader school-age syntheses are used where direct Grade 2–3 target-specific evidence is limited.",
        "claimStatus": "Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.",
        "requiredLimitation": "Do not present this mapping as direct efficacy evidence for First Volo Story Builder, a hard developmental grade cutoff, or evidence for product features that are not currently implemented."
      }
    },
    "4-5": {
      "organization": {
        "research": "School-age narrative-intervention evidence supports explicit story-structure work, repeated narrative production, and reconstruction with support fading. This supports continued work on Story Builder's existing core episode structure with increasing independence.",
        "sourceIds": [
          "gillam2025",
          "pico2021",
          "spencer2020",
          "peterson2020"
        ],
        "gradePopulationRelevance": "Later-elementary relevance prioritized. Evidence spanning Grades 1–4, ages 8–12, and ages 9–14 is labeled rather than treated as an exact grade match.",
        "claimStatus": "Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.",
        "requiredLimitation": "Do not present this mapping as direct efficacy evidence for First Volo Story Builder, a hard developmental grade cutoff, or evidence for product features that are not currently implemented."
      },
      "cohesion": {
        "research": "Later-elementary discourse and narrative-intervention evidence supports improving how story ideas and events are connected for a listener. This is consistent with Story Builder's current relationship, sequencing, connector, and referent target, while direct evidence for each specific built-in prompt remains limited.",
        "sourceIds": [
          "peterson2020",
          "spencer2020",
          "gillam2025"
        ],
        "gradePopulationRelevance": "Later-elementary relevance prioritized. Evidence spanning Grades 1–4, ages 8–12, and ages 9–14 is labeled rather than treated as an exact grade match.",
        "claimStatus": "Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.",
        "requiredLimitation": "Do not present this mapping as direct efficacy evidence for First Volo Story Builder, a hard developmental grade cutoff, or evidence for product features that are not currently implemented."
      },
      "cause": {
        "research": "School-age narrative intervention supports making causal relationships among events, motivations, actions, and consequences explicit. This supports Story Builder's current cause-and-effect relationships without requiring a separate advanced causal-chain curriculum.",
        "sourceIds": [
          "gillam2015",
          "gillam2025",
          "spencer2020",
          "peterson2020"
        ],
        "gradePopulationRelevance": "Later-elementary relevance prioritized. Evidence spanning Grades 1–4, ages 8–12, and ages 9–14 is labeled rather than treated as an exact grade match.",
        "claimStatus": "Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.",
        "requiredLimitation": "Do not present this mapping as direct efficacy evidence for First Volo Story Builder, a hard developmental grade cutoff, or evidence for product features that are not currently implemented."
      },
      "sentence": {
        "research": "Narrative-intervention guidance supports working on clear language formulation within complete narratives. Story Builder's current Sentence Formulation support focuses on one intended idea and a complete organized sentence; it should not be represented as a validated sentence-combining curriculum.",
        "sourceIds": [
          "spencer2020",
          "peterson2020",
          "pico2021"
        ],
        "gradePopulationRelevance": "Later-elementary relevance prioritized. Evidence spanning Grades 1–4, ages 8–12, and ages 9–14 is labeled rather than treated as an exact grade match.",
        "claimStatus": "Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.",
        "requiredLimitation": "Do not present this mapping as direct efficacy evidence for First Volo Story Builder, a hard developmental grade cutoff, or evidence for product features that are not currently implemented."
      },
      "elaboration": {
        "research": "Narrative intervention supports developing important story content with relevant information. This aligns with Story Builder's current useful-detail prompts and the distinction between relevant elaboration and unrelated extra information.",
        "sourceIds": [
          "gillam2025",
          "spencer2020",
          "peterson2020"
        ],
        "gradePopulationRelevance": "Later-elementary relevance prioritized. Evidence spanning Grades 1–4, ages 8–12, and ages 9–14 is labeled rather than treated as an exact grade match.",
        "claimStatus": "Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.",
        "requiredLimitation": "Do not present this mapping as direct efficacy evidence for First Volo Story Builder, a hard developmental grade cutoff, or evidence for product features that are not currently implemented."
      },
      "perspective": {
        "research": "School-age narrative intervention supports causal and mental-state language that helps explain character actions and events. This supports Story Builder's current internal-state prompts while exact grade-specific cutoffs and advanced perspective demands remain uncertain.",
        "sourceIds": [
          "gillam2015",
          "gillam2025",
          "spencer2020"
        ],
        "gradePopulationRelevance": "Later-elementary relevance prioritized. Evidence spanning Grades 1–4, ages 8–12, and ages 9–14 is labeled rather than treated as an exact grade match.",
        "claimStatus": "Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.",
        "requiredLimitation": "Do not present this mapping as direct efficacy evidence for First Volo Story Builder, a hard developmental grade cutoff, or evidence for product features that are not currently implemented."
      },
      "vocabulary": {
        "research": "Narrative intervention may support word learning and more precise language within discourse. Story Builder's current Vocabulary Precision target is appropriately narrow: choose a more specific known word that fits the intended story meaning and use it in context.",
        "sourceIds": [
          "gillam2025",
          "spencer2020",
          "peterson2020"
        ],
        "gradePopulationRelevance": "Later-elementary relevance prioritized. Evidence spanning Grades 1–4, ages 8–12, and ages 9–14 is labeled rather than treated as an exact grade match.",
        "claimStatus": "Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.",
        "requiredLimitation": "Do not present this mapping as direct efficacy evidence for First Volo Story Builder, a hard developmental grade cutoff, or evidence for product features that are not currently implemented."
      }
    },
    "6-8": {
      "organization": {
        "research": "Secondary and later-school-age discourse-intervention evidence supports continued narrative intervention beyond the early elementary grades. This supports using Story Builder's existing organization target with greater independence, not adding advanced plot architecture that the product does not currently teach.",
        "sourceIds": [
          "joffe2019",
          "peterson2020",
          "pico2021"
        ],
        "gradePopulationRelevance": "Later school-age/secondary relevance prioritized. Younger-elementary findings are not used as direct middle-school evidence.",
        "claimStatus": "Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.",
        "requiredLimitation": "Do not present this mapping as direct efficacy evidence for First Volo Story Builder, a hard developmental grade cutoff, or evidence for product features that are not currently implemented."
      },
      "cohesion": {
        "research": "Later-school-age discourse intervention supports continued work on connected narrative language and coherence. This supports Story Builder's current cohesion target, while the product does not claim a comprehensive advanced cohesion curriculum.",
        "sourceIds": [
          "peterson2020",
          "joffe2019",
          "spencer2020"
        ],
        "gradePopulationRelevance": "Later school-age/secondary relevance prioritized. Younger-elementary findings are not used as direct middle-school evidence.",
        "claimStatus": "Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.",
        "requiredLimitation": "Do not present this mapping as direct efficacy evidence for First Volo Story Builder, a hard developmental grade cutoff, or evidence for product features that are not currently implemented."
      },
      "cause": {
        "research": "Later-school-age narrative/discourse evidence supports work on causal coherence and relationships among motivations, actions, and outcomes. This supports Story Builder's current cause-and-effect target; more advanced causal reasoning should not be implied unless the product adds such supports.",
        "sourceIds": [
          "peterson2020",
          "gillam2015",
          "spencer2020"
        ],
        "gradePopulationRelevance": "Later school-age/secondary relevance prioritized. Younger-elementary findings are not used as direct middle-school evidence.",
        "claimStatus": "Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.",
        "requiredLimitation": "Do not present this mapping as direct efficacy evidence for First Volo Story Builder, a hard developmental grade cutoff, or evidence for product features that are not currently implemented."
      },
      "sentence": {
        "research": "Older students can continue to receive narrative/discourse intervention addressing language formulation. Story Builder currently targets clear complete narrative sentences, not a comprehensive older-student syntax or sentence-combining program.",
        "sourceIds": [
          "peterson2020",
          "joffe2019",
          "spencer2020"
        ],
        "gradePopulationRelevance": "Later school-age/secondary relevance prioritized. Younger-elementary findings are not used as direct middle-school evidence.",
        "claimStatus": "Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.",
        "requiredLimitation": "Do not present this mapping as direct efficacy evidence for First Volo Story Builder, a hard developmental grade cutoff, or evidence for product features that are not currently implemented."
      },
      "elaboration": {
        "research": "Older students may continue to benefit from narrative intervention, but the evidence does not require literary-craft instruction as a clinical target. Story Builder's current elaboration target remains useful, listener-relevant information tied to the story.",
        "sourceIds": [
          "peterson2020",
          "joffe2019",
          "spencer2020"
        ],
        "gradePopulationRelevance": "Later school-age/secondary relevance prioritized. Younger-elementary findings are not used as direct middle-school evidence.",
        "claimStatus": "Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.",
        "requiredLimitation": "Do not present this mapping as direct efficacy evidence for First Volo Story Builder, a hard developmental grade cutoff, or evidence for product features that are not currently implemented."
      },
      "perspective": {
        "research": "School-age narrative/discourse evidence supports work with internal-state and mental-state language. This supports Story Builder's current character-focused prompts without implying a dedicated multi-character perspective or false-belief curriculum.",
        "sourceIds": [
          "peterson2020",
          "gillam2015",
          "spencer2020"
        ],
        "gradePopulationRelevance": "Later school-age/secondary relevance prioritized. Younger-elementary findings are not used as direct middle-school evidence.",
        "claimStatus": "Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.",
        "requiredLimitation": "Do not present this mapping as direct efficacy evidence for First Volo Story Builder, a hard developmental grade cutoff, or evidence for product features that are not currently implemented."
      },
      "vocabulary": {
        "research": "Secondary narrative/vocabulary intervention evidence supports narrative-language work, while broad vocabulary gains should not be assumed. Story Builder's current target is precise semantic fit within the narrative, not broad decontextualized vocabulary instruction.",
        "sourceIds": [
          "joffe2019",
          "peterson2020",
          "spencer2020"
        ],
        "gradePopulationRelevance": "Later school-age/secondary relevance prioritized. Younger-elementary findings are not used as direct middle-school evidence.",
        "claimStatus": "Product-grounded and claim-bounded; final source-by-source full-text evidence verification pending.",
        "requiredLimitation": "Do not present this mapping as direct efficacy evidence for First Volo Story Builder, a hard developmental grade cutoff, or evidence for product features that are not currently implemented."
      }
    }
  },
  "accessSupports": [
    "Clarifying directions",
    "Helping the student navigate the Story Planner",
    "Helping locate the relevant story card",
    "Rereading a prompt",
    "Explaining a non-target word",
    "Story Planner reference when the educator allows it during Tell Again"
  ],
  "supportLevels": {
    "independent": {
      "label": "Independent",
      "condition": "No target-specific instructional prompts are provided.",
      "extra_target_supports": []
    },
    "program": {
      "label": "Story Builder supports available",
      "condition": "Built-in Story Builder target supports may be opened as needed after the student's attempt.",
      "extra_target_supports": [
        "Target/look-for",
        "Reminder/question/clue",
        "Choice of connectors, mental-state words, or vocabulary when relevant",
        "Sentence starter when relevant",
        "Same-demand Retry"
      ]
    },
    "teacher": {
      "label": "Teacher/SLP-guided support as needed",
      "condition": "Following an independent attempt, the educator provides the least target-specific support needed and has the student retry the same demand.",
      "extra_target_supports": [
        "Responsive verbal cue",
        "Guided question",
        "Clarification request",
        "Semantic cue or contrast",
        "Brief/scribed Planner note",
        "Recast/model when explicitly teaching"
      ]
    },
    "explicit": {
      "label": "Explicit teaching / high support",
      "condition": "The target is explicitly taught with visual/verbal modeling and guided practice before increasingly independent attempts.",
      "extra_target_supports": [
        "Explicit model/think-aloud",
        "Guided practice",
        "Target-specific visual/verbal scaffold",
        "Choice or sentence support as needed",
        "Same-demand Retry after teaching",
        "Planned fading of support"
      ]
    }
  },
  "educatorProgressiveSupport": [
    "Look here",
    "Think about it",
    "A clue",
    "Words to try",
    "Sentence start"
  ],
  "educatorAddedSupport": [
    "Responsive verbal cue or guided question",
    "Clarification request",
    "Brief or scribed Planner note",
    "Model/recast when explicitly teaching"
  ],
  "productGrounding": {
    "runtimeGradeDifferentiation": false,
    "gradeBandRole": "Educator-facing target/expectation calibration only. The current Story Builder runtime does not automatically change target prompts or support content by grade band.",
    "actualInAppPhases": [
      "First Tell",
      "Work on Target",
      "Tell Again"
    ],
    "targetSelection": "The educator chooses a Story Goal separately; Observe First is the default and the target may be chosen after First Tell or selected earlier when already known.",
    "plannerTellAgain": "The educator may allow Story Planner reference during Tell Again or hide it for an independent whole-story tell.",
    "educatorSupportSequence": [
      "Look here",
      "Think about it",
      "A clue",
      "Words to try",
      "Sentence start"
    ],
    "studentAttemptFirst": true,
    "sameDemandRetry": true,
    "scoring": "The instructional-support module intentionally does not score student performance."
  }
};

  const state = {
    grade: "2-3",
    target: "organization",
    support: "program",
    planner: "available",
    tab: "standards",
    observeFirst: false
  };

  const els = {
    gradeChoices: document.getElementById("gradeChoices"),
    targetChoices: document.getElementById("targetChoices"),
    observeFirstButton: document.getElementById("observeFirstButton"),
    supportSelect: document.getElementById("supportSelect"),
    whyPanel: document.getElementById("whyPanel"),
    resultTitle: document.getElementById("resultTitle"),
    observeResult: document.getElementById("observeResult"),
    targetResult: document.getElementById("targetResult"),
    objectiveText: document.getElementById("objectiveText"),
    conditionText: document.getElementById("conditionText"),
    developmentalText: document.getElementById("developmentalText"),
    teachingList: document.getElementById("teachingList"),
    accessSupportList: document.getElementById("accessSupportList"),
    targetSupportList: document.getElementById("targetSupportList"),
    educatorSupportList: document.getElementById("educatorSupportList"),
    monitorList: document.getElementById("monitorList"),
    transferList: document.getElementById("transferList"),
    criterionInput: document.getElementById("criterionInput"),
    samplingInput: document.getElementById("samplingInput"),
    iepText: document.getElementById("iepText"),
    copyIep: document.getElementById("copyIep"),
    copyObjective: document.getElementById("copyObjective"),
    copyObjectiveCondition: document.getElementById("copyObjectiveCondition"),
    copyEvidence: document.getElementById("copyEvidence")
  };

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function setPressed(container, attribute, value) {
    container.querySelectorAll("button").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset[attribute] === value));
    });
  }

  function renderTargetChoices() {
    els.targetChoices.innerHTML = "";
    Object.entries(DATA.targets).forEach(([id, target]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.target = id;
      button.setAttribute("aria-pressed", String(id === state.target && !state.observeFirst));
      button.innerHTML = `
        <span class="icon" aria-hidden="true">${escapeHtml(target.icon)}</span>
        <strong>${escapeHtml(target.label)}</strong>
        <small>${escapeHtml(target.description)}</small>
      `;
      els.targetChoices.append(button);
    });
  }

  function selectedStandard() {
    return DATA.standards[state.grade][state.target];
  }

  function selectedEvidence() {
    return DATA.evidence[state.grade][state.target];
  }

  function renderStandards() {
    const entry = selectedStandard();
    const direct = entry.direct.length
      ? `<ul>${entry.direct.map(code => `<li><code>${escapeHtml(code)}</code></li>`).join("")}</ul>`
      : `<p><em>No direct standard is displayed for this target.</em></p>`;
    const related = entry.related.length
      ? `<ul>${entry.related.map(code => `<li><code>${escapeHtml(code)}</code></li>`).join("")}</ul>`
      : `<p><em>No additional related standard is displayed.</em></p>`;

    return `
      <h3>Standards connection</h3>
      <p>${escapeHtml(entry.summary)}</p>
      <div class="standard-block">
        <span class="standard-tag">DIRECT</span>
        ${direct}
      </div>
      <div class="standard-block">
        <span class="standard-tag">RELATED</span>
        ${related}
      </div>
      <p class="note"><strong>Massachusetts:</strong> ${escapeHtml(entry.massachusetts)}</p>
      <p>${escapeHtml(entry.note)}</p>
    `;
  }

  function renderResearch() {
    const evidence = selectedEvidence();
    return `
      <h3>What research suggests for ${escapeHtml(DATA.targets[state.target].short)}</h3>
      <p>${escapeHtml(evidence.research)}</p>
      <p><strong>Grade/population relevance:</strong> ${escapeHtml(evidence.gradePopulationRelevance)}</p>
      <p class="note"><strong>Evidence note:</strong> These sources support the target and instructional rationale; they are not direct efficacy evidence for First Volo Story Builder.</p>
    `;
  }

  function renderSystem() {
    const target = DATA.targets[state.target];
    return `
      <h3>How Story Builder supports this target</h3>
      <ul>${target.in_story_builder.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      <p class="note"><strong>Instructional cycle:</strong> First Tell → Work on Target → Tell Again. The educator selects the Story Goal, and support is revealed progressively after the student’s first attempt.</p>
    `;
  }

  function renderSources() {
    const evidence = selectedEvidence();
    const cards = evidence.sourceIds.map((id) => {
      const source = DATA.sources[id];
      return `
        <article class="source-card">
          <div class="source-type">${escapeHtml(source.type)}</div>
          <strong>${escapeHtml(source.citation)}</strong>
          <p><strong>Why it is here:</strong> ${escapeHtml(source.relevance)}</p>
          <p><strong>Required limitation:</strong> ${escapeHtml(source.limitation)}</p>
        </article>
      `;
    }).join("");
    return `
      <h3>Sources for this selection</h3>
      <p>Sources are filtered for the selected grade band and target. Evidence types are shown so intervention studies, reviews, and practice guidance are not treated as equivalent.</p>
      ${cards}
      <p class="note">These sources support the target and instructional rationale; final source-by-source full-text verification is still pending.</p>
    `;
  }

  function renderWhy() {
    if (state.observeFirst) {
      els.whyPanel.innerHTML = `
        <h3>Observe First</h3>
        <p>Complete the First Tell before selecting a target. WHY content appears after one primary narrative-language target is selected.</p>
      `;
      return;
    }

    const renderers = {
      standards: renderStandards,
      research: renderResearch,
      system: renderSystem,
      sources: renderSources
    };
    els.whyPanel.innerHTML = renderers[state.tab]();
  }

  function plannerPhrase() {
    return state.planner === "available"
      ? "The Story Planner may remain available as an organizational/access scaffold; its availability does not by itself count as target-specific prompting."
      : "The Story Planner is hidden for this condition.";
  }

  function conditionText() {
    const level = DATA.supportLevels[state.support];
    return `${level.condition} ${plannerPhrase()}`;
  }

  function listInto(element, items) {
    element.innerHTML = "";
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      element.append(li);
    });
  }

  function builtInTargetSupports() {
    const target = DATA.targets[state.target];
    return target.built_in_supports;
  }

  function educatorAddedSupports() {
    return DATA.educatorAddedSupport;
  }

  function updateIep() {
    if (state.observeFirst) {
      els.iepText.textContent = "Select a narrative-language target before generating IEP-style wording.";
      els.copyIep.disabled = true;
      return;
    }
    const criterion = els.criterionInput.value.trim();
    const sampling = els.samplingInput.value.trim();
    if (!criterion) {
      els.iepText.textContent = "Add a criterion to generate IEP-style wording.";
      els.copyIep.disabled = true;
      return;
    }
    const base = DATA.objectives[state.grade][state.target].replace(/^The student will\s+/i, "").replace(/\.$/, "");
    const parts = [conditionText().replace(/\.$/, ""), `the student will ${base}`, criterion];
    if (sampling) parts.push(sampling);
    els.iepText.textContent = `${parts[0]}, ${parts.slice(1).join(" ")}.`;
    els.copyIep.disabled = false;
  }

  function renderResult() {
    if (state.observeFirst) {
      els.observeResult.classList.remove("hidden");
      els.targetResult.classList.add("hidden");
      els.resultTitle.textContent = "Observe First before choosing a target";
      updateIep();
      return;
    }

    els.observeResult.classList.add("hidden");
    els.targetResult.classList.remove("hidden");

    const target = DATA.targets[state.target];
    els.resultTitle.textContent = `${DATA.grades[state.grade]} · ${target.label}`;
    els.objectiveText.textContent = DATA.objectives[state.grade][state.target];
    els.conditionText.textContent = conditionText();
    els.developmentalText.textContent = DATA.developmental[state.grade][state.target];

    listInto(els.teachingList, target.teaching);
    listInto(els.accessSupportList, DATA.accessSupports);

    listInto(els.targetSupportList, builtInTargetSupports());
    listInto(els.educatorSupportList, educatorAddedSupports());

    listInto(
      els.monitorList,
      [...target.monitor,
       "Independent attempt versus supported response",
       "Same-demand Retry after support",
       "Whether support can be faded"]
    );

    listInto(
      els.transferList,
      [...target.transfer,
       `Planner during Retell: ${state.planner === "available" ? "available" : "hidden"}`,
       "Later/new narrative transfer if collected (not assumed)"]
    );

    updateIep();
  }

  function renderAll() {
    setPressed(els.gradeChoices, "grade", state.grade);
    renderTargetChoices();
    els.observeFirstButton.classList.toggle("active", state.observeFirst);
    els.supportSelect.value = state.support;
    document.querySelectorAll('input[name="planner"]').forEach((input) => {
      input.checked = input.value === state.planner;
    });
    renderWhy();
    renderResult();
  }

  async function copyText(text, button) {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.append(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    const original = button.textContent;
    button.textContent = "Copied";
    setTimeout(() => { button.textContent = original; }, 1200);
  }

  els.gradeChoices.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-grade]");
    if (!button) return;
    state.grade = button.dataset.grade;
    renderAll();
  });

  els.targetChoices.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-target]");
    if (!button) return;
    state.target = button.dataset.target;
    state.observeFirst = false;
    renderAll();
  });

  els.observeFirstButton.addEventListener("click", () => {
    state.observeFirst = true;
    renderAll();
  });

  els.supportSelect.addEventListener("change", () => {
    state.support = els.supportSelect.value;
    renderResult();
  });

  document.querySelectorAll('input[name="planner"]').forEach((input) => {
    input.addEventListener("change", () => {
      if (!input.checked) return;
      state.planner = input.value;
      renderResult();
    });
  });

  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  function activateTab(button) {
    state.tab = button.dataset.tab;
    tabs.forEach((tab) => {
      const selected = tab === button;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    renderWhy();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTab(tab));
    tab.addEventListener("keydown", (event) => {
      const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
      if (!keys.includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      tabs[next].focus();
      activateTab(tabs[next]);
    });
  });

  els.criterionInput.addEventListener("input", updateIep);
  els.samplingInput.addEventListener("input", updateIep);

  els.copyObjective.addEventListener("click", () => {
    if (state.observeFirst) return;
    copyText(els.objectiveText.textContent, els.copyObjective);
  });

  els.copyObjectiveCondition.addEventListener("click", () => {
    if (state.observeFirst) return;
    copyText(
      `${els.objectiveText.textContent}\n\nPossible condition: ${els.conditionText.textContent}`,
      els.copyObjectiveCondition
    );
  });

  els.copyIep.addEventListener("click", () => {
    copyText(els.iepText.textContent, els.copyIep);
  });

  els.copyEvidence.addEventListener("click", () => {
    if (state.observeFirst) return;
    const note = `This ${DATA.targets[state.target].label} target is connected to grade-level narrative/language expectations and informed by school-age narrative-intervention research and guidance. These sources support the target and instructional rationale; they are not direct efficacy evidence for First Volo Story Builder. Final source-by-source full-text verification is still pending.`;
    copyText(note, els.copyEvidence);
  });

  // Runtime audit object for QA.
  const auditRows = [];
  Object.keys(DATA.grades).forEach((grade) => {
    Object.keys(DATA.targets).forEach((target) => {
      const e = DATA.evidence[grade][target];
      auditRows.push({
        gradeBand: DATA.grades[grade],
        target: DATA.targets[target].label,
        objective: DATA.objectives[grade][target],
        developmentalExpectation: DATA.developmental[grade][target],
        research: e.research,
        sourceIds: e.sourceIds.join(", "),
        evidenceTypes: e.sourceIds.map(id => DATA.sources[id].type).join(" | "),
        directStandards: DATA.standards[grade][target].direct.join(", "),
        relatedStandards: DATA.standards[grade][target].related.join(", "),
        massachusetts: DATA.standards[grade][target].massachusetts,
        verificationStatus: e.claimStatus
      });
    });
  });
  window.FirstVoloStoryBuilderTargetEvidenceAudit = auditRows;
  if (console && console.table) console.table(auditRows);

  renderAll();
})();
