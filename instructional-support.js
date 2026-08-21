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
    "item",
    "resolution"
  ];

  const supportStepLabels = [
    "Focus here",
    "Think about it",
    "Specific cue",
    "Language support",
    "Frame"
  ];

  const targetDefinitions = {
    "story-organization": {
      label: "Story Organization",
      expected:
        "Student is expected to organize the important parts of the story into a coherent narrative: who/where → problem → response or plan → outcome.",
      watches:
        "Watch for a missing or misplaced story function, an ending that does not respond to the problem, a lost sequence, or story elements that are mentioned but not integrated.",
      relevant: ["problem", "plan", "resolution"],
      build(category, c) {
        const maps = {
          problem: [
            "Look at the problem and the parts that come after it. What changes when this problem happens?",
            `What is the main problem the character needs to deal with${known(c.problem) ? `: ${c.problem}` : ""}?`,
            "State the problem clearly before moving to what the character does about it.",
            "Use this story path: Problem → what the character tries → what happens.",
            "The main problem is ___."
          ],
          plan: [
            "Look back at the problem. The plan should be the character’s response to that problem.",
            `What does the character decide to do about ${storyProblem(c)}?`,
            "Name the character’s response or attempt, not just another event.",
            "Use this story path: Problem → attempt/plan.",
            "To deal with the problem, the character decides to ___."
          ],
          resolution: [
            "Look back at the problem and the plan. The ending should show what happened after the character acted.",
            `How does the ending respond to ${storyProblem(c)}?`,
            "Make sure the ending shows an outcome, not just a final unrelated event.",
            "Use this story path: Plan/attempt → outcome → ending.",
            "In the end, ___."
          ]
        };

        return maps[category] || [];
      },
      retry(category) {
        const text = {
          problem:
            "Now restate this part so the problem has a clear role in the story.",
          plan:
            "Now try the plan again so it clearly responds to the problem.",
          resolution:
            "Now try the ending again so it clearly follows from the story problem and response."
        };
        return text[category] || "Now try the same story part again.";
      }
    },

    "connections-cohesion": {
      label: "Connections & Cohesion",
      expected:
        "Student is expected to connect ideas and events rather than produce isolated statements, using clear relationships, sequencing, connectors, and referents.",
      watches:
        "Watch for choppy event-list language, repeated and then, abrupt shifts, unclear pronouns/referents, or related ideas that are stated without showing how they belong together.",
      relevant: plannerCategories,
      build(category, c) {
        const relationships = {
          character: [
            "Think about the character and where the story begins.",
            `How can ${storyCharacter(c)} connect to ${storySetting(c)}?`,
            "Explain why the character is in this setting or what the character is doing there.",
            "Try a connector or linking phrase such as when, while, at, or because if it fits your meaning.",
            `${capitalize(storyCharacter(c))} was at ${storySetting(c)} when ___.`
          ],
          setting: [
            "Connect the setting to what the character is doing there.",
            `What is ${storyCharacter(c)} doing in ${storySetting(c)}?`,
            "Add a relationship between the character and the place, not just two separate facts.",
            "Try when, while, at, or because if one fits the relationship.",
            `While ${storyCharacter(c)} was in ${storySetting(c)}, ___.`
          ],
          problem: [
            "Connect the problem to the story that came before it.",
            `How does ${storyProblem(c)} change what is happening for the character?`,
            "Show the shift from the beginning of the story to the problem.",
            "Try but, when, suddenly, after, or another connector that matches your meaning.",
            "Everything changed when ___."
          ],
          feeling: [
            "Connect the feeling to the event that matters.",
            `How does ${storyFeeling(c)} connect to ${storyProblem(c)}?`,
            "Show the relationship between what happened and the character’s response.",
            "Try because, when, after, or so if it matches the relationship you mean.",
            `The character felt ${storyFeeling(c)} when ___.`
          ],
          plan: [
            "Connect the plan to the problem instead of listing it as a new event.",
            `How does ${storyPlan(c)} connect to ${storyProblem(c)}?`,
            "Show whether the plan happens because of the problem, after it, or in contrast to another idea.",
            "Try so, because, after, then, or another connector that fits.",
            "After the problem, the character decided to ___."
          ],
          item: [
            "Connect the item to an action or event in the story.",
            `How does ${storyItem(c)} connect to ${storyPlan(c)}?`,
            "Explain what the character does with the item or why it matters.",
            "Try with, by using, so, because, or another phrase that shows the relationship.",
            `The character used ${storyItem(c)} to ___.`
          ],
          resolution: [
            "Connect the ending to what the character tried.",
            `How does the ending follow from ${storyPlan(c)}?`,
            "Show the relationship between the character’s action and the outcome.",
            "Try after, because, so, finally, or as a result if it fits.",
            "After the character tried the plan, ___."
          ]
        };

        return relationships[category] || [];
      },
      retry() {
        return "Now say or write the same ideas again so the relationship between them is clear.";
      }
    },

    "cause-effect": {
      label: "Cause & Effect",
      expected:
        "Student is expected to express why important events or feelings occur, why a character chooses an action, and/or what happens as a result.",
      watches:
        "Watch for related events that are both present but whose causal relationship is only implied, a missing consequence, or misuse/absence of causal language such as because or so.",
      relevant: ["problem", "feeling", "plan", "item", "resolution"],
      build(category, c) {
        const maps = {
          problem: [
            "Look at what happened before and after the problem.",
            `What happens because ${storyProblem(c)} becomes part of the story?`,
            "Name a cause or a result. Do not stop with two separate events.",
            "Use cause → result. A word such as because or so may help if it matches your meaning.",
            "Because ___, ___."
          ],
          feeling: [
            "Look at the problem and the character’s feeling together.",
            `Why might the character feel ${storyFeeling(c)} when the problem is ${storyProblem(c)}?`,
            "Explain the reason for the feeling.",
            "Try because to connect the feeling to its cause.",
            `The character felt ${storyFeeling(c)} because ___.`
          ],
          plan: [
            "Look at the problem and the plan together.",
            `Why might ${storyPlan(c)} help with ${storyProblem(c)}?`,
            "Explain why the character chooses this action or what the character hopes it will cause.",
            "Try because, so, or to in a way that matches the relationship.",
            "The character decided to ___ because ___."
          ],
          item: [
            "Look at the item and what the character is trying to do.",
            `What could happen because the character uses ${storyItem(c)}?`,
            "Explain how using the item could cause or change an outcome.",
            "Try so, because, or by using to show cause and result.",
            `The character used ${storyItem(c)}, so ___.`
          ],
          resolution: [
            "Look back at the character’s plan or action.",
            `What happens because the character tries ${storyPlan(c)}?`,
            "State the result of the character’s action.",
            "Try so, because, therefore, or as a result if it matches your meaning.",
            "The character tried the plan, so ___."
          ]
        };

        return maps[category] || [];
      },
      retry() {
        return "Now explain the same relationship again so the cause and result are both clear.";
      }
    },

    "sentence-formulation": {
      label: "Sentence Formulation",
      expected:
        "Student is expected to turn an intended idea into a complete, organized spoken or written sentence.",
      watches:
        "Watch for repeated false starts, fragments, abandoned sentences, missing essential sentence parts, or a learner who appears to have the idea but cannot organize it into a complete sentence.",
      relevant: plannerCategories,
      build(category, c) {
        const frames = {
          character: `${capitalize(storyCharacter(c))} is ___.`,
          setting: `The story takes place in ${storySetting(c)} where ___.`,
          problem: "The problem begins when ___.",
          feeling: `The character feels ${storyFeeling(c)} because ___.`,
          plan: "The character decides to ___.",
          item: `The character uses ${storyItem(c)} to ___.`,
          resolution: "In the end, ___."
        };

        return [
          "Say the idea out loud first. Keep the idea; do not worry about making it perfect yet.",
          "What is the one main idea you want this sentence to say?",
          "Organize it: Who? → did what? → to what/whom? → where/why?",
          "Start with the subject and action. Add the other information after the core sentence is clear.",
          frames[category] || "___ ___."
        ];
      },
      retry() {
        return "Now use your own story idea to formulate the sentence again.";
      }
    },

    "elaboration": {
      label: "Elaboration",
      expected:
        "Student is expected to add relevant information that clarifies or develops an important story event.",
      watches:
        "Watch for bare events that need more information to understand or imagine them, as well as extra details that do not clarify or advance the important story idea.",
      relevant: plannerCategories,
      build(category, c) {
        const dimension = {
          character: "What important detail would help us understand this character?",
          setting: `What detail about ${storySetting(c)} matters to what happens in the story?`,
          problem: `What detail would help us understand how ${storyProblem(c)} affects the character?`,
          feeling: `What happened that helps explain why the character feels ${storyFeeling(c)}?`,
          plan: `How exactly will the character carry out ${storyPlan(c)}?`,
          item: `How exactly could ${storyItem(c)} be used?`,
          resolution: "What important detail would help the listener understand how the story ends?"
        };

        const frame = {
          character: "The character is ___, which matters because ___.",
          setting: "In the setting, ___, so ___.",
          problem: "The problem becomes harder when ___.",
          feeling: "The character feels ___ because ___.",
          plan: "The character ___ by ___.",
          item: `The character uses ${storyItem(c)} to ___.`,
          resolution: "In the end, ___ because ___."
        };

        return [
          "Choose one important story idea that could use a little more information.",
          dimension[category] || "What useful detail would help the listener understand this part?",
          "Add one relevant kind of information: where, how, why, what it looked like, or what happened while it was occurring.",
          "Pick only the detail that makes this event clearer or more important to the story.",
          frame[category] || "___ because ___."
        ];
      },
      retry() {
        return "Now restate the same event with one useful detail added.";
      }
    },

    "perspective-internal-state": {
      label: "Perspective & Internal State",
      expected:
        "Student is expected to explain what characters feel, think, know, want, expect, wonder, or intend and connect those internal states to story events when appropriate.",
      watches:
        "Watch for action-only narratives, unsupported emotion labels, actions with no motivation, or characters who are treated as if they all know, want, or expect the same things.",
      relevant: ["character", "problem", "feeling", "plan", "resolution"],
      build(category, c) {
        const maps = {
          character: [
            "Think about what is happening inside the character, not only what the character does.",
            `What might ${storyCharacter(c)} want, know, think, or expect at the beginning?`,
            "Choose one internal state that matters to the story.",
            "Try a mental-state word such as wants, knows, thinks, hopes, wonders, or expects.",
            "The character hopes that ___."
          ],
          problem: [
            "Think about what the character knows or believes when the problem appears.",
            `What does the character think when ${storyProblem(c)} happens?`,
            "Separate what actually happened from what the character knows, believes, or expects.",
            "Try thought, knew, wondered, expected, or wanted.",
            "The character wondered whether ___."
          ],
          feeling: [
            "Think about the feeling and what caused it.",
            `Why does the character feel ${storyFeeling(c)}?`,
            "Connect the internal state to the event that matters.",
            "Try felt, thought, hoped, worried, knew, or wondered.",
            `The character felt ${storyFeeling(c)} because ___.`
          ],
          plan: [
            "Think about the character’s reason or intention for acting.",
            `What does the character want or hope will happen by trying ${storyPlan(c)}?`,
            "State the motivation behind the action.",
            "Try wanted, hoped, planned, expected, or decided.",
            "The character hoped that ___."
          ],
          resolution: [
            "Think about what changed inside the character by the end.",
            "What does the character know, feel, think, or understand now that was different earlier?",
            "Connect the ending to a change in the character’s internal state.",
            "Try realized, learned, felt, knew, understood, or hoped.",
            "By the end, the character realized ___."
          ]
        };

        return maps[category] || [];
      },
      retry() {
        return "Now try this part again and include the character’s relevant thought, feeling, knowledge, want, or expectation.";
      }
    },

    "vocabulary-precision": {
      label: "Vocabulary Precision",
      expected:
        "Student is expected to select words that communicate the intended meaning increasingly precisely.",
      watches:
        "Watch for repeated vague words such as thing, stuff, good, bad, went, did, or got; overuse of the same broad verb; circumlocution; or difficulty retrieving a more precise known word.",
      relevant: plannerCategories,
      build(category, c) {
        const focus = {
          character: "Choose one word that precisely describes the character.",
          setting: `Choose a precise word for what ${storySetting(c)} looks, sounds, or feels like.`,
          problem: `Choose a precise verb or adjective to describe what happens during ${storyProblem(c)}.`,
          feeling: `Can you make ${storyFeeling(c)} more precise by describing the intensity or the way it is shown?`,
          plan: `Choose the most precise action word for what the character does during ${storyPlan(c)}.`,
          item: `Choose a precise verb for how the character handles or uses ${storyItem(c)}.`,
          resolution: "Choose a precise verb or adjective that makes the ending clearer."
        };

        return [
          "Find one vague or repeated word in this idea.",
          focus[category] || "What more specific word would show exactly what you mean?",
          "Think about meaning features: How? What kind? How strong? In what way?",
          "Generate two or three possible words, then choose the one that best matches your intended meaning.",
          "Use the more precise word in the whole sentence: ___."
        ];
      },
      retry() {
        return "Now put the more precise word back into your sentence or story idea.";
      }
    }
  };

  let initialized = false;
  let pendingRestoreState = null;
  let selectedTarget = "off";
  let supportLevels = emptySupportLevels();
  let retryRequested = emptyRetryState();

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
    return known(c.plan) ? c.plan : "the plan";
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
      supportLevels: { ...supportLevels },
      retryRequested: { ...retryRequested }
    };
  }

  function normalizeSavedState(state) {
    const target =
      state &&
      typeof state.target === "string" &&
      (state.target === "off" || targetDefinitions[state.target])
        ? state.target
        : "off";

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
      supportLevels: levels,
      retryRequested: retries
    };
  }

  function restoreState(state) {
    const normalized = normalizeSavedState(state);

    selectedTarget = normalized.target;
    supportLevels = normalized.supportLevels;
    retryRequested = normalized.retryRequested;

    if (!initialized) {
      pendingRestoreState = normalized;
      return;
    }

    applyStateToUI();
  }

  function resetAllSectionSupport() {
    supportLevels = emptySupportLevels();
    retryRequested = emptyRetryState();
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

    const support = supportFor(category);

    if (!support) {
      container.replaceChildren();
      container.hidden = true;
      return;
    }

    container.hidden = false;
    container.replaceChildren();

    const row = document.createElement("div");
    row.className = "planner-help-row";

    const helpButton = document.createElement("button");
    helpButton.type = "button";
    helpButton.className = "planner-help-button";

    const level = supportLevels[category] || 0;

    helpButton.textContent =
      level === 0
        ? "Need help?"
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
      moreButton.textContent = "More help";

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

    const stepLabel = document.createElement("p");
    stepLabel.className = "planner-support-step-label";
    stepLabel.textContent =
      supportStepLabels[Math.max(0, level - 1)] ||
      "Support";

    const stepText = document.createElement("p");
    stepText.className = "planner-support-step-text";
    stepText.textContent = support.steps[level - 1];

    supportCard.append(stepLabel, stepText);

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
    renderAllPlannerSupports();
  }

  function handleTargetChange(event) {
    const value = event.target.value;

    selectedTarget =
      value === "off" || targetDefinitions[value]
        ? value
        : "off";

    resetAllSectionSupport();
    updateTargetOverview();
    renderAllPlannerSupports();
    announceChanged();
  }

  function observePlannerLabels() {
    const observer = new MutationObserver(() => {
      renderAllPlannerSupports();
    });

    plannerCategories.forEach((category) => {
      if (category === "resolution") {
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

    select.addEventListener(
      "change",
      handleTargetChange
    );

    document.getElementById("resetAll")?.addEventListener(
      "click",
      () => {
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
      supportLevels = pending.supportLevels;
      retryRequested = pending.retryRequested;
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
