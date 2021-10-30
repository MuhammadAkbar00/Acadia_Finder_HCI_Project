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
    GET_NOTES(state, notes) {
      state.notes = notes
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
    
   // Get all books
   getNotes({ commit }) {
    return axios.get("http://localhost:3000/notes")
      .then(response => {
        commit("GET_NOTES", response.data)
      }).catch(err => {
        console.log(err)
      })
  },
    
  },
  modules: {}

}
);






