const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, character =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[character]));
const rating = value => ["Independent", "With support", "Not yet", "Not observed"].includes(value) ? value : "Unrated";

export function skillRatingReportHtml(evidence) {
  const record = evidence?.version === 2 ? evidence.skill_snapshot : null;
  if (!record) return "";
  const tell = (key, title) => {
    const value = record[key] || {};
    return `<article class="evidence-card"><h4>${title}</h4><p><strong>${rating(value.rating)}</strong></p><p class="response">${escapeHtml(value.note)}</p></article>`;
  };
  const given = Array.isArray(record.given) ? record.given : [];
  const followup = record.followup || {};
  return `<section class="support-summary"><h4>Educator skill ratings</h4>
    <p>${escapeHtml(record.skill || "Skill not selected")}</p>
    <div class="evidence-grid skill-rating-tells">${tell("first-tell", "First Tell")}${tell("tell-again", "Tell Again")}</div>
    <h4>Prompts marked as given during teaching</h4>
    ${given.length ? `<ul>${given.map(value => `<li>${escapeHtml(value)}</li>`).join("")}</ul>` : "<p>None recorded.</p>"}
    <h4>Same skill in a new story · separate follow-up</h4>
    ${followup.story || followup.note || followup.rating
      ? `<p><strong>${rating(followup.rating)}</strong></p><p class="response">${escapeHtml(followup.story)}</p><p>${escapeHtml(followup.note)}</p>`
      : "<p>No new-story observation recorded.</p>"}
  </section>`;
}

export function skillComparisonRowHtml(cycle, label, date) {
  const record = cycle?.support_evidence?.version === 2 ? cycle.support_evidence.skill_snapshot : null;
  return `<tr><td>${escapeHtml(date)}</td><td>${escapeHtml(label)}</td>
    <td>${escapeHtml(record?.skill || "No skill rating saved")}</td>
    <td>${rating(record?.["first-tell"]?.rating)}</td>
    <td>${rating(record?.["tell-again"]?.rating)}</td>
    <td>${rating(record?.followup?.rating)}</td></tr>`;
}
