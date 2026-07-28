"use strict";

const categories = {
  character: {
    title: "Character",
    imageId: "characterImage",
    labelId: "characterLabel",
    cardId: "characterCard",
    toggleId: "showCharacter",
    folder: "assets/characters",
    prefix: "character",
    starterImage: "assets/categories/category-01.png",
    labels: [
      "Explorer", "Boy", "Bear", "Dragon", "Robot", "Princess", "Monster",
      "Goat", "Firefighter", "Dinosaur", "Scientist", "Girl", "Adventurer",
      "Cat", "Dog", "Superhero", "Wolf", "Wizard", "Astronaut", "Frog",
      "Prince", "Alien"
    ]
  },

  setting: {
    title: "Setting",
    imageId: "settingImage",
    labelId: "settingLabel",
    cardId: "settingCard",
    toggleId: "showSetting",
    folder: "assets/settings",
    prefix: "setting",
    starterImage: "assets/categories/category-02.png",
    labels: [
      "Stadium", "School", "House", "Tropical Island", "Playground", "Cave",
      "Underwater Reef", "Castle", "Outer Space", "Farm", "Road", "Campsite",
      "Beach", "Mountains", "Snowy Cabin", "Desert", "Tree House", "Airport",
      "Waterfall", "Ancient Ruins", "City", "Pyramid"
    ]
  },

  problem: {
    title: "Problem",
    imageId: "problemImage",
    labelId: "problemLabel",
    cardId: "problemCard",
    toggleId: "showProblem",
    folder: "assets/problems",
    prefix: "problem",
    starterImage: "assets/categories/category-03.png",
    entries: [
      { label: "Alien Abduction", phrase: "was abducted by aliens" },
      { label: "Pirate Attack", phrase: "was attacked by pirates" },
      { label: "Message in a Bottle", phrase: "found a mysterious message in a bottle" },
      { label: "Volcanic Eruption", phrase: "was caught near an erupting volcano" },
      { label: "Pit", phrase: "discovered a deep pit" },
      { label: "Robber", phrase: "encountered a robber" },
      { label: "Broken Bridge", phrase: "found a broken bridge blocking the way" },
      { label: "Monster Attack", phrase: "was attacked by a monster" },
      { label: "Buried Treasure", phrase: "discovered buried treasure" },
      { label: "Storm", phrase: "was caught in a powerful storm" },
      { label: "Slip and Fall", phrase: "slipped and fell" },
      { label: "Broken Vase", phrase: "found a broken vase" },
      { label: "Curse", phrase: "was placed under a mysterious curse" },
      { label: "Stuck", phrase: "became stuck" },
      { label: "Lost Item", phrase: "realized that an important item was missing" },
      { label: "Trapped", phrase: "became trapped in a closed space" },
      { label: "Blizzard", phrase: "was caught in a blizzard" },
      { label: "Giant Wave", phrase: "saw a giant wave approaching" },
      { label: "Hungry", phrase: "became very hungry" },
      { label: "Explosion", phrase: "heard a sudden explosion" },
      { label: "Locked Door", phrase: "found a locked door" },
      { label: "Swapped Bodies", phrase: "suddenly swapped bodies with someone" }
    ]
  },

  feeling: {
    title: "Feeling",
    imageId: "feelingImage",
    labelId: "feelingLabel",
    cardId: "feelingCard",
    toggleId: "showFeeling",
    folder: "assets/feelings",
    prefix: "feeling",
    starterImage: "assets/categories/category-04.png",
    labels: [
      "Angry", "Sleepy", "Surprised", "Amazed", "Excited", "Loving",
      "Annoyed", "Sick", "Embarrassed", "Happy", "Confused", "Disgusted",
      "Scared", "Suspicious", "Confident", "Sad", "Brave", "Determined",
      "Proud", "Hopeful", "Lonely", "Relieved"
    ]
  },

  plan: {
    title: "Plan",
    imageId: "planImage",
    labelId: "planLabel",
    cardId: "planCard",
    toggleId: "showPlan",
    folder: "assets/plans",
    prefix: "plan",
    starterImage: "assets/categories/category-05.png",
    labels: [
      "Break Out", "Build", "Climb", "Play Music", "Run", "Help", "Fly",
      "Read", "Use Magic", "Row a Boat", "Read Map", "Swim", "Share Gift",
      "Make a Phone Call", "Fix", "Hike", "Hide", "Experiment", "Plant",
      "Dig", "Search", "Wear a Disguise"
    ]
  },

  item: {
    title: "Item",
    imageId: "itemImage",
    labelId: "itemLabel",
    cardId: "itemCard",
    toggleId: "showItem",
    folder: "assets/items",
    prefix: "item",
    starterImage: "assets/categories/category-06.png",
    labels: [
      "Shield", "Present", "Crown", "Camera", "Rope", "Umbrella", "Key",
      "Telescope", "Flashlight", "Book", "Walkie-Talkie", "Toolbox",
      "Backpack", "Binoculars", "Duct Tape", "Musical Instruments",
      "Magic Wand", "Compass", "Magic Potion", "Treasure Map",
      "Magnifying Glass", "Disguise"
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
  const paddedNumber = String(index + 1).padStart(2, "0");
  return `${category.folder}/${category.prefix}-${paddedNumber}.png`;
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

function updateThinkingPrompts() {
  const panel =
    document.getElementById("thinkingPromptPanel");

  panel.classList.toggle(
    "hidden-support",
    !document.getElementById("thinkingPromptsToggle").checked
  );
}

function updateAllSupports() {
  updateLabelVisibility();
  updateVocabularyPanel();
  updateSentenceSupportPanel();
  updateThinkingPrompts();
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
  .getElementById("thinkingPromptsToggle")
  .addEventListener("change", updateThinkingPrompts);

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
/* =========================================================
   STORY PLANNER + AUTO-SAVE + SAVE / OPEN STORY
   Paste this entire section at the bottom of script.js.
========================================================= */

(function () {
  "use strict";

  const STORAGE_KEY = "firstVoloStoryBuilderSavedWork";
  const SAVE_VERSION = 1;

  const plannerCategories = [
    "character",
    "setting",
    "problem",
    "feeling",
    "plan",
    "item"
  ];

  const plannerPrompts = {
    default: {
      character: "Add notes about the character.",
      setting: "Add notes about the setting.",
      problem: "Add notes about the problem.",
      feeling: "Add notes about the character’s feeling.",
      plan: "Add notes about the plan.",
      item: "Add notes about the item.",
      resolution: "Add notes about how the story ends."
    },

    open: {
      character:
        "Who is the main character? What is the character like? What does the character want?",
      setting:
        "Where does the story take place? When does it happen? What is the setting like?",
      problem:
        "What goes wrong? Why is this a problem for the character?",
      feeling:
        "How does the character feel? Why does the character feel that way?",
      plan:
        "What does the character plan to do? How could the plan solve the problem?",
      item:
        "How could the item help? What might the character do with it?",
      resolution:
        "How is the problem solved? How does the character feel at the end?"
    }
  };

  let autoSaveTimer = null;
  let statusTimer = null;
  let isRestoringStory = false;

  function getElement(id) {
    return document.getElementById(id);
  }

  function showSaveStatus(message, duration = 2200) {
    const status = getElement("saveStatus");

    if (!status) {
      return;
    }

    window.clearTimeout(statusTimer);
    status.textContent = message;

    if (duration > 0) {
      statusTimer = window.setTimeout(() => {
        status.textContent = "";
      }, duration);
    }
  }

  function getCheckedValue(name, fallback = "") {
    const checked = document.querySelector(
      `input[name="${name}"]:checked`
    );

    return checked ? checked.value : fallback;
  }

  function getPlannerNotes() {
    const notes = {};

    [...plannerCategories, "resolution"].forEach((categoryName) => {
      notes[categoryName] =
        getElement(
          `planner${capitalize(categoryName)}Notes`
        )?.value || "";
    });

    return notes;
  }

  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  function getCategoryVisibility() {
    const visibility = {};

    plannerCategories.forEach((categoryName) => {
      visibility[categoryName] =
        getElement(
          `show${capitalize(categoryName)}`
        )?.checked ?? true;
    });

    visibility.resolution =
      getElement("showResolution")?.checked ?? true;

    return visibility;
  }

  function getChallengeState() {
    const challengeCheckboxes = Array.from(
      document.querySelectorAll(".challenge-checkbox")
    );

    return {
      mode: getCheckedValue("challengeMode", "none"),

      selected: challengeCheckboxes.map((checkbox) => ({
        text: checkbox.dataset.text || "",
        category: checkbox.dataset.category || "",
        checked: checkbox.checked
      })),

      tierTwoWord: getElement("tierTwoWord")?.value || "",

      revealedCategory:
        getElement("revealedCategory")?.textContent || "",

      revealedText:
        getElement("revealedChallengeText")?.textContent || "",

      revealed:
        Boolean(
          getElement("challengeCardScene")?.classList.contains(
            "is-revealed"
          )
        )
    };
  }

  function buildStorySaveData() {
    const selections = {};

    plannerCategories.forEach((categoryName) => {
      const selection = currentSelections[categoryName];

      selections[categoryName] = selection
        ? {
            index: selection.index,
            label: selection.label,
            phrase: selection.phrase || null,
            imagePath: selection.imagePath
          }
        : null;
    });

    return {
      app: "First Volo Story Builder",
      version: SAVE_VERSION,
      savedAt: new Date().toISOString(),

      title: getElement("storyTitle")?.value || "",
      storyWriting: getElement("storyWriting")?.value || "",
      plannerNotes: getPlannerNotes(),
      selections,

      settings: {
        showLabels: getElement("toggleLabels")?.checked ?? false,
        showVocabulary:
          getElement("toggleVocabulary")?.checked ?? false,
        sentenceSupport:
          getCheckedValue("sentenceSupport", "off"),
        categoryVisibility: getCategoryVisibility()
      },

      challenge: getChallengeState()
    };
  }

  function saveToBrowser(showMessage = false) {
    if (isRestoringStory) {
      return;
    }

    try {
      const data = buildStorySaveData();

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
      );

      if (showMessage) {
        showSaveStatus("✓ Work saved in this browser.");
      }
    } catch (error) {
      console.error("Could not auto-save story:", error);

      if (showMessage) {
        showSaveStatus("Could not save in this browser.");
      }
    }
  }

  function scheduleAutoSave() {
    if (isRestoringStory) {
      return;
    }

    window.clearTimeout(autoSaveTimer);

    autoSaveTimer = window.setTimeout(() => {
      saveToBrowser(false);
      showSaveStatus("✓ Auto-saved", 1100);
    }, 550);
  }

  function updatePlannerPrompts() {
    const sentenceMode =
      getCheckedValue("sentenceSupport", "off");

    const promptSet =
      sentenceMode === "open"
        ? plannerPrompts.open
        : plannerPrompts.default;

    Object.entries(promptSet).forEach(
      ([categoryName, prompt]) => {
        const element = getElement(
          `planner${capitalize(categoryName)}Prompt`
        );

        if (element) {
          element.textContent = prompt;
        }
      }
    );
  }

  function updatePlannerVisibility() {
    const visibility = getCategoryVisibility();

    Object.entries(visibility).forEach(
      ([categoryName, isVisible]) => {
        const card = getElement(
          `planner${capitalize(categoryName)}Card`
        );

        card?.classList.toggle(
          "hidden-planner-card",
          !isVisible
        );
      }
    );
  }

  function updateStoryPlanner() {
    plannerCategories.forEach((categoryName) => {
      const category = categories[categoryName];
      const selection = currentSelections[categoryName];

      const image = getElement(
        `planner${capitalize(categoryName)}Image`
      );

      const label = getElement(
        `planner${capitalize(categoryName)}Label`
      );

      if (!category || !image || !label) {
        return;
      }

      if (selection) {
        image.src = selection.imagePath;
        image.alt = `${category.title}: ${selection.label}`;
        label.textContent = selection.label;
      } else {
        image.src = category.starterImage;
        image.alt = category.title;
        label.textContent =
          `Roll to choose a ${category.title.toLowerCase()}.`;
      }
    });

    updatePlannerPrompts();
    updatePlannerVisibility();
  }

  function applyRadioValue(name, value) {
    const radio = document.querySelector(
      `input[name="${name}"][value="${CSS.escape(value)}"]`
    );

    if (radio) {
      radio.checked = true;
      radio.dispatchEvent(
        new Event("change", { bubbles: true })
      );
    }
  }

  function restoreChallengeState(challenge) {
    if (!challenge) {
      return;
    }

    applyRadioValue(
      "challengeMode",
      challenge.mode || "none"
    );

    const savedSelections = Array.isArray(challenge.selected)
      ? challenge.selected
      : [];

    document
      .querySelectorAll(".challenge-checkbox")
      .forEach((checkbox) => {
        const match = savedSelections.find(
          (saved) =>
            saved.text === (checkbox.dataset.text || "") &&
            saved.category ===
              (checkbox.dataset.category || "")
        );

        checkbox.checked = Boolean(match?.checked);
        checkbox.dispatchEvent(
          new Event("change", { bubbles: true })
        );
      });

    const tierTwoWord = getElement("tierTwoWord");

    if (tierTwoWord) {
      tierTwoWord.value = challenge.tierTwoWord || "";
      tierTwoWord.dispatchEvent(
        new Event("input", { bubbles: true })
      );
    }

    const revealedCategory = getElement("revealedCategory");
    const revealedText = getElement("revealedChallengeText");
    const scene = getElement("challengeCardScene");

    if (revealedCategory) {
      revealedCategory.textContent =
        challenge.revealedCategory || "";
    }

    if (revealedText) {
      revealedText.textContent =
        challenge.revealedText || "";
    }

    if (scene) {
      scene.classList.toggle(
        "is-revealed",
        Boolean(challenge.revealed)
      );
    }
  }

  function restoreStory(data, options = {}) {
    if (
      !data ||
      typeof data !== "object" ||
      data.app !== "First Volo Story Builder"
    ) {
      throw new Error(
        "This file is not a First Volo Story Builder save file."
      );
    }

    isRestoringStory = true;

    try {
      const title = getElement("storyTitle");
      const writing = getElement("storyWriting");

      if (title) {
        title.value = data.title || "";
      }

      if (writing) {
        writing.value = data.storyWriting || "";
      }

      const notes = data.plannerNotes || {};

      [...plannerCategories, "resolution"].forEach(
        (categoryName) => {
          const textarea = getElement(
            `planner${capitalize(categoryName)}Notes`
          );

          if (textarea) {
            textarea.value = notes[categoryName] || "";
          }
        }
      );

      const settings = data.settings || {};

      const labelsToggle = getElement("toggleLabels");
      const vocabularyToggle =
        getElement("toggleVocabulary");

      if (labelsToggle) {
        labelsToggle.checked =
          Boolean(settings.showLabels);
      }

      if (vocabularyToggle) {
        vocabularyToggle.checked =
          Boolean(settings.showVocabulary);
      }

      applyRadioValue(
        "sentenceSupport",
        settings.sentenceSupport || "off"
      );

      const visibility =
        settings.categoryVisibility || {};

      plannerCategories.forEach((categoryName) => {
        const toggle = getElement(
          `show${capitalize(categoryName)}`
        );

        if (!toggle) {
          return;
        }

        toggle.checked =
          visibility[categoryName] !== false;

        toggle.dispatchEvent(
          new Event("change", { bubbles: true })
        );
      });

      const resolutionToggle =
        getElement("showResolution");

      if (resolutionToggle) {
        resolutionToggle.checked =
          visibility.resolution !== false;

        resolutionToggle.dispatchEvent(
          new Event("change", { bubbles: true })
        );
      }

      plannerCategories.forEach((categoryName) => {
        const savedSelection =
          data.selections?.[categoryName];

        if (
          savedSelection &&
          Number.isInteger(savedSelection.index) &&
          savedSelection.index >= 0 &&
          savedSelection.index <
            getCategoryLength(categories[categoryName])
        ) {
          applySelection(
            categoryName,
            savedSelection.index
          );
        } else {
          currentSelections[categoryName] = null;

          const category = categories[categoryName];
          const image = getElement(category.imageId);
          const label = getElement(category.labelId);

          if (image) {
            image.src = category.starterImage;
            image.alt =
              `Roll to choose a ${category.title.toLowerCase()}`;
          }

          if (label) {
            label.textContent = "";
          }
        }
      });

      restoreChallengeState(data.challenge);

      if (typeof updateAllSupports === "function") {
        updateAllSupports();
      }

      updateStoryPlanner();

      labelsToggle?.dispatchEvent(
        new Event("change", { bubbles: true })
      );

      vocabularyToggle?.dispatchEvent(
        new Event("change", { bubbles: true })
      );
    } finally {
      isRestoringStory = false;
    }

    saveToBrowser(false);

    if (options.showMessage) {
      showSaveStatus("✓ Story opened successfully.");
    }
  }

  function restoreBrowserSave() {
    const savedText = localStorage.getItem(STORAGE_KEY);

    if (!savedText) {
      updateStoryPlanner();
      return;
    }

    try {
      const data = JSON.parse(savedText);
      restoreStory(data, { showMessage: false });
      showSaveStatus("✓ Previous work restored.", 1800);
    } catch (error) {
      console.error("Could not restore saved work:", error);
      localStorage.removeItem(STORAGE_KEY);
      updateStoryPlanner();
    }
  }

  function makeSafeFileName(title) {
    const cleaned = String(title || "Untitled Story")
      .trim()
      .replace(/[<>:"/\\|?*\u0000-\u001F]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 70);

    return cleaned || "Untitled-Story";
  }

  function downloadStoryFile() {
    try {
      const data = buildStorySaveData();
      const json = JSON.stringify(data, null, 2);

      const blob = new Blob([json], {
        type: "application/json"
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download =
        `${makeSafeFileName(data.title)}.firstvolo.json`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);

      saveToBrowser(false);
      showSaveStatus("✓ Story file saved.");
    } catch (error) {
      console.error("Could not save story file:", error);
      showSaveStatus("Could not save the story file.");
    }
  }

  function openStoryPicker() {
    const fileInput = getElement("openStoryFile");

    if (!fileInput) {
      return;
    }

    fileInput.value = "";
    fileInput.click();
  }

  function readStoryFile(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (
      !file.name.toLowerCase().endsWith(".json")
    ) {
      window.alert(
        "Please choose a First Volo Story Builder JSON file."
      );
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        restoreStory(data, { showMessage: true });
      } catch (error) {
        console.error("Could not open story:", error);

        window.alert(
          error.message ||
            "The selected story file could not be opened."
        );
      }
    };

    reader.onerror = () => {
      window.alert(
        "The selected story file could not be read."
      );
    };

    reader.readAsText(file);
  }

  function clearPlannerNotes() {
    [...plannerCategories, "resolution"].forEach(
      (categoryName) => {
        const textarea = getElement(
          `planner${capitalize(categoryName)}Notes`
        );

        if (textarea) {
          textarea.value = "";
        }
      }
    );
  }

  function connectAutoSaveEvents() {
    document.addEventListener("input", (event) => {
      if (
        event.target.matches(
          "#storyTitle, #storyWriting, .story-planner-notes, #tierTwoWord"
        )
      ) {
        scheduleAutoSave();
      }
    });

    document.addEventListener("change", (event) => {
      if (
        event.target.matches(
          '#toggleLabels, #toggleVocabulary, input[name="sentenceSupport"], input[name="challengeMode"], .challenge-checkbox, [id^="show"]'
        )
      ) {
        updateStoryPlanner();
        scheduleAutoSave();
      }
    });

    document.addEventListener("click", (event) => {
      if (
        event.target.closest(
          ".card button, #rollAll, #revealChallengeButton"
        )
      ) {
        window.setTimeout(() => {
          updateStoryPlanner();
          scheduleAutoSave();
        }, 900);
      }
    });
  }

  function observeStoryCards() {
    const observer = new MutationObserver(() => {
      updateStoryPlanner();
      scheduleAutoSave();
    });

    plannerCategories.forEach((categoryName) => {
      const category = categories[categoryName];
      const image = getElement(category.imageId);
      const label = getElement(category.labelId);

      if (image) {
        observer.observe(image, {
          attributes: true,
          attributeFilter: ["src"]
        });
      }

      if (label) {
        observer.observe(label, {
          childList: true,
          characterData: true,
          subtree: true
        });
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    getElement("saveStory")?.addEventListener(
      "click",
      downloadStoryFile
    );

    getElement("openStory")?.addEventListener(
      "click",
      openStoryPicker
    );

    getElement("openStoryFile")?.addEventListener(
      "change",
      readStoryFile
    );

    getElement("resetAll")?.addEventListener(
      "click",
      () => {
        clearPlannerNotes();
        updateStoryPlanner();

        window.setTimeout(() => {
          saveToBrowser(false);
          showSaveStatus("Story reset.");
        }, 50);
      }
    );

    connectAutoSaveEvents();
    observeStoryCards();
    restoreBrowserSave();
  });
})();