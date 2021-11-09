

<template>
  <div class="mt-16">
    <div>
      <v-img src="@/assets/shoot.jpg" height="380">
        <h1 class="white--text text-center  pb-16">About</h1>
      </v-img>
    </div>
    <div class="block py-15">
      <v-container>
        <p class="font-weight-regular py-15" style="font-size:18pt">
          Acadia Finder grants Acadia Students the control they need to better manage their academic resources that they will otherwise use only once. Students can upload their used textbooks and either rent or sell them - they can talk and negotiate with potential buyers/renters to come up with an agreement that works for all. Students are not just limited to books, those who are willing to share can upload their
          class notes so that others who are interested can download them. Acadia Finder also allows students to connect with other students within their Program, they can simply add each other as a friend! Our goal is to provide convenience and promote affordability.
        </p>
        <p></p>
      </v-container>
    </div>
    <div class="block">
      <v-container>
        <h2 class="text--primary text-center pb-14" style="font-size:18pt">Our Team</h2>
        <v-row>
          <v-col
            v-for="item in items"
            :key="item.id"
            class="d-flex child-flex"
            cols="12"
            md="3"
            lg="3"
          >
            <v-card flat tile class="mx-auto">
              <v-img :src="item.src" aspect-ratio="1" class="grey lighten-2"></v-img>
              <v-card-text class="text--primary text-center">
                <div class="title">{{ item.name }}</div>
                <p>{{ item.title }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      items: [
        {
          id: 1,
          src: require("../assets/team_photos/Noor.png"),
          name: "Noor Ahmed",
          title: "Founder"
        },
        {
          id: 2,
          src: require("../assets/team_photos/Tamea.png"),
          name: "Tamea Queensborough",
          title: "Founder"
        },
        {
          id: 3,
          src: require("../assets/team_photos/Chinny.png"),
          name: "Chinemerem Eme",
          title: "Founder"
        },
        {
          id: 4,
          src: require("../assets/team_photos/Muhammad.png"),
          name: "Muhammad Akbar",
          title: "Founder"
        }
      ]
    };
  }
};
</script>