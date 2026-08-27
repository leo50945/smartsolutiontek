import { subscribeToOverview } from "./firebase.js";

const ADMIN_PASSWORD = "leo1111";
const authKey = "sst_admin_authenticated";

function requireAuthentication() {
  if (sessionStorage.getItem(authKey) !== "true") window.location.replace("login.html");
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (document.getElementById("password").value === ADMIN_PASSWORD) {
        sessionStorage.setItem(authKey, "true");
        window.location.replace("stats.html");
      } else document.getElementById("login-error").classList.remove("hidden");
    });
    return;
  }

  requireAuthentication();
  subscribeToOverview((stats) => {
    const views = stats.views || 0;
    const clicks = stats.whatsappClicks || 0;
    document.getElementById("visit-count").textContent = views;
    document.getElementById("yes-count").textContent = stats.modalYes || 0;
    document.getElementById("no-count").textContent = stats.modalNo || 0;
    document.getElementById("click-count").textContent = clicks;
    document.getElementById("feedback-count").textContent = stats.feedbackSubmitted || 0;
    document.getElementById("conversion-rate").textContent = views ? `${Math.round((clicks / views) * 100)} %` : "0 %";
  });
  document.getElementById("logout").addEventListener("click", () => { sessionStorage.removeItem(authKey); window.location.replace("login.html"); });
});
