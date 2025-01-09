document.addEventListener("DOMContentLoaded", () => {
    const mainHeader = document.querySelector('.main_h');
    const mobileToggle = document.querySelector(".mobile-toggle");
    const navUl = mainHeader.querySelector("nav ul");
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".menu-link");
    const animatedElements = document.querySelectorAll('.scroll-animate');
    const lightThemeButton = document.getElementById("light-theme");
    const darkThemeButton = document.getElementById("dark-theme");
    const themeLink = document.getElementById("theme-link");

    // Show header on page load with a smooth transition
    setTimeout(() => {
        mainHeader.classList.add('sticky');
    }, 300); // Adjusted the delay to 300ms for a smoother effect

    // Animate elements on scroll
    function handleScroll() {
        animatedElements.forEach(element => {
            const position = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            if (position < screenPosition) element.classList.add('visible');
        });

        // Highlight active section in navbar
        let currentSection = "";
        const headerHeight = mainHeader.offsetHeight;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSection = section.getAttribute("id");
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("data-section") === currentSection);
        });
    }

    // Toggle mobile navigation menu
    mobileToggle.addEventListener("click", () => {
        const isOpen = mainHeader.classList.toggle("open-nav");
        navUl.style.maxHeight = isOpen ? `${navUl.scrollHeight}px` : "0";
        navUl.style.opacity = isOpen ? "1" : "0";
    });

    // Theme switching
    lightThemeButton.addEventListener("click", () => {
        themeLink.setAttribute("href", "MainPageLightStyle.css");
        lightThemeButton.setAttribute("aria-pressed", "true");
        darkThemeButton.setAttribute("aria-pressed", "false");

        lightThemeButton.querySelector('img').setAttribute('src', 'icons/icon-brightness.png');
        darkThemeButton.querySelector('img').setAttribute('src', 'icons/icon-moon-stars.png');
    });

    darkThemeButton.addEventListener("click", () => {
        themeLink.setAttribute("href", "MainPageDarkStyle.css");
        lightThemeButton.setAttribute("aria-pressed", "false");
        darkThemeButton.setAttribute("aria-pressed", "true");

        lightThemeButton.querySelector('img').setAttribute('src', 'icons/light-mode.png');
        darkThemeButton.querySelector('img').setAttribute('src', 'icons/dark-mode.png');
    });

    // Adjust video height based on text content
    function adjustVideoHeight() {
        const textContent = document.querySelector('.text-content');
        const videoContent = document.querySelector('.video-content');
        if (textContent && videoContent) {
            videoContent.style.height = `${textContent.offsetHeight}px`;
        }
    }

    // Initial adjustments and event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', () => {
        adjustVideoHeight();
        handleScroll(); // Call handleScroll on load to highlight current section
    });
    window.addEventListener('resize', adjustVideoHeight);
});




document.addEventListener("DOMContentLoaded", () => {
    const langButton = document.getElementById("lang-btn");
    const langModal = document.getElementById("language_modal");
    const closeModal = document.getElementById("close-language-modal");
    const langList = document.getElementById("language-list");
    const languageSearch = document.getElementById("language-search");

    // Sample list of supported languages
    const languages = [
        { code: "en", name: "English" },
        { code: "uk", name: "Українська" },
        { code: "ru", name: "Русский" },
        { code: "es", name: "Español" }
    ];

    // Populate the language list
    function populateLanguageList() {
        langList.innerHTML = "";
        const searchTerm = languageSearch.value.toLowerCase();

        languages.forEach((lang) => {
            if (lang.name.toLowerCase().includes(searchTerm)) {
                const li = document.createElement("li");
                li.textContent = lang.name;
                li.setAttribute("data-lang", lang.code);
                langList.appendChild(li);
            }
        });
    }

    // Show modal when language button is clicked
    langButton.addEventListener("click", () => {
        langModal.style.display = "flex";  // Показываем окно с помощью flex
        populateLanguageList();
    });

    // Hide modal on close button click
    closeModal.addEventListener("click", () => {
        langModal.style.display = "none";  // Скрываем окно
    });

    // Change language on selection
    langList.addEventListener("click", async (event) => {
        if (event.target.tagName === "LI") {
            const selectedLang = event.target.getAttribute("data-lang");
            localStorage.setItem("preferredLang", selectedLang);
            await updateLocalization(selectedLang);
            langModal.style.display = "none";
        }
    });

    // Filter languages in real-time
    languageSearch.addEventListener("input", populateLanguageList);

    // Load saved language on page load
    const savedLang = localStorage.getItem("preferredLang") || "en";
    updateLocalization(savedLang);

    // Update localization dynamically
    async function updateLocalization(lang) {
        const response = await fetch(`localization/${lang}.json`);
        if (response.ok) {
            const localization = await response.json();
            document.querySelectorAll(".menu-link").forEach((link) => {
                const section = link.getAttribute("data-section");
                if (localization[section]) {
                    link.textContent = localization[section];
                }
            });
        } else {
            console.error(`Localization file for '${lang}' not found.`);
        }
    }
});






function updateTextForSmallScreens() {
    const paragraph = document.querySelector('.hero-content p');
    if (window.innerWidth <= 768) {
        paragraph.textContent = "Це передове програмне рішення, яке полегшує управління продажами електроніки, автоматизує процеси та забезпечує максимальну зручність для бізнесу.";
    } else {
        // Revert to the original text for larger screens
        paragraph.textContent = "Це передове програмне рішення, яке полегшує управління продажами електроніки, автоматизує процеси та забезпечує максимальну зручність для бізнесу. З нашою платформою ви зможете швидко відстежувати замовлення, керувати запасами, аналізувати продажі та покращувати обслуговування клієнтів. Ідеальний вибір для сучасного ринку електронної комерції.";
    }
}

// Run on initial load
updateTextForSmallScreens();

// Update text on window resize
window.addEventListener('resize', updateTextForSmallScreens);





document.addEventListener("DOMContentLoaded", function() {
    const h1 = document.querySelector(".typing-h1");
    const p = document.querySelector(".typing-p");

    h1.style.animationPlayState = "running";
    p.style.animationPlayState = "running";
});










document.querySelector('.scroll-down-2').addEventListener('click', function() {
    document.querySelector('#services').scrollIntoView({ 
        behavior: 'smooth' 
    });
});

document.querySelector('.scroll-down-3').addEventListener('click', function() {
    document.querySelector('#price').scrollIntoView({ 
        behavior: 'smooth' 
    });
});

document.querySelector('.scroll-down-4').addEventListener('click', function() {
    document.querySelector('#cta').scrollIntoView({ 
        behavior: 'smooth' 
    });
});

document.querySelector('.scroll-to-start').addEventListener('click', function() {  
    document.querySelector('#hero-section').scrollIntoView({  
        behavior: 'smooth' 
    });
});









document.addEventListener("DOMContentLoaded", function () {
    let initialVisibleCards = 2;

    // DOM элементы
    const servicesContainer = document.getElementById('services-cards');
    const serviceCountElement = document.getElementById('serviceCount');
    const showMoreButton = document.querySelector('.show-more-button');
    const showLessButton = document.querySelector('.show-less-button');

    // Создаем объект для взаимодействия с сервером
    const serverAPI = new ServerAPI([3000, 3001, 3002, 3003, 3004, 3005]);

    // Получение сервисов с сервера
    serverAPI.fetchServices().then(services => {
        if (services) {
            displayServices(services);
        } else {
            servicesContainer.innerHTML = '<p>Не удалось загрузить сервисы.</p>';
        }
    });

    // Функция отображения сервисов
    function displayServices(services) {
        servicesContainer.innerHTML = ''; // Очистка контейнера
        serviceCountElement.innerText = `СЕРВІСИ: ${services.length}`;

        services.forEach(service => {
            const serviceElement = document.createElement('div');
            serviceElement.classList.add('service-card');

            // Создаем HTML-контент для карточки сервиса
            serviceElement.innerHTML = `
                <video autoplay loop muted class="service-video">
                    <source src="${service.video_url}" type="video/mp4">
                    Ваш браузер не поддерживает видео.
                </video>
                <h3>${service.title}</h3>
                <p>${service.short_description}</p>
            `;
            servicesContainer.appendChild(serviceElement);
        });

        updateVisibleCards();
    }

    // Функция управления отображаемыми карточками
    function updateVisibleCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        const viewportWidth = window.innerWidth;

        // Количество видимых карточек в зависимости от ширины экрана
        if (viewportWidth >= 2500) initialVisibleCards = 10;
        else if (viewportWidth >= 1700) initialVisibleCards = 8;
        else if (viewportWidth >= 1200) initialVisibleCards = 6;
        else if (viewportWidth >= 768) initialVisibleCards = 4;
        else initialVisibleCards = 2;

        serviceCards.forEach((card, index) => {
            if (index < initialVisibleCards) {
                card.classList.remove('hidden');
                setTimeout(() => card.classList.add('visible'), 10);
            } else {
                card.classList.add('hidden');
                card.classList.remove('visible');
            }
        });

        // Показывать или скрывать кнопки
        showMoreButton.style.display = serviceCards.length > initialVisibleCards ? 'inline-block' : 'none';
        showLessButton.style.display = 'none';
    }

    function showMore() {
        const serviceCards = document.querySelectorAll('.service-card');
        const visibleCount = Array.from(serviceCards).filter(card => !card.classList.contains('hidden')).length;

        serviceCards.forEach((card, index) => {
            if (index < visibleCount + initialVisibleCards) {
                card.classList.remove('hidden');
                setTimeout(() => card.classList.add('visible'), 10);
            }
        });

        if (visibleCount + initialVisibleCards >= serviceCards.length) {
            showMoreButton.style.display = 'none';
        }
        showLessButton.style.display = 'inline-block';
    }

    function showLess() {
        updateVisibleCards();
        showMoreButton.style.display = 'inline-block';
        showLessButton.style.display = 'none';
    }

    // Слушатели событий для кнопок
    showMoreButton.addEventListener('click', showMore);
    showLessButton.addEventListener('click', showLess);
    window.addEventListener('resize', updateVisibleCards);
});









document.addEventListener("DOMContentLoaded", function () {
  // Fetch tariffs from the API
  const serverAPI = new ServerAPI([3000, 3001, 3002, 3003, 3004, 3005]);
  
  serverAPI.fetchTariffs().then(tariffs => {
    if (tariffs) {
      displayTariffs(tariffs);
    }
  });

  // Function to display tariffs on the page
  function displayTariffs(tariffs) {
    const tariffsContainer = document.querySelector('.pricing-cards');
    tariffsContainer.innerHTML = ''; // Clear existing content

    if (!tariffs || tariffs.length === 0) {
      tariffsContainer.innerHTML = '<p>No tariffs available.</p>';
      return;
    }

    tariffs.forEach(tariff => {
      const tariffElement = document.createElement('div');
      tariffElement.classList.add('pricing-card');

      tariffElement.innerHTML = `
        <div class="icon-container">
          <img src="${tariff.icon_url}" alt="${tariff.name}">
        </div>
        <h3>${tariff.name}</h3>
        <div class="price-wrapper">
          <p class="old-price">${tariff.old_price ? `₴${tariff.old_price}` : '₴0'}</p>
          <p class="price">₴${tariff.price}</p>
        </div>
        <ul class="features">
          ${tariff.features.split(',').map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        <button class="select-plan-button">
          <img src="icons/add-to-cart.png" alt="Buy" class="icon">
        </button>
      `;

      tariffsContainer.appendChild(tariffElement);
    });

    // Attach event listeners to the select buttons
    document.querySelectorAll('.select-plan-button').forEach((button, index) => {
      button.addEventListener('click', function () {
        const card = button.closest('.pricing-card');
        const selectedPlan = card.querySelector('h3').innerText;
        const packagePrice = card.querySelector('.price').innerText;

        // Update modal with selected plan details
        document.getElementById('selectedPlan').textContent = selectedPlan;
        document.getElementById('packagePrice').textContent = packagePrice;

        // Show modal
        document.getElementById('purchaseModal').style.display = 'block';
      });
    });
  }
});




function closeModal() {
    document.getElementById('purchaseModal').style.display = 'none';
    document.getElementById('email').value = "";
    document.getElementById('modalMessage').textContent = "";
    document.getElementById('socialMedia').value = "";
    document.getElementById('socialMediaId').style.display = 'none';
    document.getElementById('socialMediaId').value = "";
}

document.getElementById('closeModal').addEventListener('click', closeModal);

window.addEventListener('click', function (event) {
    const modal = document.getElementById('purchaseModal');
    if (event.target === modal) {
        closeModal();
    }
});

document.getElementById('socialMedia').addEventListener('change', function () {
    const socialMediaIdField = document.getElementById('socialMediaId');
    socialMediaIdField.style.display = this.value ? 'block' : 'none';
    socialMediaIdField.value = '';
});

document.getElementById('sendEmailButton').addEventListener('click', function () {
    const email = document.getElementById('email').value;
    const modalMessage = document.getElementById('modalMessage');

    if (!validateEmail(email)) {
        modalMessage.textContent = 'Будь ласка, введіть коректний Email';
        return;
    }

    modalMessage.textContent = '';

    const selectedPlan = document.getElementById('selectedPlan').textContent;
    const packagePrice = document.getElementById('packagePrice').textContent;
    const socialMedia = document.getElementById('socialMedia').value;
    const socialMediaId = document.getElementById('socialMediaId').value;

    sendEmail(email, selectedPlan, packagePrice, socialMedia, socialMediaId);
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

document.getElementById('socialMedia').addEventListener('change', function() {
    const socialMediaIdField = document.getElementById('socialMediaId');
    socialMediaIdField.style.display = this.value ? 'block' : 'none';
});






// Ініціалізація EmailJS з вашим public key
emailjs.init("tvdMfxQYx81HUszxK");

function sendEmail(email, selectedPlan, packagePrice, socialMedia, socialMediaId) {
    emailjs.send("service_y1n3i8j", "template_2jy0fcp", {
        email: email,
        plan: selectedPlan,
        price: packagePrice,
        social_media: socialMedia,
        social_media_id: socialMediaId
    })
    .then(function(response) {
        console.log("Email успішно відправлено!", response);
        alert("Email успішно відправлено!");
        closeModal();
    }, function(error) {
        console.log("Помилка при відправленні email:", error);
        alert("Помилка при відправленні email. Спробуйте ще раз.");
    });
}





// Modal opening logic
document.getElementById("openModalButton").onclick = function() {
  document.getElementById("contactModal").style.display = "block";
};

// Close modal when the close button is clicked
document.querySelector(".close-cmf-button").onclick = function() {
  document.getElementById("contactModal").style.display = "none";
};

// Close modal when clicking outside the modal content
window.onclick = function(event) {
  const modal = document.getElementById("contactModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Send email on form submission
document.getElementById("sendEmailButton").addEventListener("click", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const modalMessage = document.getElementById("modalMessage");

    // Validate the email
    if (!validateEmail(email)) {
        modalMessage.textContent = "Будь ласка, введіть коректний Email";
        return;
    }

    modalMessage.textContent = "";

    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;
    const termsAccepted = document.querySelector("input[name='terms']").checked;

    if (!name || !email || !message || !termsAccepted) {
        modalMessage.textContent = "Будь ласка, заповніть всі обов'язкові поля і прийміть умови.";
        return;
    }

    const selectedPlan = document.getElementById("selectedPlan") ? document.getElementById("selectedPlan").textContent : "";
    const packagePrice = document.getElementById("packagePrice") ? document.getElementById("packagePrice").textContent : "";
    const socialMedia = document.getElementById("socialMedia") ? document.getElementById("socialMedia").value : "";
    const socialMediaId = document.getElementById("socialMediaId") ? document.getElementById("socialMediaId").value : "";

    // Send email using EmailJS
    emailjs.send("default_service", "template_gy9hmo6", {
        name: name,
        email: email,
        message: message,
        selectedPlan: selectedPlan,
        packagePrice: packagePrice,
        socialMedia: socialMedia,
        socialMediaId: socialMediaId
    }).then(function(response) {
        alert("Message sent successfully!");
        document.getElementById("contactModal").style.display = "none";
        document.getElementById("contactForm").reset();
    }).catch(function(error) {
        modalMessage.textContent = "There was an error sending your message. Please try again.";
    });
});
