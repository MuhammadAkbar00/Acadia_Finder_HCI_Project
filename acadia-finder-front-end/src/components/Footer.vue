<template>
  <v-footer color="grey" padless>
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        class="my-2"
        :to="link.link"
      >
        {{ link.name }}
      </v-btn>
      <v-col class="py-4 text-center white--text" cols="12">
        {{ new Date().getFullYear() }} — <strong>Acadia Finder</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  data: () => ({
    links: [
      {
        name: "Home", 
        link: "/"
      },      
      {
        name: "About Us", 
        link: "/about"
      },      
      {
        name: "Contact Us", 
        link: "/contactus"
      }
    ]
  }),
};
</script>