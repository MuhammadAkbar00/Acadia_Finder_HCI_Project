<template>
  <v-carousel
    height="90vh"
    cycle
    interval="5000"
    show-arrows-on-hover
    hide-delimiters
  >
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
      gradient="to top right, rgba(20,25,21,.9), rgba(10,10,10,0.7)"
    >
      <v-row class="fill-height" align="center" justify="center">
        <v-col class="text-center mt-10" cols="12" lg="6">
          <h1 v-if="i === 0" class="white--text my-10">
            Welcome to Acadia Finder
          </h1>
          <h2 class="white--text">
            {{ item.title }}
          </h2>
          <v-btn v-if="isLoggedIn && item.btnName === 'Books'" class="my-8" large :to="item.btnUrl" rounded dark outlined> {{ item.btnName }} </v-btn>
          <v-btn v-else-if="!isLoggedIn && (item.btnName === 'Login' || item.btnName === 'Sign up' || item.btnName === 'Books')" class="my-8" large :to="item.btnUrl" rounded dark outlined> {{ item.btnName }} </v-btn>
        </v-col>
      </v-row>
    </v-carousel-item>
  </v-carousel>
</template>
<script>
import { mapState } from 'vuex';
export default {
  data: () => ({
    items: [
      {
        src: require("../assets/homepage_slide1_2.jpeg"),
        title: "Get access to books at reasonable prices from students across multiple programs at Acadia University.",
        btnUrl: "/signup",
        btnName: "Sign up",
      },
      {
        src: require("../assets/homepage_slide2.jpg"),
        title: "Upload and browse for textbooks and notes from your classes",
        btnUrl: "/books",
        btnName: "Books",
      },
      {
        src: require("../assets/homepage_slide3.jpg"),
        title: "Connect with students in your Program",
        btnUrl: "/login",
        btnName: "Login",
      },
    ],
  }),
  computed: {
    ...mapState(["isLoggedIn"])
  }
};
</script>
<style scoped>
.title {
  position: absolute;
  bottom: 80px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  font-size: 10pt;
  padding: 15px;
}
</style>