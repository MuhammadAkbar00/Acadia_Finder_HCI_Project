<template>
  <v-container class="mt-15 pt-15">
    <h1 class="my-5">Friends List</h1>
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
          :profilePicture="user.profilePicture"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import axios from "axios";
import UserCard from "../components/UserCard.vue";
export default {
  data() {
    return {
      usersArray: [],
      user: "",
      search: "",
      friendship: "",
      friendsList: [],
    };
  },
  components: {
    UserCard,
  },
  computed: {
    ...mapState(["users", "current_user"]),
    filteredUsers: function () {
      return this.friendsList.filter((user) => {
        let searching = this.search.toLowerCase();
        return (
          user.major.toLowerCase().match(searching) ||
          user.firstName.toLowerCase().match(searching) ||
          user.lastName.toLowerCase().match(searching)
        );
      });
    },
  },
  methods: {
    ...mapActions(["getUser"]),
    async setUser_() {
      await this.getUser();
      this.user = this.current_user;
      this.getFriendship();
    },
    //Get Friendship
    getFriendship() {
      return axios
        .get(`http://localhost:3000/friendship/${this.user._id}`)
        .then((res) => {
          console.log(res.data);
          this.friendship = res.data;
          this.getFriendUsers();
        })
        .catch((err) => console.log(err));
    },
    // Get Users
    async getFriendUsers() {
      let friendsArr = [];
      const promiseMap = this.friendship.friends.map(async (userId) => {
        await axios
          .get(`http://localhost:3000/users/${userId}`)
          .then((res) => {
            friendsArr.push(res.data);
          })
          .catch((err) => console.log(err));
      });

      Promise.all(promiseMap).then(async () => {
        // friendsArr.sort(function (a, b) {
        //   return b.date.localeCompare(a.date);
        // });
        this.friendsList = friendsArr;
      });
    },
  },
  created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
    this.setUser_();
  },
};
</script>
