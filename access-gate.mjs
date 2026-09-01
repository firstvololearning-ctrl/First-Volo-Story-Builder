import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://apkvvspubolyxlqtlkto.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_0O4rNLfhuW18xYRZSPkLpw_xyXR9d3n";
const ACCOUNT_URL = "https://firstvololearning-ctrl.github.io/First-Volo-Account/?returnTo=storyBuilder";
const PRODUCT_KEY = "first-volo-story-builder";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
});

const accessShell = document.getElementById("storyBuilderAccess");
const accessStatus = document.getElementById("storyBuilderAccessStatus");
const accessActions = document.getElementById("storyBuilderAccessActions");
const app = document.getElementById("storyBuilderApp");

function setLocked() {
  app?.setAttribute("inert", "");
  app?.setAttribute("aria-hidden", "true");
  if (accessShell) accessShell.hidden = false;
}

function setApproved() {
  app?.removeAttribute("inert");
  app?.setAttribute("aria-hidden", "false");
  if (accessShell) accessShell.hidden = true;
}

function showState(message, action = null) {
  setLocked();
  if (accessStatus) accessStatus.textContent = message;
  if (!accessActions) return;
  accessActions.replaceChildren();
  const actions = action ? (Array.isArray(action) ? action : [action]) : [];
  accessActions.hidden = actions.length === 0;
  actions.forEach((item) => {
    const link = document.createElement("a");
    link.className = "story-builder-access-link";
    if (item.primary) link.classList.add("is-primary");
    link.href = item.href || "#";
    link.textContent = item.label;
    if (item.retry) {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.reload();
      });
    }
    accessActions.append(link);
  });
}

async function verifyAccess() {
  showState("Checking your First Volo access…");
  const sessionResult = await supabase.auth.getSession();
  if (sessionResult.error) {
    showState("First Volo access could not be verified. Please try again.", [
      { label: "Try again", retry: true, primary: true },
      { label: "View My First Volo", href: "https://firstvololearning-ctrl.github.io/First-Volo-Account/" }
    ]);
    return false;
  }

  const user = sessionResult.data.session?.user;
  if (!user) {
    showState("Sign in to continue to Story Builder", { label: "Sign in to Story Builder", href: ACCOUNT_URL, primary: true });
    return false;
  }

  const result = await supabase
    .from("product_entitlements")
    .select("product_key,status,starts_at,expires_at")
    .eq("owner_user_id", user.id)
    .eq("product_key", PRODUCT_KEY)
    .eq("status", "active")
    .limit(20);

  if (result.error) {
    showState("First Volo access could not be verified. Please try again.", [
      { label: "Try again", retry: true, primary: true },
      { label: "View My First Volo", href: "https://firstvololearning-ctrl.github.io/First-Volo-Account/" }
    ]);
    return false;
  }

  const now = Date.now();
  const active = (result.data || []).some((row) => {
    const starts = Date.parse(row.starts_at);
    const expires = Date.parse(row.expires_at);
    return Number.isFinite(starts) && Number.isFinite(expires) && starts <= now && expires > now;
  });

  if (!active) {
    showState("Story Builder is not included in the current First Volo access for this account.", { label: "View My First Volo", href: "https://firstvololearning-ctrl.github.io/First-Volo-Account/" });
    return false;
  }

  setApproved();
  return true;
}

export const accessReady = verifyAccess().catch(() => {
  showState("First Volo access could not be verified. Please try again.", [
    { label: "Try again", retry: true, primary: true },
    { label: "View My First Volo", href: "https://firstvololearning-ctrl.github.io/First-Volo-Account/" }
  ]);
  return false;
});

supabase.auth.onAuthStateChange((event) => {
  if (event === "SIGNED_OUT") {
    showState("Sign in to continue to Story Builder", { label: "Sign in to Story Builder", href: ACCOUNT_URL, primary: true });
  }
});
