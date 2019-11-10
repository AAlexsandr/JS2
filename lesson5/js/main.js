const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    products: [],
    imgCatalog: 'https://placehold.it/200x150',
    cart: [],
    filtered: [],
    search: '',
    basket: false,
    imgCart: 'https://placehold.it/100x50',
    sum: 0,
    sumPrice: 0
  },
  methods: {
    getJson(url){
      return fetch(url)
        .then(result => result.json())
        .catch(error => console.log(error));
    },
    addProduct(product){
      // console.log(product);
      // console.log(product.id_product);
      this.getJson(`${API}/addToBasket.json`)
        .then(data => {
          if(data.result === 1){
            let find = this.cart.find(el => el.id_product === product.id_product);
            if(find){
              find.quantity++
            } else {
              let prod = Object.assign({quantity: 1}, product);
              this.cart.push(prod);
            }
          } else {
            console.log('Error!')
          }
        })
        this.sum++;
        this.sumPrice += product.price;
    },
    removeProduct(product){
      this.getJson(`${API}/deleteFromBasket.json`)
      .then(data => {
        if(data.result === 1){
          let find = this.cart.find(el => el.id_product === product.id_product);
          if(find.quantity > 1){ // если товара > 1, то уменьшаем количество на 1
            find.quantity--;
            this._updateCart(find);
          } else { // удаляем
            this.cart.splice(this.cart.indexOf(find), 1);
          }
        } else {
          console.log('Error!');
        }
      })
      this.sum--;
      this.sumPrice -= product.price;
    },
    filter(){
      const regexp = new RegExp(this.search, 'i');
      this.filtered = this.products.filter(el => regexp.test(el.product_name));
      //this.products.forEach(el => {
        //const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
        //if(!this.filtered.includes(el)){
         // block.classList.add('invisible');
        //} else {
         // block.classList.remove('invisible');
       // }
      //})
    }
  },
  mounted(){
    this.getJson(`${API + this.cartUrl}`)
      .then(data => {
        for(let el of data){
          this.cart.push(el);
        }
      });

    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for(let el of data){
          this.products.push(el);
          this.filtered.push(el);
        }
      });
  }
});
