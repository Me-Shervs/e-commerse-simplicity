const burger = document.getElementById('burger');
  const menu = document.querySelector('.menu');
  const overlay = document.getElementById('overlay');

  burger.addEventListener('click', () => {
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
  });

  overlay.addEventListener('click', () => {
    menu.classList.remove('active');
    overlay.classList.remove('active');
  });