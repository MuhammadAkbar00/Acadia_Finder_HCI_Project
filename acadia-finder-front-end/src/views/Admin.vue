<template>
  <v-container class="mt-15 pt-10">
    <h2 class="my-3">Messages</h2>
    <p>
      Hi <span class="font-weight-bold"> {{ name }} </span>
    </p>
    <v-row class="py-6">
      <v-col
        v-for="(contact, i) in contactMessages"
        :key="i"
        cols="12"
        lg="4"
        md="4"
      >
        <v-card
          class="pa-6 card-font d-flex flex-column"
          height="100%"
          outlined
        >
          <div class="pb-3 main-font">"{{ contact.message }}"</div>
          <div>- Sender: {{ contact.name }}</div>
          <div class="pb-4">- email: {{ contact.email }}</div>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-btn
            @click="deleteItem_(contact._id, 'contact')"
              block
              rounded
              small
              color="red darken-3"
              class="white--text mr-4"
          >
            Delete Message
          </v-btn>
        </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <h2 class="my-3">Books</h2>
    <v-row class="py-6">
      <v-col v-for="(book, i) in books" :key="i" cols="12" lg="4" md="4">
        <v-card
          class="pa-6 card-font d-flex flex-column"
          height="100%"
          outlined
        >
          <div class="pb-2 main-font">Book: {{ book.name }}</div>
          <div>Course Id: {{ book.courseId }}</div>
          <div>Author: {{ book.author }}</div>
          <div class="pb-4">Edition: {{ book.edition }}</div>
          <v-spacer></v-spacer>
        <v-card-actions>
          <v-btn
            @click="deleteItem_(book._id, 'books')"
              block
              rounded
              small
              color="red darken-3"
              class="white--text mr-4"
          >
            Delete Book
          </v-btn>
        </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <h2 class="my-3">Notes</h2>
    <v-row class="py-6">
      <v-col v-for="(note, i) in notes" :key="i" cols="12" lg="4" md="4">
        <v-card
          class="pa-6 card-font d-flex flex-column"
          height="100%"
          outlined
        >
          <div class="pb-2 main-font">Course Id: {{ note.courseId }}</div>
          <div>Semester Taken: {{ note.semester }}</div>
          <div class="py-4">Description: {{ note.description }}</div>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-btn
            @click="deleteItem_(note._id, 'notes')"
              block
              rounded
              small
              color="red darken-3"
              class="white--text mr-4"
          >
            Delete Note
          </v-btn>
        </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <h2 class="my-3">Users</h2>
    <v-row class="py-6">
      <v-col v-for="(user, i) in users" :key="i" cols="12" lg="4" md="4">
        <v-card
          class="pa-6 card-font d-flex flex-column"
          height="100%"
          outlined
        >
          <div class="pb-2 main-font">
            User: {{ user.firstName }} {{ user.lastName }}
          </div>
          <div>Major: {{ user.major }}</div>
          <div class="pb-4">email: {{ user.email }}</div>
          <v-btn
            @click="deleteItem_(user._id, 'users')"
              block
              rounded
              small
              color="red darken-3"
              class="white--text mr-4"
          >
            Delete User
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
    <v-btn rounded color="red" dark @click="logout()">Logout</v-btn>
  </v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      name: "",
    };
  },
  created() {
    if (localStorage.getItem("admin_token") === null) {
      this.$router.push("/admin_login");
    }
    this.name = localStorage.getItem("admin");
    this.getContactUsMessages_(),
      this.getBooks_(),
      this.getNotes_(),
      this.getUsers_();
  },
  methods: {
    ...mapActions([
      "getContactUsMessages",
      "getBooks",
      "getNotes",
      "getUsers",
      "deleteItem",
    ]),
    async getContactUsMessages_() {
      await this.getContactUsMessages();
    },
    async getBooks_() {
      await this.getBooks();
    },
    async getNotes_() {
      await this.getNotes();
    },
    async getUsers_() {
      await this.getUsers();
    },
    deleteItem_(itemId, collection_name) {
      // Function in the store that deletes the book
      const obj = {
        collection_name: collection_name,
        itemId: itemId,
      };
      this.deleteItem(obj);
    },
    logout() {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin");
      this.$router.go();
    },
  },
  computed: {
    ...mapState(["contactMessages", "books", "notes", "users"]),
  },
};
</script>
<style scoped>
.main-font {
  font: 12pt "Times New Roman";
  font-weight: bold;
}
.card-font {
  font: 11pt "Times New Roman";
}
</style>
