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
            <h3 class="mr-3">
              <router-link to="/books" class="header-title">
                <span class>Books</span>
              </router-link>
            </h3>
          </v-list-item>
          <v-list-item>
            <h3 class="mr-3">
              <router-link to="/programs" class="header-title">
                <span class>Programs</span>
              </router-link>
            </h3>
          </v-list-item>
          <v-list-item>
            <h3 class="mr-3">
              <router-link to="/notes" class="header-title">
                <span class>Notes</span>
              </router-link>
            </h3>
          </v-list-item>

          <v-list-item>
            <h3 class="mr-3">
              <router-link to="/books" class="header-title">
                <span class>Profile</span>
              </router-link>
            </h3>
          </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="grey" dark absolute flat app>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>Acadia Finder</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'Header',

  data: () => ({
    drawer: false,
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>