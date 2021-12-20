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
            this.list[idx].add()
        } else {
            this.list.push(new GoodStack(good))
        }
  
    }
  
    remove(id) {
        const idx = this.list.findIndex((stack) => stack.getGoodId() == id)
  
        if(idx >= 0) {
            this.list[idx].remove()
  
            if(this.list[idx].getCount() <= 0) {
                this.list.splice(idx, 1)
            }
        } 
  
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
  
    fetchGoods() {
        this.list = [
            new Good({id: 1, title: 'Футболка', price: 140}),
            new Good({id: 2, title: 'Брюки', price: 320}),
            new Good({id: 3, title: 'Галстук', price: 24})
        ]
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
  
showcase.fetchGoods();

showcase.render();
  
showcase.addToCart(1)
showcase.addToCart(1)
showcase.addToCart(1)
showcase.addToCart(3)
cart.render();  
cart.remove(1)
  
  
console.log(showcase, cart)
