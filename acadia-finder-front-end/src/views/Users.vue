<template>
  <div class="team">
    <h1 class="subheading grey--text">Users</h1>
    <input type="text" v-model="search" placeholder="search program" />

    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="user in filteredUsers" :key="user.name">
          <UserCard
            :firstName="user.firstName"
            :lastName="user.lastName"
            :phoneNumber="user.phoneNumber"
            :email="user.email"
            :major="user.major"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import UserCard from "../components/UserCard.vue";
export default {
  data() {
    return {
      usersArray: [],
      search: '',
    };
  },
  components: {
    UserCard,
  },
  computed: {
    ...mapState(["users"]),
    filteredUsers: function(){
      return this.usersArray.filter((user) => {
        let searching = this.search.toLowerCase()
        return user.major.toLowerCase().match(searching)
      })
    }
  },
  methods: {
    ...mapActions(["getUsers"]),
    async loadUsers() {
      await this.getUsers();
      this.usersArray = this.users;
    },
  },
  created() {
    this.loadUsers();
  },
};
</script>
