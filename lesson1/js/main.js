const products = [
  {id: 1, title: 'Notebook', price: 20000, image: 'https://placehold.it/200x150'},
  {id: 2, title: 'Mouse', price: 1500, image: 'https://placehold.it/200x150'},
  {id: 3, title: 'Keyboard', price: 5000, image: 'https://placehold.it/200x150'},
  {id: 4, title: 'Gamepad', price: 4500, image: 'https://placehold.it/200x150'},
];

const renderProduct = ({title, price, image}) =>
`<div class="product-item">
    <img src="${image}" alt="">
    <h3>${title}</h3>
    <p>${price}</p>
    <button class="buy-btn">Купить</button>
</div>`;

const renderProducts = goodsList => {
  const productsList = goodsList.map(renderProduct);
  
  document.querySelector('.products').innerHTML = productsList.join(''); // .join('') Убираем запятые.
};

renderProducts(products);
