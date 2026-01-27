    // Логика прелоудера
        document.addEventListener('DOMContentLoaded', () => {
            const preloader = document.getElementById('preloader');
            const mainContent = document.getElementById('main-content');
            const smokeContainer = document.getElementById('smokeContainer');
            const progressBar = document.getElementById('progressBar');
            const progressText = document.getElementById('progressText');
            
            let progress = 0;
            let smokeParticles = [];
            let sparks = [];
            let projectsSwiper = null; // Переменная для Swiper
            
            // Создание частиц черного дыма
            function createSmoke() {
                const particleCount = 80 + Math.floor(Math.random() * 40);
                
                for (let i = 0; i < particleCount; i++) {
                    const particle = document.createElement('div');
                    particle.classList.add('smoke-particle');
                    
                    const size = 40 + Math.random() * 110;
                    particle.style.width = `${size}px`;
                    particle.style.height = `${size}px`;
                    
                    const posX = Math.random() * 100;
                    const posY = 70 + Math.random() * 30;
                    particle.style.left = `${posX}%`;
                    particle.style.top = `${posY}%`;
                    
                    const darkness = 10 + Math.random() * 20;
                    particle.style.background = `radial-gradient(circle, rgba(${darkness},${darkness},${darkness},0.9) 0%, rgba(0,0,0,0.7) 70%)`;
                    
                    const duration = 3 + Math.random() * 4;
                    particle.style.animation = `smoke-dissipate ${duration}s ease-out forwards`;
                    particle.style.animationDelay = `${Math.random() * 2}s`;
                    
                    smokeContainer.appendChild(particle);
                    smokeParticles.push(particle);
                    
                    setTimeout(() => {
                        if (particle.parentNode) {
                            particle.remove();
                        }
                    }, duration * 1000);
                }
            }
            
            // Создание искр
            function createSparks() {
                const sparkCount = 10 + Math.floor(Math.random() * 10);
                
                for (let i = 0; i < sparkCount; i++) {
                    const spark = document.createElement('div');
                    spark.classList.add('spark');
                    
                    const size = 3 + Math.random() * 8;
                    spark.style.width = `${size}px`;
                    spark.style.height = `${size}px`;
                    
                    const posX = 40 + Math.random() * 20;
                    spark.style.left = `${posX}%`;
                    spark.style.top = `85%`;
                    
                    const hue = 30 + Math.random() * 20;
                    spark.style.background = `radial-gradient(circle, 
                        hsla(${hue}, 100%, 50%, 0.9) 0%, 
                        hsla(${hue+10}, 100%, 60%, 0.7) 50%, 
                        transparent 70%)`;
                    
                    const duration = 1 + Math.random() * 1.5;
                    const sparkX = (Math.random() - 0.5) * 100;
                    spark.style.setProperty('--spark-x', `${sparkX}px`);
                    spark.style.animation = `spark-fly ${duration}s ease-out forwards`;
                    
                    smokeContainer.appendChild(spark);
                    sparks.push(spark);
                    
                    setTimeout(() => {
                        if (spark.parentNode) {
                            spark.remove();
                        }
                    }, duration * 1000);
                }
            }
               // Обновление прогресса загрузки
            function updateProgress() {
                if (progress >= 100) return;
                
                const increment = 1 + Math.random() * 4;
                progress = Math.min(progress + increment, 100);
                
                progressBar.style.width = `${progress}%`;
                
                // Обновляем текст в зависимости от прогресса
                if (progress < 20) {
                    progressText.textContent = "Запуск темных протоколов...";
                } else if (progress < 40) {
                    progressText.textContent = "Генерация дымовой завесы...";
                } else if (progress < 60) {
                    progressText.textContent = "Активация искровых систем...";
                } else if (progress < 80) {
                    progressText.textContent = "Загрузка креативных модулей...";
                } else if (progress < 95) {
                    progressText.textContent = "Финальная инициализация...";
                } else {
                    progressText.textContent = "Система готова. Входим в темноту...";
                }
                
                // Создаем дым и искры в зависимости от прогресса
                if (progress < 30) {
                    if (progress % 5 < 1) createSmoke();
                } else if (progress < 70) {
                    if (progress % 4 < 1) createSmoke();
                    if (progress % 6 < 1) createSparks();
                } else {
                    if (progress % 8 < 1) createSmoke();
                    if (progress % 3 < 1) createSparks();
                }
                
                if (progress < 100) {
                    setTimeout(updateProgress, 50 + Math.random() * 150);
                } else {
                    setTimeout(() => {
                        smokeParticles.forEach(p => {
                            p.style.animationDuration = '0.5s';
                        });
                        
                        sparks.forEach(s => {
                            s.style.animationDuration = '0.3s';
                        });
                        
                        setTimeout(() => {
                            preloader.style.animation = 'fadeOut 1.2s ease forwards';
                            
                            setTimeout(() => {
                                preloader.style.display = 'none';
                                mainContent.style.opacity = '1';
                                mainContent.style.transition = 'opacity 0.8s ease';
                                
                                // Инициализация всех компонентов после загрузки
                                initMainScripts();
                            }, 1200);
                        }, 800);
                    }, 1000);
                }
            }
               // Инициализация прелоудера
            function initPreloader() {
                for (let i = 0; i < 3; i++) {
                    setTimeout(() => createSmoke(), i * 300);
                }
                setTimeout(updateProgress, 800);
            }
            
            // Запуск прелоудера
            initPreloader();
            
            // Переинициализация Swiper при изменении размера окна
            window.addEventListener('resize', () => {
                if (projectsSwiper) {
                    setTimeout(() => {
                        projectsSwiper.update();
                    }, 300);
                }
            });
        });
            



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

// // Предзагрузка изображений для лучшего UX
// function preloadImages() {
//   const images = document.querySelectorAll('img[data-src]');
//   const imageObserver = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         const img = entry.target;
//         img.src = img.dataset.src;
//         img.removeAttribute('data-src');
//         imageObserver.unobserve(img);
//       }
//     });
//   });

//   images.forEach(img => imageObserver.observe(img));
// }

// // Запуск предзагрузки
// preloadImages();

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