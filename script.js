window.addEventListener('scroll', toggleBackToTopButton);
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
document.getElementById('button-back-to-top').addEventListener('click', scrollToTop);

function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }


function toggleBackToTopButton() {
  const button = document.querySelector('.back-to-top');
  if (window.scrollY > 0) {
    button.style.display = 'block';
  } else {
    button.style.display = 'none';
  }
}

function toggleTheme() {
  const body = document.body;
  body.classList.toggle('dark');
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

function formatDate(dateString) {
  const options = { weekday: 'long', week: 'numeric', month: 'long', year: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', options);
}






import products from './products.js';

function createProductCards() {

	products.forEach((product) => {
       
		const card = document.createElement('div');
		card.classList.add('product-card');

		const image = document.createElement('img');
		image.src = product.imageSrc;
		image.alt = product.title;
		image.classList.add('product-card__image');

		const title = document.createElement('p');
		title.textContent = product.title;
		title.classList.add('product-card__title');

		const date = document.createElement('p');
		date.innerHTML = `Добавлено: <span>${formatDate(product.date)}</span>`;
		date.classList.add('product-card__date');

		const button = document.createElement('button');
		button.textContent = 'Купить';
		button.classList.add('product-card__button');
		button.onclick = openForm;

		card.appendChild(image);
		card.appendChild(title);
		card.appendChild(date);
		card.appendChild(button);

	
        document.getElementById(`${product.type}-container`).appendChild(card)
	});
}

createProductCards();

