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
    holdings: [],
    purchases: [],
    sales: [],
    rentals: [],
    current_user: {}
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
    
   // Get all books
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
    purchase({},book) {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      today = mm + "/" + dd + "/" + yyyy;
      axios
        .post("http://localhost:3000/purchases", {
          sellerId: book.userId,
          purchaserId: book.buyPrice,
          bookId: book._id,
          datePurchased: today,
          listedPrice: book.buyPrice,
        })
        .then(
          (res) => {
            console.log(res);
            axios
              .delete("http://localhost:3000/books/" + book._id)
              .then((err) => {
                console.log(err.response);
              });
            router.push("/books");
            router.go();
          },
          (err) => {
            console.log(err.response);
            this.errors = err.response.data.error;
          }
        );
    },
    /* eslint-disable no-empty-pattern */
    rent({},book) {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      today = mm + "/" + dd + "/" + yyyy;

      axios
        .post("http://localhost:3000/rentals", {
          renterId: book.userId,
          renteeId: book.userId,
          bookId: book._id,
          rentedDate: today,
          returnDate: today,
        })
        .then(
          (res) => {
            console.log(res);
            axios
              .delete("http://localhost:3000/books/" + book._id)
              .then((err) => {
                console.log(err.response);
              });
            router.push("/books");
            router.go();
          },
          (err) => {
            console.log(err.response);
            this.errors = err.response.data.error;
          }
        );
    },
  },
  modules: {}

}
);






