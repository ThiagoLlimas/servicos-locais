/**
 * Analytics e GTM - Serviços Locais
 * Carregamento condicional LGPD-compliant
 */

(function () {
  "use strict";

  // SUBSTITUIR: troque GTM-XXXXXXX pelo seu ID real
  const GTM_ID = "GTM-M2RV2PKF";

  // Inicializar dataLayer
  window.dataLayer = window.dataLayer || [];

  // Função para injetar GTM dinamicamente
  function initGTM() {
    console.log("🚀 Inicializando GTM com ID:", GTM_ID);

    // Injetar snippet do <head> do GTM
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != "dataLayer" ? "&l=" + l : "";
      j.async = true;
      j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, "script", "dataLayer", GTM_ID);

    // Injetar <noscript> iframe do GTM
    const noscript = document.createElement("noscript");
    const iframe = document.createElement("iframe");
    iframe.src = "https://www.googletagmanager.com/ns.html?id=" + GTM_ID;
    iframe.height = "0";
    iframe.width = "0";
    iframe.style.display = "none";
    iframe.style.visibility = "hidden";
    noscript.appendChild(iframe);

    // Inserir logo após <body>
    document.body.insertBefore(noscript, document.body.firstChild);

    console.log("✅ GTM injetado com sucesso");
  }

  // Função para inicializar eventos customizados
  function initEvents() {
    console.log("📊 Inicializando eventos customizados");

    // Aguardar um pouco para garantir que GTM está carregado
    setTimeout(function () {
      setupClickEvents();
      setupScrollTracking();
      setupTimeTracking();
    }, 2000);
  }

  // Configurar eventos de clique
  function setupClickEvents() {
    // Clique em "Buscar Profissionais"
    const buscarBtn = document.querySelector('a[href="#servicos"]');
    if (buscarBtn) {
      buscarBtn.addEventListener("click", function () {
        pushEvent("cta_click", "buscar_profissionais");
      });
    }

    // Clique em "Sou Profissional"
    const profissionalBtn = document.querySelector('a[href="#contato"]');
    if (profissionalBtn) {
      profissionalBtn.addEventListener("click", function () {
        pushEvent("cta_click", "sou_profissional");
      });
    }

    // Clique em categorias de serviço
    const categoryCards = document.querySelectorAll(
      '[class*="border border-gray-200 rounded-full"]',
    );
    categoryCards.forEach(function (card) {
      card.addEventListener("click", function () {
        const categoryName = card.textContent.trim();
        pushEvent("category_click", categoryName);
      });
    });

    // Envio de formulário
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", function () {
        pushEvent("form_submit", "contact_form");
      });
    }
  }

  // Configurar rastreamento de scroll depth
  function setupScrollTracking() {
    let trackedDepths = [];
    const scrollDepths = [25, 50, 75, 100];

    function checkScrollDepth() {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPercent = Math.round((scrollTop / documentHeight) * 100);

      scrollDepths.forEach(function (depth) {
        if (scrollPercent >= depth && !trackedDepths.includes(depth)) {
          trackedDepths.push(depth);
          pushEvent("scroll_depth", depth + "%");
        }
      });
    }

    window.addEventListener("scroll", debounce(checkScrollDepth, 500));
  }

  // Configurar rastreamento de tempo na página
  function setupTimeTracking() {
    let trackedTimes = [];
    const timeIntervals = [30, 60, 120]; // segundos
    let startTime = Date.now();

    function checkTimeOnPage() {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);

      timeIntervals.forEach(function (time) {
        if (timeSpent >= time && !trackedTimes.includes(time)) {
          trackedTimes.push(time);
          pushEvent("time_on_page", time);
        }
      });
    }

    setInterval(checkTimeOnPage, 5000);
  }

  // Função para enviar eventos ao dataLayer
  function pushEvent(eventName, parameter) {
    if (typeof dataLayer !== "undefined") {
      dataLayer.push({
        event: eventName,
        parameter: parameter,
        timestamp: new Date().toISOString(),
      });

      console.log("📊 Evento enviado:", {
        event: eventName,
        parameter: parameter,
      });
    }
  }

  // Função debounce
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Lógica de inicialização condicional
  function initializeAnalytics() {
    const consent = localStorage.getItem("sl_cookie_consent");

    if (consent === "accepted") {
      console.log("✅ Consentimento encontrado, inicializando GTM e eventos");
      initGTM();
      initEvents();
    } else {
      console.log("⏳ Aguardando consentimento do usuário");

      // Aguardar evento de consentimento
      document.addEventListener("cookieAccepted", function () {
        console.log("🎉 Consentimento recebido, inicializando GTM e eventos");
        initGTM();
        initEvents();
      });
    }
  }

  // Inicializar quando o DOM estiver pronto
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeAnalytics);
  } else {
    initializeAnalytics();
  }
})();
