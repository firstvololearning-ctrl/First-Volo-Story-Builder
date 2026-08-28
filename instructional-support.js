"use strict";

/* =========================================================
   FIRST VOLO STORY BUILDER — INSTRUCTIONAL SUPPORT PHASE 1

   One primary instructional target.
   Student attempts first.
   Need Help? reveals the least support first.
   More Help reveals one additional step.
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
    "Look here",
    "Think about it",
    "A clue",
    "Words to try",
    "Sentence start"
  ];

  const targetDefinitions = {
    "story-organization": {
      label: "Story Organization",
      studentGoal: "Make my story easy to follow.",
      lookFor: "Did I include the important story parts and put them together in a way that makes sense?",
      reflection: "Did I make my story easy to follow?",
      expected:
        "Student is expected to organize the important parts of the story into a coherent narrative: who/where → problem and feeling → plan → action/attempt → resolution.",
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
      studentGoal: "Say my idea in a clear sentence.",
      lookFor: "Did I say my whole idea in a clear, complete sentence?",
      reflection: "Did I say my ideas in clear sentences?",
      expected:
        "Student is expected to turn an intended idea into a complete, organized spoken or written sentence.",
      watches:
        "Watch for repeated false starts, fragments, abandoned sentences, missing important sentence parts, or a learner who has the idea but cannot organize it into a complete sentence.",
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
    },

    "vocabulary-precision": {
      label: "Vocabulary Precision",
      studentGoal: "Choose words that say exactly what I mean.",
      lookFor: "Did I use specific words that fit what I meant?",
      reflection: "Did I choose words that said exactly what I meant?",
      expected:
        "Student is expected to choose words that communicate the intended meaning more specifically.",
      watches:
        "Watch for repeated general words such as thing, stuff, good, bad, went, did, or got; repeated broad verbs; or difficulty finding a more specific known word.",
      relevant: plannerCategories,
      build(category, c) {
        const focus = {
          character: "Choose a more specific word to describe the character.",
          setting: `Choose a more specific word for what ${storySetting(c)} looks, sounds, or feels like.`,
          problem: "Choose a more specific word for what happens in the problem.",
          feeling: `Can you make ${storyFeeling(c)} more specific? Think about how strong it is or how the character shows it.`,
          plan: "Choose words that clearly name what the character plans or hopes to do.",
          attempt: "Choose a specific action word for what the character actually does or tries.",
          item: `Choose a more specific action word for how the character uses ${storyItem(c)}.`,
          resolution: "Choose a more specific word that makes the ending clearer."
        };
        return [
          "Find one word that is too general or that you used many times.",
          focus[category] || "What more specific word would show exactly what you mean?",
          "Ask yourself: How? What kind? How strong? What exactly happened?",
          "Think of two or three words. Choose the one that says what you mean best.",
          "Use the more specific word in the whole sentence: ___."
        ];
      },
      retry() {
        return "Now put the more specific word back into your sentence or story idea.";
      }
    }
  };

  let initialized = false;
  let pendingRestoreState = null;
  let selectedTarget = "off";
  let sessionPhase = "first-tell";
  let tellAgainPlannerAvailable = true;
  let supportLevels = emptySupportLevels();
  let retryRequested = emptyRetryState();
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

    plannerCategories.forEach((category) => {
      const rawLevel = Number(state?.supportLevels?.[category]);
      levels[category] = Number.isFinite(rawLevel)
        ? Math.max(0, Math.min(5, Math.floor(rawLevel)))
        : 0;

      retries[category] = Boolean(
        state?.retryRequested?.[category]
      );
    });

    return {
      target,
      sessionPhase: phase,
      tellAgainPlannerAvailable: plannerAvailable,
      supportLevels: levels,
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
          "👩‍🏫 Educator: listen across the whole narrative. After the First Tell, choose one primary instructional target above.";
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
          "Let the student attempt the language first. If help is needed, open only the next support step, then have the student retry and reconnect the repaired idea to the story.";
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

    const steps = definition.build(category, context());

    if (!Array.isArray(steps) || !steps.length) {
      return null;
    }

    return {
      steps: steps.slice(0, 5),
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

    if (level > 0 && level < support.steps.length) {
      const moreButton = document.createElement("button");
      moreButton.type = "button";
      moreButton.className = "planner-more-help-button";
      moreButton.textContent = "More support";

      moreButton.addEventListener("click", () => {
        supportLevels[category] = Math.min(
          support.steps.length,
          supportLevels[category] + 1
        );
        retryRequested[category] = false;
        renderPlannerSupport(category);
        announceChanged();
      });

      row.appendChild(moreButton);
    }

    container.appendChild(row);

    if (level === 0) {
      return;
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

    supportCard.append(
      studentAudience,
      stepLabel,
      stepText
    );

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
