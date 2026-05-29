/**
 * Banner de Consentimento LGPD - Serviços Locais
 * Design minimalista e integrado à identidade visual do site
 */

(function () {
  "use strict";

  // Verificar se já existe consentimento
  if (localStorage.getItem("sl_cookie_consent")) {
    // Se já existe consentimento, liberar GTM
    if (localStorage.getItem("sl_cookie_consent") === "accepted") {
      initializeGTM();
    }
    return;
  }

  // Criar CSS do banner
  const bannerStyles = `
        .lgpd-banner {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%);
            color: white;
            padding: 20px;
            z-index: 9999;
            box-shadow: 0 -4px 20px rgba(124, 58, 237, 0.15);
            transform: translateY(100%);
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .lgpd-banner.show {
            transform: translateY(0);
        }
        
        .lgpd-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            flex-wrap: wrap;
        }
        
        .lgpd-text {
            flex: 1;
            min-width: 250px;
            font-size: 14px;
            line-height: 1.5;
            margin-right: 20px;
        }
        
        .lgpd-text a {
            color: #E9D5FF;
            text-decoration: underline;
            transition: color 0.2s ease;
        }
        
        .lgpd-text a:hover {
            color: white;
        }
        
        .lgpd-buttons {
            display: flex;
            gap: 12px;
            align-items: center;
            flex-wrap: wrap;
        }
        
        .lgpd-btn {
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            border: none;
            cursor: pointer;
            transition: all 0.2s ease;
            white-space: nowrap;
        }
        
        .lgpd-btn-accept {
            background: white;
            color: #7C3AED;
        }
        
        .lgpd-btn-accept:hover {
            background: #F3E8FF;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
        }
        
        .lgpd-btn-reject {
            background: transparent;
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.3);
        }
        
        .lgpd-btn-reject:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.5);
        }
        
        .lgpd-link {
            color: #E9D5FF;
            text-decoration: underline;
            font-size: 14px;
            padding: 10px 0;
            cursor: pointer;
            transition: color 0.2s ease;
        }
        
        .lgpd-link:hover {
            color: white;
        }
        
        @media (max-width: 768px) {
            .lgpd-container {
                flex-direction: column;
                text-align: center;
            }
            
            .lgpd-text {
                margin-right: 0;
                margin-bottom: 15px;
            }
            
            .lgpd-buttons {
                justify-content: center;
                width: 100%;
            }
        }
    `;

  // Inserir CSS no DOM
  const styleSheet = document.createElement("style");
  styleSheet.textContent = bannerStyles;
  document.head.appendChild(styleSheet);

  // Criar HTML do banner
  const bannerHTML = `
        <div class="lgpd-banner" id="lgpd-banner" role="dialog" aria-labelledby="lgpd-title" aria-describedby="lgpd-description">
            <div class="lgpd-container">
                <div class="lgpd-text">
                    <p id="lgpd-description">
                        Usamos cookies para melhorar sua experiência e analisar o uso do nosso site. 
                        Ao continuar, você concorda com nossa 
                        <a href="privacy-policy.html" target="_blank">Política de Privacidade</a> e 
                        <a href="cookie-policy.html" target="_blank">Política de Cookies</a>.
                    </p>
                </div>
                <div class="lgpd-buttons">
                    <button 
                        class="lgpd-btn lgpd-btn-accept" 
                        id="lgpd-accept"
                        aria-label="Aceitar todos os cookies"
                    >
                        Aceitar Todos
                    </button>
                    <button 
                        class="lgpd-btn lgpd-btn-reject" 
                        id="lgpd-reject"
                        aria-label="Recusar cookies não essenciais"
                    >
                        Recusar
                    </button>
                    <button 
                        class="lgpd-link" 
                        id="lgpd-customize"
                        aria-label="Personalizar preferências de cookies"
                    >
                        Personalizar
                    </button>
                </div>
            </div>
        </div>
    `;

  // Inserir banner no DOM
  document.body.insertAdjacentHTML("beforeend", bannerHTML);

  // Obter elementos
  const banner = document.getElementById("lgpd-banner");
  const acceptBtn = document.getElementById("lgpd-accept");
  const rejectBtn = document.getElementById("lgpd-reject");
  const customizeBtn = document.getElementById("lgpd-customize");

  // Mostrar banner com animação
  setTimeout(() => {
    banner.classList.add("show");
  }, 1000);

  // Função para aceitar cookies
  function acceptCookies() {
    localStorage.setItem("sl_cookie_consent", "accepted");
    hideBanner();

    // Disparar evento para analytics.js
    document.dispatchEvent(new Event("cookieAccepted"));
  }

  // Função para recusar cookies
  function rejectCookies() {
    localStorage.setItem("sl_cookie_consent", "rejected");
    hideBanner();
  }

  // Função para personalizar (placeholder)
  function customizeCookies() {
    // Em implementação real, abriria modal de preferências
    alert("Em desenvolvimento: painel de preferências detalhadas");
  }

  // Função para esconder banner
  function hideBanner() {
    banner.classList.remove("show");
    setTimeout(() => {
      banner.remove();
    }, 400);
  }

  // Função para inicializar GTM
  function initializeGTM() {
    // Esta função será chamada pelo analytics.js
    // quando o consentimento for aceito
    if (typeof window.initializeAnalytics === "function") {
      window.initializeAnalytics();
    }
  }

  // Adicionar event listeners
  acceptBtn.addEventListener("click", acceptCookies);
  rejectBtn.addEventListener("click", rejectCookies);
  customizeBtn.addEventListener("click", customizeCookies);

  // Suporte a navegação por teclado
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && banner.classList.contains("show")) {
      hideBanner();
    }
  });

  // Foco inicial no primeiro botão
  setTimeout(() => {
    acceptBtn.focus();
  }, 1100);
})();
