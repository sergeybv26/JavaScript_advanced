Vue.component('cart', {
    template: `
        <div class="modal">
            <button v-on:click="onClick" class="cart-button" id="close-btn">Закрыть</button>
            <div class="cart-list">
                <card v-for="item of list" v-on:good-action="removeFromCart(item)" :good="item" :actionName="'Удалить'"></card>
            </div>
        </div>
    `,
    props: ['list'],
    methods: {
        onClick() {
            this.$emit('cart-close');
        },
        removeFromCart(item) {
            this.$emit('remove-cart', item);
        }
    }
})