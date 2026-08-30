import { recordFeedback, recordMetric } from "./firebase.js";

const whatsappNumber = "50942536029";
const whatsappMessage = "Bonjour, je viens de voir votre publicité concernant la création de site web et j'aimerais en discuter.";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

function trackEvent(eventName) {
  // Point d'intégration futur : Meta Pixel, Google Analytics, etc.
  window.dataLayer?.push({ event: eventName });
  window.fbq?.("trackCustom", eventName);
}

function showFallback() {
  document.getElementById("fallback").classList.remove("hidden");
}

function openModal() {
  const modal = document.getElementById("interest-modal");
  modal.hidden = false;
  document.body.classList.add("modal-open");
  modal.querySelector(".modal-close").focus();
}

function closeModal() {
  document.getElementById("interest-modal").hidden = true;
  document.body.classList.remove("modal-open");
}

function redirectToWhatsapp() {
  trackEvent("whatsapp_redirect_click");
  recordMetric("whatsappClicks");
  window.location.assign(whatsappUrl);
}

document.addEventListener("DOMContentLoaded", () => {
  window.lucide?.createIcons();
  const cta = document.getElementById("whatsapp-cta");
  const copyButton = document.getElementById("copy-number");
  // L'attribut href dans le HTML garde un lien de secours si les CDN ne chargent pas.
  cta.href = whatsappUrl;
  if (!sessionStorage.getItem("sst_view_recorded")) {
    recordMetric("views");
    sessionStorage.setItem("sst_view_recorded", "true");
  }

  if (!sessionStorage.getItem("sst_feedback_prompted")) {
    window.setTimeout(() => {
      openModal();
      sessionStorage.setItem("sst_feedback_prompted", "true");
    }, 250);
  }

  cta.addEventListener("click", (event) => {
    event.preventDefault();
    redirectToWhatsapp();
    window.setTimeout(showFallback, 1800);
  });

  const modal = document.getElementById("interest-modal");
  const interestPanel = document.getElementById("interest-panel");
  const feedbackPanel = document.getElementById("feedback-panel");
  let selectedReason = "";

  document.querySelectorAll("[data-close-modal]").forEach((button) => button.addEventListener("click", closeModal));
  modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !modal.hidden) closeModal(); });

  document.getElementById("interest-yes").addEventListener("click", () => {
    recordMetric("modalYes");
    redirectToWhatsapp();
  });

  document.getElementById("interest-no").addEventListener("click", () => {
    recordMetric("modalNo");
    interestPanel.hidden = true;
    feedbackPanel.hidden = false;
    document.getElementById("feedback-text").focus();
  });

  document.getElementById("feedback-back").addEventListener("click", () => {
    feedbackPanel.hidden = true;
    interestPanel.hidden = false;
  });

  document.querySelectorAll("[data-reason]").forEach((button) => button.addEventListener("click", () => {
    selectedReason = button.dataset.reason;
    document.querySelectorAll("[data-reason]").forEach((item) => item.classList.toggle("is-selected", item === button));
  }));

  feedbackPanel.addEventListener("submit", (event) => {
    event.preventDefault();
    const customReason = document.getElementById("feedback-text").value.trim();
    recordFeedback(customReason || selectedReason);
    feedbackPanel.innerHTML = '<div class="thanks"><i data-lucide="check" aria-hidden="true"></i><h2>Merci pour votre retour.</h2><p>Votre réponse a bien été enregistrée.</p></div>';
    window.lucide?.createIcons();
    window.setTimeout(closeModal, 1600);
  });

  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("+509 42 53 6029");
      copyButton.textContent = "Numéro copié !";
    } catch {
      copyButton.textContent = "+509 42 53 6029";
    }
  });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion || typeof anime === "undefined") {
    document.querySelectorAll(".brand, .card, .cta-area, .trust-note").forEach((element) => { element.style.opacity = "1"; });
    return;
  }

  anime.timeline({ easing: "easeOutCubic" })
    .add({ targets: ".brand", opacity: [0, 1], translateY: [-7, 0], duration: 380 })
    .add({ targets: ".card", opacity: [0, 1], translateY: [16, 0], duration: 500 }, "-=150")
    .add({ targets: ".cta-area", opacity: [0, 1], translateY: [8, 0], duration: 360 }, "-=160")
    .add({ targets: ".trust-note", opacity: [0, 1], duration: 300 }, "-=210");
  anime({ targets: ".icon-orb", scale: [1, 1.04, 1], duration: 850, delay: 420, easing: "easeInOutSine" });
});
