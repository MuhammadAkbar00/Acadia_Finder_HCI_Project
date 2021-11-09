<template>
  <v-container class="mt-15 pt-15">
    <h2 class="mb-10">All Books Available</h2>
    <div v-if="booksArray.length === 0">
      <div>
        <span class="red--text text--darken-3 font-weight-bold"> No books available. </span>
        <span v-if="isLoggedIn">
          Click
          <v-btn small color="rgb(6 67 121)" dark rounded to="/addbooks"
            >here</v-btn
          >
          to add books
        </span>
        <span v-else>
          <v-btn small color="rgb(6 67 121)" dark rounded to="/login"
            >Login</v-btn
          >
          to add books
        </span>
      </div>
    </div>
    <div v-else>
      <v-row class="my-10">
        <v-col cols="12" lg="6" md="8">
          <div>
            <v-text-field
              label="Search for a book by Name or Author"
              hide-details="auto"
              v-model="search"
            ></v-text-field>
          </div>
        </v-col>
        <v-col cols="12" lg="6" md="4" v-if="isLoggedIn">
          <v-btn
            to="/addbooks"
            class="float-right white--text"
            color="rgb(6 67 121)"
            rounded
          >
            Add a book
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-if="filteredBooks.length > 0">
        <span class="mt-1 mx-3"> Sort By Name:</span>
        <v-btn
          small
          color="grey"
          rounded
          v-bind:class="checkSortAsc()"
          @click="setSort('Ascending')"
          >Ascending
        </v-btn>
        <v-divider vertical class="mx-2"> </v-divider>
        <v-btn
          small
          color="grey"
          rounded
          v-bind:class="checkSortDesc()"
          @click="setSort('Descending')"
          >Descending</v-btn
        >
      </v-row>
      <v-row v-else class="red--text text--darken-3 my-10 pa-5">
        <h3>No matches</h3>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          lg="6"
          md="12"
          sm="12"
          v-for="(book, i) in filteredBooks"
          :key="i"
        >
          <v-card height="100%" class="d-flex flex-column pa-3" outlined>
            <Book
              :name="book.name"
              :bookId="book._id"
              :author="book.author"
              :buyPrice="book.buyPrice"
              :edition="book.edition"
              :bookImage="book.bookImage"
              :courseId="book.courseId"
              :forRent="book.forRent"
              :forSale="book.forSale"
              :rentPrice="book.rentPrice"
              :userId="book.userId"
            />
            <v-spacer></v-spacer>
            <v-card-actions>
              <div v-if="isLoggedIn && current_user._id != book.userId">
                <v-btn
                  @click="addToHoldings(book, user_id)"
                  class="font-weight-bold white--text"
                  color="rgb(6 67 121)"
                  small
                  rounded
                  :disabled="!book.availability"
                >
                  Place a hold
                </v-btn>
              </div>
              <div
                v-else-if="current_user._id == book.userId"
                class="red--text text--darken-3"
              >
                <v-btn disabled rounded text> Your book </v-btn>
              </div>
              <div v-if="!isLoggedIn" class="mt-5 mb-3">
                <v-btn
                  rounded
                  small
                  color="rgb(6 67 121)"
                  class="white--text"
                  to="/login"
                  >Login</v-btn
                >
                <span class="font-weight-bold">
                  to ask the owner to hold it for you
                </span>
              </div>
              <v-spacer></v-spacer>
              <div>
                <v-btn
                  class="font-weight-bold white--text"
                  @click="bookDetails(book._id)"
                  rounded
                  color="rgb(6 67 121)"
                  small
                >
                  See book details
                </v-btn>
              </div>
            </v-card-actions>
            <div v-if="!book.availability" class="red--text text--darken-3 mx-2">
              Item not available anymore
            </div>
            <div class="pa-4 red--text text--darken-3" v-if="errors && errors.id == book._id">
              {{ errors.error }}
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Book from "../components/Book.vue";
export default {
  data() {
    return {
      booksArray: [],
      search: "",
      user_id: "",
      sorting: "Ascending",
    };
  },
  components: {
    Book,
  },
  computed: {
    ...mapState(["books", "current_user", "errors", "isLoggedIn"]),
    filteredBooks: function () {
      const filteredArr = this.booksArray.filter((book) => {
        return (
          book.name.toLowerCase().match(this.search.toLowerCase()) ||
          book.author.toLowerCase().match(this.search.toLowerCase())
        );
      });
      if (this.sorting && this.sorting === "Ascending") {
        filteredArr.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
      }
      if (this.sorting && this.sorting === "Descending") {
        filteredArr.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        filteredArr.reverse();
      }
      return filteredArr;
    },
  },
  methods: {
    ...mapActions(["getBooks", "getUser", "hold"]),
    async getUser_() {
      if (this.isLoggedIn) {
        await this.getUser();
        this.user_id = this.current_user._id;
      }
    },
    async loadBooks() {
      await this.getBooks();
      this.booksArray = this.books;
    },
    addToHoldings(book, user_id) {
      const payload = { book, user_id };
      this.hold(payload);
    },
    bookDetails(id) {
      return this.$router.push(`books/${id}`);
    },
    setSort(s) {
      this.sorting = s;
    },
    checkSortAsc() {
      if (this.sorting === "Ascending") {
        return "add-hover active";
      }
      return "add-hover";
    },
    checkSortDesc() {
      if (this.sorting === "Descending") {
        return "add-hover active";
      }
      return "add-hover";
    },
  },
  created() {
    this.loadBooks();
    this.getUser_();
  },
};
</script>


<style scoped>
.color-text {
  color: blue;
}
.active {
  font-weight: bold;
  background-color: #064379 !important;
  color: white;
}
</style>