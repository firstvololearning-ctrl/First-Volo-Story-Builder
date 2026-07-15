"use strict";

/*
  IMPORTANT:
  This code expects your feeling files to be named:

  feeling-01.png
  feeling-02.png
  ...
  feeling-22.png

  If your files are still named emotion-01.png, change:
  prefix: "feeling"
  to:
  prefix: "emotion"
*/

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
      "Explorer",
      "Boy",
      "Bear",
      "Dragon",
      "Robot",
      "Princess",
      "Monster",
      "Goat",
      "Firefighter",
      "Dinosaur",
      "Scientist",
      "Girl",
      "Adventurer",
      "Cat",
      "Dog",
      "Superhero",
      "Wolf",
      "Wizard",
      "Astronaut",
      "Frog",
      "Prince",
      "Alien"
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
      "Stadium",
      "School",
      "House",
      "Tropical Island",
      "Playground",
      "Cave",
      "Underwater Reef",
      "Castle",
      "Outer Space",
      "Farm",
      "Road",
      "Campsite",
      "Beach",
      "Mountains",
      "Snowy Cabin",
      "Desert",
      "Tree House",
      "Airport",
      "Waterfall",
      "Ancient Ruins",
      "City",
      "Pyramid"
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
      {
        label: "Alien Abduction",
        phrase: "was abducted by aliens"
      },
      {
        label: "Pirate Attack",
        phrase: "was attacked by pirates"
      },
      {
        label: "Message in a Bottle",
        phrase: "found a mysterious message in a bottle"
      },
      {
        label: "Volcanic Eruption",
        phrase: "was caught near an erupting volcano"
      },
      {
        label: "Pit",
        phrase: "discovered a deep pit"
      },
      {
        label: "Robber",
        phrase: "encountered a robber"
      },
      {
        label: "Broken Bridge",
        phrase: "found a broken bridge blocking the way"
      },
      {
        label: "Monster Attack",
        phrase: "was attacked by a monster"
      },
      {
        label: "Buried Treasure",
        phrase: "discovered buried treasure"
      },
      {
        label: "Storm",
        phrase: "was caught in a powerful storm"
      },
      {
        label: "Slip and Fall",
        phrase: "slipped and fell"
      },
      {
        label: "Broken Vase",
        phrase: "found a broken vase"
      },
      {
        label: "Curse",
        phrase: "was placed under a mysterious curse"
      },
      {
        label: "Stuck",
        phrase: "became stuck"
      },
      {
        label: "Lost Item",
        phrase: "realized that an important item was missing"
      },
      {
        label: "Trapped",
        phrase: "became trapped in a closed space"
      },
      {
        label: "Blizzard",
        phrase: "was caught in a blizzard"
      },
      {
        label: "Giant Wave",
        phrase: "saw a giant wave approaching"
      },
      {
        label: "Hungry",
        phrase: "became very hungry"
      },
      {
        label: "Explosion",
        phrase: "heard a sudden explosion"
      },
      {
        label: "Locked Door",
        phrase: "found a locked door"
      },
      {
        label: "Swapped Bodies",
        phrase: "suddenly swapped bodies with someone"
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
    prefix: "feeling",
    starterImage: "assets/categories/category-04.png",
    labels: [
      "Angry",
      "Sleepy",
      "Surprised",
      "Amazed",
      "Excited",
      "Loving",
      "Annoyed",
      "Sick",
      "Embarrassed",
      "Happy",
      "Confused",
      "Disgusted",
      "Scared",
      "Suspicious",
      "Confident",
      "Sad",
      "Brave",
      "Determined",
      "Proud",
      "Hopeful",
      "Lonely",
      "Relieved"
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
      "Break Out",
      "Build",
      "Climb",
      "Play Music",
      "Run",
      "Help",
      "Fly",
      "Read",
      "Use Magic",
      "Row a Boat",
      "Read Map",
      "Swim",
      "Share Gift",
      "Make a Phone Call",
      "Fix",
      "Hike",
      "Hide",
      "Experiment",
      "Plant",
      "Dig",
      "Search",
      "Wear a Disguise"
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
      "Shield",
      "Present",
      "Crown",
      "Camera",
      "Rope",
      "Umbrella",
      "Key",
      "Telescope",
      "Flashlight",
      "Book",
      "Walkie-Talkie",
      "Toolbox",
      "Backpack",
      "Binoculars",
      "Duct Tape",
      "Musical Instruments",
      "Magic Wand",
      "Compass",
      "Magic Potion",
      "Treasure Map",
      "Magnifying Glass",
      "Disguise"
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

function getCategoryLength(category) {
  if (category.entries) {
    return category.entries.length;
  }

  return category.labels.length;
}

function getEntry(category, index) {
  if (category.entries) {
    return category.entries[index];
  }

  return {
    label: category.labels[index]
  };
}

function getRandomIndex(length) {
  return Math.floor(Math.random() * length);
}

function makeImagePath(category, index) {
  const imageNumber = index + 1;
  const paddedNumber = String(imageNumber).padStart(2, "0");

  return `${category.folder}/${category.prefix}-${paddedNumber}.png`;
}

function changeImage(image, newPath) {
  image.classList.add("changing");

  const testImage = new Image();

  testImage.onload = () => {
    window.setTimeout(() => {
      image.src = newPath;
      image.classList.remove("changing");
    }, 180);
  };

  testImage.onerror = () => {
    image.classList.remove("changing");
    console.error(`Image not found: ${newPath}`);
  };

  testImage.src = newPath;
}

function rollCategory(categoryName) {
  const category = categories[categoryName];

  if (!category) {
    console.error(`Unknown category: ${categoryName}`);
    return;
  }

  const image = document.getElementById(category.imageId);
  const labelElement = document.getElementById(category.labelId);

  if (!image || !labelElement) {
    console.error(
      `Missing image or label element for ${categoryName}.`
    );
    return;
  }

  const randomIndex = getRandomIndex(
    getCategoryLength(category)
  );

  const entry = getEntry(category, randomIndex);
  const newPath = makeImagePath(category, randomIndex);

  currentSelections[categoryName] = {
    index: randomIndex,
    label: entry.label,
    phrase: entry.phrase || null,
    imagePath: newPath
  };

  labelElement.textContent = entry.label;
  changeImage(image, newPath);

  updateAllSupports();
}

function isCategoryVisible(categoryName) {
  const category = categories[categoryName];
  const card = document.getElementById(category.cardId);

  return Boolean(
    card &&
    !card.classList.contains("hidden-category")
  );
}

function rollAllCategories() {
  Object.keys(categories).forEach((categoryName) => {
    if (isCategoryVisible(categoryName)) {
      rollCategory(categoryName);
    }
  });
}

function resetAllCategories() {
  Object.entries(categories).forEach(
    ([categoryName, category]) => {
      const image = document.getElementById(category.imageId);
      const label = document.getElementById(category.labelId);

      currentSelections[categoryName] = null;

      if (image) {
        changeImage(image, category.starterImage);
      }

      if (label) {
        label.textContent = "";
      }
    }
  );

  document.getElementById("storyTitle").value = "";
  document.getElementById("storyWriting").value = "";

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

  let supports = [];

  if (mode === "open") {
    supports = getOpenPrompts();
  }

  if (mode === "basic") {
    supports = getBasicStarters();
  }

  if (mode === "generated") {
    supports = getGeneratedStarters();
  }

  content.innerHTML = `
    <ul class="sentence-support-list">
      ${supports
        .map((support) => `<li>${support}</li>`)
        .join("")}
    </ul>
  `;
}

function updateTeacherMode() {
  const isTeacherMode =
    document.getElementById("teacherMode").checked;

  const teacherPanel =
    document.getElementById("teacherPromptPanel");

  teacherPanel.classList.toggle(
    "hidden-support",
    !isTeacherMode
  );

  if (!isTeacherMode) {
    return;
  }

  const labelsToggle =
    document.getElementById("toggleLabels");

  const vocabularyToggle =
    document.getElementById("toggleVocabulary");

  const generatedRadio =
    document.querySelector(
      'input[name="sentenceSupport"][value="generated"]'
    );

  labelsToggle.checked = true;
  vocabularyToggle.checked = true;
  generatedRadio.checked = true;

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

  const printTitle =
    document.getElementById("printStoryTitle");

  printTitle.textContent =
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
            ${category.title}: ${selection.label}
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

  let printSupports = [];

  if (mode === "open") {
    printSupports = getOpenPrompts();
  }

  if (mode === "basic") {
    printSupports = getBasicStarters();
  }

  if (mode === "generated") {
    printSupports = getGeneratedStarters();
  }

  if (mode === "off") {
    printSentenceSupport.innerHTML = "";
  } else {
    printSentenceSupport.innerHTML = `
      <h2>Sentence Support</h2>
      ${printSupports
        .map(
          (support) =>
            `<div class="print-support-line">${support}</div>`
        )
        .join("")}
    `;
  }

  const writtenStory =
    document.getElementById("storyWriting").value.trim();

  document.getElementById(
    "typedStoryPrint"
  ).textContent = writtenStory;
}

function printPlanner() {
  buildPrintPlanner();
  window.print();
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
    .getElementById("teacherMode")
    .addEventListener("change", updateTeacherMode);

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

  updateAllSupports();
});