<template>
  <v-container class="mt-10">
    <h2 class="mb-10">
      All Books Available
    </h2>
    <v-row>
      <v-col cols="6" v-for="(book, i) in booksArray" :key="i">
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
    };
  },
  components: {
    Book,
  },
  computed: {
    ...mapState(["books"]),
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