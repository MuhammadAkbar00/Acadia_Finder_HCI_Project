<template>
  <div>
    <v-navigation-drawer
      app
      disable-resize-watcher
      v-model="drawer"
      absolute
      temporary
    >
      <v-list dense class="pt-0">
        <v-list-item class="bg-color py-2">
          <v-btn text class="add-pointer text-capitalize" dark rounded to="/">
            Acadia Finder
          </v-btn>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-btn text class="ma-1" rounded to="/books"> Books </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn text class="ma-1" rounded to="/notes"> Notes </v-btn>
        </v-list-item>
        <v-list-item v-if="!isLoggedIn">
          <v-btn text class="ma-1" rounded to="/signup"> Signup </v-btn>
        </v-list-item>
        <v-list-item v-if="!isLoggedIn">
          <v-btn text class="ma-1" rounded to="/login"> Login </v-btn>
        </v-list-item>
        <v-list-item v-if="isLoggedIn">
          <v-btn text class="ma-1" rounded to="/profile"> User Profile </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn text class="ma-1" rounded @click="logout" v-if="isLoggedIn"> Logout </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="rgba(10,10,10,0.5)" dark flat fixed>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>
      <v-img
        max-height="140"
        max-width="140"
        contain
        src="@/assets/logo1.png"
        @click="routerPush('/')"
        class="add-hover hidden-sm-and-down"
      ></v-img>
      <v-img
        max-height="40"
        max-width="40"
        contain
        src="@/assets/logo2.png"
        @click="routerPush('/')"
        class="add-hover hidden-md-and-up"
      ></v-img>
      <v-spacer></v-spacer>
      <div class="hidden-sm-and-down">
        <v-btn text class="ma-1" rounded to="/books"> Books </v-btn>

        <v-btn text class="ma-1" rounded to="/notes"> Notes </v-btn>
        <span v-if="!isLoggedIn">
          <v-btn text class="ma-1" rounded to="/signup"> Signup </v-btn>
          <v-btn text class="ma-1" rounded to="/login"> Login </v-btn>
        </span>
        <span v-else>
          <v-btn text class="ma-1" rounded to="/profile"> User Profile </v-btn>
          <v-btn text class="ma-1" @click="logout">  Logout </v-btn>
        </span>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Header",

  data: () => ({
    drawer: false,
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },

  computed: {
    ...mapState(["isLoggedIn"]),
  },

  methods: {
    routerPush(str) {
      this.$router.push(str);
    },
    logout() {
      localStorage.clear();
      this.$router.push("/login");
      this.$router.go();
      this.isLoggedIn = false;
    },
  },
};
</script>

<style scoped>
.add-hover {
  cursor: pointer;
}
.bg-color {
  background: grey;
}
</style>