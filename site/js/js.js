


document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');

  // Переключение меню по клику на бургер
  burger.addEventListener('click', (e) => {
    e.stopPropagation();
    burger.classList.toggle('active');
    nav.classList.toggle('active');
  });

  // Закрытие меню при клике вне его области
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !burger.contains(e.target)) {
      burger.classList.remove('active');
      nav.classList.remove('active');
    }
  });

  // Закрытие меню при изменении размера экрана (если стало > 1025px)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1025) {
      burger.classList.remove('active');
      nav.classList.remove('active');
    }
  });
});

// Инициализация Swiper
document.addEventListener('DOMContentLoaded', () => {
  const projectsSwiper = new Swiper('.projects-swiper', {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    slidesPerView: 1,
    spaceBetween: 30,
    breakpoints: {
      // При ширине > 768px — 2 слайда
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      // При ширине > 1024px — 3 слайда
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
});

// // ширина экрана в кнопке
// const button = document.querySelector('button');

// const updateWidthLabel = () => {
//     const currentWidth = window.innerWidth;
//     button.innerHTML = `Ширина экрана ${currentWidth} пикселей`
// }

// updateWidthLabel();
// window.addEventListener('resize', updateWidthLabel);