<template>
    <div class="modal">
        <button v-on:click="onClick" class="cart-button" id="close-btn">Закрыть</button>
        <div class="cart-list">
            <card v-for="item of list" v-bind:key="item.id" v-on:good-action="removeFromCart(item)" :good="item" :actionName="'Удалить'"></card>
        </div>
    </div>
</template>

<script>
import card from '../components/Card.vue'

export default {
    name: 'cart',
    components: {
        card
    },
    computed: {
        list() {
            return this.$store.getters.getCart
        }
    },
    methods: {
        onClick() {
            this.$emit('cart-close');
        },
        removeFromCart(item) {
            this.$store.dispatch('deleteFromCart', item);
        }
    }
}
</script>