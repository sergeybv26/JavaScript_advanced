import { createStore } from 'vuex'

const URL_API = '/api/v1/';

export default createStore({
  state: {
    showcase: [],
    cart: [],
    searchString: '',
  },
  getters: {
    getCart: (state) => [...state.cart],
    getShowcase: (state) => state.showcase.filter((product) => new RegExp(state.searchString, 'i').test(product.title)),
    getSearchString: (state) => state.searchString
  },
  mutations: {
    setShowcase: (state, payload) => state.showcase = payload,
    addToCart: (state, payload) => state.cart.push(payload),
    removeFromCart: (state, id) => {
      state.cart = state.cart.filter((product) => product.id !== id)
    },
    setSearchString: (state, payload) => state.searchString = payload
  },
  actions: {
    loadShowcase({commit}) {
      fetch(`${URL_API}showcase/`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            commit('setShowcase', data);
        })
    },
    loadCart({commit}) {
      fetch(`${URL_API}cart/`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            data.forEach((product) => commit('addToCart', product));
        })
    },
    addToCart({commit}, item) {
      fetch(`${URL_API}cart/`, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(item)
      })
      .then((res) => {
        if (res.status === 201) {
          commit('addToCart', item);
        }
      })
    },
    deleteFromCart({commit}, item) {
      fetch(`${URL_API}cart/`, {
        method: 'DELETE',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(item)
      })
      .then(() => {
        commit('removeFromCart', item.id)
      })
    }
  },
  modules: {
  }
})
