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
    holdCount: {
      "count": 0,
      "bookId": ""
    },
    ownerHoldsUsers: [],
    ownerBooks: [],
    contactMessages: []
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
    },
    GET_MESSAGES(state, contact) {
      state.contactMessages = contact
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
    // Get all ContactUs Messages
    getContactUsMessages({ commit }) {
      return axios.get("http://localhost:3000/contact")
        .then(response => {
          commit("GET_MESSAGES", response.data)
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

    getHoldings({ }, userID) {
      return axios
        .get("http://localhost:3000/holdings")
        .then((response) => {
          response.data.forEach((holding) => {
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

    getHoldsAndUsers({ }, userID) {
      this.state.ownerBooks.splice(0);
      this.state.books.forEach((book) => {
        this.state.holdCount.count = 0;
        this.state.holdCount.bookId = ""
        this.state.ownerHoldsUsers.splice(0);
        if (book.userId === userID) {
          console.log(book)

          this.state.ownerBooks.push(book);
          axios.get("http://localhost:3000/holdings").then((response) => {
            response.data.forEach((holding) => {
              if (holding.bookId === book._id) {
                this.state.holdCount.count++
                this.state.holdCount.bookId = book._id
                axios.get("http://localhost:3000/users").then((result) => {
                  result.data.forEach((user) => {
                    if (user._id === holding.userId) {
                      this.state.ownerHoldsUsers.push(user)
                    }
                  })
                })
              }
            })
          })
        }
      })
    },

    removeHold({ }, bookId) {
      axios.get("http://localhost:3000/holdings").then((result) => {
        result.data.forEach(holding => {
          if (holding.bookId === bookId) {
            const url = "http://localhost:3000/holdings/" + holding._id
            axios.delete(url).then((res) => {
              console.log(res)
              window.location.reload()
            }).catch((err) => {
              console.log(err)
            })
          }
        })
      })
    },
    markSold({ }, bookId) {
      const url = "http://localhost:3000/books/" + bookId
      return axios.get(url).then(result => {
        console.log(result.data.availability)
        axios.patch(url, {
          availability: false,
          author: result.data.author,
          bookImage: result.data.bookImage,
          buyPrice: result.data.buyPrice,
          courseId: result.data.courseId,
          edition: result.data.edition,
          forRent: result.data.forRent,
          forSale: result.data.forSale,
          name: result.data.name,
          rentPrice: result.data.rentPrice,
          userId: result.data.userId
        }).then(() => {
          window.location.reload()
        })
      })

    },

    // Delete book by id - admin
    deleteItem({}, obj) {
      const url = "http://localhost:3000/" + obj.collection_name +"/" + obj.itemId
      console.log(url)
      axios.delete(url).then((res) => {
        console.log(res)
        window.location.reload()
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  modules: {}

}
);

