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
    entries: [
      { id: "character-explorer", label: "Explorer", file: "character-01.png" },
      { id: "character-boy", label: "Boy", file: "character-02.png" },
      { id: "character-bear", label: "Bear", file: "character-03.png" },
      { id: "character-dragon", label: "Dragon", file: "character-04.png" },
      { id: "character-robot", label: "Robot", file: "character-05.png" },
      { id: "character-princess", label: "Princess", file: "character-06.png" },
      { id: "character-monster", label: "Monster", file: "character-07.png" },
      { id: "character-goat", label: "Goat", file: "character-08.png" },
      { id: "character-firefighter", label: "Firefighter", file: "character-09.png" },
      { id: "character-dinosaur", label: "Dinosaur", file: "character-10.png" },
      { id: "character-scientist", label: "Scientist", file: "character-11.png" },
      { id: "character-girl", label: "Girl", file: "character-12.png" },
      { id: "character-adventurer", label: "Adventurer", file: "character-13.png" },
      { id: "character-cat", label: "Cat", file: "character-14.png" },
      { id: "character-dog", label: "Dog", file: "character-15.png" },
      { id: "character-superhero", label: "Superhero", file: "character-16.png" },
      { id: "character-wolf", label: "Wolf", file: "character-17.png" },
      { id: "character-wizard", label: "Wizard", file: "character-18.png" },
      { id: "character-astronaut", label: "Astronaut", file: "character-19.png" },
      { id: "character-frog", label: "Frog", file: "character-20.png" },
      { id: "character-prince", label: "Prince", file: "character-21.png" },
      { id: "character-alien", label: "Alien", file: "character-22.png" }
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
    entries: [
      { id: "setting-stadium", label: "Stadium", file: "setting-01.png" },
      { id: "setting-school", label: "School", file: "setting-02.png" },
      { id: "setting-house", label: "House", file: "setting-03.png" },
      { id: "setting-tropical-island", label: "Tropical Island", file: "setting-04.png" },
      { id: "setting-playground", label: "Playground", file: "setting-05.png" },
      { id: "setting-cave", label: "Cave", file: "setting-06.png" },
      { id: "setting-underwater-reef", label: "Underwater Reef", file: "setting-07.png" },
      { id: "setting-castle", label: "Castle", file: "setting-08.png" },
      { id: "setting-outer-space", label: "Outer Space", file: "setting-09.png" },
      { id: "setting-farm", label: "Farm", file: "setting-10.png" },
      { id: "setting-road", label: "Road", file: "setting-11.png" },
      { id: "setting-campsite", label: "Campsite", file: "setting-12.png" },
      { id: "setting-beach", label: "Beach", file: "setting-13.png" },
      { id: "setting-mountains", label: "Mountains", file: "setting-14.png" },
      { id: "setting-snowy-cabin", label: "Snowy Cabin", file: "setting-15.png" },
      { id: "setting-desert", label: "Desert", file: "setting-16.png" },
      { id: "setting-tree-house", label: "Tree House", file: "setting-17.png" },
      { id: "setting-airport", label: "Airport", file: "setting-18.png" },
      { id: "setting-waterfall", label: "Waterfall", file: "setting-19.png" },
      { id: "setting-ancient-ruins", label: "Ancient Ruins", file: "setting-20.png" },
      { id: "setting-city", label: "City", file: "setting-21.png" },
      { id: "setting-pyramid", label: "Pyramid", file: "setting-22.png" }
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
      { id: "problem-alien-abduction", label: "Alien Abduction", phrase: "was abducted by aliens", file: "problem-01.png" },
      { id: "problem-pirate-attack", label: "Pirate Attack", phrase: "was attacked by pirates", file: "problem-02.png" },
      { id: "problem-message-in-a-bottle", label: "Message in a Bottle", phrase: "found a mysterious message in a bottle", file: "problem-03.png" },
      { id: "problem-volcanic-eruption", label: "Volcanic Eruption", phrase: "was caught near an erupting volcano", file: "problem-04.png" },
      { id: "problem-pit", label: "Pit", phrase: "discovered a deep pit", file: "problem-05.png" },
      { id: "problem-robber", label: "Robber", phrase: "encountered a robber", file: "problem-06.png" },
      { id: "problem-broken-bridge", label: "Broken Bridge", phrase: "found a broken bridge blocking the way", file: "problem-07.png" },
      { id: "problem-monster-attack", label: "Monster Attack", phrase: "was attacked by a monster", file: "problem-08.png" },
      { id: "problem-buried-treasure", label: "Buried Treasure", phrase: "discovered buried treasure", file: "problem-09.png" },
      { id: "problem-storm", label: "Storm", phrase: "was caught in a powerful storm", file: "problem-10.png" },
      { id: "problem-slip-and-fall", label: "Slip and Fall", phrase: "slipped and fell", file: "problem-11.png" },
      { id: "problem-broken-vase", label: "Broken Vase", phrase: "found a broken vase", file: "problem-12.png" },
      { id: "problem-curse", label: "Curse", phrase: "was placed under a mysterious curse", file: "problem-13.png" },
      { id: "problem-stuck", label: "Stuck", phrase: "became stuck", file: "problem-14.png" },
      { id: "problem-lost-item", label: "Lost Item", phrase: "realized that an important item was missing", file: "problem-15.png" },
      { id: "problem-trapped", label: "Trapped", phrase: "became trapped in a closed space", file: "problem-16.png" },
      { id: "problem-blizzard", label: "Blizzard", phrase: "was caught in a blizzard", file: "problem-17.png" },
      { id: "problem-giant-wave", label: "Giant Wave", phrase: "saw a giant wave approaching", file: "problem-18.png" },
      { id: "problem-hungry", label: "Hungry", phrase: "became very hungry", file: "problem-19.png" },
      { id: "problem-explosion", label: "Explosion", phrase: "heard a sudden explosion", file: "problem-20.png" },
      { id: "problem-locked-door", label: "Locked Door", phrase: "found a locked door", file: "problem-21.png" },
      { id: "problem-swapped-bodies", label: "Swapped Bodies", phrase: "suddenly swapped bodies with someone", file: "problem-22.png" }
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
    entries: [
      { id: "feeling-angry", label: "Angry", file: "feeling-01.png" },
      { id: "feeling-sleepy", label: "Sleepy", file: "feeling-02.png" },
      { id: "feeling-surprised", label: "Surprised", file: "feeling-03.png" },
      { id: "feeling-amazed", label: "Amazed", file: "feeling-04.png" },
      { id: "feeling-excited", label: "Excited", file: "feeling-05.png" },
      { id: "feeling-loving", label: "Loving", file: "feeling-06.png" },
      { id: "feeling-annoyed", label: "Annoyed", file: "feeling-07.png" },
      { id: "feeling-sick", label: "Sick", file: "feeling-08.png" },
      { id: "feeling-embarrassed", label: "Embarrassed", file: "feeling-09.png" },
      { id: "feeling-happy", label: "Happy", file: "feeling-10.png" },
      { id: "feeling-confused", label: "Confused", file: "feeling-11.png" },
      { id: "feeling-disgusted", label: "Disgusted", file: "feeling-12.png" },
      { id: "feeling-scared", label: "Scared", file: "feeling-13.png" },
      { id: "feeling-suspicious", label: "Suspicious", file: "feeling-14.png" },
      { id: "feeling-confident", label: "Confident", file: "feeling-15.png" },
      { id: "feeling-sad", label: "Sad", file: "feeling-16.png" },
      { id: "feeling-brave", label: "Brave", file: "feeling-17.png" },
      { id: "feeling-determined", label: "Determined", file: "feeling-18.png" },
      { id: "feeling-proud", label: "Proud", file: "feeling-19.png" },
      { id: "feeling-hopeful", label: "Hopeful", file: "feeling-20.png" },
      { id: "feeling-lonely", label: "Lonely", file: "feeling-21.png" },
      { id: "feeling-relieved", label: "Relieved", file: "feeling-22.png" }
    ]
  },

  plan: {
    title: "Plan Idea",
    imageId: "planImage",
    labelId: "planLabel",
    cardId: "planCard",
    toggleId: "showPlan",
    folder: "assets/plans",
    prefix: "plan",
    starterImage: "assets/categories/category-05.png",
    entries: [
      { id: "plan-break-out", label: "Break Out", file: "plan-01.png" },
      { id: "plan-build", label: "Build", file: "plan-02.png" },
      { id: "plan-climb", label: "Climb", file: "plan-03.png" },
      { id: "plan-play-music", label: "Play Music", file: "plan-04.png" },
      { id: "plan-run", label: "Run", file: "plan-05.png" },
      { id: "plan-help", label: "Help", file: "plan-06.png" },
      { id: "plan-fly", label: "Fly", file: "plan-07.png" },
      { id: "plan-read", label: "Read", file: "plan-08.png" },
      { id: "plan-use-magic", label: "Use Magic", file: "plan-09.png" },
      { id: "plan-row-a-boat", label: "Row a Boat", file: "plan-10.png" },
      { id: "plan-read-map", label: "Read Map", file: "plan-11.png" },
      { id: "plan-swim", label: "Swim", file: "plan-12.png" },
      { id: "plan-share-gift", label: "Share Gift", file: "plan-13.png" },
      { id: "plan-make-a-phone-call", label: "Make a Phone Call", file: "plan-14.png" },
      { id: "plan-fix", label: "Fix", file: "plan-15.png" },
      { id: "plan-hike", label: "Hike", file: "plan-16.png" },
      { id: "plan-hide", label: "Hide", file: "plan-17.png" },
      { id: "plan-experiment", label: "Experiment", file: "plan-18.png" },
      { id: "plan-plant", label: "Plant", file: "plan-19.png" },
      { id: "plan-dig", label: "Dig", file: "plan-20.png" },
      { id: "plan-search", label: "Search", file: "plan-21.png" },
      { id: "plan-wear-a-disguise", label: "Wear a Disguise", file: "plan-22.png" }
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
    entries: [
      { id: "item-shield", label: "Shield", file: "item-01.png" },
      { id: "item-present", label: "Present", file: "item-02.png" },
      { id: "item-crown", label: "Crown", file: "item-03.png" },
      { id: "item-camera", label: "Camera", file: "item-04.png" },
      { id: "item-rope", label: "Rope", file: "item-05.png" },
      { id: "item-umbrella", label: "Umbrella", file: "item-06.png" },
      { id: "item-key", label: "Key", file: "item-07.png" },
      { id: "item-telescope", label: "Telescope", file: "item-08.png" },
      { id: "item-flashlight", label: "Flashlight", file: "item-09.png" },
      { id: "item-book", label: "Book", file: "item-10.png" },
      { id: "item-walkie-talkie", label: "Walkie-Talkie", file: "item-11.png" },
      { id: "item-toolbox", label: "Toolbox", file: "item-12.png" },
      { id: "item-backpack", label: "Backpack", file: "item-13.png" },
      { id: "item-binoculars", label: "Binoculars", file: "item-14.png" },
      { id: "item-duct-tape", label: "Duct Tape", file: "item-15.png" },
      { id: "item-musical-instruments", label: "Musical Instruments", file: "item-16.png" },
      { id: "item-magic-wand", label: "Magic Wand", file: "item-17.png" },
      { id: "item-compass", label: "Compass", file: "item-18.png" },
      { id: "item-magic-potion", label: "Magic Potion", file: "item-19.png" },
      { id: "item-treasure-map", label: "Treasure Map", file: "item-20.png" },
      { id: "item-magnifying-glass", label: "Magnifying Glass", file: "item-21.png" },
      { id: "item-disguise", label: "Disguise", file: "item-22.png" }
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
  return Array.isArray(category.entries)
    ? category.entries.length
    : 0;
}

function getEntry(category, index) {
  return category.entries?.[index] || null;
}

function findEntryIndexById(category, entryId) {
  if (!entryId || !Array.isArray(category.entries)) {
    return -1;
  }

  return category.entries.findIndex(
    (entry) => entry.id === entryId
  );
}

function validateCategoryCatalog() {
  const seenIds = new Set();

  Object.entries(categories).forEach(
    ([categoryName, category]) => {
      if (!Array.isArray(category.entries) || !category.entries.length) {
        throw new Error(
          `Story category ${categoryName} has no entries.`
        );
      }

      category.entries.forEach((entry) => {
        if (!entry.id || !entry.label || !entry.file) {
          throw new Error(
            `Story category ${categoryName} has an incomplete entry.`
          );
        }

        if (seenIds.has(entry.id)) {
          throw new Error(
            `Duplicate Story Builder card ID: ${entry.id}`
          );
        }

        seenIds.add(entry.id);
      });
    }
  );
}

validateCategoryCatalog();

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

  if (!entry?.file) {
    throw new Error(
      `Missing image filename for ${category.title} card ${index}.`
    );
  }

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
    id: entry.id,
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
    (categoryName) =>
      categoryName !== "plan" &&
      isCategoryVisible(categoryName)
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

  setStatus("✨ Your story parts are ready! Now make a plan.");

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

function connectStudentGeneratedToggle(toggleId, cardId) {
  const toggle = document.getElementById(toggleId);
  const card = document.getElementById(cardId);

  if (!toggle || !card) {
    return;
  }

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
    "What does the character decide or hope to do about the problem?",
    "What does the character actually do or try to carry out the plan?",
    "How could the item help?",
    "How does the story end?"
  ];
}

function getBasicStarters() {
  return [
    "One day, __________ was in __________.",
    "Suddenly, __________.",
    "The character felt __________ because __________.",
    "The character planned to __________.",
    "Then the character tried to __________.",
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
    `${characterReference} planned to ${planPhrase}.`,
    `${characterReference} then tried to __________.`,
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

  const printPlanOrganizer =
    document.getElementById("printPlanOrganizer");
  const printAttemptOrganizer =
    document.getElementById("printAttemptOrganizer");
  const printResolutionOrganizer =
    document.getElementById("printResolutionOrganizer");
  const printItemOrganizer =
    document.getElementById("printItemOrganizer");

  if (printPlanOrganizer) {
    printPlanOrganizer.hidden =
      !(document.getElementById("showPlan")?.checked ?? true);
  }

  if (printAttemptOrganizer) {
    printAttemptOrganizer.hidden =
      !(document.getElementById("showAttempt")?.checked ?? true);
  }

  if (printResolutionOrganizer) {
    printResolutionOrganizer.hidden =
      !(document.getElementById("showResolution")?.checked ?? true);
  }

  if (printItemOrganizer) {
    printItemOrganizer.hidden = !isCategoryVisible("item");
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

function initializeStoryBuilderCore() {
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

  connectStudentGeneratedToggle("showAttempt", "attemptCard");
  connectStudentGeneratedToggle("showResolution", "resolutionCard");

  document
    .getElementById("printPlanner")
    .addEventListener("click", printPlanner);

  document
    .getElementById("savePdf")
    .addEventListener("click", printPlanner);

  preloadStarterAssets();
  updateAllSupports();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeStoryBuilderCore, { once: true });
} else {
  initializeStoryBuilderCore();
}
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

  const STORAGE_KEY = `firstVoloStoryBuilderSavedWork:${window.FirstVoloStoryEducatorStorageScope || "educator:unavailable"}`;
  const STORY_APP_NAME = "First Volo Story Builder";
  const STORY_SCHEMA_VERSION = 2;

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
      plan: "Add notes about the character’s plan.",
      attempt: "What does the character actually do or try to carry out the plan? If needed, what do they try next?",
      item: "How could the item connect to the plan or attempt(s)?",
      resolution: "What happens because of the attempt(s)? How is the problem resolved?"
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
        "What does the character decide or hope to do? How does the plan grow from the problem and feeling?",
      attempt:
        "What does the character actually do or try to carry out the plan? If needed, what do they try next?",
      item:
        "How could the item connect to the plan or attempt(s)?",
      resolution:
        "What happens because of the attempt(s)? How is the problem resolved?"
    }
  };

  let autoSaveTimer = null;
  let statusTimer = null;
  let isRestoringStory = false;
  let currentStoryIdentity = null;

  function getElement(id) {
    return document.getElementById(id);
  }

  const localStoryStorage = {
    load() {
      return localStorage.getItem(STORAGE_KEY);
    },

    save(data) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
      );
    },

    clear() {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  function createStoryId() {
    if (
      window.crypto &&
      typeof window.crypto.randomUUID === "function"
    ) {
      return window.crypto.randomUUID();
    }

    return [
      "story",
      Date.now().toString(36),
      Math.random().toString(36).slice(2, 10)
    ].join("-");
  }

  function createStoryIdentity(seed = {}) {
    const now = new Date().toISOString();

    return {
      storyId:
        typeof seed.storyId === "string" && seed.storyId
          ? seed.storyId
          : createStoryId(),

      createdAt:
        typeof seed.createdAt === "string" && seed.createdAt
          ? seed.createdAt
          : typeof seed.savedAt === "string" && seed.savedAt
            ? seed.savedAt
            : now
    };
  }

  function ensureStoryIdentity() {
    if (!currentStoryIdentity) {
      currentStoryIdentity = createStoryIdentity();
    }

    return currentStoryIdentity;
  }

  function resetStoryIdentity() {
    currentStoryIdentity = createStoryIdentity();
  }

  function resolveSavedSelectionIndex(
    categoryName,
    savedSelection
  ) {
    if (!savedSelection) {
      return -1;
    }

    const category = categories[categoryName];

    if (!category) {
      return -1;
    }

    if (typeof savedSelection.id === "string") {
      const byId = findEntryIndexById(
        category,
        savedSelection.id
      );

      if (byId >= 0) {
        return byId;
      }
    }

    if (
      Number.isInteger(savedSelection.index) &&
      savedSelection.index >= 0 &&
      savedSelection.index < getCategoryLength(category)
    ) {
      return savedSelection.index;
    }

    if (typeof savedSelection.label === "string") {
      return category.entries.findIndex(
        (entry) => entry.label === savedSelection.label
      );
    }

    return -1;
  }

  function migrateSelectionToV2(
    categoryName,
    savedSelection
  ) {
    const index = resolveSavedSelectionIndex(
      categoryName,
      savedSelection
    );

    if (index < 0) {
      return null;
    }

    const category = categories[categoryName];
    const entry = getEntry(category, index);

    return {
      id: entry.id,
      label: entry.label,
      phrase: entry.phrase || null,
      imagePath: makeImagePath(category, index)
    };
  }

  function getStorySchemaVersion(data) {
    if (Number.isInteger(data?.schemaVersion)) {
      return data.schemaVersion;
    }

    if (Number.isInteger(data?.version)) {
      return data.version;
    }

    return 1;
  }

  function validateStoryData(data) {
    if (
      !data ||
      typeof data !== "object" ||
      data.app !== STORY_APP_NAME
    ) {
      throw new Error(
        "This file is not a First Volo Story Builder save file."
      );
    }

    const schemaVersion = getStorySchemaVersion(data);

    if (
      schemaVersion < 1 ||
      schemaVersion > STORY_SCHEMA_VERSION
    ) {
      throw new Error(
        `This Story Builder save uses unsupported schema version ${schemaVersion}.`
      );
    }

    return true;
  }

  function migrateStoryData(data) {
    validateStoryData(data);

    const schemaVersion = getStorySchemaVersion(data);

    if (schemaVersion === STORY_SCHEMA_VERSION) {
      const identity = createStoryIdentity(data);

      return {
        ...data,
        app: STORY_APP_NAME,
        schemaVersion: STORY_SCHEMA_VERSION,
        storyId: identity.storyId,
        createdAt: identity.createdAt,
        updatedAt:
          typeof data.updatedAt === "string" && data.updatedAt
            ? data.updatedAt
            : identity.createdAt
      };
    }

    if (schemaVersion !== 1) {
      throw new Error(
        `Cannot migrate Story Builder schema version ${schemaVersion}.`
      );
    }

    const migratedSelections = {};

    plannerCategories.forEach((categoryName) => {
      migratedSelections[categoryName] =
        migrateSelectionToV2(
          categoryName,
          data.selections?.[categoryName]
        );
    });

    const identity = createStoryIdentity(data);
    const timestamp =
      typeof data.savedAt === "string" && data.savedAt
        ? data.savedAt
        : identity.createdAt;

    return {
      app: STORY_APP_NAME,
      schemaVersion: STORY_SCHEMA_VERSION,
      storyId: identity.storyId,
      createdAt: identity.createdAt,
      updatedAt: timestamp,

      title: data.title || "",
      storyWriting: data.storyWriting || "",
      plannerNotes: data.plannerNotes || {},
      selections: migratedSelections,

      settings: {
        ...(data.settings || {}),
        showThinkingPrompts:
          Boolean(data.settings?.showThinkingPrompts)
      },

      challenge: data.challenge || null
    };
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

    [...plannerCategories, "attempt", "resolution"].forEach((categoryName) => {
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

    visibility.attempt =
      getElement("showAttempt")?.checked ?? true;

    visibility.resolution =
      getElement("showResolution")?.checked ?? true;

    return visibility;
  }

  function getChallengeState() {
    const challengeCheckboxes = Array.from(
      document.querySelectorAll(".challenge-checkbox")
    );

    const challengeScene =
      getElement("challengeCardScene");

    const challengeCard =
      getElement("challengeCard");

    return {
      mode: getCheckedValue("challengeMode", "none"),

      selected: challengeCheckboxes.map((checkbox) => ({
        id: checkbox.id || "",
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
          challengeScene &&
          !challengeScene.hidden &&
          challengeCard?.classList.contains("is-flipped")
        )
    };
  }

  function buildStorySaveData() {
    const selections = {};
    const identity = ensureStoryIdentity();
    const updatedAt = new Date().toISOString();

    plannerCategories.forEach((categoryName) => {
      const selection = currentSelections[categoryName];

      selections[categoryName] = selection
        ? {
            id: selection.id,
            label: selection.label,
            phrase: selection.phrase || null,
            imagePath: selection.imagePath
          }
        : null;
    });

    return {
      app: STORY_APP_NAME,
      schemaVersion: STORY_SCHEMA_VERSION,
      storyId: identity.storyId,
      createdAt: identity.createdAt,
      updatedAt,

      title: getElement("storyTitle")?.value || "",
      storyWriting: getElement("storyWriting")?.value || "",
      plannerNotes: getPlannerNotes(),
      selections,

      settings: {
        showLabels: getElement("toggleLabels")?.checked ?? false,
        showVocabulary:
          getElement("toggleVocabulary")?.checked ?? false,
        showThinkingPrompts:
          getElement("thinkingPromptsToggle")?.checked ?? false,
        sentenceSupport:
          getCheckedValue("sentenceSupport", "off"),
        categoryVisibility: getCategoryVisibility()
      },

      challenge: getChallengeState(),

      instructionalSupport:
        window.FirstVoloInstructionalSupport?.getState?.() || null
    };
  }

  function saveToBrowser(showMessage = false) {
    if (isRestoringStory) {
      return false;
    }

    try {
      const data = buildStorySaveData();

      localStoryStorage.save(data);

      const library =
        window.FirstVoloStoryLibrary?.local;

      const isInMyStories = Boolean(
        library?.has?.(data.storyId)
      );

      if (isInMyStories) {
        library.save(data);
      }

      if (showMessage) {
        showSaveStatus(
          isInMyStories
            ? "✓ My Stories updated."
            : "✓ Draft saved on this device."
        );
      }

      return isInMyStories;
    } catch (error) {
      console.error("Could not auto-save story:", error);

      if (showMessage) {
        showSaveStatus("Could not save on this device.");
      }

      return false;
    }
  }

  function scheduleAutoSave() {
    if (isRestoringStory) {
      return;
    }

    window.clearTimeout(autoSaveTimer);

    autoSaveTimer = window.setTimeout(() => {
      const isInMyStories = saveToBrowser(false);

      showSaveStatus(
        isInMyStories
          ? "✓ My Stories updated"
          : "✓ Draft saved on this device",
        1300
      );
    }, 550);
  }

  function updatePlannerPrompts() {
    const promptSet = plannerPrompts.open;

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

        if (categoryName === "plan") {
          label.textContent =
            "Make your own plan. A rolled idea is optional.";
        } else {
          label.textContent =
            `Roll to choose a ${category.title.toLowerCase()}.`;
        }
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
            (
              saved.id &&
              checkbox.id &&
              saved.id === checkbox.id
            ) ||
            (
              saved.text === (checkbox.dataset.text || "") &&
              saved.category ===
                (checkbox.dataset.category || "")
            )
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
    const card = getElement("challengeCard");
    const wasRevealed = Boolean(challenge.revealed);

    if (revealedCategory) {
      revealedCategory.textContent =
        challenge.revealedCategory || "Mystery Challenge";
    }

    if (revealedText) {
      revealedText.textContent =
        challenge.revealedText || "";
    }

    if (scene) {
      scene.hidden = !wasRevealed;
    }

    if (card) {
      card.classList.toggle(
        "is-flipped",
        wasRevealed
      );
    }
  }

  function restoreStory(data, options = {}) {
    data = migrateStoryData(data);

    currentStoryIdentity = createStoryIdentity(data);
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

      [...plannerCategories, "attempt", "resolution"].forEach(
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
      const thinkingToggle =
        getElement("thinkingPromptsToggle");

      if (labelsToggle) {
        labelsToggle.checked =
          Boolean(settings.showLabels);
      }

      if (vocabularyToggle) {
        vocabularyToggle.checked =
          Boolean(settings.showVocabulary);
      }

      if (thinkingToggle) {
        thinkingToggle.checked =
          Boolean(settings.showThinkingPrompts);
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

      const attemptToggle =
        getElement("showAttempt");

      if (attemptToggle) {
        attemptToggle.checked =
          visibility.attempt !== false;

        attemptToggle.dispatchEvent(
          new Event("change", { bubbles: true })
        );
      }

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

        const selectionIndex =
          resolveSavedSelectionIndex(
            categoryName,
            savedSelection
          );

        if (selectionIndex >= 0) {
          applySelection(
            categoryName,
            selectionIndex
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

      window.FirstVoloInstructionalSupport?.restoreState?.(
        data.instructionalSupport || null
      );

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
    const savedText = localStoryStorage.load();

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
      localStoryStorage.clear();
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
        `${makeSafeFileName(data.title)}.firstvolo`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);

      saveToBrowser(false);
      showSaveStatus("✓ Backup downloaded.");
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

    const lowerName = file.name.toLowerCase();

    if (
      !lowerName.endsWith(".firstvolo") &&
      !lowerName.endsWith(".json")
    ) {
      window.alert(
        "Please choose a First Volo Story Builder file."
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
    [...plannerCategories, "attempt", "resolution"].forEach(
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
          '#toggleLabels, #toggleVocabulary, #thinkingPromptsToggle, input[name="sentenceSupport"], input[name="challengeMode"], .challenge-checkbox, [id^="show"]'
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

    window.addEventListener(
      "firstvolo:instructional-support-changed",
      scheduleAutoSave
    );
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

  window.FirstVoloStoryState = Object.freeze({
    appName: STORY_APP_NAME,
    schemaVersion: STORY_SCHEMA_VERSION,
    build: buildStorySaveData,
    restore: restoreStory,
    migrate: migrateStoryData,
    validate: validateStoryData,
    newStoryIdentity: resetStoryIdentity
  });

  window.FirstVoloStoryStorage = Object.freeze({
    local: localStoryStorage
  });

  function initializeStoryPersistence() {
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
        resetStoryIdentity();
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
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeStoryPersistence, { once: true });
  } else {
    initializeStoryPersistence();
  }
})();

/* =========================================================
   MY STORIES — LOCAL MULTI-STORY LIBRARY
   This adapter is intentionally separate from cloud storage.
   Supabase can later implement the same list/get/save/remove seam.
========================================================= */

(function () {
  "use strict";

  const LIBRARY_STORAGE_KEY = `firstVoloStoryBuilderMyStoriesV1:${window.FirstVoloStoryEducatorStorageScope || "educator:unavailable"}`;
  const LIBRARY_VERSION = 1;
  const storyState = window.FirstVoloStoryState;
  const workingStorage = window.FirstVoloStoryStorage?.local;

  const myStoriesButton = document.getElementById("myStoriesButton");
  const modal = document.getElementById("myStoriesModal");
  const closeButton = document.getElementById("closeMyStories");
  const saveCurrentButton =
    document.getElementById("saveCurrentToMyStories");
  const listElement = document.getElementById("myStoriesList");
  const emptyElement = document.getElementById("myStoriesEmpty");
  const statusElement = document.getElementById("myStoriesStatus");

  let previousFocus = null;
  let statusTimer = null;

  if (
    !storyState ||
    !myStoriesButton ||
    !modal ||
    !closeButton ||
    !saveCurrentButton ||
    !listElement ||
    !emptyElement ||
    !statusElement
  ) {
    console.warn(
      "My Stories could not start because required Story Builder elements are missing."
    );
    return;
  }

  function loadLibraryEnvelope() {
    const emptyLibrary = {
      version: LIBRARY_VERSION,
      stories: []
    };

    const raw = localStorage.getItem(LIBRARY_STORAGE_KEY);

    if (!raw) {
      return emptyLibrary;
    }

    try {
      const parsed = JSON.parse(raw);

      const rawStories = Array.isArray(parsed)
        ? parsed
        : Array.isArray(parsed?.stories)
          ? parsed.stories
          : [];

      const stories = rawStories
        .map((story) => {
          try {
            return storyState.migrate(story);
          } catch (error) {
            console.warn(
              "Skipping an unreadable My Stories entry:",
              error
            );
            return null;
          }
        })
        .filter(Boolean);

      return {
        version: LIBRARY_VERSION,
        stories
      };
    } catch (error) {
      console.error("Could not read My Stories:", error);
      return emptyLibrary;
    }
  }

  function writeLibraryEnvelope(envelope) {
    localStorage.setItem(
      LIBRARY_STORAGE_KEY,
      JSON.stringify({
        version: LIBRARY_VERSION,
        stories: envelope.stories
      })
    );
  }

  function sortStories(stories) {
    return [...stories].sort((a, b) => {
      const aTime = Date.parse(a.updatedAt || a.createdAt || "") || 0;
      const bTime = Date.parse(b.updatedAt || b.createdAt || "") || 0;
      return bTime - aTime;
    });
  }

  const localStoryLibrary = {
    list() {
      return sortStories(loadLibraryEnvelope().stories);
    },

    get(storyId) {
      return (
        loadLibraryEnvelope().stories.find(
          (story) => story.storyId === storyId
        ) || null
      );
    },

    has(storyId) {
      return loadLibraryEnvelope().stories.some(
        (story) => story.storyId === storyId
      );
    },

    save(storyData) {
      const story = storyState.migrate(storyData);
      const envelope = loadLibraryEnvelope();

      const existingIndex = envelope.stories.findIndex(
        (candidate) => candidate.storyId === story.storyId
      );

      if (existingIndex >= 0) {
        envelope.stories[existingIndex] = story;
      } else {
        envelope.stories.push(story);
      }

      writeLibraryEnvelope(envelope);

      window.dispatchEvent(
        new CustomEvent("firstvolo:library-saved", {
          detail: { story }
        })
      );

      return story;
    },

    remove(storyId) {
      const envelope = loadLibraryEnvelope();
      const nextStories = envelope.stories.filter(
        (story) => story.storyId !== storyId
      );

      const removed =
        nextStories.length !== envelope.stories.length;

      if (removed) {
        writeLibraryEnvelope({
          version: LIBRARY_VERSION,
          stories: nextStories
        });

        window.dispatchEvent(
          new CustomEvent("firstvolo:library-removed", {
            detail: { storyId }
          })
        );
      }

      return removed;
    }
  };

  window.FirstVoloStoryLibrary = Object.freeze({
    local: Object.freeze({
      list: localStoryLibrary.list,
      get: localStoryLibrary.get,
      has: localStoryLibrary.has,
      save: localStoryLibrary.save,
      remove: localStoryLibrary.remove
    })
  });

  function storyTitle(story) {
    const title = String(story?.title || "").trim();
    return title || "Untitled Story";
  }

  function formatUpdatedAt(story) {
    const date = new Date(
      story.updatedAt || story.createdAt || ""
    );

    if (Number.isNaN(date.getTime())) {
      return "Saved story";
    }

    return `Updated ${new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit"
    }).format(date)}`;
  }

  function elementSummary(story) {
    const selections = story?.selections || {};

    return [
      selections.character?.label,
      selections.setting?.label,
      selections.problem?.label,
      selections.feeling?.label,
      selections.plan?.label,
      selections.item?.label
    ]
      .filter(Boolean)
      .join(" • ");
  }

  function showStatus(message, duration = 2200) {
    window.clearTimeout(statusTimer);
    statusElement.textContent = message;

    if (duration > 0) {
      statusTimer = window.setTimeout(() => {
        statusElement.textContent = "";
      }, duration);
    }
  }

  function createStoryCard(story) {
    const card = document.createElement("article");
    card.className = "my-story-library-card";

    const info = document.createElement("div");

    const title = document.createElement("h2");
    title.className = "my-story-library-title";
    title.textContent = storyTitle(story);

    const meta = document.createElement("p");
    meta.className = "my-story-library-meta";
    meta.textContent = formatUpdatedAt(story);

    const elements = document.createElement("p");
    elements.className = "my-story-library-elements";
    elements.textContent = elementSummary(story);

    info.append(title, meta, elements);

    const actions = document.createElement("div");
    actions.className = "my-story-library-actions";

    const openButton = document.createElement("button");
    openButton.type = "button";
    openButton.className = "my-story-library-open";
    openButton.textContent = "Open";
    openButton.addEventListener("click", () => {
      const savedStory = localStoryLibrary.get(story.storyId);

      if (!savedStory) {
        showStatus("That saved story could not be found.");
        renderLibrary();
        return;
      }

      try {
        storyState.restore(savedStory, { showMessage: true });
        closeModal();
      } catch (error) {
        console.error("Could not open My Stories entry:", error);
        showStatus("That saved story could not be opened.");
      }
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "my-story-library-delete";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      const cloudSyncing = Boolean(
        window.FirstVoloStoryCloud?.isSignedIn?.()
      );

      const confirmed = window.confirm(
        cloudSyncing
          ? `Delete "${storyTitle(story)}" from My Stories? This will remove it from synced devices too.`
          : `Delete "${storyTitle(story)}" from My Stories on this device?`
      );

      if (!confirmed) {
        return;
      }

      localStoryLibrary.remove(story.storyId);
      renderLibrary();
      showStatus("Story removed from My Stories.");
    });

    actions.append(openButton, deleteButton);
    card.append(info, actions);

    return card;
  }

  function renderLibrary() {
    const stories = localStoryLibrary.list();

    listElement.replaceChildren();
    emptyElement.hidden = stories.length > 0;

    stories.forEach((story) => {
      listElement.appendChild(createStoryCard(story));
    });
  }

  function saveCurrentStoryToLibrary({
    showMessage = true
  } = {}) {
    try {
      const story = storyState.build();

      localStoryLibrary.save(story);
      workingStorage?.save(story);

      if (!modal.classList.contains("hidden")) {
        renderLibrary();
      }

      if (showMessage) {
        showStatus(
          `✓ "${storyTitle(story)}" saved to My Stories.`
        );
      }

      return story;
    } catch (error) {
      console.error("Could not save to My Stories:", error);

      if (showMessage) {
        showStatus(
          "Could not save this story to My Stories on this device.",
          3500
        );
      }

      return null;
    }
  }

  function openModal() {
    previousFocus = document.activeElement;
    renderLibrary();
    statusElement.textContent = "";
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    saveCurrentButton.focus();
  }

  window.addEventListener(
    "firstvolo:cloud-library-updated",
    () => {
      if (!modal.classList.contains("hidden")) {
        renderLibrary();
      }
    }
  );

  function closeModal() {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");

    const anotherModalIsOpen =
      document.querySelector(
        ".about-modal:not(.hidden), .my-stories-modal:not(.hidden)"
      );

    if (!anotherModalIsOpen) {
      document.body.classList.remove("modal-open");
    }

    previousFocus?.focus();
  }

  myStoriesButton.addEventListener("click", openModal);
  closeButton.addEventListener("click", closeModal);

  saveCurrentButton.addEventListener("click", () => {
    saveCurrentStoryToLibrary({ showMessage: true });
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      !modal.classList.contains("hidden")
    ) {
      closeModal();
    }
  });

})();

/* =========================
   ABOUT MODAL
========================= */

const aboutButton = document.getElementById("aboutButton");
const aboutModal = document.getElementById("aboutModal");
const closeAbout = document.getElementById("closeAbout");
const aboutWindow = aboutModal?.querySelector(".about-window");

function openAboutModal() {
  if (!aboutModal) return;

  aboutModal.classList.remove("hidden");
  aboutModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  closeAbout?.focus();
}

function closeAboutModal() {
  if (!aboutModal) return;

  aboutModal.classList.add("hidden");
  aboutModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  aboutButton?.focus();
}

aboutButton?.addEventListener("click", openAboutModal);

closeAbout?.addEventListener("click", closeAboutModal);

aboutModal?.addEventListener("click", event => {
  if (event.target === aboutModal) {
    closeAboutModal();
  }
});

document.addEventListener("keydown", event => {
  if (
    event.key === "Escape" &&
    aboutModal &&
    !aboutModal.classList.contains("hidden")
  ) {
    closeAboutModal();
  }
});

aboutWindow?.addEventListener("click", event => {
  event.stopPropagation();
});

aboutModal?.querySelectorAll(".about-nav a").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();

    const targetId = link.getAttribute("href");
    const targetSection = aboutModal.querySelector(targetId);

    targetSection?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});
