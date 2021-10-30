<template>
  <v-container class="mt-10">
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
      <v-col cols="12" lg="6" md="4">
        <v-btn to="/addbooks" class="float-right" rounded> Add a book </v-btn>
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
        <v-card>
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
    };
  },
  components: {
    Book,
  },
  computed: {
    ...mapState(["books"]),
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
    ...mapActions(["getBooks"]),
    async loadBooks() {
      await this.getBooks();
      this.booksArray = this.books;
    },
  },
  created() {
    this.loadBooks();
  },
};
</script>