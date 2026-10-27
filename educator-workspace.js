"use strict";
// Two educator tasks share the existing access and save rules.
(function () {
  const root = document.getElementById("storyBuilderApp");
  const setup = document.getElementById("studentSetupWorkspace");
  if (!root || !setup) return;
  const buttons = [...document.querySelectorAll("[data-educator-task]")];
  function selectTask(task) {
    const normalized = task === "setup" ? "setup" : "teach";
    root.dataset.educatorWorkspace = normalized;
    setup.hidden = normalized !== "setup";
    buttons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.educatorTask === normalized)));
  }
  buttons.forEach(button => button.addEventListener("click", () => selectTask(button.dataset.educatorTask)));
  selectTask("teach");
})();
