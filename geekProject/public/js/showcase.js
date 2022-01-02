Vue.component('showcase', {
    template: `
        <div class="goods-list">
            <card v-for="item of list" v-on:good-action="addToCart(item)" :good="item" :actionName="'Купить'"></card>
        </div>
    `,
    methods: {
        addToCart(item) {
            this.$emit('add-cart', item);
        }
    },
    props: ['list']
})