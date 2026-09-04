export function createStudentDraftCloud({ supabase, delay = 700, onStatus = () => {} } = {}) {
  let timer = null;
  let queued = null;

  async function load() {
    const { data, error } = await supabase.rpc("get_my_story_builder_student_draft");
    if (error) throw error;
    const row = Array.isArray(data) ? data[0] : data;
    return row?.draft || null;
  }

  async function flush() {
    if (!queued) return null;
    const draft = queued;
    queued = null;
    onStatus("saving");
    const { data, error } = await supabase.rpc("save_my_story_builder_student_draft", { p_draft: draft });
    if (error) {
      queued = draft;
      onStatus("error");
      throw error;
    }
    onStatus("saved");
    return Array.isArray(data) ? data[0] : data;
  }

  function schedule(draft) {
    queued = structuredClone({ version: 1, ...draft });
    clearTimeout(timer);
    timer = setTimeout(() => { flush().catch(() => {}); }, delay);
  }

  function stop() {
    clearTimeout(timer);
    timer = null;
  }

  return Object.freeze({ load, schedule, flush, stop });
}
