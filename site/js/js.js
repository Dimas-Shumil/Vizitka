// main.js
document.addEventListener('DOMContentLoaded', () => {
  // Инициализация всех компонентов
  initBurgerMenu();
  initSwiper();
  initHeaderScroll();
  initSmoothScrolling();
  initContactForm();
  initFloatingElements();
  initStatsCounter();
});

// Бургер-меню
function initBurgerMenu() {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!burger || !nav) return;

  // Переключение меню по клику на бургер
  burger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Закрытие меню при клике на ссылку
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Закрытие меню при клике вне его области
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('active')) {
      closeMenu();
    }
  });

  // Закрытие меню при изменении размера экрана
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && nav.classList.contains('active')) {
      closeMenu();
    }
  });

  // Закрытие меню при нажатии Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      closeMenu();
    }
  });

  function toggleMenu() {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
  }

  function closeMenu() {
    burger.classList.remove('active');
    nav.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Swiper для проектов
function initSwiper() {
  const swiperContainer = document.querySelector('.projects-swiper');
  if (!swiperContainer) return;

  const projectsSwiper = new Swiper('.projects-swiper', {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 600,
    effect: 'slide',
    grabCursor: true,
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1450: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      1920: {
        slidesPerView: 5,
        spaceBetween: 30,
      },
    },
    // Адаптивные настройки
    a11y: {
      prevSlideMessage: 'Предыдущий слайд',
      nextSlideMessage: 'Следующий слайд',
      firstSlideMessage: 'Первый слайд',
      lastSlideMessage: 'Последний слайд',
      paginationBulletMessage: 'Перейти к слайду {{index}}',
    },
  });

  // Пауза автовоспроизведения при наведении
  swiperContainer.addEventListener('mouseenter', () => {
    projectsSwiper.autoplay.stop();
  });

  swiperContainer.addEventListener('mouseleave', () => {
    projectsSwiper.autoplay.start();
  });

  // Добавление индикатора текущего/всего слайдов
  const updateSlideCounter = () => {
    const current = projectsSwiper.realIndex + 1;
    const total = projectsSwiper.slides.length - 2; // Учитываем loop-клоны
    
    let counter = document.querySelector('.swiper-counter');
    if (!counter) {
      counter = document.createElement('div');
      counter.className = 'swiper-counter';
      counter.style.cssText = `
        position: absolute;
        bottom: 20px;
        right: 20px;
        background: rgba(0,0,0,0.7);
        color: white;
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 12px;
        z-index: 10;
      `;
      swiperContainer.appendChild(counter);
    }
    counter.textContent = `${current} / ${total}`;
  };

  projectsSwiper.on('slideChange', updateSlideCounter);
  updateSlideCounter();
}

// Изменение хедера при скролле
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastScroll = 0;
  const scrollThreshold = 100;
  const headerHeight = header.offsetHeight;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Добавление класса при скролле
    if (currentScroll > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Скрытие хедера при скролле вниз
    if (currentScroll > lastScroll && currentScroll > headerHeight) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
  });

  // Сброс трансформации при ховере
  header.addEventListener('mouseenter', () => {
    header.style.transform = 'translateY(0)';
  });
}

// Плавная прокрутка к якорям
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (!target) return;
      
      e.preventDefault();
      
      const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

// Форма обратной связи
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      name: contactForm.querySelector('input[type="text"]').value,
      email: contactForm.querySelector('input[type="email"]').value,
      message: contactForm.querySelector('textarea').value,
      timestamp: new Date().toISOString()
    };

    // Валидация
    if (!validateForm(formData)) return;

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Показ состояния загрузки
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
    submitBtn.disabled = true;

    try {
      // Имитация отправки (в реальном проекте замените на fetch)
      await simulateApiCall(formData);
      
      // Успешная отправка
      showNotification('Сообщение успешно отправлено!', 'success');
      contactForm.reset();
      
      // Анимация успеха
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Отправлено!';
      submitBtn.style.background = '#10b981';
      
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 2000);
      
    } catch (error) {
      // Ошибка отправки
      showNotification('Ошибка отправки. Попробуйте еще раз.', 'error');
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });

  // Валидация в реальном времени
  const inputs = contactForm.querySelectorAll('.form-control');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateField(input);
    });
    
    input.addEventListener('input', () => {
      clearFieldError(input);
    });
  });
}

function validateForm(data) {
  if (!data.name.trim()) {
    showNotification('Введите ваше имя', 'error');
    return false;
  }
  
  if (!data.email.trim() || !isValidEmail(data.email)) {
    showNotification('Введите корректный email', 'error');
    return false;
  }
  
  if (!data.message.trim()) {
    showNotification('Введите сообщение', 'error');
    return false;
  }
  
  return true;
}

function validateField(field) {
  const value = field.value.trim();
  
  if (field.type === 'email' && value && !isValidEmail(value)) {
    showFieldError(field, 'Введите корректный email');
    return false;
  }
  
  if (field.required && !value) {
    showFieldError(field, 'Это поле обязательно');
    return false;
  }
  
  clearFieldError(field);
  return true;
}

function showFieldError(field, message) {
  clearFieldError(field);
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'field-error';
  errorDiv.textContent = message;
  errorDiv.style.cssText = `
    color: #ef4444;
    font-size: 12px;
    margin-top: 5px;
  `;
  
  field.parentNode.appendChild(errorDiv);
  field.style.borderColor = '#ef4444';
}

function clearFieldError(field) {
  const existingError = field.parentNode.querySelector('.field-error');
  if (existingError) {
    existingError.remove();
  }
  field.style.borderColor = '';
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function simulateApiCall(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 90% шанс успешной отправки
      Math.random() > 0.1 ? resolve(data) : reject(new Error('Network error'));
    }, 1500);
  });
}

function showNotification(message, type = 'info') {
  // Удаляем существующие уведомления
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    background: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  // Автоматическое скрытие
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 5000);
  
  // Добавляем стили для анимаций
  if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

// Анимация плавающих элементов
function initFloatingElements() {
  const elements = document.querySelectorAll('.floating-element');
  elements.forEach((el, index) => {
    // Случайная задержка для каждого элемента
    const delay = index * 0.9;
    el.style.animationDelay = `${delay}s`;
  });
}

// Анимация счетчиков статистики
function initStatsCounter() {
  const stats = document.querySelectorAll('.stat-number');
  if (!stats.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const stat = entry.target;
        const target = parseInt(stat.textContent);
        animateCounter(stat, target);
        observer.unobserve(stat);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 100;
  const duration = 1500;
  const stepTime = duration / 100;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + (element.textContent.includes('+') ? '+' : '');
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, stepTime);
}

// Динамическое обновление ширины экрана (для отладки)
function initScreenWidthDebug() {
  if (!window.location.hash.includes('debug')) return;
  
  const button = document.createElement('button');
  button.id = 'screenWidthDebug';
  button.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 20px;
    background: #6366f1;
    color: white;
    padding: 10px 15px;
    border-radius: 20px;
    border: none;
    font-size: 12px;
    z-index: 9998;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  `;
  
  const updateWidthLabel = () => {
    const currentWidth = window.innerWidth;
    button.innerHTML = `Ширина: ${currentWidth}px`;
  };
  
  updateWidthLabel();
  window.addEventListener('resize', updateWidthLabel);
  
  document.body.appendChild(button);
  
  // Переключение видимости по клику
  button.addEventListener('click', () => {
    button.style.opacity = button.style.opacity === '0.5' ? '1' : '0.5';
  });
}

// Инициализация отладки (опционально)
// initScreenWidthDebug();

// Предзагрузка изображений для лучшего UX
function preloadImages() {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// Запуск предзагрузки
preloadImages();

// Улучшенная обработка ошибок изображений
document.addEventListener('error', (e) => {
  if (e.target.tagName === 'IMG') {
    e.target.style.opacity = '0.5';
    e.target.alt = 'Изображение не загружено';
  }
}, true);

// Сохранение состояния формы при перезагрузке
function initFormPersistence() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Восстановление данных из localStorage
  const savedData = JSON.parse(localStorage.getItem('contactFormData') || '{}');
  Object.keys(savedData).forEach(key => {
    const input = form.querySelector(`[name="${key}"]`);
    if (input) input.value = savedData[key];
  });

  // Автосохранение при вводе
  form.addEventListener('input', (e) => {
    if (e.target.matches('.form-control')) {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      localStorage.setItem('contactFormData', JSON.stringify(data));
    }
  });

  // Очистка при успешной отправке
  form.addEventListener('submit', () => {
    localStorage.removeItem('contactFormData');
  });
}

// Инициализация при загрузке
initFormPersistence();