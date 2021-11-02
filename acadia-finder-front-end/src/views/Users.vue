<template>
  <v-container class="mt-15 pt-15">
    <h1 class="my-5">Users</h1>
    <v-row class="">
      <v-col cols="12" lg="4" md="4" sm="6">
        <v-text-field
          v-model="search"
          placeholder="Search by Program"
          dense
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        sm="6"
        lg="3"
        md="4"
        v-for="user in filteredUsers"
        :key="user.name"
      >
        <UserCard
          :firstName="user.firstName"
          :lastName="user.lastName"
          :phoneNumber="user.phoneNumber"
          :email="user.email"
          :major="user.major"
          :_id="user._id"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import UserCard from "../components/UserCard.vue";
export default {
  data() {
    return {
      usersArray: [],
      search: "",
    };
  },
  components: {
    UserCard,
  },
  computed: {
    ...mapState(["users"]),
    filteredUsers: function () {
      return this.usersArray.filter((user) => {
        let searching = this.search.toLowerCase();
        return user.major.toLowerCase().match(searching) ||
        user.firstName.toLowerCase().match(searching) ||
        user.lastName.toLowerCase().match(searching);
      });
    },
  },
  methods: {
    ...mapActions(["getUsers"]),
    async loadUsers_() {
      await this.getUsers();
      this.usersArray = this.users;
    },
  },
  created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
    this.loadUsers_();
  },
};
</script>
