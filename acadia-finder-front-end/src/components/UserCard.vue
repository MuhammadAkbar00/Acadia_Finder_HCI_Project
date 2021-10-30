<template>
  <v-container>
    <v-card
      class="text-center ma-3 bg"
      :style="{ backgroundColor: '#FFFFFF' }"
    >
      <v-responsive class="pt-4">
        <v-avatar>
          <img src="https://www.diethelmtravel.com/wp-content/uploads/2016/04/bill-gates-wealthiest-person-279x300.jpg" alt="">
        </v-avatar>
      </v-responsive>
      <v-card-text>
        <div class="subheading">{{ firstName + " " + lastName }}</div>
        <div class="grey--text">{{ major }}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="#FFFFFF">
          <v-icon x-small>mdi-account-plus</v-icon>
          <span class="add-friend">Add</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
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
  },
};
</script>

<style>
.add-friend {
  font-size: 0.6rem;
}
</style>