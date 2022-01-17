<template>
  <div class="home">
    <header class="top">
      <button v-on:click="onCartView" type="button" class="cart-button" id="cart-button">
        Корзина
      </button>
      <sort></sort>
    </header>
    <main>
      <showcase></showcase>
    </main>

    <cart v-if="isCartVisible" v-on:cart-close="onCartView"></cart>
  </div>
</template>

<script>
const URL_API = '/api/v1/';

import cart from '../components/Cart.vue'
import showcase from '../components/Showcase.vue'
import sort from '../components/Filter.vue'

export default {
  name: 'Home',
  components: {
    cart,
    showcase,
    sort
  },
  data() {
    return {
    isCartVisible: false
    }
  },
  methods: {
    onCartView() {
      this.isCartVisible = !this.isCartVisible;
    }
  }
}
</script>
