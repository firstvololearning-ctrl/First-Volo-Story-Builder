"use strict";

const categories = {
  character: {
    title: "Character",
    imageId: "characterImage",
    labelId: "characterLabel",
    cardId: "characterCard",
    toggleId: "showCharacter",
    folder: "assets/characters",
    starterImage: "assets/categories/category-01.png",
    entries: [
      { label: "Dragon", file: "character-04.png" },
      { label: "Adventurer", file: "character-13.png" },
      { label: "Dog", file: "character-15.png" },
      { label: "Superhero", file: "character-16.png" },
      { label: "Astronaut", file: "character-19.png" }
    ]
  },

  setting: {
    title: "Setting",
    imageId: "settingImage",
    labelId: "settingLabel",
    cardId: "settingCard",
    toggleId: "showSetting",
    folder: "assets/settings",
    starterImage: "assets/categories/category-02.png",
    entries: [
      { label: "School", file: "setting-02.png" },
      { label: "Outer Space", file: "setting-09.png" },
      { label: "Campsite", file: "setting-12.png" },
      { label: "Beach", file: "setting-13.png" },
      { label: "City", file: "setting-21.png" }
    ]
  },

  problem: {
    title: "Problem",
    imageId: "problemImage",
    labelId: "problemLabel",
    cardId: "problemCard",
    toggleId: "showProblem",
    folder: "assets/problems",
    starterImage: "assets/categories/category-03.png",
    entries: [
      {
        label: "Robber",
        phrase: "encountered a robber",
        file: "problem-06.png"
      },
      {
        label: "Broken Bridge",
        phrase: "found a broken bridge blocking the way",
        file: "problem-07.png"
      },
      {
        label: "Monster Attack",
        phrase: "was attacked by a monster",
        file: "problem-08.png"
      },
      {
        label: "Trapped",
        phrase: "became trapped in a closed space",
        file: "problem-16.png"
      },
      {
        label: "Swapped Bodies",
        phrase: "suddenly swapped bodies with someone",
        file: "problem-22.png"
      }
    ]
  },

  feeling: {
    title: "Feeling",
    imageId: "feelingImage",
    labelId: "feelingLabel",
    cardId: "feelingCard",
    toggleId: "showFeeling",
    folder: "assets/feelings",
    starterImage: "assets/categories/category-04.png",
    entries: [
      { label: "Angry", file: "feeling-01.png" },
      { label: "Surprised", file: "feeling-03.png" },
      { label: "Confused", file: "feeling-11.png" },
      { label: "Scared", file: "feeling-13.png" },
      { label: "Relieved", file: "feeling-20.png" }
    ]
  },

  plan: {
    title: "Plan",
    imageId: "planImage",
    labelId: "planLabel",
    cardId: "planCard",
    toggleId: "showPlan",
    folder: "assets/plans",
    starterImage: "assets/categories/category-05.png",
    entries: [
      { label: "Build", file: "plan-02.png" },
      { label: "Use Magic", file: "plan-09.png" },
      { label: "Hide", file: "plan-17.png" },
      { label: "Experiment", file: "plan-18.png" },
      { label: "Wear a Disguise", file: "plan-22.png" }
    ]
  },

  item: {
    title: "Item",
    imageId: "itemImage",
    labelId: "itemLabel",
    cardId: "itemCard",
    toggleId: "showItem",
    folder: "assets/items",
    starterImage: "assets/categories/category-06.png",
    entries: [
      { label: "Telescope", file: "item-08.png" },
      { label: "Walkie-Talkie", file: "item-11.png" },
      { label: "Duct Tape", file: "item-15.png" },
      { label: "Magic Wand", file: "item-17.png" },
      { label: "Disguise", file: "item-22.png" }
    ]
  }
};

const currentSelections = {
  character: null,
  setting: null,
  problem: null,
  feeling: null,
  plan: null,
  item: null
};

const rollingCategories = new Set();
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function getCategoryLength(category) {
  return category.entries ? category.entries.length : category.labels.length;
}

function getEntry(category, index) {
  return category.entries
    ? category.entries[index]
    : { label: category.labels[index] };
}

function getRandomIndex(length, previousIndex = null) {
  if (length <= 1) return 0;

  let nextIndex = Math.floor(Math.random() * length);

  while (nextIndex === previousIndex) {
    nextIndex = Math.floor(Math.random() * length);
  }

  return nextIndex;
}

function makeImagePath(category, index) {
  const entry = getEntry(category, index);
  return `${category.folder}/${entry.file}`;
}

function preloadImage(path) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(path);
    image.onerror = () => reject(new Error(`Image not found: ${path}`));
    image.src = path;
  });
}

function sleep(milliseconds) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

function setStatus(message = "") {
  const status = document.getElementById("rollStatus");

  if (status) {
    status.textContent = message;
  }
}

function setRollingState(categoryName, isRolling) {
  const category = categories[categoryName];
  const card = document.getElementById(category.cardId);
  const button = card?.querySelector("button");

  card?.classList.toggle("is-rolling", isRolling);

  if (button) {
    button.disabled = isRolling;
    button.setAttribute("aria-busy", String(isRolling));
  }

  if (isRolling) {
    rollingCategories.add(categoryName);
  } else {
    rollingCategories.delete(categoryName);
  }

  document.getElementById("rollAll").disabled = rollingCategories.size > 0;
  document.getElementById("resetAll").disabled = rollingCategories.size > 0;
}

function isCategoryVisible(categoryName) {
  const category = categories[categoryName];
  const card = document.getElementById(category.cardId);

  return Boolean(card && !card.classList.contains("hidden-category"));
}

function applySelection(categoryName, index) {
  const category = categories[categoryName];
  const image = document.getElementById(category.imageId);
  const labelElement = document.getElementById(category.labelId);
  const entry = getEntry(category, index);
  const imagePath = makeImagePath(category, index);

  currentSelections[categoryName] = {
    index,
    label: entry.label,
    phrase: entry.phrase || null,
    imagePath
  };

  labelElement.textContent = entry.label;
  image.src = imagePath;
  image.alt = `${category.title}: ${entry.label}`;
}

async function animateCategory(categoryName, duration = 620) {
  const category = categories[categoryName];
  const image = document.getElementById(category.imageId);
  const labelElement = document.getElementById(category.labelId);

  const previousIndex = currentSelections[categoryName]?.index ?? null;
  const finalIndex = getRandomIndex(
    getCategoryLength(category),
    previousIndex
  );

  const finalPath = makeImagePath(category, finalIndex);

  setRollingState(categoryName, true);
  image.classList.add("changing");

  const frameDelay = reducedMotion ? duration : 62;
  const startTime = performance.now();

  try {
    await preloadImage(finalPath);

    while (performance.now() - startTime < duration) {
      const previewIndex = getRandomIndex(getCategoryLength(category));
      const previewEntry = getEntry(category, previewIndex);

      image.src = makeImagePath(category, previewIndex);
      image.alt = `Rolling ${category.title.toLowerCase()}`;
      labelElement.textContent = previewEntry.label;

      await sleep(frameDelay);
    }

    applySelection(categoryName, finalIndex);
    updateAllSupports();
  } catch (error) {
    console.error(error);
    setStatus(
      `Could not load one of the ${category.title.toLowerCase()} images.`
    );
  } finally {
    image.classList.remove("changing");
    setRollingState(categoryName, false);
  }
}

async function rollCategory(categoryName) {
  if (
    !categories[categoryName] ||
    rollingCategories.has(categoryName)
  ) {
    return;
  }

  await animateCategory(
    categoryName,
    reducedMotion ? 80 : 650
  );
}

async function rollAllCategories() {
  const visibleCategories = Object.keys(categories).filter(
    isCategoryVisible
  );

  if (!visibleCategories.length) {
    setStatus("Choose at least one story element first.");
    return;
  }

  const rollAllButton = document.getElementById("rollAll");

  rollAllButton.disabled = true;
  setStatus("Rolling your story...");

  for (let index = 0; index < visibleCategories.length; index += 1) {
    const categoryName = visibleCategories[index];
    const category = categories[categoryName];

    setStatus(`Rolling ${category.title.toLowerCase()}...`);

    await animateCategory(
      categoryName,
      reducedMotion ? 80 : 420 + index * 25
    );

    if (!reducedMotion) {
      await sleep(55);
    }
  }

  setStatus("✨ Your story is ready!");

  if (!reducedMotion) {
    await sleep(550);

    document.getElementById("writingPanel").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  window.setTimeout(() => {
    setStatus("");
  }, 2400);
}

function resetAllCategories() {
  Object.entries(categories).forEach(
    ([categoryName, category]) => {
      const image = document.getElementById(category.imageId);
      const label = document.getElementById(category.labelId);

      currentSelections[categoryName] = null;

      if (image) {
        image.src = category.starterImage;
        image.alt = `Roll to choose a ${category.title.toLowerCase()}`;
        image.classList.remove("changing");
      }

      if (label) {
        label.textContent = "";
      }
    }
  );

  document.getElementById("storyTitle").value = "";
  document.getElementById("storyWriting").value = "";

  setStatus("");
  updateAllSupports();
}

function updateLabelVisibility() {
  const showLabels =
    document.getElementById("toggleLabels").checked;

  document
    .querySelectorAll(".image-label")
    .forEach((label) => {
      label.classList.toggle("visible", showLabels);
    });
}

function connectCategoryToggle(categoryName) {
  const category = categories[categoryName];

  const toggle =
    document.getElementById(category.toggleId);

  const card =
    document.getElementById(category.cardId);

  if (!toggle || !card) {
    return;
  }

  toggle.addEventListener("change", () => {
    card.classList.toggle(
      "hidden-category",
      !toggle.checked
    );

    updateAllSupports();
  });
}

function connectResolutionToggle() {
  const toggle =
    document.getElementById("showResolution");

  const card =
    document.getElementById("resolutionCard");

  toggle.addEventListener("change", () => {
    card.classList.toggle(
      "hidden-category",
      !toggle.checked
    );
  });
}

function updateVocabularyPanel() {
  const showVocabulary =
    document.getElementById("toggleVocabulary").checked;

  const panel =
    document.getElementById("vocabularyPanel");

  const list =
    document.getElementById("vocabularyList");

  panel.classList.toggle(
    "hidden-support",
    !showVocabulary
  );

  list.innerHTML = "";

  if (!showVocabulary) {
    return;
  }

  Object.entries(categories).forEach(
    ([categoryName, category]) => {
      const selection =
        currentSelections[categoryName];

      if (
        !isCategoryVisible(categoryName) ||
        !selection
      ) {
        return;
      }

      const entry = document.createElement("div");
      entry.className = "vocabulary-entry";

      entry.innerHTML = `
        <strong>${category.title}:</strong>
        ${selection.label}
      `;

      list.appendChild(entry);
    }
  );

  if (!list.children.length) {
    list.innerHTML = `
      <div class="vocabulary-entry">
        Roll one or more categories to build your vocabulary list.
      </div>
    `;
  }
}

function getSentenceSupportMode() {
  const selected =
    document.querySelector(
      'input[name="sentenceSupport"]:checked'
    );

  return selected ? selected.value : "off";
}

function makeArticlePhrase(word) {
  if (!word) {
    return "__________";
  }

  const lowercaseWord = word.toLowerCase();
  const firstLetter = lowercaseWord.charAt(0);

  const article = "aeiou".includes(firstLetter)
    ? "an"
    : "a";

  return `${article} ${lowercaseWord}`;
}

function getSettingPhrase(settingLabel) {
  if (!settingLabel) {
    return "in __________";
  }

  const specialSettings = {
    Stadium: "at a stadium",
    School: "at school",
    House: "in a house",
    "Tropical Island": "on a tropical island",
    Playground: "at a playground",
    Cave: "in a cave",
    "Underwater Reef": "at an underwater reef",
    Castle: "in a castle",
    "Outer Space": "in outer space",
    Farm: "on a farm",
    Road: "on a road",
    Campsite: "at a campsite",
    Beach: "at a beach",
    Mountains: "in the mountains",
    "Snowy Cabin": "in a snowy cabin",
    Desert: "in a desert",
    "Tree House": "in a tree house",
    Airport: "at an airport",
    Waterfall: "near a waterfall",
    "Ancient Ruins": "at some ancient ruins",
    City: "in a city",
    Pyramid: "inside a pyramid"
  };

  return (
    specialSettings[settingLabel] ||
    `in ${makeArticlePhrase(settingLabel)}`
  );
}

function getOpenPrompts() {
  return [
    "Who is the story about?",
    "Where does the story take place?",
    "What problem occurs?",
    "How does the character feel about the problem?",
    "What does the character plan to do to fix the problem?",
    "How could the item help?",
    "How does the story end?"
  ];
}

function getBasicStarters() {
  return [
    "One day, __________ was in __________.",
    "Suddenly, __________.",
    "The character felt __________ because __________.",
    "The plan was to __________.",
    "The __________ could help by __________.",
    "In the end, __________."
  ];
}

function getGeneratedStarters() {
  const character =
    currentSelections.character?.label;

  const setting =
    currentSelections.setting?.label;

  const problem =
    currentSelections.problem;

  const feeling =
    currentSelections.feeling?.label;

  const plan =
    currentSelections.plan?.label;

  const item =
    currentSelections.item?.label;

  const characterPhrase =
    makeArticlePhrase(character);

  const characterReference =
    character
      ? `The ${character.toLowerCase()}`
      : "The character";

  const settingPhrase =
    getSettingPhrase(setting);

  const problemPhrase =
    problem?.phrase ||
    "encountered a problem";

  const feelingPhrase =
    feeling
      ? feeling.toLowerCase()
      : "__________";

  const planPhrase =
    plan
      ? plan.toLowerCase()
      : "__________";

  const itemPhrase =
    item
      ? `The ${item.toLowerCase()}`
      : "The __________";

  return [
    `One day, ${characterPhrase} was ${settingPhrase}.`,
    `Suddenly, ${characterReference.toLowerCase()} ${problemPhrase}.`,
    `${characterReference} felt ${feelingPhrase} because __________.`,
    `${characterReference} decided to ${planPhrase}.`,
    `${itemPhrase} could help by __________.`,
    "In the end, __________."
  ];
}

function updateSentenceSupportPanel() {
  const mode = getSentenceSupportMode();

  const panel =
    document.getElementById("sentenceSupportPanel");

  const content =
    document.getElementById("sentenceSupportContent");

  if (mode === "off") {
    panel.classList.add("hidden-support");
    content.innerHTML = "";
    return;
  }

  panel.classList.remove("hidden-support");

  const supports =
    mode === "open"
      ? getOpenPrompts()
      : mode === "basic"
        ? getBasicStarters()
        : getGeneratedStarters();

  content.innerHTML = `
    <ul class="sentence-support-list">
      ${supports
        .map((support) => `<li>${support}</li>`)
        .join("")}
    </ul>
  `;
}

function updateEducatorMode() {
  const isEducatorMode =
    document.getElementById("educatorMode").checked;

  const educatorPanel =
    document.getElementById("educatorPromptPanel");

  educatorPanel.classList.toggle(
    "hidden-support",
    !isEducatorMode
  );

  if (!isEducatorMode) {
    return;
  }

  document.getElementById("toggleLabels").checked = true;
  document.getElementById("toggleVocabulary").checked = true;

  document.querySelector(
    'input[name="sentenceSupport"][value="generated"]'
  ).checked = true;

  updateAllSupports();
}

function updateAllSupports() {
  updateLabelVisibility();
  updateVocabularyPanel();
  updateSentenceSupportPanel();
}

function buildPrintPlanner() {
  const title =
    document.getElementById("storyTitle").value.trim();

  document.getElementById(
    "printStoryTitle"
  ).textContent =
    title || "________________________________________";

  const printImageGrid =
    document.getElementById("printImageGrid");

  printImageGrid.innerHTML = "";

  const showLabels =
    document.getElementById("toggleLabels").checked;

  Object.entries(categories).forEach(
    ([categoryName, category]) => {
      const selection =
        currentSelections[categoryName];

      if (
        !isCategoryVisible(categoryName) ||
        !selection
      ) {
        return;
      }

      const card = document.createElement("div");
      card.className = "print-image-card";

      const labelMarkup = showLabels
        ? `
          <div class="print-image-label">
            <strong>${selection.label}</strong>
            <span>${category.title}</span>
          </div>
        `
        : "";

      card.innerHTML = `
        <img
          src="${selection.imagePath}"
          alt="${selection.label}"
        >
        ${labelMarkup}
      `;

      printImageGrid.appendChild(card);
    }
  );

  const printVocabulary =
    document.getElementById("printVocabulary");

  const showVocabulary =
    document.getElementById("toggleVocabulary").checked;

  if (showVocabulary) {
    const vocabularyEntries = [];

    Object.entries(categories).forEach(
      ([categoryName, category]) => {
        const selection =
          currentSelections[categoryName];

        if (
          !isCategoryVisible(categoryName) ||
          !selection
        ) {
          return;
        }

        vocabularyEntries.push(`
          <div>
            <strong>${category.title}:</strong>
            ${selection.label}
          </div>
        `);
      }
    );

    printVocabulary.innerHTML = `
      <h2>Story Vocabulary</h2>

      <div class="print-vocabulary-grid">
        ${vocabularyEntries.join("")}
      </div>
    `;
  } else {
    printVocabulary.innerHTML = "";
  }

  const printSentenceSupport =
    document.getElementById("printSentenceSupport");

  const mode = getSentenceSupportMode();

  const printSupports =
    mode === "open"
      ? getOpenPrompts()
      : mode === "basic"
        ? getBasicStarters()
        : mode === "generated"
          ? getGeneratedStarters()
          : [];

  printSentenceSupport.innerHTML =
    mode === "off"
      ? ""
      : `
        <h2>Sentence Support</h2>

        ${printSupports
          .map(
            (support) =>
              `<div class="print-support-line">${support}</div>`
          )
          .join("")}
      `;

  document.getElementById(
    "typedStoryPrint"
  ).textContent =
    document.getElementById("storyWriting").value.trim();

  const supportsPage =
    document.getElementById("printSupportsPage");

  const hasVocabulary =
    Boolean(printVocabulary.textContent.trim());

  const hasSentenceSupport =
    Boolean(printSentenceSupport.textContent.trim());

  supportsPage.classList.toggle(
    "has-content",
    hasVocabulary || hasSentenceSupport
  );
}

function printPlanner() {
  buildPrintPlanner();
  window.print();
}

function preloadStarterAssets() {
  Object.values(categories).forEach((category) => {
    preloadImage(
      makeImagePath(category, 0)
    ).catch(() => {});
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("rollAll")
    .addEventListener("click", rollAllCategories);

  document
    .getElementById("resetAll")
    .addEventListener("click", resetAllCategories);

  document
    .getElementById("toggleLabels")
    .addEventListener("change", updateLabelVisibility);

  document
    .getElementById("toggleVocabulary")
    .addEventListener("change", updateVocabularyPanel);

  document
    .getElementById("educatorMode")
    .addEventListener("change", updateEducatorMode);

  document
    .querySelectorAll(
      'input[name="sentenceSupport"]'
    )
    .forEach((radio) => {
      radio.addEventListener(
        "change",
        updateSentenceSupportPanel
      );
    });

  Object.keys(categories).forEach(
    connectCategoryToggle
  );

  connectResolutionToggle();

  document
    .getElementById("printPlanner")
    .addEventListener("click", printPlanner);

  document
    .getElementById("savePdf")
    .addEventListener("click", printPlanner);

  preloadStarterAssets();
  updateAllSupports();
});
/* =========================================================
   STORY CHALLENGE
   Replace the previous Story Challenge JavaScript with this.
   Paste this entire section at the BOTTOM of script.js.
========================================================= */

(function () {
  const challengeModeInputs = document.querySelectorAll(
    'input[name="challengeMode"]'
  );
  const challengeOptions = document.getElementById("challengeOptions");
  const mysteryChallengeSection = document.getElementById(
    "mysteryChallengeSection"
  );
  const revealChallengeButton = document.getElementById(
    "revealChallengeButton"
  );
  const challengeError = document.getElementById("challengeError");
  const challengeCardScene = document.getElementById("challengeCardScene");
  const challengeCard = document.getElementById("challengeCard");
  const challengeConfetti = document.getElementById("challengeConfetti");
  const revealedCategory = document.getElementById("revealedCategory");
  const revealedChallengeText = document.getElementById(
    "revealedChallengeText"
  );
  const tierTwoWordInput = document.getElementById("tierTwoWord");
  const rollAllButton = document.getElementById("rollAll");
  const resetAllButton = document.getElementById("resetAll");

  if (
    challengeModeInputs.length === 0 ||
    !challengeOptions ||
    !mysteryChallengeSection ||
    !revealChallengeButton ||
    !challengeError ||
    !challengeCardScene ||
    !challengeCard ||
    !revealedCategory ||
    !revealedChallengeText
  ) {
    console.warn(
      "Story Challenge could not start because some HTML elements are missing."
    );
    return;
  }

  function getChallengeMode() {
    const selectedMode = document.querySelector(
      'input[name="challengeMode"]:checked'
    );
    return selectedMode ? selectedMode.value : "none";
  }

  function clearConfetti() {
    if (challengeConfetti) {
      challengeConfetti.replaceChildren();
    }
  }

  function resetChallengeReveal() {
    challengeCard.classList.remove("is-flipped");
    challengeCardScene.hidden = true;
    challengeError.textContent = "";
    revealedCategory.textContent = "Mystery Challenge";
    revealedChallengeText.textContent = "";
    clearConfetti();
  }

  function updateChallengeDisplay() {
    const mode = getChallengeMode();
    resetChallengeReveal();

    const challengeIsOn = mode !== "none";
    challengeOptions.hidden = !challengeIsOn;
    mysteryChallengeSection.hidden = !challengeIsOn;

    if (mode === "choice") {
      challengeError.textContent =
        "Choose one challenge for every student.";
    } else if (mode === "pool") {
      challengeError.textContent =
        "Choose one or more challenges for the random pool.";
    }
  }

  function getSelectedChallenges() {
    const checkedBoxes = document.querySelectorAll(
      ".challenge-checkbox:checked"
    );

    return Array.from(checkedBoxes).map(function (checkbox) {
      let challengeText = checkbox.dataset.text || "";
      const category =
        checkbox.dataset.category || "Mystery Challenge";

      if (checkbox.id === "tierTwoCheckbox") {
        const word = tierTwoWordInput
          ? tierTwoWordInput.value.trim()
          : "";

        if (word) {
          challengeText = 'Use the word "' + word + '" in your story.';
        }
      }

      return {
        category: category,
        text: challengeText,
        id: checkbox.id
      };
    });
  }

  function tierTwoWordIsMissing(challenges) {
    const tierTwoSelected = challenges.some(function (challenge) {
      return challenge.id === "tierTwoCheckbox";
    });

    const word = tierTwoWordInput
      ? tierTwoWordInput.value.trim()
      : "";

    return tierTwoSelected && !word;
  }

  function chooseRandomChallenge(challenges) {
    const index = Math.floor(Math.random() * challenges.length);
    return challenges[index];
  }

  function launchConfetti() {
    if (!challengeConfetti) {
      return;
    }

    clearConfetti();

    const pieceCount = 34;

    for (let index = 0; index < pieceCount; index += 1) {
      const piece = document.createElement("span");
      piece.className = "confetti-piece";

      const horizontalStart = 42 + Math.random() * 16;
      const horizontalTravel = -150 + Math.random() * 300;
      const verticalTravel = 120 + Math.random() * 150;
      const rotation = 360 + Math.random() * 720;
      const delay = Math.random() * 0.14;
      const duration = 0.85 + Math.random() * 0.55;

      piece.style.setProperty("--confetti-left", horizontalStart + "%");
      piece.style.setProperty("--confetti-x", horizontalTravel + "px");
      piece.style.setProperty("--confetti-y", verticalTravel + "px");
      piece.style.setProperty("--confetti-rotation", rotation + "deg");
      piece.style.setProperty("--confetti-delay", delay + "s");
      piece.style.setProperty("--confetti-duration", duration + "s");
      piece.style.setProperty(
        "--confetti-hue",
        String(Math.floor(Math.random() * 360))
      );

      challengeConfetti.appendChild(piece);
    }

    window.setTimeout(clearConfetti, 1800);
  }

  function revealChallenge() {
    const mode = getChallengeMode();
    const selectedChallenges = getSelectedChallenges();

    resetChallengeReveal();

    if (mode === "none") {
      return;
    }

    if (selectedChallenges.length === 0) {
      challengeError.textContent =
        "Please choose at least one challenge.";
      return;
    }

    if (mode === "choice" && selectedChallenges.length !== 1) {
      challengeError.textContent =
        "Educator Choice requires exactly one checked challenge.";
      return;
    }

    if (tierTwoWordIsMissing(selectedChallenges)) {
      challengeError.textContent =
        "Please type the educator-assigned Tier 2 word.";
      return;
    }

    const chosenChallenge =
      mode === "choice"
        ? selectedChallenges[0]
        : chooseRandomChallenge(selectedChallenges);

    revealedCategory.textContent = chosenChallenge.category;
    revealedChallengeText.textContent = chosenChallenge.text;
    challengeError.textContent = "";
    challengeCardScene.hidden = false;

    window.setTimeout(function () {
      challengeCard.classList.add("is-flipped");
    }, 150);

    window.setTimeout(launchConfetti, 760);
  }

  challengeModeInputs.forEach(function (input) {
    input.addEventListener("change", updateChallengeDisplay);
  });

  document
    .querySelectorAll(".challenge-checkbox")
    .forEach(function (checkbox) {
      checkbox.addEventListener("change", function () {
        if (getChallengeMode() !== "choice" || !checkbox.checked) {
          return;
        }

        document
          .querySelectorAll(".challenge-checkbox")
          .forEach(function (otherCheckbox) {
            if (otherCheckbox !== checkbox) {
              otherCheckbox.checked = false;
            }
          });
      });
    });

  revealChallengeButton.addEventListener("click", revealChallenge);

  if (rollAllButton) {
    rollAllButton.addEventListener("click", resetChallengeReveal);
  }

  if (resetAllButton) {
    resetAllButton.addEventListener("click", function () {
      const offInput = document.querySelector(
        'input[name="challengeMode"][value="none"]'
      );

      if (offInput) {
        offInput.checked = true;
      }

      document
        .querySelectorAll(".challenge-checkbox")
        .forEach(function (checkbox) {
          checkbox.checked = false;
        });

      if (tierTwoWordInput) {
        tierTwoWordInput.value = "";
      }

      updateChallengeDisplay();
    });
  }

  updateChallengeDisplay();
})();