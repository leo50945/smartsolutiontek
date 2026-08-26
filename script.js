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

document.addEventListener("DOMContentLoaded", () => {
  window.lucide?.createIcons();
  const cta = document.getElementById("whatsapp-cta");
  const copyButton = document.getElementById("copy-number");
  // L'attribut href dans le HTML garde un lien de secours si les CDN ne chargent pas.
  cta.href = whatsappUrl;

  cta.addEventListener("click", () => {
    trackEvent("whatsapp_redirect_click");
    // Le lien ouvre WhatsApp dans l'onglet courant, sans pop-up ni nouvelle fenêtre.
    window.setTimeout(showFallback, 1800);
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
