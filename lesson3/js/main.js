const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Переделать в ДЗ
//let getRequest = (url, cb) => {
//  return new Promise ((resolve, reject) => {
//    let xhr = new XMLHttpRequest();
//    xhr.open('GET', url, true);
//    xhr.onreadystatechange = () => {
//      if (xhr.readyState === 4) {
//        if (xhr.status !== 200) {
//         reject ('Error');
//        } else {
//          resolve(xhr.responseText);
//        }
//      }
//    }
//      xhr.send()
//  })
//};
//
//getRequest(url).then(data => console.log('data'));

class ProductItem {
  constructor(product, img = 'https://placehold.it/200x150') {
    this.product_name = product.product_name;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
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
    this._getProducts()
      .then(data => {
        this.goods = [...data];
        this._render();
      });
  }

  _getProducts() {
    return fetch(`${API}/catalogData.json`)
      .then(result => result.json())
      .catch(error => {
        console.log('Error: ', error);
      });
  }

  _render() {
    const block = document.querySelector(this.container);

    for (let product of this.goods) {
      const productObject = new ProductItem(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }
}


class Cart {
  constructor(container = '.cart-drop'){
      this.container = container;
      this.data = {};
      this.allProducts = [];
      this._getProducts()
          .then(() => this._render());
  }
  _getProducts(){
      return fetch(`${API}/getBasket.json`)
          .then(result => result.json())
          .then(data => {
              this.data = {...data};
          })
          .catch(error => console.log('error'));
  }
  _render(){
      const block = document.querySelector(this.container);
      for (let item of this.data.contents){
          const cartProduct = new CartItem(item);
          this.allProducts.push(cartProduct);
          block.insertAdjacentHTML('beforeend', cartProduct.render());
      }
  }
  _isExist(id) {
      for (let i = 0; i < this.allProducts.length; i++) {
          if (this.allProducts[i].id_product === id) {
              return true
          }
      }
      return false;
  }
  _findIdx(id) {
      for (let i = 0; i < this.allProducts.length; i++) {
          if (this.allProducts[i].id_product === id) {
              return i;
          }
      }
  }

  handleBuyClick(event) {
      if (event.target.tagName === "BUTTON") {
          if (this._isExist(+event.target.dataset.id)) {
              let idx = this._findIdx(+event.target.dataset.id);
              this.allProducts[idx].quantity++;
          } else {
              this._render();
          }
      }
  }


  _handleDeleteClick(event) {
      if (event.target.tagName === "BUTTON") {
          let idx = this._findIdx(+event.target.dataset.id);

          if (this._isExist(+event.target.dataset.id) && this.allProducts[idx].quantity > 1) {
              this.allProducts[idx].quantity--;
          } else {
              this.allProducts.splice(event.target.parentNode, 1);
          }
      }
  }
  delete() {
      document.querySelector(this.container).addEventListener('click', _handleDeleteClick);
  }

}


class CartItem {
  constructor(product, img = `https://placehold.it/100x50`){
      this.id_product = product.id_product;
      this.product_name = product.product_name;
      this.price = product.price;
      this.quantity = product.quantity;
      this.img = img;
  }
  render(){
      return `<div class="cart-item">
               <img src="${this.img}" alt="${this.product_name}">
               <div class="cart-desc">
                   <h3>${this.product_name}</h3>
                   <p>Quantity: ${this.quantity}</p>
               </div>
               <div class="cart-desc2">
                   <p>${this.price}</p>
                   <button data-id="${this.id_product}" class="remove-btn">x</button>
               </div>
           </div>`
  }
}



const list = new ProductList();

const cart = new Cart();

