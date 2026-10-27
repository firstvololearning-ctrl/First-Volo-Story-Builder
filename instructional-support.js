"use strict";

/* =========================================================
   FIRST VOLO STORY BUILDER — INSTRUCTIONAL SUPPORT PHASE 1

   One primary instructional target.
   Student attempts first.
   Need Help? reveals the least support first.
   Three prompts lead to two independently selectable optional supports.
   Retry returns the student to the same language demand.

   This module intentionally does not score student performance.
========================================================= */

(function () {
  const plannerCategories = [
    "character",
    "setting",
    "problem",
    "feeling",
    "plan",
    "attempt",
    "item",
    "resolution"
  ];


  const sessionPhaseDefinitions = {
    "first-tell": {
      badge: "Whole 1 · First Tell",
      title: "First Tell",
      text:
        "Have the student tell or generate the complete story from beginning to end before opening the Story Planner or targeted support. If the target is already known, listen for it. If not, listen for the most meaningful narrative or language breakdown to address next."
    },
    part: {
      badge: "Part · Work on Target",
      title: "Work on Target",
      text:
        "Open the Story Planner and work only on the selected target where support is needed. After the student repairs the language, reconnect that repaired part to the surrounding story."
    },
    "tell-again": {
      badge: "Whole 2 · Tell Again",
      title: "Tell Again",
      text:
        "Have the student tell or generate the complete story again from the beginning. Targeted help stays closed. The educator may allow the student to refer to the Story Planner as a scaffold whether it contains writing, brief or scribed notes, or no writing at all. Hide the planner when you want an independent whole-story tell."
    }
  };

  const supportStepLabels = [
    "Look / Listen Here",
    "Think About It",
    "A Clue"
  ];

  const sentencePathways = {
    build: "Build a Sentence",
    combine: "Expand or Combine Sentences"
  };

  const relationshipSupports = {
    time: { label: "Time / Sequence", words: "when, before, after, while", frames: ["When ___, ___.", "After ___, ___.", "While ___, ___."] },
    cause: { label: "Cause / Reason", words: "because, since", frames: ["___ because ___.", "Because ___, ___."] },
    result: { label: "Result / Consequence", words: "so, as a result", frames: ["___, so ___.", "As a result of ___, ___."] },
    contrast: { label: "Contrast / Unexpected Outcome", words: "but, although, even though", frames: ["___, but ___.", "Although ___, ___."] },
    condition: { label: "Condition", words: "if, unless", frames: ["If ___, ___.", "___ unless ___."] },
    purpose: { label: "Purpose / Intention", words: "to, in order to, so that", frames: ["___ to ___.", "___ so that ___."] },
    mental: { label: "Thought / Belief", words: "thought that, knew that, wondered whether", frames: ["___ thought that ___.", "___ wondered whether ___."] },
    description: { label: "Description / Additional Information", words: "who, which, that, with", frames: ["The character who ___ ___.", "The item that ___ ___."] }
  };

  const grammarLevels = [
    ["Focused Cue", "Direct attention to the part needing revision without supplying the form."],
    ["Specific Grammatical Cue", "Identify the grammatical feature, but let the student supply the form."],
    ["Choice Between Forms", "Offer two contextually appropriate forms, including the correct form."],
    ["Partial Model", "Provide part of an appropriate structure for the student to complete."],
    ["Full Model", "Model the complete intended sentence and have the student reproduce it. Then reduce assistance when feasible."]
  ];

  const buildSentencePrompts = {
    character: ["Look at what you wrote or listen to what you said about the character. Is it a complete sentence?", "Can you say your whole idea about the character in one sentence?", "Who is your sentence about? What are you saying about them?", "Try: ‘The character ___’ or ‘___ is ___.’"],
    setting: ["Look at what you wrote or listen to what you said about the setting. Is it a complete sentence?", "Can you put your idea about where or when the story begins into a sentence?", "What is happening, or what is true, in that place or at that time?", "Try: ‘The story begins ___’ or ‘___ was at/in ___.’"],
    problem: ["Look at what you wrote or listen to what you said about the problem. Is it a complete sentence?", "Can you tell what went wrong in one complete sentence?", "Who or what is involved? What happened or changed?", "Try: ‘___ happened when ___’ or ‘The problem began when ___.’"],
    feeling: ["Look at what you wrote or listen to what you said about the feeling. Is it a complete sentence?", "Can you express that feeling in one complete sentence?", "Who is experiencing the feeling? What are you saying about how they feel?", "Try: ‘___ felt ___’ or ‘___ was ___.’"],
    plan: ["Look at what you wrote or listen to what you said about the plan. Is it a complete sentence?", "Can you express the character's plan in one complete sentence?", "Who has the plan? What do they want or intend to do?", "Try: ‘___ wanted to ___’ or ‘___ planned to ___.’"],
    attempt: ["Look at what you wrote or listen to what you said about the action. Is it a complete sentence?", "Can you tell what the character did in one complete sentence?", "Who did something? What did they do?", "Try: ‘___ tried to ___’ or ‘___ [action].’"],
    item: ["Look at what you wrote or listen to what you said about the item. Is it a complete sentence?", "Can you put your idea about the item into one complete sentence?", "Who or what is your sentence about? What are you saying about the item?", "Try: ‘___ used ___ to ___’ or ‘___ [action involving the item].’"],
    resolution: ["Look at what you wrote or listen to what you said about the ending. Is it a complete sentence?", "Can you express what happened at the end in one complete sentence?", "Who or what is involved in the outcome? What happened or changed?", "Try: ‘In the end, ___’ or ‘Finally, ___.’"]
  };

  const combineSentencePrompts = {
    character: ["Look or listen for related ideas about the character.", "What related information fits your idea? Can you express the connection in one sentence?", "Does one idea describe, explain, or add to the other?"],
    setting: ["Look or listen for an event and information about where or when it happened.", "Can you combine the event and the setting information?", "How could where or when fit into the sentence?"],
    problem: ["Look or listen for an event and something that changed or went wrong.", "Can you connect the related ideas in one sentence?", "Does one happen before, cause, or interrupt the other?"],
    feeling: ["Look or listen for a feeling and a related event or reason.", "Can you combine those ideas into one sentence?", "Does the event explain the feeling, or are the ideas related in another way?"],
    plan: ["Look or listen for a plan and a related reason or purpose.", "Can you express those connected ideas in one sentence?", "What does the character want to accomplish, and how does that relate to the plan?"],
    attempt: ["Look or listen for an action and another related idea.", "Can you connect those ideas in one sentence?", "Is the relationship about when, why, how, or for what purpose?"],
    item: ["Look or listen for an item and a related description or action.", "Can you include the related ideas in one sentence?", "How is the item used, described, or connected to an action?"],
    resolution: ["Look or listen for an attempt and a related outcome.", "Can you connect those ideas in one sentence?", "Did one lead to the other, or was the outcome unexpected?"]
  };

  // Wording approved for initial use; retain educator judgment and student meaning.
  const reviewedTargetPrompts = {
    "story-organization": {
      "character": {
        "lookListen": "Look or listen for how your story introduces the main character.",
        "think": "What does your listener need to know about who the story is about?",
        "clue": "Make clear which character we should follow. Include only information needed for this story.",
        "sentenceHelp": "The story is about ___.",
        "moreHelp": "Ask the student to identify the main character in their own story. Contrast an introduction with an action from later in the story, then have the student place their introduction where the listener needs it.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "setting": {
        "lookListen": "Look or listen for information about where or when the story begins.",
        "think": "What setting information would help your listener understand the beginning?",
        "clue": "Include the place or time that matters; both are not always necessary.",
        "sentenceHelp": "At/In ___, ___. / The story begins ___.",
        "moreHelp": "Identify a relevant place or time already established in the student’s story. Help the student decide whether the listener needs it before the next event; do not add a new setting.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "problem": {
        "lookListen": "Look or listen for the event or situation that creates the story’s difficulty.",
        "think": "Can you make the main difficulty clear to your listener?",
        "clue": "What changes, goes wrong, or stands in the way of what the character wants?",
        "sentenceHelp": "The problem is ___. / ___ wanted ___, but ___.",
        "moreHelp": "Separate the problem from a later response or attempt using the student’s own content. Ask which part creates the difficulty and where the listener needs to hear it.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "feeling": {
        "lookListen": "Look or listen for a feeling that matters to this part of your story.",
        "think": "Where would explaining that feeling help your listener understand the character?",
        "clue": "Consider what is happening around the feeling. A story does not need a separate feeling statement after every event.",
        "sentenceHelp": "At that point, ___ felt ___.",
        "moreHelp": "Check whether the student intends a feeling here. If so, help locate it near the event it relates to; accept a feeling conveyed through action or dialogue when that serves the target.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "plan": {
        "lookListen": "Look or listen for what the character intends or decides to do.",
        "think": "Can you make the character’s plan clear before telling what they actually do?",
        "clue": "A plan tells what the character means to do; an attempt tells what they actually do.",
        "sentenceHelp": "___ planned to ___. / ___ wanted to ___.",
        "moreHelp": "Use the student’s own plan and action to distinguish intention from performance. If the story has no stated plan, decide whether adding one serves the narrative target; do not invent it.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "attempt": {
        "lookListen": "Look or listen for what the character actually does.",
        "think": "Can you tell the action your listener needs to follow next?",
        "clue": "Distinguish an action from a plan. An attempt may follow, change, or depart from the plan.",
        "sentenceHelp": "___ did ___. / ___ tried to ___.",
        "moreHelp": "Identify the student’s intended action, then place it relative to the problem and any plan. If more than one attempt matters, organize those attempts without requiring a successful outcome.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "resolution": {
        "lookListen": "Look or listen for the outcome at the end of your story.",
        "think": "Can you make clear where the story’s problem stands at the end?",
        "clue": "The ending may show a solution, a partial solution, or a problem that remains.",
        "sentenceHelp": "In the end, ___. / The problem was still ___.",
        "moreHelp": "Compare the ending with the original problem using the student’s content. Help the student explain the actual outcome; do not require success or attribute the outcome to an attempt without support.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      }
    },
    "connections-cohesion": {
      "character": {
        "lookListen": "Look or listen for the names and pronouns used for the characters.",
        "think": "Can your listener tell who each name, he, she, they, or it refers to?",
        "clue": "When two characters could fit the same pronoun, name the intended character.",
        "sentenceHelp": "___ [name] ___. Then ___ [name or clear pronoun] ___.",
        "moreHelp": "Ask who a potentially unclear reference means. Contrast the possible referents already in the story and let the student choose; revise the reference without changing the event.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "setting": {
        "lookListen": "Look or listen for how the place or time connects to an event.",
        "think": "How can you make clear where or when this event happens?",
        "clue": "Decide whether the link tells place, time, or a change of setting; it does not have to explain a cause.",
        "sentenceHelp": "At/In ___, ___. / When ___, ___.",
        "moreHelp": "Identify the event and relevant setting information. Help select a place phrase, time link, or explicit shift of setting that fits; do not substitute because for a time relationship.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "problem": {
        "lookListen": "Look or listen to the transition from what was happening to the problem.",
        "think": "How can you show the relationship between those ideas?",
        "clue": "Did the problem happen next, interrupt something, or contrast with an expectation? Choose only what your story supports.",
        "sentenceHelp": "Then ___. / ___ was ___ when ___. / ___, but ___.",
        "moreHelp": "Use the student’s two intended ideas to establish sequence, interruption, or contrast first. Offer connecting language for that relationship rather than a mixed list of unrelated connectors.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "feeling": {
        "lookListen": "Look or listen to how the feeling connects with nearby story information.",
        "think": "What relationship do you want your listener to understand?",
        "clue": "Did the event happen before the feeling, explain it, or relate in another way?",
        "sentenceHelp": "After ___, ___ felt ___. / ___ felt ___ because ___.",
        "moreHelp": "Distinguish time from a reason for the feeling. Use a causal frame only if the student means that the event explains the feeling.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "plan": {
        "lookListen": "Look or listen to the plan and the idea you want to connect it with.",
        "think": "How can you show that connection clearly?",
        "clue": "Are you explaining a reason for the plan, a goal, or what happens next?",
        "sentenceHelp": "___ planned to ___. / ___ planned to ___ because ___.",
        "moreHelp": "Clarify whether the student intends reason, purpose, or sequence. Choose a connector or clear reference for that relationship; do not require a feeling to cause every plan.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "attempt": {
        "lookListen": "Look or listen to how the action connects with the surrounding events.",
        "think": "How can your listener follow what happens from one event to the next?",
        "clue": "Check sequence and clear references before adding a reason or purpose.",
        "sentenceHelp": "After ___, ___. / Then ___ [clear character reference] ___.",
        "moreHelp": "Have the student identify the actor and the event before or after the action. Repair unclear order or references; add a causal or purpose link only when intended.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "item": {
        "lookListen": "Look or listen for how the object is introduced and referred to later.",
        "think": "Will your listener know which object you mean and how it relates to this part?",
        "clue": "Name an unfamiliar or ambiguous object before using it, this, or that to refer to it.",
        "sentenceHelp": "___ found a ___. / The ___ / It ___ [when the reference is clear].",
        "moreHelp": "Identify the intended object and each reference to it. Clarify the name or reference first; do not assume the character uses the object to solve the problem.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "resolution": {
        "lookListen": "Look or listen to the link between the earlier events and the ending.",
        "think": "How can you make that relationship clear?",
        "clue": "Does the ending follow in time, result from an action, or differ from what was expected?",
        "sentenceHelp": "After ___, ___. / ___, so ___. / ___, but ___.",
        "moreHelp": "Establish the student’s intended relationship, then choose a time, result, or contrast structure. Do not treat finally as evidence of cause.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      }
    },
    "cause-effect": {
      "problem": {
        "lookListen": "Look or listen for what may have caused the problem or what followed from it.",
        "think": "Which cause or consequence do you want to explain?",
        "clue": "An event happening first does not by itself show that it caused the problem.",
        "sentenceHelp": "___ happened because ___. / ___ happened, so ___.",
        "moreHelp": "Choose one direction: reason for the problem or consequence of the problem. Identify the two supported ideas, then help express that causal link without reversing it.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "feeling": {
        "lookListen": "Look or listen for the feeling and the information that may explain it.",
        "think": "What in your story supports why the character feels that way?",
        "clue": "Use what happened, what the character perceived, or what they wanted, when the story supports it.",
        "sentenceHelp": "___ felt ___ because ___.",
        "moreHelp": "Check the intended feeling and possible reason with the student. If the reason is unknown, permit uncertainty or decide to work on another supported causal relationship.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "plan": {
        "lookListen": "Look or listen for why the character chooses the plan.",
        "think": "What reason for that plan does your story support?",
        "clue": "A reason explains the choice; the plan states the intended action.",
        "sentenceHelp": "___ planned to ___ because ___.",
        "moreHelp": "Separate the problem, any relevant feeling or belief, and the intended plan. Have the student select the reason they mean; a feeling is not a required cause.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "attempt": {
        "lookListen": "Look or listen for what the character does and what they intend to achieve.",
        "think": "Are you explaining why the action was chosen or what it actually caused?",
        "clue": "A purpose tells an intended outcome. A consequence tells what actually happened; they may differ.",
        "sentenceHelp": "___ did ___ to ___. / ___ did ___, so ___.",
        "moreHelp": "Contrast purpose and actual result using the student’s own story. Select one relationship for the current attempt; do not turn an intention into a successful consequence.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "item": {
        "lookListen": "Look or listen for the object and any effect it has on what happens.",
        "think": "What effect of the object or its use does your story support?",
        "clue": "The effect could help, hinder, or make no difference. Owning an object is not the same as using it.",
        "sentenceHelp": "Because ___, ___. / ___ used ___, so ___.",
        "moreHelp": "Establish whether the object is actually used or has another relevant effect. If no causal connection is supported, do not require one; select another meaningful causal target.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "resolution": {
        "lookListen": "Look or listen for the outcome and what may have led to it.",
        "think": "Can you explain what caused that outcome?",
        "clue": "Choose a supported cause, which may be an attempt, another event, or a combination of events.",
        "sentenceHelp": "___ happened because ___. / ___, so ___.",
        "moreHelp": "Identify outcome and cause separately. Check direction with the student, then combine them; keep intended goals separate from actual results and allow an unresolved outcome.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      }
    },
    "elaboration": {
      "character": {
        "lookListen": "Look or listen to what you have said about the character.",
        "think": "What detail would help your listener understand this character in this story?",
        "clue": "Choose a relevant trait, action, description, or role—not a detail just to make the story longer.",
        "sentenceHelp": "___ is ___. / ___ [relevant action or description].",
        "moreHelp": "Ask what the listener still needs to understand about the character. Offer meaningful categories of detail, then have the student choose content that belongs in their story.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "setting": {
        "lookListen": "Look or listen to the place or time information already in your story.",
        "think": "What detail would make this setting clearer where it matters?",
        "clue": "Choose a detail that helps the listener picture or understand this event.",
        "sentenceHelp": "At/In ___, ___. / The place was ___.",
        "moreHelp": "Identify what the listener cannot yet picture or understand. Invite one relevant place or time detail without requiring a causal explanation.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "problem": {
        "lookListen": "Look or listen to how you describe the problem.",
        "think": "What detail would help the listener understand the difficulty?",
        "clue": "Clarify what happened, what is at stake, or what blocks the character. The problem need not become harder.",
        "sentenceHelp": "The problem was ___. / ___ could not ___ because ___.",
        "moreHelp": "Identify an information gap in the student’s account. Help choose a relevant detail; do not add escalation, obstacles, or stakes not intended by the student.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "feeling": {
        "lookListen": "Look or listen to how the feeling is expressed.",
        "think": "What detail would help the listener understand or picture that feeling?",
        "clue": "You might clarify the feeling, a supported reason, or how it is expressed.",
        "sentenceHelp": "___ felt ___. / ___ [an action or words expressing the feeling].",
        "moreHelp": "Ask whether the student wants to name, explain, or show the feeling. Offer categories rather than inventing behavior; do not require both a feeling label and an explanation.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "plan": {
        "lookListen": "Look or listen to the plan you have expressed.",
        "think": "What detail would make the intention clearer?",
        "clue": "Clarify the intended action, goal, or relevant reason. Do not add steps that the story does not need.",
        "sentenceHelp": "___ planned to ___. / The goal was ___.",
        "moreHelp": "Identify what remains unclear about the intention. Have the student supply one needed detail and distinguish it from an action already completed.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "attempt": {
        "lookListen": "Look or listen to the action you have described.",
        "think": "What detail would help your listener understand how it happens?",
        "clue": "Consider the actor, manner, object, or an important step—only if it adds useful information.",
        "sentenceHelp": "___ [action] ___. / ___ did ___ by ___.",
        "moreHelp": "Choose one unclear part of the action with the student. Break it into meaningful components, then add the component the listener needs.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "item": {
        "lookListen": "Look or listen to the information about the object.",
        "think": "What relevant detail would help your listener understand the object here?",
        "clue": "Its identity, appearance, condition, or actual use may matter. It does not have to solve the problem.",
        "sentenceHelp": "The ___ was ___. / ___ used the ___ to ___.",
        "moreHelp": "Identify why the object is included in this story. Invite a description or actual use that supports that purpose; do not speculate about imaginary uses.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "resolution": {
        "lookListen": "Look or listen to the outcome you have told.",
        "think": "What detail would make the ending clearer?",
        "clue": "Clarify what changed or remained unresolved, without requiring a lesson or a happy ending.",
        "sentenceHelp": "In the end, ___. / ___ was still ___.",
        "moreHelp": "Compare the ending with what the listener still needs to know. Help the student add one relevant outcome detail; do not require a new causal clause or moral.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      }
    },
    "perspective-internal-state": {
      "character": {
        "lookListen": "Look or listen for information about what the character wants, thinks, feels, or knows.",
        "think": "Which internal state matters to this part of your story?",
        "clue": "Use what the story states or supports. A possible interpretation is different from a known fact.",
        "sentenceHelp": "___ wanted ___. / ___ may have thought ___.",
        "moreHelp": "Identify a relevant internal state with the student and ask what supports it. Distinguish an explicit statement from an inference; allow uncertainty or more than one supported interpretation.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "problem": {
        "lookListen": "Look or listen for what the character notices or knows about the problem.",
        "think": "What does the character’s perspective help us understand here?",
        "clue": "A character may not know everything the listener knows. Do not assume a false belief or surprise.",
        "sentenceHelp": "___ knew ___. / ___ did not know ___. / ___ may have thought ___.",
        "moreHelp": "Compare what is available to the character with what is available to the listener. Use a knowledge or belief statement only if the story supports that distinction.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "feeling": {
        "lookListen": "Look or listen for the feeling and the surrounding story information.",
        "think": "How can you make the character’s experience clearer?",
        "clue": "A supported event, goal, perception, or belief may help explain the feeling.",
        "sentenceHelp": "___ felt ___. / ___ may have felt ___ because ___.",
        "moreHelp": "Check whether the feeling is stated or inferred. Identify support with the student; do not replace their intended feeling or demand a single emotion when alternatives fit.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "plan": {
        "lookListen": "Look or listen for what the character wants or expects when making the plan.",
        "think": "What intended goal or expectation matters here?",
        "clue": "What the character hopes will happen may differ from what later happens.",
        "sentenceHelp": "___ wanted to ___. / ___ hoped that ___.",
        "moreHelp": "Separate the intended goal or expectation from the actual outcome. Ask the student which internal state is supported and relevant; do not require the plan to come from a feeling.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "attempt": {
        "lookListen": "Look or listen for the character’s action and any supported reason for choosing it.",
        "think": "What does this action help us understand about the character’s goal or perspective?",
        "clue": "An action may suggest a motive, but it does not prove exactly what the character thought.",
        "sentenceHelp": "___ did ___ because they wanted ___. / ___ may have hoped ___.",
        "moreHelp": "Check whether the motive is explicit or inferred. Identify supporting story information; if it is unknown, permit uncertainty rather than supplying a motive.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "resolution": {
        "lookListen": "Look or listen for what the story shows about the character at the end.",
        "think": "What feeling, thought, knowledge, or goal is relevant now?",
        "clue": "An internal state may change, stay the same, or remain unknown. The character does not have to learn a lesson.",
        "sentenceHelp": "At the end, ___ felt ___. / ___ still wanted ___. / ___ may have thought ___.",
        "moreHelp": "Compare beginning and ending evidence only if a comparison serves the target. State a change in understanding only when supported; accept continuity or uncertainty and preserve the student’s interpretation.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      }
    }
  };

  const targetDefinitions = {
    "story-organization": {
      label: "Story Organization",
      studentGoal: "Make my story easy to follow.",
      lookFor: "Did I include and connect the story parts my listener needs?",
      reflection: "Did I make my story easy to follow?",
      expected: "Organize the relevant story functions into a coherent whole. A plan, feeling statement, or successful resolution is not required when it does not fit the student’s narrative.",
      watches: "Watch for information the listener needs, unclear event order, confusion between intention and action, and an outcome that is unclear relative to the problem.",
      relevant: ["character", "setting", "problem", "feeling", "plan", "attempt", "resolution"],
      build(category) {
        const row = reviewedTargetPrompts["story-organization"][category];
        return row ? [row.lookListen, row.think, row.clue, row.moreHelp, row.sentenceHelp] : [];
      },
      retry(category) {
        return reviewedTargetPrompts["story-organization"][category]?.retry || "Try this part again in your own words.";
      }
    },

    "connections-cohesion": {
      label: "Connections & Cohesion",
      studentGoal: "Connect my story ideas.",
      lookFor: "Did I make the relationships and references clear?",
      reflection: "Did I connect my story ideas?",
      expected: "Express intended time, cause, purpose, contrast and referential relationships clearly, using language that fits the student’s story.",
      watches: "Watch for unclear names/pronouns/object references, abrupt transitions, and connectors that change the intended relationship. Do not assume sequence means cause.",
      relevant: ["character", "setting", "problem", "feeling", "plan", "attempt", "item", "resolution"],
      build(category) {
        const row = reviewedTargetPrompts["connections-cohesion"][category];
        return row ? [row.lookListen, row.think, row.clue, row.moreHelp, row.sentenceHelp] : [];
      },
      retry(category) {
        return reviewedTargetPrompts["connections-cohesion"][category]?.retry || "Try this part again in your own words.";
      }
    },

    "cause-effect": {
      label: "Cause & Effect",
      studentGoal: "Make the cause clear.",
      lookFor: "Did I explain a supported reason or consequence?",
      reflection: "Did I make the cause clear?",
      expected: "Explain supported causal relationships while distinguishing reasons, purposes, intended actions and actual consequences.",
      watches: "Watch for reversed causes and consequences, intentions presented as outcomes, and causal claims unsupported by the student’s story.",
      relevant: ["problem", "feeling", "plan", "attempt", "item", "resolution"],
      build(category) {
        const row = reviewedTargetPrompts["cause-effect"][category];
        return row ? [row.lookListen, row.think, row.clue, row.moreHelp, row.sentenceHelp] : [];
      },
      retry(category) {
        return reviewedTargetPrompts["cause-effect"][category]?.retry || "Try this part again in your own words.";
      }
    },

    "sentence-formulation": {
      label: "Sentence Formulation",
      studentGoal: "Express my ideas in clear sentences.",
      lookFor: "Did I build a complete sentence or clearly combine related ideas?",
      reflection: "Did my sentences express my ideas clearly?",
      expected:
        "Educator chooses Build a Sentence to organize an intended idea into a complete, grammatically accurate sentence, or Expand or Combine to express a meaningful relationship between ideas.",
      watches:
        "Watch for fragments, abandoned sentences, missing grammatical elements, word-order difficulties, or trouble expressing the intended relationship between clauses. Identify the actual breakdown before giving individualized grammatical support.",
      relevant: plannerCategories,
      build(category, c) {
        const frames = {
          character: `${capitalize(storyCharacter(c))} is ___.`,
          setting: `The story takes place in ${storySetting(c)} where ___.`,
          problem: "The problem begins when ___.",
          feeling: `The character feels ${storyFeeling(c)} because ___.`,
          plan: "The character plans to ___.",
          attempt: "The character tries to ___.",
          item: `The character uses ${storyItem(c)} to ___.`,
          resolution: "In the end, ___."
        };
        return [
          "Say the idea out loud first. Keep the idea; it does not have to be perfect yet.",
          "What is the one main idea you want this sentence to say?",
          "Build it: Who? → did what? → what or whom? → where or why?",
          "Start with who or what the sentence is about and what they did. Then add the other information.",
          frames[category] || "___ ___."
        ];
      },
      retry() {
        return "Now say or write the sentence again using your own story idea.";
      }
    },

    "elaboration": {
      label: "Elaboration",
      studentGoal: "Add a useful detail.",
      lookFor: "Did my detail help the listener understand or picture the story?",
      reflection: "Did I add useful details?",
      expected: "Add relevant information that clarifies a story idea or event while preserving the student’s intended meaning.",
      watches: "Watch for an information gap the listener needs filled, details that do not help, invented events, and unnecessary length or complexity.",
      relevant: ["character", "setting", "problem", "feeling", "plan", "attempt", "item", "resolution"],
      build(category) {
        const row = reviewedTargetPrompts["elaboration"][category];
        return row ? [row.lookListen, row.think, row.clue, row.moreHelp, row.sentenceHelp] : [];
      },
      retry(category) {
        return reviewedTargetPrompts["elaboration"][category]?.retry || "Try this part again in your own words.";
      }
    },

    "perspective-internal-state": {
      label: "Perspective & Internal State",
      studentGoal: "Help my listener understand the character.",
      lookFor: "Did I express a relevant, supported internal state?",
      reflection: "Did I help my listener understand the character?",
      expected: "Express relevant feelings, thoughts, knowledge, beliefs, goals or expectations supported by the story. Distinguish explicit information from inference and allow uncertainty or continuity.",
      watches: "Watch for unsupported mental states, assumed motives, and presumed changes in understanding. A character need not learn a lesson or share the listener’s knowledge.",
      relevant: ["character", "problem", "feeling", "plan", "attempt", "resolution"],
      build(category) {
        const row = reviewedTargetPrompts["perspective-internal-state"][category];
        return row ? [row.lookListen, row.think, row.clue, row.moreHelp, row.sentenceHelp] : [];
      },
      retry(category) {
        return reviewedTargetPrompts["perspective-internal-state"][category]?.retry || "Try this part again in your own words.";
      }
    }
  };

  let initialized = false;
  let pendingRestoreState = null;
  let selectedTarget = "observe-first";
  let sessionPhase = "first-tell";
  let tellAgainPlannerAvailable = true;
  let supportLevels = emptySupportLevels();
  let retryRequested = emptyRetryState();
  let optionalSupports = emptyOptionalSupports();
  let sentencePathway = "build";
  let selectedRelationship = "cause";
  let selectedGrammarLevel = 1;
  let studentReflection = null;
  let studentReflectionOpen = false;

  function emptySupportLevels() {
    return Object.fromEntries(
      plannerCategories.map((category) => [category, 0])
    );
  }

  function emptyRetryState() {
    return Object.fromEntries(
      plannerCategories.map((category) => [category, false])
    );
  }

  function emptyOptionalSupports() {
    return Object.fromEntries(plannerCategories.map(category => [category, { sentence: false, more: false }]));
  }

  function capitalize(value) {
    const text = String(value || "");
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  function known(value) {
    const text = String(value || "").trim();
    return Boolean(
      text &&
      !/^Roll to choose/i.test(text) &&
      text !== "It’s up to you!" &&
      text !== "It's up to you!"
    );
  }

  function lower(value) {
    const text = String(value || "").trim();
    if (!text) {
      return text;
    }
    return text.charAt(0).toLowerCase() + text.slice(1);
  }

  function plannerLabel(category) {
    if (category === "attempt") {
      return "the attempt";
    }

    if (category === "resolution") {
      return "the ending";
    }

    const element = document.getElementById(
      `planner${capitalize(category)}Label`
    );

    const value = element?.textContent?.trim() || "";
    return known(value) ? value : "";
  }

  function context() {
    return {
      character: plannerLabel("character"),
      setting: plannerLabel("setting"),
      problem: plannerLabel("problem"),
      feeling: lower(plannerLabel("feeling")),
      plan: plannerLabel("plan"),
      attempt: plannerLabel("attempt"),
      item: plannerLabel("item")
    };
  }

  function storyCharacter(c) {
    return known(c.character) ? `the ${lower(c.character)}` : "the character";
  }

  function storySetting(c) {
    return known(c.setting) ? c.setting : "the setting";
  }

  function storyProblem(c) {
    return known(c.problem) ? `the ${c.problem} problem` : "the story problem";
  }

  function storyFeeling(c) {
    return known(c.feeling) ? c.feeling : "that way";
  }

  function storyPlan(c) {
    return known(c.plan) ? c.plan : "a plan";
  }

  function storyItem(c) {
    return known(c.item) ? `the ${lower(c.item)}` : "the item";
  }

  function announceChanged() {
    window.dispatchEvent(
      new CustomEvent("firstvolo:instructional-support-changed")
    );
  }

  function getState() {
    return {
      target: selectedTarget,
      sessionPhase,
      tellAgainPlannerAvailable,
      supportLevels: { ...supportLevels },
      optionalSupports: Object.fromEntries(Object.entries(optionalSupports).map(([key, value]) => [key, { ...value }])),
      sentencePathway,
      selectedRelationship,
      selectedGrammarLevel,
      retryRequested: { ...retryRequested },
      studentReflection
    };
  }

  function normalizeSavedState(state) {
    const target =
      state &&
      typeof state.target === "string" &&
      (
        state.target === "off" ||
        state.target === "observe-first" ||
        targetDefinitions[state.target]
      )
        ? state.target
        : "off";

    const phase =
      state &&
      typeof state.sessionPhase === "string" &&
      sessionPhaseDefinitions[state.sessionPhase]
        ? state.sessionPhase
        : "first-tell";

    const plannerAvailable =
      state?.tellAgainPlannerAvailable !== false;

    const validReflections = [
      "yes",
      "sometimes",
      "not-yet"
    ];

    const reflection =
      validReflections.includes(state?.studentReflection)
        ? state.studentReflection
        : null;

    const levels = emptySupportLevels();
    const retries = emptyRetryState();
    const optional = emptyOptionalSupports();

    plannerCategories.forEach((category) => {
      const rawLevel = Number(state?.supportLevels?.[category]);
      levels[category] = Number.isFinite(rawLevel)
        ? Math.max(0, Math.min(3, Math.floor(rawLevel)))
        : 0;

      optional[category].sentence = Boolean(state?.optionalSupports?.[category]?.sentence);
      optional[category].more = Boolean(state?.optionalSupports?.[category]?.more);

      retries[category] = Boolean(
        state?.retryRequested?.[category]
      );
    });

    return {
      target,
      sessionPhase: phase,
      tellAgainPlannerAvailable: plannerAvailable,
      supportLevels: levels,
      optionalSupports: optional,
      sentencePathway: sentencePathways[state?.sentencePathway] ? state.sentencePathway : "build",
      selectedRelationship: relationshipSupports[state?.selectedRelationship] ? state.selectedRelationship : "cause",
      selectedGrammarLevel: Number.isInteger(state?.selectedGrammarLevel) && state.selectedGrammarLevel >= 1 && state.selectedGrammarLevel <= 5 ? state.selectedGrammarLevel : 1,
      retryRequested: retries,
      studentReflection: reflection
    };
  }

  function restoreState(state) {
    const normalized = normalizeSavedState(state);

    selectedTarget = normalized.target;
    sessionPhase = normalized.sessionPhase;
    tellAgainPlannerAvailable =
      normalized.tellAgainPlannerAvailable;
    supportLevels = normalized.supportLevels;
    optionalSupports = normalized.optionalSupports;
    sentencePathway = normalized.sentencePathway;
    selectedRelationship = normalized.selectedRelationship;
    selectedGrammarLevel = normalized.selectedGrammarLevel;
    retryRequested = normalized.retryRequested;
    studentReflection = normalized.studentReflection;
    studentReflectionOpen = Boolean(studentReflection);

    if (!initialized) {
      pendingRestoreState = normalized;
      return;
    }

    applyStateToUI();
  }


  function normalizeSessionPhase(phase) {
    return sessionPhaseDefinitions[phase]
      ? phase
      : "first-tell";
  }

  function sessionTargetLabel() {
    return (
      targetDefinitions[selectedTarget]?.label ||
      "the selected instructional target"
    );
  }

  function setSessionPhase(phase, options = {}) {
    const nextPhase = normalizeSessionPhase(phase);

    if (nextPhase !== "tell-again") {
      studentReflection = null;
      studentReflectionOpen = false;
    }

    sessionPhase = nextPhase;

    if (
      sessionPhase === "first-tell" &&
      options.resetSupport !== false
    ) {
      resetAllSectionSupport();
    }

    updateSessionFlow();
    renderAllPlannerSupports();

    if (options.announce !== false) {
      announceChanged();
    }
  }


  function updateStudentTargetCard() {
    const definition = targetDefinitions[selectedTarget];

    const card = document.getElementById(
      "studentTargetCard"
    );

    const goal = document.getElementById(
      "studentTargetGoal"
    );

    const lookFor = document.getElementById(
      "studentTargetLookFor"
    );

    const retell = document.getElementById(
      "studentTargetRetell"
    );

    const reveal = document.getElementById(
      "studentReflectionReveal"
    );

    const reflection = document.getElementById(
      "studentTargetReflection"
    );

    const reflectionQuestion = document.getElementById(
      "studentTargetReflectionQuestion"
    );

    if (!card) {
      return;
    }

    // Preserve the First Tell as the pre-teaching whole-story attempt.
    if (!definition || sessionPhase === "first-tell") {
      card.hidden = true;
      return;
    }

    card.hidden = false;

    if (goal) {
      goal.textContent = definition.studentGoal;
    }

    if (sessionPhase === "part") {
      if (lookFor) {
        lookFor.hidden = false;
        lookFor.textContent =
          `Listen/look for: ${definition.lookFor}`;
      }

      if (retell) {
        retell.hidden = true;
      }

      if (reveal) {
        reveal.hidden = true;
      }

      if (reflection) {
        reflection.hidden = true;
      }
    }

    if (sessionPhase === "tell-again") {
      // Keep only the short goal visible during the retell.
      // The specific look-for returns after the retell for self-reflection.
      if (lookFor) {
        lookFor.hidden = true;
      }

      if (retell) {
        retell.hidden = false;
      }

      if (reveal) {
        reveal.hidden =
          studentReflectionOpen ||
          Boolean(studentReflection);
      }

      if (reflection) {
        reflection.hidden =
          !studentReflectionOpen &&
          !studentReflection;
      }

      if (reflectionQuestion) {
        reflectionQuestion.textContent =
          definition.reflection;
      }
    }

    document
      .querySelectorAll("[data-student-reflection]")
      .forEach((button) => {
        const selected =
          button.dataset.studentReflection ===
          studentReflection;

        button.classList.toggle(
          "is-selected",
          selected
        );

        button.setAttribute(
          "aria-pressed",
          selected ? "true" : "false"
        );
      });
  }

  function handleStudentReflectionReveal() {
    studentReflectionOpen = true;
    updateStudentTargetCard();

    window.setTimeout(() => {
      document
        .querySelector("[data-student-reflection]")
        ?.focus();
    }, 0);
  }

  function handleStudentReflectionChoice(event) {
    const value =
      event.currentTarget?.dataset?.studentReflection;

    if (
      !["yes", "sometimes", "not-yet"].includes(value)
    ) {
      return;
    }

    studentReflection = value;
    studentReflectionOpen = true;

    updateStudentTargetCard();
    announceChanged();
  }

  function workflowActionFor(target, phase) {
    if (phase === "part") return { label: "Ready? Tell the whole story again →", phase: "tell-again", hint: "Practice one useful change. Open help only when needed, retry, then reconnect the idea." };
    if (phase === "tell-again") return { label: "Return to First Tell", phase: "first-tell", hint: "Tell the complete story with the goal in mind. Use the self-check after the tell." };
    if (target === "observe-first") return { label: "Finished the first tell? Choose a goal →", chooseGoal: true, hint: "Listen to the whole story first. Then choose one goal if teaching is needed." };
    return { label: "Finished the first tell? Work on this goal →", phase: "part", hint: "Let the learner tell the complete story first. Keep targeted help closed while you listen." };
  }

  function updateSessionFlow() {
    const panel = document.getElementById(
      "instructionalSessionPanel"
    );

    const plannerPanel = document.getElementById(
      "storyPlannerPanel"
    );

    const plannerIntro = document.getElementById(
      "storyPlannerIntro"
    );

    const stageBadge = document.getElementById(
      "instructionalSessionStageBadge"
    );

    const phaseTitle = document.getElementById(
      "instructionalSessionPhaseTitle"
    );

    const phaseText = document.getElementById(
      "instructionalSessionPhaseText"
    );

    const targetReminder = document.getElementById(
      "instructionalSessionTargetReminder"
    );

    const tellAgainPlannerOption = document.getElementById(
      "tellAgainPlannerOption"
    );

    const tellAgainPlannerCheckbox = document.getElementById(
      "tellAgainPlannerAvailable"
    );

    const focusNote = document.querySelector(
      ".instructional-focus-note"
    );

    const educatorGuidance = document.getElementById(
      "instructionalFocusPanel"
    );

    const nextAction = workflowActionFor(selectedTarget, sessionPhase);
    const nextButton = document.getElementById("storyNextStep");
    if (nextButton) nextButton.textContent = nextAction.label;
    const workflowHint = document.getElementById("workflowHint");
    if (workflowHint) workflowHint.textContent = nextAction.hint;

    const definition = targetDefinitions[selectedTarget];
    const observeFirst = selectedTarget === "observe-first";
    const cycleIsOn =
      observeFirst || Boolean(definition);

    if (panel) {
      panel.hidden = !cycleIsOn;
    }

    if (
      educatorGuidance &&
      sessionPhase === "tell-again"
    ) {
      educatorGuidance.open = false;
    }

    if (!cycleIsOn) {
      if (plannerPanel) {
        plannerPanel.hidden = false;
      }
      return;
    }

    const phase =
      sessionPhaseDefinitions[normalizeSessionPhase(sessionPhase)];

    if (stageBadge) {
      stageBadge.textContent = phase.badge;
    }

    if (phaseTitle) {
      phaseTitle.textContent = phase.title;
    }

    if (phaseText) {
      phaseText.textContent = phase.text;
    }

    if (targetReminder) {
      targetReminder.hidden = !observeFirst;

      if (observeFirst) {
        targetReminder.textContent =
          "👩‍🏫 Educator: listen across the whole narrative. After the First Tell, choose one Story Goal above.";
      } else {
        targetReminder.textContent = "";
      }
    }

    updateStudentTargetCard();

    document
      .querySelectorAll("[data-session-phase]")
      .forEach((button) => {
        const active =
          button.dataset.sessionPhase === sessionPhase;

        const requiresTarget =
          button.dataset.sessionPhase !== "first-tell";

        button.disabled =
          observeFirst && requiresTarget;

        button.classList.toggle("is-active", active);
        button.setAttribute(
          "aria-pressed",
          active ? "true" : "false"
        );

        if (observeFirst && requiresTarget) {
          button.setAttribute(
            "title",
            "Choose the instructional target after the First Tell."
          );
        } else {
          button.removeAttribute("title");
        }
      });

    if (tellAgainPlannerOption) {
      tellAgainPlannerOption.hidden =
        sessionPhase !== "tell-again";
    }

    if (tellAgainPlannerCheckbox) {
      tellAgainPlannerCheckbox.checked =
        tellAgainPlannerAvailable;
    }

    if (plannerIntro) {
      if (sessionPhase === "tell-again") {
        plannerIntro.textContent =
          "Use the Story Planner to help you tell the whole story again. You can use the pictures and story parts, with or without notes.";
      } else if (sessionPhase === "part") {
        plannerIntro.textContent =
          "Use the Story Planner to work on the part of your story you are practicing. You can talk through your ideas, add notes, or write if that helps.";
      } else {
        plannerIntro.textContent =
          "Use the Story Planner to build and connect your story ideas. You can talk through your ideas, add notes, or write if that helps.";
      }
    }

    if (plannerPanel) {
      const showPlanner =
        sessionPhase === "part" ||
        (
          sessionPhase === "tell-again" &&
          tellAgainPlannerAvailable
        );

      plannerPanel.hidden = !showPlanner;

      if (showPlanner) {
        const details = plannerPanel.querySelector(
          ".story-planner-details"
        );

        if (details) {
          details.open = true;
        }
      }
    }

    if (focusNote) {
      if (sessionPhase === "first-tell") {
        focusNote.textContent =
          "Listen to the whole first attempt before opening targeted support. Access help is still okay when it does not supply the instructional target.";
      } else if (sessionPhase === "part") {
        focusNote.textContent =
          "Let the student attempt the language first. If help is needed, use the three prompts and optional Sentence Help or More Help as appropriate. Have the student retry and reconnect the repaired idea to the story.";
      } else {
        focusNote.textContent =
          "Targeted help stays closed during Tell Again. The Story Planner may remain available as a scaffold with or without written notes; hide it when you want to observe an independent whole-story tell.";
      }
    }
  }

  function reconnectPrompt(category) {
    return reviewedTargetPrompts[selectedTarget]?.[category]?.reconnect ||
      "Tell this part with the relevant part before or after it, then return to the whole story.";
  }

  function resetAllSectionSupport() {
    supportLevels = emptySupportLevels();
    optionalSupports = emptyOptionalSupports();
    retryRequested = emptyRetryState();
    studentReflection = null;
    studentReflectionOpen = false;
  }

  function ensurePlannerSupportContainers() {
    document
      .querySelectorAll(".story-planner-card[data-planner-category]")
      .forEach((card) => {
        const category = card.dataset.plannerCategory;

        if (!plannerCategories.includes(category)) {
          return;
        }

        let container = card.querySelector(
          ".planner-targeted-support"
        );

        if (container) {
          return;
        }

        container = document.createElement("div");
        container.className = "planner-targeted-support";
        container.dataset.category = category;
        container.hidden = true;

        const prompt = card.querySelector(
          ".story-planner-prompt"
        );

        if (prompt) {
          prompt.insertAdjacentElement("afterend", container);
        } else {
          card.appendChild(container);
        }
      });
  }

  function updateTargetOverview() {
    const panel = document.getElementById(
      "instructionalFocusPanel"
    );
    const title = document.getElementById(
      "instructionalFocusTitle"
    );
    const expected = document.getElementById(
      "instructionalFocusExpected"
    );
    const watches = document.getElementById(
      "instructionalFocusWatches"
    );

    const definition = targetDefinitions[selectedTarget];
    const isOn = Boolean(definition);

    if (panel) {
      panel.hidden = !isOn;

      if (isOn) {
        panel.open = false;
      }
    }

    if (!definition) {
      return;
    }

    if (title) {
      title.textContent = definition.label;
    }

    if (expected) {
      expected.textContent = definition.expected;
    }

    if (watches) {
      watches.textContent = definition.watches;
    }
  }

  function supportFor(category) {
    const definition = targetDefinitions[selectedTarget];

    if (
      !definition ||
      !definition.relevant.includes(category)
    ) {
      return null;
    }

    const steps = selectedTarget === "sentence-formulation"
      ? (sentencePathway === "combine" ? combineSentencePrompts[category] : buildSentencePrompts[category])
      : definition.build(category, context());

    if (!Array.isArray(steps) || !steps.length) {
      return null;
    }

    return {
      steps: steps.slice(0, 3),
      more: selectedTarget === "sentence-formulation" ? null : steps[3],
      sentence: selectedTarget === "sentence-formulation"
        ? (sentencePathway === "build" ? buildSentencePrompts[category][3] : null)
        : steps[4],
      retry:
        typeof definition.retry === "function"
          ? definition.retry(category, context())
          : "Now try the same idea again."
    };
  }

  function renderPlannerSupport(category) {
    const container = document.querySelector(
      `.planner-targeted-support[data-category="${CSS.escape(category)}"]`
    );

    if (!container) {
      return;
    }

    const focused = container.contains(document.activeElement) ? document.activeElement : null;
    const focusLabel = focused?.getAttribute("aria-label");
    const focusText = focused?.textContent;
    function restoreControlFocus() {
      if (!focused) return;
      const controls = [...container.querySelectorAll("button, select")];
      const replacement = controls.find(node => focusLabel
        ? node.getAttribute("aria-label") === focusLabel
        : node.textContent === focusText);
      (replacement || container.querySelector(".planner-help-button"))?.focus();
    }

    const support =
      sessionPhase === "part"
        ? supportFor(category)
        : null;

    if (!support) {
      container.replaceChildren();
      container.hidden = true;
      return;
    }

    container.hidden = false;
    container.replaceChildren();

    const educatorAudience = document.createElement("p");
    educatorAudience.className =
      "planner-support-audience planner-support-audience-educator";
    educatorAudience.textContent =
      "👩‍🏫 EDUCATOR SUPPORT";

    container.appendChild(educatorAudience);

    const row = document.createElement("div");
    row.className = "planner-help-row";

    const helpButton = document.createElement("button");
    helpButton.type = "button";
    helpButton.className = "planner-help-button";

    const level = supportLevels[category] || 0;

    helpButton.textContent =
      level === 0
        ? "Open support"
        : "Hide support";

    helpButton.setAttribute(
      "aria-expanded",
      level > 0 ? "true" : "false"
    );

    helpButton.addEventListener("click", () => {
      if (supportLevels[category] > 0) {
        supportLevels[category] = 0;
        retryRequested[category] = false;
      } else {
        supportLevels[category] = 1;
      }

      renderPlannerSupport(category);
      announceChanged();
    });

    row.appendChild(helpButton);

    if (level > 0 && level < 3) {
      const moreButton = document.createElement("button");
      moreButton.type = "button";
      moreButton.className = "planner-more-help-button";
      moreButton.textContent = "Next prompt";

      moreButton.addEventListener("click", () => {
        supportLevels[category] = Math.min(
          3,
          supportLevels[category] + 1
        );
        retryRequested[category] = false;
        renderPlannerSupport(category);
        announceChanged();
      });

      row.appendChild(moreButton);
    }

    if (level > 1) {
      const previous = document.createElement("button");
      previous.type = "button";
      previous.className = "planner-more-help-button";
      previous.textContent = "Previous prompt";
      previous.addEventListener("click", () => {
        supportLevels[category] -= 1;
        renderPlannerSupport(category);
        announceChanged();
      });
      row.appendChild(previous);
    }
    container.appendChild(row);

    if (level === 0) {
      restoreControlFocus();
      return;
    }

    if (selectedTarget === "sentence-formulation") {
      const pathwayLabel = document.createElement("label");
      pathwayLabel.textContent = "Educator: Sentence Formulation pathway";
      pathwayLabel.className = "planner-support-control";
      const pathwaySelect = document.createElement("select");
      pathwaySelect.setAttribute("aria-label", "Sentence Formulation pathway");
      Object.entries(sentencePathways).forEach(([value, name]) => pathwaySelect.add(new Option(name, value)));
      pathwaySelect.value = sentencePathway;
      pathwaySelect.addEventListener("change", () => {
        sentencePathway = pathwaySelect.value;
        optionalSupports = emptyOptionalSupports();
        renderAllPlannerSupports();
        announceChanged();
      });
      pathwayLabel.appendChild(pathwaySelect);
      container.appendChild(pathwayLabel);
    }

    const supportCard = document.createElement("div");
    supportCard.className = "planner-support-card";
    supportCard.setAttribute("role", "status");
    supportCard.setAttribute("aria-live", "polite");

    const studentAudience = document.createElement("p");
    studentAudience.className =
      "planner-support-audience planner-support-audience-student";
    studentAudience.textContent =
      "🎯 FOR THE STUDENT";

    const stepLabel = document.createElement("p");
    stepLabel.className = "planner-support-step-label";
    stepLabel.textContent =
      supportStepLabels[Math.max(0, level - 1)] ||
      "Support";

    const stepText = document.createElement("p");
    stepText.className = "planner-support-step-text";
    stepText.textContent = support.steps[level - 1];

    if (selectedTarget === "sentence-formulation" && sentencePathway === "combine") {
      const note = document.createElement("p");
      note.textContent = "Educator: begin with the student's current response — two sentences, one sentence, or an incomplete idea. Establish related information supported by the story before inviting a connection; greater length is not the goal.";
      container.appendChild(note);
    }
    supportCard.append(
      studentAudience,
      stepLabel,
      stepText
    );

    if (level >= 3) {
      const choices = document.createElement("div");
      choices.className = "planner-support-choices";
      [["sentence", "Sentence Help"], ["more", "More Help"]].forEach(([key, label]) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "planner-more-help-button";
        button.textContent = label;
        button.setAttribute("aria-pressed", String(optionalSupports[category][key]));
        button.addEventListener("click", () => {
          optionalSupports[category][key] = !optionalSupports[category][key];
          renderPlannerSupport(category);
          announceChanged();
        });
        choices.appendChild(button);
      });
      const guidance = document.createElement("p");
      guidance.className = "planner-educator-guidance";
      guidance.textContent = "Educator: optional supports — choose either first, use both, or stop when the student succeeds. Return to an earlier prompt when useful. Structures are possibilities, not required responses; use only language that fits the student's intended meaning and the story. Do not add unsupported events or unnecessary complexity.";
      supportCard.append(guidance, choices);

      if (optionalSupports[category].sentence) {
        const extra = document.createElement("div");
        extra.className = "planner-extra-support";
        const heading = document.createElement("strong");
        heading.textContent = "Sentence Help";
        extra.appendChild(heading);
        if (selectedTarget === "sentence-formulation" && sentencePathway === "combine") {
          const label = document.createElement("label");
          label.textContent = "Educator: select intended relationship";
          const select = document.createElement("select");
          select.setAttribute("aria-label", "Intended sentence relationship");
          Object.entries(relationshipSupports).forEach(([value, data]) => select.add(new Option(data.label, value)));
          select.value = selectedRelationship;
          select.addEventListener("change", () => {
            selectedRelationship = select.value;
            renderAllPlannerSupports();
            announceChanged();
          });
          label.appendChild(select);
          const detail = document.createElement("p");
          const selected = relationshipSupports[selectedRelationship];
          detail.textContent = `${selected.label}. Connecting language: ${selected.words}. Possible structures: ${selected.frames.join("  ")}`;
          extra.append(label, detail);
        } else {
          const text = document.createElement("p");
          text.textContent = support.sentence || "Choose a structure that accurately expresses the student's idea.";
          extra.appendChild(text);
        }
        supportCard.appendChild(extra);
      }

      if (optionalSupports[category].more) {
        const extra = document.createElement("div");
        extra.className = "planner-extra-support";
        const heading = document.createElement("strong");
        heading.textContent = "More Help";
        extra.appendChild(heading);
        if (selectedTarget === "sentence-formulation") {
          const instructions = document.createElement("p");
          instructions.textContent = "Educator only: identify the actual grammatical difficulty. Use the least assistance appropriate; any level may be selected directly. The app does not interpret or correct the student's response. After assistance, have the student reformulate, reduce support when feasible, and reconnect to the surrounding narrative.";
          const label = document.createElement("label");
          label.textContent = "Grammatical support level";
          const select = document.createElement("select");
          select.setAttribute("aria-label", "Grammatical support level");
          grammarLevels.forEach(([name], i) => select.add(new Option(`${i + 1} · ${name}`, String(i + 1))));
          select.value = String(selectedGrammarLevel);
          select.addEventListener("change", () => {
            selectedGrammarLevel = Number(select.value);
            renderAllPlannerSupports();
            announceChanged();
          });
          label.appendChild(select);
          const description = document.createElement("p");
          description.textContent = grammarLevels[selectedGrammarLevel - 1][1];
          extra.append(instructions, label, description);
        } else {
          const text = document.createElement("p");
          text.textContent = support.more || "Break this task into smaller steps without supplying the student's story content.";
          extra.appendChild(text);
        }
        supportCard.appendChild(extra);
      }
    }

    const retryBox = document.createElement("div");
    retryBox.className = "planner-retry-box";

    const retryText = document.createElement("p");
    retryText.textContent = support.retry;

    const retryButton = document.createElement("button");
    retryButton.type = "button";
    retryButton.className = "planner-retry-button";
    retryButton.textContent = retryRequested[category]
      ? "Retrying this idea"
      : "Try it again";

    if (retryRequested[category]) {
      retryButton.classList.add("is-active");
    }

    retryButton.addEventListener("click", () => {
      retryRequested[category] = true;

      const textarea = document.getElementById(
        `planner${capitalize(category)}Notes`
      );

      if (textarea) {
        textarea.focus();
      }

      renderPlannerSupport(category);
      announceChanged();
    });

    retryBox.append(retryText, retryButton);
    supportCard.appendChild(retryBox);


    if (retryRequested[category]) {
      const reconnectBox = document.createElement("div");
      reconnectBox.className = "planner-reconnect-box";

      const reconnectLabel = document.createElement("p");
      reconnectLabel.className = "planner-reconnect-label";
      reconnectLabel.textContent = "Reconnect to the story";

      const reconnectText = document.createElement("p");
      reconnectText.className = "planner-reconnect-text";
      reconnectText.textContent = reconnectPrompt(category);

      reconnectBox.append(reconnectLabel, reconnectText);
      supportCard.appendChild(reconnectBox);
    }

    container.appendChild(supportCard);
    restoreControlFocus();
  }

  function renderAllPlannerSupports() {
    plannerCategories.forEach(renderPlannerSupport);
  }

  function applyStateToUI() {
    const select = document.getElementById(
      "instructionalTarget"
    );

    if (select) {
      select.value = selectedTarget;
    }

    updateTargetOverview();
    updateSessionFlow();
    renderAllPlannerSupports();
  }

  function handleTargetChange(event) {
    const value = event.target.value;
    const previousTarget = selectedTarget;

    selectedTarget =
      value === "off" ||
      value === "observe-first" ||
      targetDefinitions[value]
        ? value
        : "off";

    const targetChosenAfterObserveFirst =
      previousTarget === "observe-first" &&
      Boolean(targetDefinitions[selectedTarget]);

    sessionPhase =
      targetChosenAfterObserveFirst
        ? "part"
        : "first-tell";

    resetAllSectionSupport();
    updateTargetOverview();
    updateSessionFlow();
    renderAllPlannerSupports();
    announceChanged();
  }

  function observePlannerLabels() {
    const observer = new MutationObserver(() => {
      renderAllPlannerSupports();
    });

    plannerCategories.forEach((category) => {
      if (category === "attempt" || category === "resolution") {
        return;
      }

      const label = document.getElementById(
        `planner${capitalize(category)}Label`
      );

      if (label) {
        observer.observe(label, {
          childList: true,
          characterData: true,
          subtree: true
        });
      }
    });
  }


  function handleTellAgainPlannerAvailability(event) {
    tellAgainPlannerAvailable =
      Boolean(event.target.checked);

    updateSessionFlow();
    announceChanged();
  }

  function initialize() {
    if (initialized) {
      return;
    }

    const select = document.getElementById(
      "instructionalTarget"
    );

    if (!select) {
      console.warn(
        "Instructional Support could not start because the target selector is missing."
      );
      return;
    }

    document.getElementById("storyNextStep")?.addEventListener("click", () => {
      const action = workflowActionFor(selectedTarget, sessionPhase);
      if (action.chooseGoal) {
        select.scrollIntoView({ block: "center" });
        select.focus({ preventScroll: true });
        return;
      }
      setSessionPhase(action.phase);
      const destination = document.getElementById(action.phase === "part" ? "storyPlannerIntro" : "storyGrid");
      if (destination) {
        destination.tabIndex = -1;
        destination.scrollIntoView({ block: "start" });
        destination.focus({ preventScroll: true });
      }
    });

    ensurePlannerSupportContainers();

    document
      .querySelectorAll("[data-session-phase]")
      .forEach((button) => {
        button.addEventListener("click", () => {
          setSessionPhase(button.dataset.sessionPhase);
        });
      });

    document
      .getElementById("tellAgainPlannerAvailable")
      ?.addEventListener(
        "change",
        handleTellAgainPlannerAvailability
      );

    document
      .getElementById("studentReflectionReveal")
      ?.addEventListener(
        "click",
        handleStudentReflectionReveal
      );

    document
      .querySelectorAll("[data-student-reflection]")
      .forEach((button) => {
        button.addEventListener(
          "click",
          handleStudentReflectionChoice
        );
      });

    select.addEventListener(
      "change",
      handleTargetChange
    );

    document.getElementById("resetAll")?.addEventListener(
      "click",
      () => {
        sessionPhase = "first-tell";
        resetAllSectionSupport();
        window.setTimeout(() => {
          renderAllPlannerSupports();
          announceChanged();
        }, 60);
      }
    );

    observePlannerLabels();

    initialized = true;

    if (pendingRestoreState) {
      const pending = pendingRestoreState;
      pendingRestoreState = null;
      selectedTarget = pending.target;
      sessionPhase = pending.sessionPhase;
      tellAgainPlannerAvailable =
        pending.tellAgainPlannerAvailable;
      supportLevels = pending.supportLevels;
      optionalSupports = pending.optionalSupports;
      sentencePathway = pending.sentencePathway;
      selectedRelationship = pending.selectedRelationship;
      selectedGrammarLevel = pending.selectedGrammarLevel;
      retryRequested = pending.retryRequested;
      studentReflection = pending.studentReflection;
      studentReflectionOpen = Boolean(studentReflection);
    }

    applyStateToUI();
  }

  window.FirstVoloInstructionalSupport = Object.freeze({
    getState,
    restoreState,
    targets: Object.freeze(
      Object.fromEntries(
        Object.entries(targetDefinitions).map(
          ([key, value]) => [
            key,
            Object.freeze({
              label: value.label,
              expected: value.expected,
              watches: value.watches
            })
          ]
        )
      )
    )
  });

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initialize
    );
  } else {
    initialize();
  }
})();
