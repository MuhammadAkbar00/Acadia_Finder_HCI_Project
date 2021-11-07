<template>
  <v-container>
    <v-card-title>
      <h3>
        {{ name }}
      </h3>
    </v-card-title>
    <v-row align="center">
      <v-col cols="12" lg="8" md="8" sm="12">
        <div class="ml-5">
          <span class="font-weight-bold"> Author: </span>{{ author }}
        </div>
        <div class="ml-5">
          <span class="font-weight-bold">Edition: </span>{{ edition }}
        </div>

        <div class="pa-5">
          <div>
            <span class="font-weight-bold">Selling Price: </span
            ><span class="green--text"> ${{ buyPrice }}</span>
          </div>
          <div>
            <span class="font-weight-bold">Rent Price: </span>
            <span class="green--text">${{ rentPrice }}</span>
          </div>
          <div>
            <span class="font-weight-bold">Course Id:</span> {{ courseId }}
          </div>
        </div>
      </v-col>
      <v-col cols="12" lg="4" md="4" sm="12">
        <img v-img width="100" :src="getLink(bookImage)"/>
      </v-col>
    </v-row>
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
  methods: {
    getLink(link) {
      let currLink = "http://localhost:3000/" + link;
      return currLink;
    },
  },
};
</script>

<style scoped>
.noor {
  margin: 40px;
}
</style>