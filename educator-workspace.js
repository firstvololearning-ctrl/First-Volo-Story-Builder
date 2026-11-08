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
    if (normalized === "setup") {
      root.dataset.focusView = "false";
      const toggle = document.getElementById("focusViewButton");
      if (toggle) { toggle.textContent = "Focus view"; toggle.setAttribute("aria-pressed", "false"); }
    }
    buttons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.educatorTask === normalized)));
  }
  buttons.forEach(button => button.addEventListener("click", () => selectTask(button.dataset.educatorTask)));
  const focus = document.getElementById("focusViewButton");
  focus?.addEventListener("click", () => {
    const enabled = root.dataset.focusView !== "true";
    root.dataset.focusView = String(enabled);
    focus.setAttribute("aria-pressed", String(enabled));
    focus.textContent = enabled ? "Exit focus view" : "Focus view";
  });
  selectTask("teach");
})();
