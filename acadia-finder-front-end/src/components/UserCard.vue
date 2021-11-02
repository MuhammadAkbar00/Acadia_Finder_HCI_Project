<template>
  <v-container>
    <v-card class="text-center ma-3 bg" :style="{ backgroundColor: '#FFFFFF' }">
      <v-responsive class="pt-4">
        <v-avatar>
          <img
            src="https://www.diethelmtravel.com/wp-content/uploads/2016/04/bill-gates-wealthiest-person-279x300.jpg"
            alt=""
          />
        </v-avatar>
      </v-responsive>
      <v-card-text>
        <div class="subheading font-weight-bold text-capitalize">{{ firstName + " " + lastName }}</div>
        <div class="grey--text"><span class="font-weight-bold">Program: </span>{{ major }}</div>
        <div class="grey--text"><span class="font-weight-bold"> Email: </span>{{ email }}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="#FFFFFF" @click="sendFriendRequest()">
          <v-icon x-small>mdi-account-plus</v-icon>
          <span class="add-friend">Add</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
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
  },
  methods: {
    // Send Friend Request
    sendFriendRequest() {
      return axios
        .post(`http://localhost:3000/friendship/617da58dab4ec46974ea7351/add/${this._id}`)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
.add-friend {
  font-size: 0.6rem;
}
</style>