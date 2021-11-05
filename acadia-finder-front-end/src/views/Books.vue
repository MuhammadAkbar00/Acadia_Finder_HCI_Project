<template>
  <v-container class="mt-10 pt-15">
    <h2 class="mb-10">All Books Available</h2>
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
        <v-btn to="/addbooks" class="float-right" rounded outlined>
          Add a book
        </v-btn>
      </v-col>
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
        <v-card
          @click="redirect(book._id)"
          height="100%"
          class="d-flex flex-column"
          outlined
        >
          <Book
            :name="book.name"
            :author="book.author"
            :buyPrice="book.buyPrice"
            :edition="book.edition"
            :bookImage="book.bookImage"
            :courseId="book.courseId"
            :forRent="book.forRent"
            :forSale="book.forSale"
            :rentPrice="book.rentPrice"
          />
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-btn
              v-if="isLoggedIn && current_user._id != book.userId"
              outlined
              rounded
              text
              :disabled="!book.availability"
              @click="addToHoldings(book, user_id)"
              class="text-capitalize font-weight-bold"
            >
              See book details
            </v-btn>
            <div v-else-if="current_user._id == book.userId" class="red--text">
              Can't buy/rent. You are the owner.
            </div>
            <div v-else>
              <v-btn
                text
                rounded
                outlined
                color="primary"
                class="text-capitalize"
                to="/login"
                >Login</v-btn
              >
              <span class="font-weight-bold">
                to ask the seller/renter to hold it for you
              </span>
            </div>
            <span v-if="!book.availability" class="red--text mx-2">
              Item not available anymore
            </span>
          </v-card-actions>
          <div class="pa-4 red--text" v-if="errors && errors.id == book._id">
            {{ errors.error }}
          </div>
        </v-card>
      </v-col>
    </v-row>
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
    };
  },
  components: {
    Book,
  },
  computed: {
    ...mapState(["books", "current_user", "errors", "isLoggedIn"]),
    filteredBooks: function () {
      return this.booksArray.filter((book) => {
        return (
          book.name.toLowerCase().match(this.search.toLowerCase()) ||
          book.author.toLowerCase().match(this.search.toLowerCase())
        );
      });
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
    redirect(id) {
      return this.$router.push(`book/${id}`);
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
</style>