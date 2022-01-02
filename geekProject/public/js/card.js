Vue.component('card', {
    template: `
    <div class="goods-item">
        <h3 class='goods-item_title'>{{ good.title }}</h3>
        <p class='goods-item_price'>{{ good.price }} руб.</p>
        <button class="cart-button" :data-id="good.id" v-on:click="onClick">{{ actionName }}</button>
    </div>
    `,
    methods: {
        onClick() {
            this.$emit('good-action');
        }
    },
    props: ['good', 'actionName']
})