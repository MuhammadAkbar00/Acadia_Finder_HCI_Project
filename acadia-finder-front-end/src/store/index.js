import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router.js"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    books: [],
    notes: [],
    users: [],
    purchases: [],
    sales: [],
    rentals: [],
    current_user: {},
    holdings: [],
    errors: {
      "error": "",
      "id": ""
    },
    isLoggedIn: false,
  },
  mutations: {
    GET_BOOKS(state, books) {
      state.books = books
    },
    GET_NOTES(state, notes) {
      state.notes = notes
    },
    GET_USERS(state, users) {
      state.users = users
    },
    SET_CURRENT_USER(state, user) {
      state.current_user = user
    }
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

    // Get all notes
    getNotes({ commit }) {
      return axios.get("http://localhost:3000/notes")
        .then(response => {
          commit("GET_NOTES", response.data)
        }).catch(err => {
          console.log(err)
        })
    },

    // Get all users
    getUsers({ commit }) {
      return axios.get("http://localhost:3000/users")
        .then(response => {
          commit("GET_USERS", response.data)
        }).catch(err => {
          console.log(err)
        })
    },

    // Gets user by token
    getUser({ commit }) {
      return axios
        .get("http://localhost:3000/users/user", {
          headers: { token: localStorage.getItem("token") },
        })
        .then((res) => {
          commit("SET_CURRENT_USER", res.data.user)
        });
    },


    /* eslint-disable no-empty-pattern */
    hold({ }, payload) {
      axios
        .post("http://localhost:3000/holdings", {
          bookId: payload.book._id,
          userId: payload.user_id,
          ownerId: payload.book.userId,
          forRent: payload.book.forRent,
          forPurchase: payload.book.forSale,
        })
        .then(
          (res) => {
            console.log(res);
            router.go();
          },
          (err) => {
            console.log(err.response.data);
            this.state.errors.error = err.response.data.message,
              this.state.errors.id = payload.book._id
          }
        );
    },

    getHoldings({ },userID) {
      return axios
        .get("http://localhost:3000/holdings")
        .then((response) => {
          response.data.forEach((holding) => {
            console.log(holding.userId,userID)
            this.state.holdings.splice(0);
            if (holding.bookId && holding.userId === userID) {
              const url = "http://localhost:3000/books";
              axios.get(url, { id: holding.bookId }).then((result) => {
                result.data.forEach((book) => {
                  if (book._id === holding.bookId) {
                    this.state.holdings.push(book);
                  }
                })
              });
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // delete book from holdings
    removeHold({ }, bookId) {
      return axios.get("http://localhost:3000/holdings", { id: bookId }).then(result => {
        result.data.forEach(holding => {
          if (holding.bookId == bookId) {
            axios.delete("http://localhost:3000/holdings/" + holding._id);
          }
        })
      })
    }
  },
  modules: {}

}
);






