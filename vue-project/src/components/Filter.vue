<template>
    <div>
        <input class="search-input" type="text" id="search-input" v-model="searchString" />
        <!-- <button class="cart-button" id="search-btn" v-on:click="onFind">Поиск</button> -->
    </div>
</template>

<script>
export default {
    name: 'sort',
    computed: {
        searchString: {
            get() {return this.$store.getters.getSearchString},
            set(value) {this.$store.commit('setSearchString', value)}
        }
    },
    methods: {

    }
}
</script>