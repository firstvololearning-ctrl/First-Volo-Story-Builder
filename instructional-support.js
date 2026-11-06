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
        "Use the Story Planner to practice the selected target where help is needed. Let the learner try first. Open help as needed, ask for a retry, then connect the revised idea to the surrounding story."
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
    feeling: ["Look at what you wrote or listen to what you said about the feeling. Is it a complete sentence?", "Can you express that feeling in one complete sentence?", "Who felt that way? Put who and how they felt in one sentence.", "Try: ‘___ felt ___’ or ‘___ was ___.’"],
    plan: ["Look at what you wrote or listen to what you said about the plan. Is it a complete sentence?", "Can you express the character's plan in one complete sentence?", "Who has the plan? What do they want or intend to do?", "Try: ‘___ wanted to ___’ or ‘___ planned to ___.’"],
    attempt: ["Look at what you wrote or listen to what you said about the action. Is it a complete sentence?", "Can you tell what the character did in one complete sentence?", "Who did something? What did they do?", "Try: ‘___ tried to ___’ or ‘___ [action].’"],
    item: ["Look at what you wrote or listen to what you said about the item. Is it a complete sentence?", "Can you put your idea about the item into one complete sentence?", "Who or what is your sentence about? What are you saying about the item?", "Try: ‘___ used ___ to ___’ or ‘___ [action involving the item].’"],
    resolution: ["Look at what you wrote or listen to what you said about the ending. Is it a complete sentence?", "Can you express what happened at the end in one complete sentence?", "Who or what is involved in the outcome? What happened or changed?", "Try: ‘In the end, ___’ or ‘Finally, ___.’"]
  };

  const combineSentencePrompts = {
    character: ["Look or listen for related ideas about the character.", "Can you put those two ideas about the character into one sentence?", "Does one idea describe, explain, or add to the other?"],
    setting: ["Look or listen for an event and information about where or when it happened.", "Can you combine the event and the setting information?", "How could where or when fit into the sentence?"],
    problem: ["Look or listen for an event and something that changed or went wrong.", "Can you connect the related ideas in one sentence?", "Does one happen before, cause, or interrupt the other?"],
    feeling: ["Look or listen for a feeling and a related event or reason.", "Can you combine those ideas into one sentence?", "Does the event explain the feeling, or are the ideas related in another way?"],
    plan: ["Look or listen for a plan and a related reason or purpose.", "Can you express those connected ideas in one sentence?", "What does the character want to accomplish, and how does that relate to the plan?"],
    attempt: ["Look or listen for an action and another related idea.", "Can you connect those ideas in one sentence?", "Tell how the ideas fit. Are you saying when it happened, why it happened, or what the character wanted to do?"],
    item: ["Look or listen for an item and a related description or action.", "Can you include the related ideas in one sentence?", "How is the item used, described, or connected to an action?"],
    resolution: ["Look or listen for an attempt and a related outcome.", "Can you connect those ideas in one sentence?", "Did one lead to the other, or was the outcome unexpected?"]
  };

  // Wording approved for initial use; retain educator judgment and student meaning.
  const reviewedTargetPrompts = {
    "story-organization": {
      "character": {
        "lookListen": "Listen to the beginning of your story. Who do you hear about?",
        "think": "Who is your story mostly about?",
        "clue": "If it’s hard to tell who the story is about, name the main character near the beginning.",
        "sentenceHelp": "The story is about ___.",
        "moreHelp": "Ask the student to identify the main character in their own story. Contrast an introduction with an action from later in the story, then have the student place their introduction where the listener needs it.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "setting": {
        "lookListen": "Look or listen for information about where or when the story begins.",
        "think": "Where does this part happen?",
        "clue": "If the place matters, add it where this part begins. If the time matters more, tell when it happens.",
        "sentenceHelp": "At/In ___, ___. / The story begins ___.",
        "moreHelp": "Identify a relevant place or time already established in the student’s story. Help the student decide whether the listener needs it before the next event; do not add a new setting.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "problem": {
        "lookListen": "Listen to the beginning. Can your listener tell what the character is trying to do?",
        "think": "What was the character trying to do, and what got in the way?",
        "clue": "Put the problem where the listener needs it. If Maya is already searching, tell us what she lost.",
        "sentenceHelp": "The problem is ___. / ___ wanted ___, but ___.",
        "moreHelp": "Separate the problem from a later response or attempt using the student’s own content. Ask which part creates the difficulty and where the listener needs to hear it.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "feeling": {
        "lookListen": "Look or listen for a feeling that matters to this part of your story.",
        "think": "Where would it help to tell how the character feels?",
        "clue": "If the feeling helps explain this part, put it near the moment it belongs to.",
        "sentenceHelp": "At that point, ___ felt ___.",
        "moreHelp": "Check whether the student intends a feeling here. If so, help locate it near the event it relates to; accept a feeling conveyed through action or dialogue when that serves the target.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "plan": {
        "lookListen": "Look or listen for what the character intends or decides to do.",
        "think": "What did the character plan to do?",
        "clue": "If your story has a plan, tell it where the listener needs it. Then tell what the character actually did.",
        "sentenceHelp": "___ planned to ___. / ___ wanted to ___.",
        "moreHelp": "Use the student’s own plan and action to distinguish intention from performance. If the story has no stated plan, decide whether adding one serves the narrative target; do not invent it.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "attempt": {
        "lookListen": "Look or listen for what the character actually does.",
        "think": "What did the character actually do?",
        "clue": "Tell the action where it belongs in the story. If there were two tries, put them where the listener can follow them.",
        "sentenceHelp": "___ did ___. / ___ tried to ___.",
        "moreHelp": "Identify the student’s intended action, then place it relative to the problem and any plan. If more than one attempt matters, organize those attempts without requiring a successful outcome.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "resolution": {
        "lookListen": "Look or listen for the outcome at the end of your story.",
        "think": "How did things turn out?",
        "clue": "Tell what changed or what was still a problem at the end.",
        "sentenceHelp": "In the end, ___. / The problem was still ___.",
        "moreHelp": "Compare the ending with the original problem using the student’s content. Help the student explain the actual outcome; do not require success or attribute the outcome to an attempt without support.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      }
    },
    "connections-cohesion": {
      "character": {
        "lookListen": "Look or listen for the names and pronouns used for the characters.",
        "think": "Who do you mean by “she,” “he,” or “they”?",
        "clue": "If the word could mean two people, use the name of the person you mean.",
        "sentenceHelp": "___ [name] ___. Then ___ [name or clear pronoun] ___.",
        "moreHelp": "Ask who a potentially unclear reference means. Contrast the possible referents already in the story and let the student choose; revise the reference without changing the event.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "setting": {
        "lookListen": "Listen to the two events. Can your listener tell when they happened?",
        "think": "Did one happen first, or were they happening at the same time?",
        "clue": "Try “after” if one came first, or “while” if they happened together.",
        "sentenceHelp": "Before ___, ___. / After ___, ___. / While ___, ___.",
        "moreHelp": "Use the learner’s two events. If they happened at the same time, model the link, as in “While Maya looked under the bench, Leo checked the swings.” Invite a retry using the learner’s own events.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "problem": {
        "lookListen": "Look or listen to the transition from what was happening to the problem.",
        "think": "What was happening when the problem began?",
        "clue": "If the problem interrupted something, try “Maya was ___ when ___.”",
        "sentenceHelp": "Then ___. / ___ was ___ when ___. / ___, but ___.",
        "moreHelp": "Use the student’s two intended ideas to establish sequence, interruption, or contrast first. Offer connecting language for that relationship rather than a mixed list of unrelated connectors.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "feeling": {
        "lookListen": "Look or listen to how the feeling connects with nearby story information.",
        "think": "When did the character start feeling that way?",
        "clue": "If it happened after an event, try “After ___, Maya felt ___.”",
        "sentenceHelp": "After ___, ___ felt ___. / ___ felt ___ because ___.",
        "moreHelp": "Distinguish time from a reason for the feeling. Use a causal frame only if the student means that the event explains the feeling.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "plan": {
        "lookListen": "Look or listen to the plan and the idea you want to connect it with.",
        "think": "Did the character make the plan before or after that event?",
        "clue": "Use “before” or “after” if the listener needs help placing the plan in time.",
        "sentenceHelp": "___ planned to ___. / ___ planned to ___ because ___.",
        "moreHelp": "Clarify whether the student intends reason, purpose, or sequence. Choose a connector or clear reference for that relationship; do not require a feeling to cause every plan.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "attempt": {
        "lookListen": "Look or listen to how the action connects with the surrounding events.",
        "think": "Which action happened first?",
        "clue": "Try “first” and “then” if the listener can’t tell the order from what you said.",
        "sentenceHelp": "After ___, ___. / Then ___ [clear character reference] ___.",
        "moreHelp": "Have the student identify the actor and the event before or after the action. Repair unclear order or references; add a causal or purpose link only when intended.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "item": {
        "lookListen": "Look or listen for how the object is introduced and referred to later.",
        "think": "Which thing do you mean by “it” or “that”?",
        "clue": "Name the object where the listener might be unsure.",
        "sentenceHelp": "___ found a ___. / The ___ / It ___ [when the reference is clear].",
        "moreHelp": "Identify the intended object and each reference to it. Clarify the name or reference first; do not assume the character uses the object to solve the problem.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "resolution": {
        "lookListen": "Look or listen to the link between the earlier events and the ending.",
        "think": "Did the ending turn out the way the character expected?",
        "clue": "If it turned out differently, try “Maya expected ___, but ___.”",
        "sentenceHelp": "After ___, ___. / ___, so ___. / ___, but ___.",
        "moreHelp": "Establish the student’s intended relationship, then choose a time, result, or contrast structure. Do not treat finally as evidence of cause.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      }
    },
    "cause-effect": {
      "problem": {
        "lookListen": "Look or listen for what may have caused the problem or what followed from it.",
        "think": "What made the problem happen?",
        "clue": "If one event caused the problem, try “The problem started because ___.”",
        "sentenceHelp": "___ happened because ___. / ___ happened, so ___.",
        "moreHelp": "Choose one direction: reason for the problem or consequence of the problem. Identify the two supported ideas, then help express that causal link without reversing it.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "feeling": {
        "lookListen": "Look or listen for the feeling and the information that may explain it.",
        "think": "Why did the character feel that way?",
        "clue": "Use a detail from your story that helps explain the feeling.",
        "sentenceHelp": "___ felt ___ because ___.",
        "moreHelp": "Check the intended feeling and possible reason with the student. If the reason is unknown, permit uncertainty or decide to work on another supported causal relationship.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "plan": {
        "lookListen": "Look or listen for why the character chooses the plan.",
        "think": "Why did the character choose that plan?",
        "clue": "Tell what made that plan seem like a good choice to the character.",
        "sentenceHelp": "___ planned to ___ because ___.",
        "moreHelp": "Separate the problem, any relevant feeling or belief, and the intended plan. Have the student select the reason they mean; a feeling is not a required cause.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "attempt": {
        "lookListen": "Look or listen for what the character does and what they intend to achieve.",
        "think": "What happened because the character did that?",
        "clue": "If the action made something change, tell what changed. If you’re explaining what the character hoped to do, say that instead.",
        "sentenceHelp": "___ did ___ to ___. / ___ did ___, so ___.",
        "moreHelp": "Contrast purpose and actual result using the student’s own story. Select one relationship for the current attempt; do not turn an intention into a successful consequence.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "item": {
        "lookListen": "Look or listen for the object and any effect it has on what happens.",
        "think": "Did using the object change what happened? How?",
        "clue": "Tell what changed if it did. The object might help, make things harder, or make no difference.",
        "sentenceHelp": "Because ___, ___. / ___ used ___, so ___.",
        "moreHelp": "Establish whether the object is actually used or has another relevant effect. If no causal connection is supported, do not require one; select another meaningful causal target.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "resolution": {
        "lookListen": "Look or listen for the outcome and what may have led to it.",
        "think": "What made the ending turn out that way?",
        "clue": "Use an event from your story that helps explain the ending. You can leave the reason open if the story doesn’t show it.",
        "sentenceHelp": "___ happened because ___. / ___, so ___.",
        "moreHelp": "Identify outcome and cause separately. Check direction with the student, then combine them; keep intended goals separate from actual results and allow an unresolved outcome.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      }
    },
    "elaboration": {
      "character": {
        "lookListen": "Look or listen to what you have said about the character.",
        "think": "What could you tell us about this character that would help us understand this part?",
        "clue": "Try adding one detail about what the character did or what they were like.",
        "sentenceHelp": "___ is ___. / ___ [relevant action or description].",
        "moreHelp": "Ask what the listener still needs to understand about the character. Offer meaningful categories of detail, then have the student choose content that belongs in their story.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "setting": {
        "lookListen": "Look or listen to the place or time information already in your story.",
        "think": "What could we see or hear in this place?",
        "clue": "Add one detail that helps the listener picture where this happened.",
        "sentenceHelp": "At/In ___, ___. / The place was ___.",
        "moreHelp": "Identify what the listener cannot yet picture or understand. Invite one relevant place or time detail without requiring a causal explanation.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "problem": {
        "lookListen": "Look or listen to how you describe the problem.",
        "think": "What would help us picture what went wrong?",
        "clue": "Try telling exactly what got in the character’s way.",
        "sentenceHelp": "The problem was ___. / ___ could not ___ because ___.",
        "moreHelp": "Identify an information gap in the student’s account. Help choose a relevant detail; do not add escalation, obstacles, or stakes not intended by the student.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "feeling": {
        "lookListen": "Look or listen to how the feeling is expressed.",
        "think": "How could we tell how the character was feeling?",
        "clue": "If your story gives a clue, add what the character said, did, or looked like.",
        "sentenceHelp": "___ felt ___. / ___ [an action or words expressing the feeling].",
        "moreHelp": "Ask whether the student wants to name, explain, or show the feeling. Offer categories rather than inventing behavior; do not require both a feeling label and an explanation.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "plan": {
        "lookListen": "Look or listen to the plan you have expressed.",
        "think": "What exactly was the character going to do?",
        "clue": "Add one detail that makes the plan easier to picture, like where they meant to look.",
        "sentenceHelp": "___ planned to ___. / The goal was ___.",
        "moreHelp": "Identify what remains unclear about the intention. Have the student supply one needed detail and distinguish it from an action already completed.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "attempt": {
        "lookListen": "Look or listen to the action you have described.",
        "think": "How did the character do that?",
        "clue": "Add one detail about how it happened, like what they used or where they looked.",
        "sentenceHelp": "___ [action] ___. / ___ did ___ by ___.",
        "moreHelp": "Choose one unclear part of the action with the student. Break it into meaningful components, then add the component the listener needs.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "item": {
        "lookListen": "Look or listen to the information about the object.",
        "think": "What about the object would help us picture it or understand how it was used?",
        "clue": "Add one detail that matters here, like whether the bag was open or shut.",
        "sentenceHelp": "The ___ was ___. / ___ used the ___ to ___.",
        "moreHelp": "Identify why the object is included in this story. Invite a description or actual use that supports that purpose; do not speculate about imaginary uses.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "resolution": {
        "lookListen": "Look or listen to the outcome you have told.",
        "think": "What was different at the end?",
        "clue": "Add one detail about what changed or what stayed the same.",
        "sentenceHelp": "In the end, ___. / ___ was still ___.",
        "moreHelp": "Compare the ending with what the listener still needs to know. Help the student add one relevant outcome detail; do not require a new causal clause or moral.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      }
    },
    "perspective-internal-state": {
      "character": {
        "lookListen": "Look or listen for information about what the character wants, thinks, feels, or knows.",
        "think": "What does the character think, feel, or want here?",
        "clue": "Use something the character said or did as a clue. You can say “might” if you aren’t sure.",
        "sentenceHelp": "___ wanted ___. / ___ may have thought ___.",
        "moreHelp": "Identify a relevant internal state with the student and ask what supports it. Distinguish an explicit statement from an inference; allow uncertainty or more than one supported interpretation.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "problem": {
        "lookListen": "Look or listen for what the character notices or knows about the problem.",
        "think": "What does the character know about the problem right now?",
        "clue": "Tell what the character saw or heard. They might know less than the listener does.",
        "sentenceHelp": "___ knew ___. / ___ did not know ___. / ___ may have thought ___.",
        "moreHelp": "Compare what is available to the character with what is available to the listener. Use a knowledge or belief statement only if the story supports that distinction.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "feeling": {
        "lookListen": "Look or listen for the feeling and the surrounding story information.",
        "think": "How might the character feel right here?",
        "clue": "Look at what happened to this character. What in the story makes that feeling possible?",
        "sentenceHelp": "___ felt ___. / ___ may have felt ___ because ___.",
        "moreHelp": "Check whether the feeling is stated or inferred. Identify support with the student; do not replace their intended feeling or demand a single emotion when alternatives fit.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "plan": {
        "lookListen": "Look or listen for what the character wants or expects when making the plan.",
        "think": "What does the character hope will happen?",
        "clue": "Tell what they hoped for at that point, even if it turned out differently.",
        "sentenceHelp": "___ wanted to ___. / ___ hoped that ___.",
        "moreHelp": "Separate the intended goal or expectation from the actual outcome. Ask the student which internal state is supported and relevant; do not require the plan to come from a feeling.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "attempt": {
        "lookListen": "Look or listen for the character’s action and any supported reason for choosing it.",
        "think": "What might the character be trying to do here?",
        "clue": "Use the action as a clue. If there are several possibilities, say “might.”",
        "sentenceHelp": "___ did ___ because they wanted ___. / ___ may have hoped ___.",
        "moreHelp": "Check whether the motive is explicit or inferred. Identify supporting story information; if it is unknown, permit uncertainty rather than supplying a motive.",
        "retry": "Try this part again in your own words. Keep the meaning you intend; use less help if you can.",
        "reconnect": "Tell this part with the relevant part before or after it, then return to the whole story."
      },
      "resolution": {
        "lookListen": "Look or listen for what the story shows about the character at the end.",
        "think": "At the end, what does the character think, know, or feel?",
        "clue": "Say what the story shows. Their thoughts or feelings can stay the same, change, or be unclear.",
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

  const goalChecklistItems = {
    "story-organization": [
      ["orient", "Introduce the main character and tell where the story happens if the place matters?"],
      ["problem", "Tell what the character was trying to do or what got in the way?"],
      ["order", "Arrange the important story events so the listener could follow what happened?"],
      ["ending", "Tell how the story ended, including what changed or what was still a problem?"]
    ],
    "connections-cohesion": [
      ["reference", "Name the person or object when a word like “she,” “they,” or “it” could be unclear?"],
      ["link", "Show how two events fit in time, such as which came first or whether they happened together?"]
    ],
    "cause-effect": [
      ["cause", "Explain why an event happened using a reason that fits the story?"],
      ["reason", "Explain what changed because of an action or event?"]
    ],
    "sentence-formulation": [
      ["build", "Say or write a complete sentence that tells who or what the idea is about and what happened or was true?"],
      ["combine", "Put two related ideas into one clear sentence that keeps the meaning they intended?"]
    ],
    elaboration: [["detail", "Add one specific detail that helps the listener picture a person, place, or action?"]],
    "perspective-internal-state": [
      ["state", "Tell what a character felt, thought, knew, or wanted at a particular moment in the story?"],
      ["inference", "Point to something the character saw, heard, said, or did that supports what they might think or feel?"]
    ]
  };
  const goalRatingOptions = ["Independent", "With support", "Not yet", "Not observed"];
  let goalRatings = {};

  let givenPrompts = {};

  function normalizeGivenPrompts(saved) {
    const result = {};
    for (const target of Object.keys(goalChecklistItems)) {
      const entries = saved?.[target];
      if (!Array.isArray(entries)) continue;
      result[target] = [...new Set(entries.filter(entry => typeof entry === "string" && entry.length <= 180))].slice(0, 200);
    }
    return result;
  }

  function givenPromptControl(category, label) {
    const target = selectedTarget;
    const part = {
      character: "Character", setting: "Setting", problem: "Problem", feeling: "Feeling",
      plan: "Plan", attempt: "Action / Attempt(s)", resolution: "Resolution", item: "Item"
    }[category];
    const entry = `${part} · ${label}`;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "planner-more-help-button";
    button.setAttribute("aria-label", `Mark ${entry} as given`);
    const refresh = () => {
      const marked = Boolean(givenPrompts[target]?.includes(entry));
      button.textContent = marked ? "✓ Given · undo" : "Mark as given";
      button.setAttribute("aria-pressed", String(marked));
    };
    button.addEventListener("click", () => {
      const entries = givenPrompts[target] || [];
      givenPrompts[target] = entries.includes(entry)
        ? entries.filter(value => value !== entry)
        : [...entries, entry];
      refresh();
      announceChanged();
    });
    refresh();
    return button;
  }

  function appendSessionSummary(fields, comparison, target, skill, record) {
    const details = document.createElement("details");
    details.className = "educator-session-summary";
    const heading = document.createElement("summary");
    heading.textContent = "Session summary";
    const label = document.createElement("label");
    label.textContent = "Copy this summary for your notes";
    const summary = document.createElement("textarea");
    summary.readOnly = true;
    summary.rows = 6;
    const refresh = () => {
      const given = givenPrompts[target] || [];
      summary.value = [
        `Story Goal: ${targetDefinitions[target].label}`,
        `Skill: ${skill}`,
        ...[["first-tell", "First Tell"], ["tell-again", "Tell Again"]].map(([phase, name]) => {
          const { rating, note } = record[phase];
          return `${name}: ${rating || "Unrated"}${note.trim() ? " — " + note.trim() : ""}`;
        }),
        `Prompts marked as given during teaching: ${given.join("; ") || "None recorded"}`
      ].join("\n");
    };
    label.append(summary);
    const copy = document.createElement("button");
    copy.type = "button";
    copy.className = "planner-more-help-button";
    copy.textContent = "Copy summary";
    const status = document.createElement("p");
    status.setAttribute("role", "status");
    copy.addEventListener("click", async () => {
      refresh();
      try {
        await navigator.clipboard.writeText(summary.value);
        status.textContent = "Summary copied.";
      } catch {
        summary.select();
        status.textContent = "Summary selected. Use your browser’s Copy command.";
      }
    });
    comparison.addEventListener("input", refresh);
    comparison.addEventListener("change", refresh);
    refresh();
    details.append(heading, label, copy, status);
    fields.append(details);
  }

  function normalizeGoalRatings(saved) {
    const result = {};
    for (const [target, items] of Object.entries(goalChecklistItems)) {
      const record = saved?.[target];
      if (!items.some(([id]) => id === record?.item)) continue;
      const entry = { item: record.item };
      for (const phase of ["first-tell", "tell-again"]) {
        const evidence = record[phase];
        entry[phase] = {
          rating: goalRatingOptions.includes(evidence?.rating) ? evidence.rating : "",
          note: typeof evidence?.note === "string" ? evidence.note.slice(0, 500) : ""
        };
      }
      result[target] = entry;
    }
    return result;
  }

  function renderGoalChecklist() {
    const panel = document.getElementById("educatorGoalChecklist");
    const fields = document.getElementById("educatorGoalRatingFields");
    if (!panel || !fields) return;

    const items = goalChecklistItems[selectedTarget];
    panel.hidden = !items;
    fields.replaceChildren();
    if (!items) return;

    const target = selectedTarget;
    const record = goalRatings[target];
    if (record && sessionPhase !== "first-tell") {
      const skill = document.createElement("p");
      const question = items.find(([id]) => id === record.item)[1];
      skill.textContent = `Did the student ${question[0].toLowerCase() + question.slice(1)}`;
      fields.append(skill);
      if (sessionPhase === "part") return;
    } else {
      const prompt = document.createElement("label");
      prompt.textContent = "Choose one skill to rate in both tells";
      const choice = document.createElement("select");
      choice.add(new Option("Select a skill", ""));
      for (const [id, label] of items) choice.add(new Option(label, id));
      choice.value = record?.item || "";
      choice.addEventListener("change", () => {
        if (record?.item && ["first-tell", "tell-again"].some(phase => record[phase]?.rating || record[phase]?.note)) {
          if (!window.confirm("Change the skill? This clears both ratings and notes for this goal.")) {
            choice.value = record.item;
            return;
          }
        }
        goalRatings = normalizeGoalRatings({ ...goalRatings, [target]: { item: choice.value } });
        renderGoalChecklist();
        (fields.querySelector("select") || panel).focus();
        announceChanged();
      });
      prompt.append(choice);
      fields.append(prompt);
    }
    if (!record || sessionPhase === "part") return;

    const comparison = document.createElement("div");
    comparison.className = "educator-goal-comparison";
    const tells = [["first-tell", "First Tell"]];
    if (sessionPhase === "tell-again") tells.push(["tell-again", "Tell Again"]);
    for (const [phase, name] of tells) {
      const group = document.createElement("fieldset");
      const legend = document.createElement("legend");
      legend.textContent = name;
      const ratingLabel = document.createElement("label");
      ratingLabel.textContent = "Rating";
      const rating = document.createElement("select");
      rating.add(new Option("Unrated", ""));
      for (const option of goalRatingOptions) rating.add(new Option(option, option));
      rating.value = record[phase].rating;
      rating.disabled = sessionPhase === "tell-again" && phase === "first-tell";
      rating.addEventListener("change", () => {
        record[phase].rating = rating.value;
        announceChanged();
      });
      ratingLabel.append(rating);
      const noteLabel = document.createElement("label");
      noteLabel.textContent = "Evidence or exact words";
      const note = document.createElement("textarea");
      note.maxLength = 500;
      note.rows = 2;
      note.value = record[phase].note;
      note.readOnly = rating.disabled;
      note.addEventListener("input", () => {
        record[phase].note = note.value;
        announceChanged();
      });
      noteLabel.append(note);
      group.append(legend, ratingLabel, noteLabel);
      comparison.append(group);
    }
    fields.append(comparison);
    if (sessionPhase === "tell-again") {
      appendSessionSummary(fields, comparison, target, items.find(([id]) => id === record.item)[1], record);
    }
  }

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
      studentReflection,
      goalRatings: normalizeGoalRatings(goalRatings),
      givenPrompts: normalizeGivenPrompts(givenPrompts)
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
      studentReflection: reflection,
      goalRatings: normalizeGoalRatings(state?.goalRatings),
      givenPrompts: normalizeGivenPrompts(state?.givenPrompts)
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
    goalRatings = normalized.goalRatings;
    givenPrompts = normalized.givenPrompts;
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
    renderGoalChecklist();

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
    if (target === "observe-first") return { label: "After the first tell, choose a Story Goal →", chooseGoal: true, hint: "Listen to the whole story first. Then choose one goal if teaching is needed." };
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
    const completion = document.getElementById("storyStepCompletion");
    if (completion) completion.hidden = !cycleIsOn;

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
            "Choose a Story Goal after the First Tell."
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
          "Let the student attempt the language first. If help is needed, use the three prompts and optional sentence starters or educator coaching as appropriate. Have the student retry and reconnect the repaired idea to the story.";
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
      if (replacement?.closest("details")) replacement.closest("details").open = true;
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

    const promptNavigation = document.createDocumentFragment();
    if (level > 0 && level < 3) {
      const moreButton = document.createElement("button");
      moreButton.type = "button";
      moreButton.className = "planner-more-help-button";
      moreButton.textContent = "Next question or clue";

      moreButton.addEventListener("click", () => {
        supportLevels[category] = Math.min(
          3,
          supportLevels[category] + 1
        );
        retryRequested[category] = false;
        renderPlannerSupport(category);
        announceChanged();
      });

      promptNavigation.appendChild(moreButton);
    }

    if (level > 1) {
      const previous = document.createElement("button");
      previous.type = "button";
      previous.className = "planner-more-help-button";
      previous.textContent = "Previous question or clue";
      previous.addEventListener("click", () => {
        supportLevels[category] -= 1;
        renderPlannerSupport(category);
        announceChanged();
      });
      promptNavigation.appendChild(previous);
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
      "SAY TO THE LEARNER";

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
      stepText,
      givenPromptControl(category, stepLabel.textContent)
    );

    {
      const options = document.createElement("details");
      options.open = Boolean(optionalSupports[category].sentence || optionalSupports[category].more);
      const summary = document.createElement("summary");
      summary.textContent = "Need more help?";
      const choices = document.createElement("div");
      choices.className = "planner-support-choices";
      choices.append(promptNavigation);
      [["sentence", "Sentence starters & examples"], ["more", "Coaching ideas for educators"]].forEach(([key, label]) => {
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
      options.append(summary, choices);
      supportCard.append(options);

      if (optionalSupports[category].sentence) {
        const extra = document.createElement("div");
        extra.className = "planner-extra-support";
        const heading = document.createElement("strong");
        heading.textContent = "Sentence starters & examples";
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
        extra.appendChild(givenPromptControl(category, "Sentence Help" +
          (selectedTarget === "sentence-formulation" ? ` · ${sentencePathways[sentencePathway]}` +
            (sentencePathway === "combine" ? ` · ${relationshipSupports[selectedRelationship].label}` : "") : "")));
        options.appendChild(extra);
      }

      if (optionalSupports[category].more) {
        const extra = document.createElement("div");
        extra.className = "planner-extra-support";
        const heading = document.createElement("strong");
        heading.textContent = "Coaching ideas for educators";
        const guidance = document.createElement("p");
        guidance.textContent = "Ask about one unclear part. Offer a choice or model a sentence using the learner’s story details, then invite another try.";
        extra.append(heading, guidance);
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
        extra.appendChild(givenPromptControl(category, "Coaching Ideas" +
          (selectedTarget === "sentence-formulation" ? ` · ${grammarLevels[selectedGrammarLevel - 1][0]}` : "")));
        options.appendChild(extra);
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
    renderGoalChecklist();
  }

  function handleTargetChange(event) {
    const value = event.target.value;

    selectedTarget =
      value === "off" ||
      value === "observe-first" ||
      targetDefinitions[value]
        ? value
        : "off";

    sessionPhase = "first-tell";

    resetAllSectionSupport();
    updateTargetOverview();
    updateSessionFlow();
    renderAllPlannerSupports();
    renderGoalChecklist();
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
      const ownIdeas = document.getElementById("storyIdeaMode")?.value === "own";
      const destination = document.getElementById(action.phase === "part" ? "storyPlannerIntro" : ownIdeas ? "writingPanel" : "storyGrid");
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
        goalRatings = {};
        givenPrompts = {};
        renderGoalChecklist();
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
      goalRatings = pending.goalRatings;
      givenPrompts = pending.givenPrompts;
      studentReflection = pending.studentReflection;
      studentReflectionOpen = Boolean(studentReflection);
    }

    applyStateToUI();
  }

  function getPrintGuidance(visibleParts) {
    const target = targetDefinitions[selectedTarget];
    if (!target) return null;

    const part = visibleParts.includes("problem") && target.relevant.includes("problem")
      ? "problem"
      : visibleParts.find(category => target.relevant.includes(category));
    const support = part ? supportFor(part) : null;
    return {
      goal: target.label,
      skill: goalChecklistItems[selectedTarget]?.find(([id]) => id === goalRatings[selectedTarget]?.item)?.[1],
      studentGoal: target.studentGoal,
      listen: target.watches,
      part,
      prompts: support ? [
        ...supportStepLabels.slice(0, 3).map((label, index) => [label, support.steps[index]]),
        ["Sentence starters & examples", support.sentence || "Offer a sentence starter that fits the learner’s intended meaning."],
        ["Coaching ideas for educators", support.more || "Model one possible structure using the learner’s own idea, then invite a retry."]
      ] : []
    };
  }

  window.FirstVoloInstructionalSupport = Object.freeze({
    getState,
    getPrintGuidance,
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
