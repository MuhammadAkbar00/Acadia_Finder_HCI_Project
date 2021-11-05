<template>
  <v-container>
    <v-card
      class="text-center ma-3 bg d-flex flex-column"
      :style="{ backgroundColor: '#FFFFFF' }"
      height="100%"
    >
      <v-responsive class="pt-4">
        <v-avatar>
          <img :src="getLink(profilePicture)" alt="" />
        </v-avatar>
      </v-responsive>
      <v-card-text>
        <div class="subheading font-weight-bold text-capitalize">
          {{ firstName + " " + lastName }}
        </div>
        <div class="grey--text">
          <span class="font-weight-bold">Program: </span>{{ major }}
        </div>
        <div class="grey--text">
          <span class="font-weight-bold"> Email: </span>{{ email }}
        </div>
      </v-card-text>
      <v-spacer></v-spacer>
      <v-card-actions v-if="this.checkFriendshipStatus() === 'friends'">
        <v-btn color="#FFFFFF" rounded @click="unfriendFriendRequest()">
          <v-icon small class="mr-1">mdi-account-plus</v-icon>
          <span class="add-friend">Unfriend</span>
        </v-btn>
      </v-card-actions>
      <v-card-actions v-else-if="this.checkFriendshipStatus() === 'incoming'">
        <v-btn color="#FFFFFF" rounded @click="acceptFriendRequest()">
          <v-icon small class="mr-1">mdi-account-plus</v-icon>
          <span class="add-friend">Accept</span>
        </v-btn>
        <v-btn color="#FFFFFF" rounded @click="declineFriendRequest()">
          <v-icon small class="mr-1">mdi-account-minus</v-icon>
          <span class="add-friend">Decline</span>
        </v-btn>
      </v-card-actions>
      <v-card-actions v-else-if="this.checkFriendshipStatus() === 'outgoing'">
        <v-btn color="#FFFFFF" rounded @click="cancelFriendRequest()">
          <v-icon small class="mr-1">mdi-account-plus</v-icon>
          <span class="add-friend">Cancel</span>
        </v-btn>
      </v-card-actions>
      <v-card-actions v-else-if="this.checkFriendshipStatus() === 'owner'">
        <v-btn disabled rounded text>You</v-btn>
      </v-card-actions>
      <v-card-actions v-else>
        <v-btn color="#FFFFFF" rounded @click="sendFriendRequest()">
          <v-icon small class="mr-1">mdi-account-plus</v-icon>
          <span class="add-friend">Add</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      friendship: "",
      view: "",
      componentKey: 0,
    };
  },
  props: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
    },
    major: {
      type: String,
    },
    picture: {
      type: String,
    },
    _id: {
      type: String,
    },
    currUserId: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
  },
  computed: {
    ...mapState(["current_user"]),
  },
  methods: {
    ...mapActions(["getUser"]),
    async setUser_() {
      await this.getUser();
    },
    // Send Friend Request
    sendFriendRequest() {
      return axios
        .post(
          `http://localhost:3000/friendship/${this.current_user._id}/add/${this._id}`
        )
        .then((res) => {
          console.log(res);
          this.forceRerender();
        })
        .catch((err) => console.log(err));
    },

    // Accept Friend Request
    acceptFriendRequest() {
      return axios
        .post(
          `http://localhost:3000/friendship/${this.current_user._id}/accepts/${this._id}`
        )
        .then((res) => {
          console.log(res);
          this.forceRerender();
        })
        .catch((err) => console.log(err));
    },

    // Decline Friend Request
    declineFriendRequest() {
      return axios
        .post(
          `http://localhost:3000/friendship/${this.current_user._id}/decline/${this._id}`
        )
        .then((res) => {
          console.log(res);
          this.forceRerender();
        })
        .catch((err) => console.log(err));
    },

    // Decline Friend Request
    unfriendFriendRequest() {
      return axios
        .post(
          `http://localhost:3000/friendship/${this.current_user._id}/unfriend/${this._id}`
        )
        .then((res) => {
          console.log(res);
          this.forceRerender();
        })
        .catch((err) => console.log(err));
    },

    // Cancel Friend Request
    cancelFriendRequest() {
      return axios
        .post(
          `http://localhost:3000/friendship/${this.current_user._id}/cancel/${this._id}`
        )
        .then((res) => {
          console.log(res);
          this.forceRerender();
        })
        .catch((err) => console.log(err));
    },

    //Get Friendship
    getFriendship() {
      return axios
        .get(`http://localhost:3000/friendship/${this._id}`)
        .then((res) => {
          this.friendship = res.data;
          this.checkFriendshipStatus();
        })
        .catch((err) => console.log(err));
    },

    //check
    checkFriendshipStatus() {
      if (!this.friendship) {
        return;
      }
      if (this._id === this.current_user._id) {
        return (this.view = "owner");
      }
      if (this.friendship.friends.includes(this.current_user._id)) {
        return (this.view = "friends");
      }
      if (this.friendship.incomingRequests.includes(this.current_user._id)) {
        return (this.view = "incoming");
      }
      if (this.friendship.outgoingRequests.includes(this.current_user._id)) {
        return (this.view = "outgoing");
      }
    },

    getLink(link) {
      if (!link) {
        return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
      }
      let currLink = "http://localhost:3000/" + link;
      return currLink;
    },

    forceRerender() {
      this.getFriendship();
    },
  },
  created() {
    this.getFriendship();
    this.setUser_();
  },
};
</script>

<style>
.add-friend {
  font-size: 0.6rem;
}
</style>