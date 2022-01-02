const URL_API = 'http://localhost:3000/api/v1/';

new Vue({
    el: '#app',
    data: {
        showcase: [],
        cart: [],
        isCartVisible: false
    },
    methods: {
        onCartView() {
            this.isCartVisible = !this.isCartVisible;
        },
        onAddCart(item) {
            fetch(`${URL_API}cart/`, {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(item)
            })
            .then((res) => {
                if (res.status === 201) {
                    this.cart.push(item);
                }
            })
        },
        onDeleteFromCart(item) {
            const idx = this.cart.findIndex((cart) => cart.id == item.id);
            fetch(`${URL_API}cart/`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(item)
            })
            .then(() => {
                this.cart.splice(idx, 1);
            })
        }
    },
    mounted() {
        fetch(`${URL_API}showcase/`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            this.showcase = data;
        })
        fetch(`${URL_API}cart/`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            this.cart = data;
        })
    }
})
