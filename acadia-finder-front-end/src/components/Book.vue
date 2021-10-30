<template>
  <v-container>
        <v-card-title>
          <h3>
            {{ name }}
          </h3>
        </v-card-title>
    <v-row align="center">
      <v-col cols="12" lg="8" md="8" sm="12">
        <p class="ml-5">Author: {{ author }}</p>
        <p class="ml-5">Edition: {{ edition }}</p>

        <div class="pa-5">
          <div>Selling Price: {{ buyPrice }}</div>
          <div>Rent Price: {{ rentPrice }}</div>
          <div>course name: {{ courseId }}</div>
        </div>
      </v-col>
      <v-col cols="12" lg="4" md="4" sm="12">
          <v-img width="100" :src="bookImage"></v-img>
      </v-col>
    </v-row>
    <v-card-actions>
      <v-btn outlined rounded text v-if="forSale"> Buy </v-btn>
      <v-btn outlined rounded text v-if="forRent"> Rent </v-btn>
    </v-card-actions>
  </v-container>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
    },
    courseId: {
      type: String,
    },
    edition: {
      type: String,
    },
    author: {
      type: String,
    },
    bookImage: {
      type: String,
    },
    userId: {
      type: String,
    },
    buyPrice: {
      type: Number,
    },
    rentPrice: {
      type: Number,
    },
    forRent: {
      type: Boolean,
    },
    forSale: {
      type: Boolean,
    },
  },
};
</script>

<style scoped>
.noor {
  margin: 40px;
}
</style>