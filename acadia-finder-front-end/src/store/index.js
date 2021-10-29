import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    books: [],
    notes: [],
    users: [],
    holdings: [],
    purchases: [],
    sales: [],
    rentals: []
  },
  mutations: {
    GET_BOOKS(state, books) {
      state.books = books
    },
  },
  actions: {

    // Get all books
    getBooks({ commit }) {
      return axios.get("http://localhost:3000/books")
        .then(response => {
          commit("GET_BOOKS", response.data)
        }).catch(err => {
          console.log(err)
        })
    },
  },
  modules: {}
});
