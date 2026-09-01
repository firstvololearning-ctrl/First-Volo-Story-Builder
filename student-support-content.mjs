// Selected from existing instructional-support.js student-facing language.
// Educator guidance and progressive support-level text are intentionally excluded.
export const STUDENT_SUPPORTS = Object.freeze({
  story_organization: Object.freeze({
    label: "Story Organization",
    studentGoal: "Make my story easy to follow.",
    studentLookFor: "Did I include the important story parts and put them together in a way that makes sense?",
    parts: Object.freeze({
      character: Object.freeze({ question_prompt: "Who is the main character?", story_reminder: "Name or describe the character clearly enough for the listener to follow the story.", sentence_starter: "The story is about ___." }),
      setting: Object.freeze({ question_prompt: "Where is the character when the story starts?", story_reminder: "Give the place or time information needed to understand the beginning.", sentence_starter: "At/In ___, the character ___." }),
      problem: Object.freeze({ question_prompt: "What is the main problem the character needs to deal with?", story_reminder: "Say the problem clearly before moving on.", sentence_starter: "The main problem is ___." }),
      feeling: Object.freeze({ question_prompt: "How does the character feel because of what happened?", story_reminder: "Make the feeling connect to the problem.", sentence_starter: "The character felt ___ because ___." }),
      plan: Object.freeze({ question_prompt: "What does the character decide or hope to do next?", story_reminder: "Tell the goal or intention. Do not tell the actual attempt yet.", sentence_starter: "The character felt ___, so they planned to ___." }),
      attempt: Object.freeze({ question_prompt: "What does the character do to carry out the plan?", story_reminder: "The attempt should be an action, not another plan.", sentence_starter: "To carry out the plan, the character tried to ___." }),
      resolution: Object.freeze({ question_prompt: "What happened because of the attempt? How is the problem resolved?", story_reminder: "The ending should show an outcome, not a new unrelated event.", sentence_starter: "In the end, ___." })
    }),
    supports: Object.freeze({
      question_prompt: Object.freeze({ label: "Question prompt", text: "What is the main problem the character needs to deal with?" }),
      story_reminder: Object.freeze({ label: "Story-part reminder", text: "Think: character → problem → feeling → plan → action/attempt → outcome." }),
      sentence_starter: Object.freeze({ label: "Sentence starter", text: "The main problem is ___." })
    })
  }),
  connections_cohesion: Object.freeze({
    label: "Connections & Cohesion",
    studentGoal: "Connect my story ideas.",
    studentLookFor: "Did I show how my ideas and events connect?",
    parts: Object.freeze({
      character: Object.freeze({ question_prompt: "How can the character connect to the setting?", connective_words: "Try when, while, at, or because if one fits what you mean.", sentence_starter: "The character was at the setting when ___." }),
      setting: Object.freeze({ question_prompt: "What is the character doing in the setting?", connective_words: "Try when, while, at, or because if one fits.", sentence_starter: "While the character was in the setting, ___." }),
      problem: Object.freeze({ question_prompt: "How does the problem change the story?", connective_words: "Try but, when, suddenly, or after if one fits.", sentence_starter: "Everything changed when ___." }),
      feeling: Object.freeze({ question_prompt: "Why does the character feel that way now?", connective_words: "Try because, when, after, or so if one fits.", sentence_starter: "The character felt that way because ___." }),
      plan: Object.freeze({ question_prompt: "Why does this plan make sense now?", connective_words: "Try because, so, wants to, hopes to, or plans to.", sentence_starter: "The character felt ___, so they planned to ___." }),
      attempt: Object.freeze({ question_prompt: "What does the character actually do to carry out the plan?", connective_words: "Try then, so, to, or by if one helps.", sentence_starter: "To carry out the plan, the character ___." }),
      item: Object.freeze({ question_prompt: "How could the item matter to what the character wants or tries to do?", connective_words: "Try with, by using, so, or because if one fits.", sentence_starter: "The character used the item to ___." }),
      resolution: Object.freeze({ question_prompt: "What happened because of what the character tried?", connective_words: "Try after, because, so, finally, or as a result.", sentence_starter: "After the character tried to ___, ___." })
    }),
    supports: Object.freeze({
      question_prompt: Object.freeze({ label: "Question prompt", text: "What does the character actually do to carry out the plan?" }),
      connective_words: Object.freeze({ label: "Connecting words", text: "Try then, so, to, or by if one helps." }),
      sentence_starter: Object.freeze({ label: "Sentence starter", text: "To carry out the plan, the character ___." })
    })
  }),
  cause_effect: Object.freeze({
    label: "Cause & Effect",
    studentGoal: "Make the cause clear.",
    studentLookFor: "Did I explain why it happened or what happened because of it?",
    parts: Object.freeze({
      problem: Object.freeze({ question_prompt: "What changes because the problem happens?", connective_words: "Because or so may help.", sentence_starter: "Because ___, ___." }),
      feeling: Object.freeze({ question_prompt: "Why might the character feel this way?", connective_words: "Try because to explain why.", sentence_starter: "The character felt ___ because ___." }),
      plan: Object.freeze({ question_prompt: "Why does the character choose this plan?", connective_words: "Try because, so, wants to, hopes to, or plans to.", sentence_starter: "The character felt ___, so they planned to ___." }),
      attempt: Object.freeze({ question_prompt: "What action does the character take because of the plan?", connective_words: "Try so, to, because, or in order to.", sentence_starter: "The character tried to ___ so that ___." }),
      resolution: Object.freeze({ question_prompt: "What happens because of the attempt?", connective_words: "Try so, because, finally, or as a result.", sentence_starter: "The character tried to ___, so ___." })
    }),
    supports: Object.freeze({
      question_prompt: Object.freeze({ label: "Question prompt", text: "What happens because of the attempt?" }),
      connective_words: Object.freeze({ label: "Connecting words", text: "Try so, because, finally, or as a result." }),
      sentence_starter: Object.freeze({ label: "Sentence starter", text: "The character tried to ___, so ___." })
    })
  }),
  sentence_formulation: Object.freeze({
    label: "Sentence Formulation",
    studentGoal: "Say my idea in a clear sentence.",
    studentLookFor: "Did I say my whole idea in a clear, complete sentence?",
    parts: Object.freeze(Object.fromEntries([
      ["character", "The character is ___."], ["setting", "The story takes place in the setting where ___."], ["problem", "The problem begins when ___."], ["feeling", "The character feels ___ because ___."], ["plan", "The character plans to ___."], ["attempt", "The character tries to ___."], ["item", "The character uses the item to ___."], ["resolution", "In the end, ___."]
    ].map(([part, sentenceStarter]) => [part, Object.freeze({ question_prompt: "What is the one main idea you want this sentence to say?", story_reminder: "Build it: Who? → did what? → what or whom? → where or why?", sentence_starter: sentenceStarter })]))),
    supports: Object.freeze({
      question_prompt: Object.freeze({ label: "Question prompt", text: "What is the one main idea you want this sentence to say?" }),
      story_reminder: Object.freeze({ label: "Sentence reminder", text: "Build it: Who? → did what? → what or whom? → where or why?" }),
      sentence_starter: Object.freeze({ label: "Sentence starter", text: "The character tries to ___." })
    })
  }),
  elaboration: Object.freeze({
    label: "Elaboration",
    studentGoal: "Add a useful detail.",
    studentLookFor: "Did I add a detail that helped my listener understand or picture the story?",
    parts: Object.freeze({
      character: Object.freeze({ question_prompt: "What important detail would help us understand this character?", story_reminder: "Add one useful detail: where, how, why, what it looked like, or what else was happening.", sentence_starter: "The character is ___, which matters because ___." }),
      setting: Object.freeze({ question_prompt: "What detail about the setting matters to what happens?", story_reminder: "Add one useful detail: where, how, why, what it looked like, or what else was happening.", sentence_starter: "In the setting, ___, so ___." }),
      problem: Object.freeze({ question_prompt: "What detail would help us understand why the problem matters?", story_reminder: "Add one useful detail: where, how, why, what it looked like, or what else was happening.", sentence_starter: "The problem becomes harder when ___." }),
      feeling: Object.freeze({ question_prompt: "What happened that helps explain why the character feels this way?", story_reminder: "Add one useful detail: where, how, why, what it looked like, or what else was happening.", sentence_starter: "The character feels ___ because ___." }),
      plan: Object.freeze({ question_prompt: "What does the character hope this plan will accomplish?", story_reminder: "Add one useful detail: where, how, why, what it looked like, or what else was happening.", sentence_starter: "The character plans to ___ because ___." }),
      attempt: Object.freeze({ question_prompt: "How exactly does the character carry out the attempt? What happens while they try?", story_reminder: "Add one useful detail: where, how, why, what it looked like, or what else was happening.", sentence_starter: "The character tried to ___ by ___." }),
      item: Object.freeze({ question_prompt: "How exactly could the item be used?", story_reminder: "Add one useful detail: where, how, why, what it looked like, or what else was happening.", sentence_starter: "The character uses the item to ___." }),
      resolution: Object.freeze({ question_prompt: "What detail would help us understand how the story ends?", story_reminder: "Add one useful detail: where, how, why, what it looked like, or what else was happening.", sentence_starter: "In the end, ___ because ___." })
    }),
    supports: Object.freeze({
      question_prompt: Object.freeze({ label: "Question prompt", text: "What useful detail would help the listener understand this part?" }),
      story_reminder: Object.freeze({ label: "Detail reminder", text: "Add one useful detail: where, how, why, what it looked like, or what else was happening." }),
      sentence_starter: Object.freeze({ label: "Sentence starter", text: "The character tried to ___ by ___." })
    })
  }),
  perspective_internal_state: Object.freeze({
    label: "Perspective & Internal State",
    studentGoal: "Help my listener understand the character.",
    studentLookFor: "Did I explain what the character thought, felt, knew, wanted, or expected?",
    parts: Object.freeze({
      character: Object.freeze({ question_prompt: "What might the character want, know, think, or expect at the beginning?", useful_words: "Try wants, knows, thinks, hopes, wonders, or expects.", sentence_starter: "The character hopes that ___." }),
      problem: Object.freeze({ question_prompt: "What does the character think when the problem happens?", useful_words: "Try thought, knew, wondered, expected, or wanted.", sentence_starter: "The character wondered whether ___." }),
      feeling: Object.freeze({ question_prompt: "Why does the character feel this way?", useful_words: "Try felt, thought, hoped, worried, knew, or wondered.", sentence_starter: "The character felt ___ because ___." }),
      plan: Object.freeze({ question_prompt: "How do the problem and feeling shape what the character wants to do?", useful_words: "Try wanted, hoped, planned, expected, or decided.", sentence_starter: "The character hoped to ___." }),
      attempt: Object.freeze({ question_prompt: "Why does the character choose this action to carry out the plan?", useful_words: "Try wanted to, hoped to, decided to, or tried to.", sentence_starter: "The character tried to ___ because ___." }),
      resolution: Object.freeze({ question_prompt: "What does the character know, feel, think, or understand now?", useful_words: "Try realized, learned, felt, knew, understood, or hoped.", sentence_starter: "By the end, the character realized ___." })
    }),
    supports: Object.freeze({
      question_prompt: Object.freeze({ label: "Question prompt", text: "What might the character want, know, think, or expect?" }),
      useful_words: Object.freeze({ label: "Words to try", text: "Try wants, knows, thinks, hopes, wonders, or expects." }),
      sentence_starter: Object.freeze({ label: "Sentence starter", text: "The character hopes that ___." })
    })
  }),
  vocabulary_precision: Object.freeze({
    label: "Vocabulary Precision",
    studentGoal: "Choose words that say exactly what I mean.",
    studentLookFor: "Did I use specific words that fit what I meant?",
    parts: Object.freeze({
      character: Object.freeze({ question_prompt: "Choose a more specific word to describe the character.", useful_words: "Ask yourself: How? What kind? How strong? What exactly happened?", sentence_starter: "Use the more specific word in the whole sentence: ___." }),
      setting: Object.freeze({ question_prompt: "Choose a more specific word for what the setting looks, sounds, or feels like.", useful_words: "Ask yourself: How? What kind? How strong? What exactly happened?", sentence_starter: "Use the more specific word in the whole sentence: ___." }),
      problem: Object.freeze({ question_prompt: "Choose a more specific word for what happens in the problem.", useful_words: "Ask yourself: How? What kind? How strong? What exactly happened?", sentence_starter: "Use the more specific word in the whole sentence: ___." }),
      feeling: Object.freeze({ question_prompt: "Can you make the feeling more specific? Think about how strong it is or how the character shows it.", useful_words: "Ask yourself: How? What kind? How strong? What exactly happened?", sentence_starter: "Use the more specific word in the whole sentence: ___." }),
      plan: Object.freeze({ question_prompt: "Choose words that clearly name what the character plans or hopes to do.", useful_words: "Ask yourself: How? What kind? How strong? What exactly happened?", sentence_starter: "Use the more specific word in the whole sentence: ___." }),
      attempt: Object.freeze({ question_prompt: "Choose a specific action word for what the character actually does or tries.", useful_words: "Ask yourself: How? What kind? How strong? What exactly happened?", sentence_starter: "Use the more specific word in the whole sentence: ___." }),
      item: Object.freeze({ question_prompt: "Choose a more specific action word for how the character uses the item.", useful_words: "Ask yourself: How? What kind? How strong? What exactly happened?", sentence_starter: "Use the more specific word in the whole sentence: ___." }),
      resolution: Object.freeze({ question_prompt: "Choose a more specific word that makes the ending clearer.", useful_words: "Ask yourself: How? What kind? How strong? What exactly happened?", sentence_starter: "Use the more specific word in the whole sentence: ___." })
    }),
    supports: Object.freeze({
      question_prompt: Object.freeze({ label: "Question prompt", text: "What more specific word would show exactly what you mean?" }),
      useful_words: Object.freeze({ label: "Word reminder", text: "Ask yourself: How? What kind? How strong? What exactly happened?" }),
      sentence_starter: Object.freeze({ label: "Sentence starter", text: "Use the more specific word in the whole sentence: ___." })
    })
  })
});

export const STUDENT_SUPPORT_TARGET_KEYS = Object.freeze(Object.keys(STUDENT_SUPPORTS));

// Mirrors the canonical targetDefinitions[*].relevant arrays in instructional-support.js.
// These are placement keys only; support wording remains defined above.
export const STUDENT_SUPPORT_RELEVANT_PARTS = Object.freeze({
  story_organization: Object.freeze(["character", "setting", "problem", "feeling", "plan", "attempt", "resolution"]),
  connections_cohesion: Object.freeze(["character", "setting", "problem", "feeling", "plan", "attempt", "item", "resolution"]),
  cause_effect: Object.freeze(["problem", "feeling", "plan", "attempt", "item", "resolution"]),
  sentence_formulation: Object.freeze(["character", "setting", "problem", "feeling", "plan", "attempt", "item", "resolution"]),
  elaboration: Object.freeze(["character", "setting", "problem", "feeling", "plan", "attempt", "item", "resolution"]),
  perspective_internal_state: Object.freeze(["character", "problem", "feeling", "plan", "attempt", "resolution"]),
  vocabulary_precision: Object.freeze(["character", "setting", "problem", "feeling", "plan", "attempt", "item", "resolution"])
});

export function supportOptionsForTarget(targetKey) {
  return STUDENT_SUPPORTS[targetKey]?.supports || {};
}
