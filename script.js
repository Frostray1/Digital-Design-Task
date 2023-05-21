import products from './products.js';

window.addEventListener('scroll', toggleBackToTopButton);
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
document.getElementById('button-back-to-top').addEventListener('click', scrollToTop);
document.getElementById('purchase-form__submit').addEventListener('click', buyProduct);
document.getElementById('purchase-form__close').addEventListener('click', closeForm);
const scrollLinks = document.querySelectorAll('.scroll-link');

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

scrollLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const headerHeight = 100;
    const targetId = link.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const offsetTop = targetElement.offsetTop;
      const scrollTo = offsetTop - headerHeight;

      window.scrollTo({
        top: scrollTo,
        behavior: 'smooth'
      });
    }
  });
});

function toggleBackToTopButton() {
  const button = document.querySelector('.back-to-top');
  button.style.display = window.scrollY > 0 ? 'block' : 'none';
}

function toggleTheme() {
  document.body.classList.toggle('dark');
} 

function openForm() {
  document.getElementById('purchase-form').style.display = 'block';
}

function closeForm() {
  document.getElementById('purchase-form').style.display = 'none';
}

function buyProduct() {
  alert('Спасибо за покупку!');
  closeForm();
  return false;
}

function getDayInfo(dateString) {
  const options = { weekday: 'long', week: 'numeric', month: 'long', year: 'numeric', day: 'numeric' };
  const dateParts = dateString.split('.');
  const day = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1; 
  const year = parseInt(dateParts[2]);
  const date = new Date(year, month, day);
  const formattedDate = date.toLocaleDateString('ru-RU', options);
  
  const weekNumber = Math.ceil(day / 7);
  const formattedWeekNumber = weekNumber > 1 ? `${weekNumber} неделя` : '1 неделя';
  
  const dayInfo = formattedDate.replace(day.toString(), formattedWeekNumber);
  return dayInfo;
}

function createProductCards() {
  const productContainers = {};

  products.forEach(product => {
    const { type, imageSrc, title, date } = product;

    if (!productContainers[type]) {
      productContainers[type] = document.getElementById(`${type}-container`);
    }

    const card = document.createElement('div');
    card.classList.add('product-card');

    const image = document.createElement('img');
    image.src = imageSrc;
    image.alt = title;
    image.classList.add('product-card__image');

    const titleElement = document.createElement('p');
    titleElement.textContent = title;
    titleElement.classList.add('product-card__title');

    const dateElement = document.createElement('p');
    dateElement.innerHTML = `Добавлено: <span>${getDayInfo(date)}</span>`;
    dateElement.classList.add('product-card__date');

    const button = document.createElement('button');
    button.textContent = 'Купить';
    button.classList.add('product-card__button');
    button.addEventListener('click', openForm);

    card.appendChild(image);
    card.appendChild(titleElement);
    card.appendChild(dateElement);
    card.appendChild(button);

    productContainers[type].appendChild(card);
  });
}

createProductCards();
