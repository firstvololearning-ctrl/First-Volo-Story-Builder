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

  const targetDefinitions = {
    "story-organization": {
      label: "Story Organization",
      studentGoal: "Make my story easy to follow.",
      lookFor: "Did I include the important story parts and put them together in a way that makes sense?",
      reflection: "Did I make my story easy to follow?",
      expected:
        "Student is expected to organize the important parts of the story into a coherent narrative: who/where → problem → feeling → plan → action/attempt → resolution.",
      watches:
        "Watch for a missing or misplaced story function, a plan that does not grow from the problem, an attempt that does not carry out the plan, or an ending that does not resolve the story problem.",
      relevant: ["character", "setting", "problem", "feeling", "plan", "attempt", "resolution"],
      build(category) {
        const maps = {
          character: [
            "Look at who the story is about. Make the main character clear before the problem begins.",
            "Who is the main character?",
            "Name or describe the character clearly enough for the listener to follow the story.",
            "Think: character → problem.",
            "The story is about ___."
          ],
          setting: [
            "Look at where the story begins. Make the setting clear before the problem begins.",
            "Where is the character when the story starts?",
            "Give the place or time information needed to understand the beginning.",
            "Think: character + setting → problem.",
            "At/In ___, the character ___."
          ],
          problem: [
            "Look at what goes wrong. This problem should change what the character needs or wants to do.",
            "What is the main problem the character needs to deal with?",
            "Say the problem clearly before moving on.",
            "Think: problem → feeling → plan.",
            "The main problem is ___."
          ],
          feeling: [
            "Look at the problem and the character’s feeling together.",
            "How does the character feel because of what happened?",
            "Make the feeling connect to the problem.",
            "Think: problem → feeling.",
            "The character felt ___ because ___."
          ],
          plan: [
            "Look at the problem and how the character feels. The plan should grow from both.",
            "What does the character decide or hope to do next?",
            "Tell the goal or intention. Do not tell the actual attempt yet.",
            "Think: problem + feeling → plan.",
            "The character felt ___, so they planned to ___."
          ],
          attempt: [
            "Look back at the plan. Now tell what the character actually does or tries.",
            "What does the character do to carry out the plan?",
            "The attempt should be an action, not another plan.",
            "Think: plan → action/attempt.",
            "To carry out the plan, the character tried to ___."
          ],
          resolution: [
            "Look back at the problem and what the character tried.",
            "What happened because of the attempt? How is the problem resolved?",
            "The ending should show an outcome, not a new unrelated event.",
            "Think: attempt → outcome → resolution.",
            "In the end, ___."
          ]
        };
        return maps[category] || [];
      },
      retry(category) {
        const text = {
          character: "Now introduce the character again so it is clear who the story is about.",
          setting: "Now introduce the setting again so it is clear where the story begins.",
          problem: "Now try the problem again so it is clear what needs to change.",
          feeling: "Now try the feeling again so it clearly connects to the problem.",
          plan: "Now say the plan again so it clearly grows from the problem and feeling.",
          attempt: "Now say what the character actually tries so it clearly carries out the plan.",
          resolution: "Now try the ending again so it clearly follows from the attempt and resolves the problem."
        };
        return text[category] || "Now try the same story part again.";
      }
    },

    "connections-cohesion": {
      label: "Connections & Cohesion",
      studentGoal: "Connect my story ideas.",
      lookFor: "Did I show how my ideas and events connect?",
      reflection: "Did I connect my story ideas?",
      expected:
        "Student is expected to connect ideas and events rather than produce isolated statements, using clear relationships, sequencing, connectors, and referents.",
      watches:
        "Watch for choppy event-list language, repeated and then, abrupt shifts, unclear pronouns/referents, or ideas that are present but not clearly connected.",
      relevant: plannerCategories,
      build(category, c) {
        const maps = {
          character: [
            "Think about the character and where the story begins.",
            `How can ${storyCharacter(c)} connect to ${storySetting(c)}?`,
            "Explain why the character is there or what the character is doing there.",
            "Try when, while, at, or because if one fits what you mean.",
            `${capitalize(storyCharacter(c))} was at ${storySetting(c)} when ___.`
          ],
          setting: [
            "Connect the setting to what the character is doing there.",
            `What is ${storyCharacter(c)} doing in ${storySetting(c)}?`,
            "Tell how the character and place fit together.",
            "Try when, while, at, or because if one fits.",
            `While ${storyCharacter(c)} was in ${storySetting(c)}, ___.`
          ],
          problem: [
            "Connect the problem to what was happening before it.",
            "How does the problem change the story?",
            "Show the change from the beginning to the problem.",
            "Try but, when, suddenly, or after if one fits.",
            "Everything changed when ___."
          ],
          feeling: [
            "Connect the feeling to the problem.",
            "Why does the character feel that way now?",
            "Tell how the event connects to the feeling.",
            "Try because, when, after, or so if one fits.",
            `The character felt ${storyFeeling(c)} because ___.`
          ],
          plan: [
            "Connect the plan to the problem and the character’s feeling.",
            "Why does this plan make sense now?",
            "Show how the problem and feeling lead to the plan.",
            "Try because, so, wants to, hopes to, or plans to.",
            "The character felt ___, so they planned to ___."
          ],
          attempt: [
            "Connect the attempt to the plan.",
            "What does the character actually do to carry out the plan?",
            "Show how the action follows from the plan.",
            "Try then, so, to, or by if one helps.",
            "To carry out the plan, the character ___."
          ],
          item: [
            "Connect the item to the plan or attempt.",
            `How could ${storyItem(c)} matter to what the character wants or tries to do?`,
            "Explain how the character uses the item or why it matters.",
            "Try with, by using, so, or because if one fits.",
            `The character used ${storyItem(c)} to ___.`
          ],
          resolution: [
            "Connect the ending to the attempt.",
            "What happened because of what the character tried?",
            "Show how the action leads to the outcome.",
            "Try after, because, so, finally, or as a result.",
            "After the character tried to ___, ___."
          ]
        };
        return maps[category] || [];
      },
      retry() {
        return "Now say or write the same ideas again so it is clear how they connect.";
      }
    },

    "cause-effect": {
      label: "Cause & Effect",
      studentGoal: "Make the cause clear.",
      lookFor: "Did I explain why it happened or what happened because of it?",
      reflection: "Did I make the cause clear?",
      expected:
        "Student is expected to explain why important events or feelings occur, how the problem and feeling lead to a plan, and what happens because of the character’s attempt.",
      watches:
        "Watch for events that are both present but whose cause-and-effect connection is unclear, a plan with no reason, an attempt with no result, or missing causal language such as because or so.",
      relevant: ["problem", "feeling", "plan", "attempt", "item", "resolution"],
      build(category, c) {
        const maps = {
          problem: [
            "Look at what happened before and after the problem.",
            "What changes because the problem happens?",
            "Tell why something happened or what happened because of it.",
            "Think: cause → result. Because or so may help.",
            "Because ___, ___."
          ],
          feeling: [
            "Look at the problem and feeling together.",
            `Why might the character feel ${storyFeeling(c)}?`,
            "Explain what caused the feeling.",
            "Try because to explain why.",
            `The character felt ${storyFeeling(c)} because ___.`
          ],
          plan: [
            "Look at the problem, feeling, and plan together.",
            "Why does the character choose this plan?",
            "Explain how the problem and feeling lead to the plan.",
            "Try because, so, wants to, hopes to, or plans to.",
            "The character felt ___, so they planned to ___."
          ],
          attempt: [
            "Look at the plan and what the character actually tries.",
            "What action does the character take because of the plan?",
            "Show that the attempt happens for a reason.",
            "Try so, to, because, or in order to.",
            "The character tried to ___ so that ___."
          ],
          item: [
            "Look at the item and the attempt.",
            `What could happen because the character uses ${storyItem(c)}?`,
            "Explain how the item changes what the character can do.",
            "Try so, because, or by using.",
            `The character used ${storyItem(c)}, so ___.`
          ],
          resolution: [
            "Look back at what the character tried.",
            "What happens because of the attempt?",
            "Tell the result of what the character did.",
            "Try so, because, finally, or as a result.",
            "The character tried to ___, so ___."
          ]
        };
        return maps[category] || [];
      },
      retry() {
        return "Now explain it again so it is clear what happened and why.";
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
      lookFor: "Did I add a detail that helped my listener understand or picture the story?",
      reflection: "Did I add useful details?",
      expected:
        "Student is expected to add useful information that clarifies or develops an important story idea or event.",
      watches:
        "Watch for bare events that need more information to understand or picture them, as well as extra details that do not help the important story idea.",
      relevant: plannerCategories,
      build(category, c) {
        const questions = {
          character: "What important detail would help us understand this character?",
          setting: `What detail about ${storySetting(c)} matters to what happens?`,
          problem: "What detail would help us understand why the problem matters?",
          feeling: `What happened that helps explain why the character feels ${storyFeeling(c)}?`,
          plan: "What does the character hope this plan will accomplish?",
          attempt: "How exactly does the character carry out the attempt? What happens while they try?",
          item: `How exactly could ${storyItem(c)} be used?`,
          resolution: "What detail would help us understand how the story ends?"
        };
        const frames = {
          character: "The character is ___, which matters because ___.",
          setting: "In the setting, ___, so ___.",
          problem: "The problem becomes harder when ___.",
          feeling: "The character feels ___ because ___.",
          plan: "The character plans to ___ because ___.",
          attempt: "The character tried to ___ by ___.",
          item: `The character uses ${storyItem(c)} to ___.`,
          resolution: "In the end, ___ because ___."
        };
        return [
          "Choose one important story idea that could use a little more information.",
          questions[category] || "What useful detail would help the listener understand this part?",
          "Add one useful detail: where, how, why, what it looked like, or what else was happening.",
          "Choose a detail that helps us understand or picture this part.",
          frames[category] || "___ because ___."
        ];
      },
      retry() {
        return "Now say or write the same idea again with one useful detail added.";
      }
    },

    "perspective-internal-state": {
      label: "Perspective & Internal State",
      studentGoal: "Help my listener understand the character.",
      lookFor: "Did I explain what the character thought, felt, knew, wanted, or expected?",
      reflection: "Did I help my listener understand the character?",
      expected:
        "Student is expected to explain what characters feel, think, know, want, expect, wonder, or intend and connect those ideas to story events when appropriate.",
      watches:
        "Watch for action-only narratives, unsupported emotion labels, actions with no reason, or characters who are treated as if they all know, want, or expect the same things.",
      relevant: ["character", "problem", "feeling", "plan", "attempt", "resolution"],
      build(category, c) {
        const maps = {
          character: [
            "Think about what the character is thinking or feeling, not only what the character does.",
            `What might ${storyCharacter(c)} want, know, think, or expect at the beginning?`,
            "Choose one thought, feeling, want, or expectation that matters.",
            "Try wants, knows, thinks, hopes, wonders, or expects.",
            "The character hopes that ___."
          ],
          problem: [
            "Think about what the character knows or believes when the problem appears.",
            "What does the character think when the problem happens?",
            "Think about what really happened and what the character thinks or knows.",
            "Try thought, knew, wondered, expected, or wanted.",
            "The character wondered whether ___."
          ],
          feeling: [
            "Think about the feeling and what caused it.",
            `Why does the character feel ${storyFeeling(c)}?`,
            "Connect the feeling to what happened.",
            "Try felt, thought, hoped, worried, knew, or wondered.",
            `The character felt ${storyFeeling(c)} because ___.`
          ],
          plan: [
            "Think about what the character wants to happen next.",
            "How do the problem and feeling shape what the character wants to do?",
            "Tell the character’s goal or intention.",
            "Try wanted, hoped, planned, expected, or decided.",
            "The character hoped to ___."
          ],
          attempt: [
            "Think about what the character is trying to make happen.",
            "Why does the character choose this action to carry out the plan?",
            "Connect the action to what the character wants.",
            "Try wanted to, hoped to, decided to, or tried to.",
            "The character tried to ___ because ___."
          ],
          resolution: [
            "Think about what changed for the character by the end.",
            "What does the character know, feel, think, or understand now?",
            "Show how the character is different after what happened.",
            "Try realized, learned, felt, knew, understood, or hoped.",
            "By the end, the character realized ___."
          ]
        };
        return maps[category] || [];
      },
      retry() {
        return "Now try this part again and include what the character thinks, feels, knows, wants, or expects.";
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
    const prompts = {
      character:
        "Reconnect to the story: tell the character and setting together as one connected opening.",
      setting:
        "Reconnect to the story: tell the character and setting together, then continue into what happens.",
      problem:
        "Reconnect to the story: start just before the problem and tell what was happening and then the problem.",
      feeling:
        "Reconnect to the story: go back to the problem and tell the problem and the character’s feeling together.",
      plan:
        "Reconnect to the story: go back to the problem and feeling and tell how they lead to the plan.",
      item:
        "Reconnect to the story: go back to the action / attempt and tell how the item connects to what the character does.",
      resolution:
        "Reconnect to the story: go back to the action / attempt and tell the action and the outcome / ending together."
    };

    return (
      prompts[category] ||
      "Reconnect to the story: tell the repaired idea again with the story part immediately before it."
    );
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
