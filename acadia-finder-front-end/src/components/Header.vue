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
          <v-btn text class="add-pointer text-capitalize" dark rounded to="/"> Acadia Finder </v-btn>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-btn text class="ma-1" rounded to="/books"> Books </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn text class="ma-1" rounded to="/notes"> Notes </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn text class="ma-1" rounded to="/signup"> Signup </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn text class="ma-1" rounded to="/login"> Login </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn text class="ma-1" rounded to="/profile"> User Profile </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="grey" dark absolute flat app>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>

      <v-toolbar-title @click="routerPush('/')" class="add-hover">Acadia Finder</v-toolbar-title>

      <v-spacer></v-spacer>
      <div class="hidden-sm-and-down">
        <v-btn text class="ma-1" rounded to="/books"> Books </v-btn>

        <v-btn text class="ma-1" rounded to="/notes"> Notes </v-btn>
        <v-btn text class="ma-1" rounded to="/signup"> Signup </v-btn>
        <v-btn text class="ma-1" rounded to="/login"> Login </v-btn>
        <v-btn text class="ma-1" rounded to="/profle"> User Profile </v-btn>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
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
  methods: {
    routerPush(str) {
      this.$router.push(str);
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