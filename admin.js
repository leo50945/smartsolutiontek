const ADMIN_PASSWORD = "leo1111";
const authKey = "sst_admin_authenticated";
const statsKey = "sst_local_stats";

function readStats() {
  return JSON.parse(localStorage.getItem(statsKey) || '{"visits":0,"whatsappClicks":0}');
}

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
  const stats = readStats();
  document.getElementById("visit-count").textContent = stats.visits;
  document.getElementById("click-count").textContent = stats.whatsappClicks;
  document.getElementById("conversion-rate").textContent = stats.visits ? `${Math.round((stats.whatsappClicks / stats.visits) * 100)} %` : "0 %";
  document.getElementById("logout").addEventListener("click", () => { sessionStorage.removeItem(authKey); window.location.replace("login.html"); });
});
