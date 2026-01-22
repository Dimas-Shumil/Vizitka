


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

// // ширина экрана в кнопке
// const button = document.querySelector('button');

// const updateWidthLabel = () => {
//     const currentWidth = window.innerWidth;
//     button.innerHTML = `Ширина экрана ${currentWidth} пикселей`
// }

// updateWidthLabel();
// window.addEventListener('resize', updateWidthLabel);