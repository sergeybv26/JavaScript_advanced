<template>
    <div class="goods-list">
        <card v-for="item of list" v-bind:key="item.id" v-on:good-action="addToCart(item)" :good="item" :actionName="'Купить'"></card>
    </div>
</template>

<script>
import card from '../components/Card.vue'
export default {
    name: 'showcase',
    components: {
        card
    },
    methods: {
        addToCart(item) {
            this.$store.dispatch('addToCart', item);
        }
    },
    computed: {
        list() {
            return this.$store.getters.getShowcase
        }
    }
}
</script>