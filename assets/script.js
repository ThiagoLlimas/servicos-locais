// Mobile Menu Functionality
document.addEventListener("DOMContentLoaded", function () {
  const mobileOpenBtn = document.getElementById("mobile-open-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = mobileMenu.querySelectorAll("nav a");

  // Toggle mobile menu
  mobileOpenBtn.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");
  });

  // Close menu when clicking any link
  mobileLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.add("hidden");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !mobileOpenBtn.contains(event.target) &&
      !mobileMenu.contains(event.target)
    ) {
      mobileMenu.classList.add("hidden");
    }
  });
});

// Formspree AJAX Form Submission
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Validate at least one checkbox is checked
      const isChecked = contactForm.querySelector(
        'input[type="checkbox"]:checked',
      );
      if (!isChecked) {
        const status = document.getElementById("form-status");
        status.classList.remove("hidden");
        status.className =
          "mt-4 text-center text-sm font-semibold text-red-600";
        status.innerText =
          "Por favor, selecione pelo menos um tipo de serviço.";
        return;
      }

      // Validate phone number has at least 14 characters (formatted)
      const phoneInput = contactForm.querySelector('input[type="tel"]');
      if (phoneInput && phoneInput.value.length < 14) {
        const status = document.getElementById("form-status");
        status.classList.remove("hidden");
        status.className =
          "mt-4 text-center text-sm font-semibold text-red-600";
        status.innerText =
          "Por favor, insira um número de telefone válido com DDD.";
        return;
      }

      // Validate select field is filled
      const selectField = contactForm.querySelector("select");
      if (selectField && selectField.value === "") {
        const status = document.getElementById("form-status");
        status.classList.remove("hidden");
        status.className =
          "mt-4 text-center text-sm font-semibold text-red-600";
        status.innerText = "Por favor, nos conte como você nos conheceu.";
        return;
      }

      const formData = new FormData(contactForm);

      fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            // Success
            contactForm.reset();
            formStatus.classList.remove("hidden");
            formStatus.classList.remove("text-red-600");
            formStatus.classList.add("text-green-600");
            formStatus.textContent =
              "Mensagem enviada com sucesso! Entraremos em contato em breve.";
          } else {
            // Error
            throw new Error("Form submission failed");
          }
        })
        .catch((error) => {
          // Error handling
          formStatus.classList.remove("hidden");
          formStatus.classList.remove("text-green-600");
          formStatus.classList.add("text-red-600");
          formStatus.textContent =
            "Ops! Verifique se o e-mail digitado está correto e tente novamente.";
        });
    });
  }
});
