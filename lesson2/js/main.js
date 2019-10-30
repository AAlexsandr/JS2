class ProductItem {
  constructor(product, img = 'https://placehold.it/200x150') {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
  }
}

class ProductList {
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    this._fetchProducts();
    this._render();
  }

  _fetchProducts() {
    this.goods = [
      {id: 1, title: 'Notebook', price: 40000},
      {id: 2, title: 'Mouse', price: 1000},
      {id: 3, title: 'Keyboard', price: 2500},
      {id: 4, title: 'Gamepad', price: 1500},
    ];
  }

  _render() {
    const block = document.querySelector(this.container);

    for (let product of this.goods) {
      const productObject = new ProductItem(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }
// Считаем стоимость всех товаров
  total() {
		return this.allProducts.reduce((acc, product) => acc + product.price, 0);
	}
}

class Cart {
  constructor(container) {
    this.data = [] // массив объектов
  }
  // метод добавления товара в корзину
  // метод удаления товара из корзины
  // сумма количества повторно выбранных товаров
  // сумма стоимости повторно выбранных товаров
}

class CartItem {
  constructor() {

  }
  // выводим блок(разметку) выбранного товара
  // количество всех товаров в корзине
  // общая стоимость корзины
}


const list = new ProductList();

// Вызываем метод подсчета всех товаров
alert(list.total());



// const products = [
//   {id: 1, title: 'Notebook', price: 40000},
//   {id: 2, title: 'Mouse', price: 1000},
//   {id: 3, title: 'Keyboard', price: 2500},
//   {id: 4, title: 'Gamepad', price: 1500},
// ];
//
// const renderProduct = (item, img = 'https://placehold.it/200x150') => `<div class="product-item">
//             <img src="${img}" alt="Some img">
//             <h3>${item.title}</h3>
//             <p>${item.price}</p>
//             <button class="by-btn">Добавить</button>
//           </div>`;
//
// const renderProducts = list => document.querySelector('.products')
//   .insertAdjacentHTML('beforeend', list.map(item => renderProduct(item)).join(''));
//
// renderProducts(products);
