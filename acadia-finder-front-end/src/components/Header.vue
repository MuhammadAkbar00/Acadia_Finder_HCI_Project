<template>
  <div>
    <v-navigation-drawer
      app
      disable-resize-watcher
      v-model="drawer"
      absolute
      temporary
    >
      <v-list dense>
        <v-list-item>
          <v-btn text class="ma-1" rounded to="/books"> Books </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn text class="ma-1" rounded to="/notes"> Notes </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn text class="ma-1" rounded to="/profile">
            User Profile
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="grey" dark absolute flat app>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>

      <v-toolbar-title @click="routerPush('/')">Acadia Finder</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn text class="ma-1" rounded to="/books"> Books </v-btn>

      <v-btn text class="ma-1" rounded to="/notes"> Notes </v-btn>
      <v-btn text class="ma-1" rounded to="/profle"> User Profile </v-btn>
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
    }
  }
};
</script>