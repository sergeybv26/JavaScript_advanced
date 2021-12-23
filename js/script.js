const URL_API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

function send(onError, onSuccess, url, method = 'GET', data = '', headers = {}, timeout = 60000) {
 
    let xhr;
  
    if (window.XMLHttpRequest) {
      // Chrome, Mozilla, Opera, Safari
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { 
      // Internet Explorer
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
  
    for([key, value] of Object.entries(headers)) {
        xhr.setRequestHeader(key, value)
    }
  
    xhr.timeout = timeout; 
  
    xhr.ontimeout = onError;
  
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if(xhr.status < 400) {
                onSuccess(xhr.responseText)
            } else if (xhr.status >= 400) {
                onError(xhr.status)
            }
        }
    }
  
    xhr.open(method, url, true);
  
    xhr.send(data);
}


function getCounter() {
    let last = 0;
  
    return () => ++last;
}
  
const stackIDGenrator = getCounter()
  
  
class Good {
    constructor({id, title, price}) {
        this.id = id;
        this.title = title;
        this.price = price;
    }
  
    getId() {
        return this.id;
    }
  
    getPrice() {
        return this.price;
    }
  
    getTitle() {
        return this.title;
    }

    render() {
        return `<div class="goods-item"><h3 class='goods-item_title'>${this.title}</h3><p class='goods-item_price'>${this.price} руб.</p></div>`;
    }
}
  
class GoodStack {
    constructor(good) {
        this.id = stackIDGenrator();
        this.good = good;
        this.count = 1;
    }
  
    getGoodId() {
        return this.good.id
    }
  
    getGood(){
        return this.good;
    }
  
    getCount() {
        return this.count;
    }
  
    add() {
        this.count++;
        return this.count;
    }
  
    remove() {
        this.count--;
        return this.count;
    }

    render() {
        return `<div class="goods-item"><h3 class='goods-item_title'>${this.getGood().title}</h3>
        <p class='goods-item_price'>Цена: ${this.getGood().price} руб.</p>
        <p class='goods-item_price'>Количество: ${this.count} шт.</p></div>`;
    }
}
  
class Cart {
    constructor(){
        this.list = []
    }
  
    add(good) {
        const idx = this.list.findIndex((stack) => stack.getGoodId() == good.id)
  
        if(idx >= 0) {
            this.list[idx].add();
        } else {
            this.list.push(new GoodStack(good));
        }
        this.render();
  
    }
  
    remove(id) {
        const idx = this.list.findIndex((stack) => stack.getGoodId() == id)
  
        if(idx >= 0) {
            this.list[idx].remove()
  
            if(this.list[idx].getCount() <= 0) {
                this.list.splice(idx, 1)
            }
        } 
        this.render();
    }

    render() {
        let listHTML = '';
        this.list.forEach(good => {listHTML += good.render()});
        document.querySelector('.modal-body').innerHTML = listHTML;
    }
}
  
class Showcase {
    constructor(cart){
        this.list = [];
        this.cart = cart;
    }

    _onSuccess(response) {
        const data = JSON.parse(response)
        data.forEach(product => {
            this.list.push(
                new Good({id: product.id_product, title:product.product_name, price:product.price})
            )
        });
    }

    _onError(err) {
        console.log(err);
    }
  
    fetchGoods() {
        let pr = new Promise((resolve, reject) => {
            send(reject, resolve, `${URL_API}catalogData.json`)
        })
        .then((response) => {
            this._onSuccess(response)
            return response
        })
        .then(() => {
            this.render();
        })
        return pr
        
    }
  
    addToCart(id) {
        const idx = this.list.findIndex((good) => id == good.id)
  
        if(idx >= 0) {
            this.cart.add(this.list[idx])
        }
    }

    render() {
        let listHTML = '';
        this.list.forEach(good => {listHTML += good.render()});
        document.querySelector('.goods-list').innerHTML = listHTML;
    }
}



const cart = new Cart()
const showcase = new Showcase(cart)
  
let prom = showcase.fetchGoods();

prom.then(() => {

    showcase.addToCart(123)
    showcase.addToCart(123)
    showcase.addToCart(123)
    showcase.addToCart(456)
    cart.remove(123);
})
    
console.log(showcase, cart)
