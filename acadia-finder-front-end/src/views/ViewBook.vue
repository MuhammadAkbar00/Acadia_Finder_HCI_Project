<template>
  <v-container class="grey lighten-5 mt-15 pt-15">
    <v-row no-gutters>
      <v-col cols="12" sm="4">
        <v-card class="pa-2" outlined tile> One of three columns </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">{{ book.courseId }}</div>
              <v-list-item-title class="text-h5 mb-1">
                {{ book.name }}
              </v-list-item-title>
              <v-list-item-subtitle
                >Author: {{ book.author }}
              </v-list-item-subtitle>
              <v-list-item-subtitle
                >Selling Price: {{ book.buyPrice }}
              </v-list-item-subtitle>
              <v-list-item-subtitle
                >Rent Price: {{ book.rentPrice }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-col cols="12" lg="4" md="4" sm="12">
              <v-img width="200" :src="getLink(book.bookImage)"></v-img>
            </v-col>
          </v-list-item>

          <v-card-actions>
            <v-btn outlined rounded text v-if="book.forSale"> Buy </v-btn>
            <v-btn outlined rounded text v-if="book.forRent"> Rent </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="pa-2" outlined tile> One of three columns </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" sm="4">
        <v-card class="pa-2" outlined tile> One of three columns </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field v-model="text" label="Outlined" outlined></v-text-field>
        <v-btn dark small color="pink" @click="addComment()"> Add </v-btn>
      </v-col>
      <v-col cols="12" sm="4"> </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" sm="4">
        <v-col
          cols="12"
          lg="6"
          md="12"
          sm="12"
          v-for="(comment, i) in this.comments"
          :key="i"
        >
          <v-card class="mx-auto" max-width="344">
            <v-card-text>
              <div>
                {{ comment.user.firstName }} {{ comment.user.lastName }}
              </div>
              <p class="grey--text mb-2">{{ formatDate(comment.date) }}</p>
              <div class="text--primary">
                {{ comment.text }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      book: {},
      user: {},
      comments: {},
      text: "",
      commentRules: [(v) => !!v || "Username is required"],
    };
  },
  components: {},
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
    getLink(link) {
      let currLink = "http://localhost:3000/" + link;
      let path2 = currLink.replace(/\\/g, "/");
      return path2;
    },
    // get current user
    ...mapActions(["getUser"]),
    // Get the user with token given
    async getUser_() {
      await this.getUser();
      this.user = this.current_user;
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
        return alert("Text Cannot Be Empty");
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
  },
  created() {
    this.getBooks();
    this.getUser_();
  },
};
</script>
