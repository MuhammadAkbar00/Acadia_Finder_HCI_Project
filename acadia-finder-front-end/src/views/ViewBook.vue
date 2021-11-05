<template>
  <v-container class="mt-15 pt-15">
    <v-row no-gutters>
      <v-col>
        <v-card outlined>
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
          <v-card-actions>
            <v-btn
              outlined
              rounded
              text
              @click="addToHoldings(book, user_id)"
              class="text-capitalize font-weight-bold"
            >
              Add to holdings
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="4">
        <v-text-field
          v-model="text"
          label="Type something ..."
          class="mt-5"
          @keyup="textval(text)"
        ></v-text-field>
        <div class="red--text mb-5" v-if="textErrors">
          {{ textErrors }}
        </div>
        <v-btn dark color="green" rounded @click="addComment()">
          Add comment
        </v-btn>
      </v-col>
      <v-col cols="12" sm="4"> </v-col>
    </v-row>
    <v-row>
      <v-col
        class="my-2"
        cols="12"
        v-for="(comment, i) in this.comments"
        :key="i"
      >
        <div>
          <v-avatar size="30" contain>
            <img
              v-if="comment.user.profilePicture"
              :src="getLink(comment.user.profilePicture)"
            />
            <v-icon v-else size="150"> mdi-account </v-icon>
          </v-avatar>
          {{ comment.user.userName }}
        </div>
        <p class="grey--text mb-2">{{ formatDate(comment.date) }}</p>
        <div class="text--primary">
          {{ comment.text }}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import axios from "axios";
import Book from "../components/Book.vue";
export default {
  data() {
    return {
      book: {},
      user: {},
      comments: {},
      text: "",
      textErrors: "",
      commentRules: [(v) => !!v || "Username is required"],
      user_id: "",
    };
  },
  components: {
    Book,
  },
  computed: {
    ...mapState(["current_user"]),
  },
  methods: {
    // Get book
    async getBooks() {
      return axios
        .get(`http://localhost:3000/books/${this.$route.params.id}`)
        .then(async (response) => {
          this.book = response.data;
          await this.getComments();
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    textval(val) {
      if (val !== "") {
        this.textErrors = "";
      }
    },
    getLink(link) {
      let currLink = "http://localhost:3000/" + link;
      let path2 = currLink.replace(/\\/g, "/");
      return path2;
    },
    // get current user
    ...mapActions(["getUser", "hold"]),
    // Get the user with token given
    async getUser_() {
      await this.getUser();
      this.user = this.current_user;
      this.user_id = this.current_user._id;
    },
    // Get Comments
    async getComments() {
      await axios
        .get(`http://localhost:3000/comments/for/${this.book._id}`)
        .then(async (res) => {
          let commentArr = [];
          const promiseMap = res.data.map(async (comment) => {
            await axios
              .get(`http://localhost:3000/users/${comment.user}`)
              .then((res) => {
                commentArr.push({
                  user: res.data,
                  text: comment.text,
                  date: comment.date,
                  book: comment.book,
                });
                console.log(comment.text);
              })
              .catch((err) => console.log(err));
          });
          Promise.all(promiseMap).then(async () => {
            commentArr.sort(function (a, b) {
              return b.date.localeCompare(a.date);
            });
            this.comments = commentArr;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // Add Comment
    addComment() {
      if (this.text === "") {
        // return alert("Text Cannot Be Empty");
        this.textErrors = "Comment Cannot Be Empty";
        return;
      }
      return axios
        .post(`http://localhost:3000/books/${this.$route.params.id}/comment`, {
          user: this.user,
          text: this.text,
          date: new Date(),
          book: this.book,
        })
        .then((res) => {
          this.text = "";
          console.log(res);
          this.getBooks();
        })
        .catch((err) => console.log(err));
    },
    formatDate(date) {
      let d = new Date(date);
      let hours = d.getHours();
      let minutes = d.getMinutes();
      let ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      let strTime = hours + ":" + minutes + " " + ampm;
      return (
        d.getMonth() +
        1 +
        "/" +
        d.getDate() +
        "/" +
        d.getFullYear() +
        " " +
        strTime
      );
    },
    addToHoldings(book, user_id) {
      const payload = { book, user_id };
      this.hold(payload);
    },
  },
  created() {
    this.getBooks();
    this.getUser_();
  },
};
</script>
