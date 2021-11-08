<template>
  <v-container class="main-text">
    <vue-gallery-slideshow
      :images="imageGetter()"
      :index="index"
      @close="index = null"
    ></vue-gallery-slideshow>
    <v-card-title>
      <h3>
        {{ courseId }}
      </h3>
      <v-spacer></v-spacer>
      <v-btn
        rounded
        color="rgb(6 67 121)"
        dark
        small
        v-if="user_id === providerId"
        :to="'/notes/edit/' + _id"
      >
        Edit
      </v-btn>
    </v-card-title>
    <v-row align="center">
      <v-col cols="12" lg="8" md="8" sm="12">
        <div class="ml-5">Semester: {{ semester }}</div>
        <p class="ml-5">Date: {{ datePosted }}</p>
        <div class="pa-5">
          <p>Description: {{ description }}</p>
        </div>
      </v-col>
      <v-col cols="12" lg="4" md="4" sm="12">
        <v-img width="100" :src="providerId"></v-img>
      </v-col>
      <v-col
        v-for="(note, i) in noteFiles"
        :key="i"
        cols="12"
        lg="4"
        md="4"
        sm="12"
      >
        <v-img
          class="add-hover"
          v-if="checkFileType(note)"
          width="100"
          :src="getLink(note.path)"
          @click="index = i"
        />
        <v-img v-else width="100" contain src="@/assets/download_image.png" />
        {{ note.originalname }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VueGallerySlideshow from "vue-gallery-slideshow";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      images: ["https://placekitten.com/801/800"],
      index: null,
      user_id: "",
    };
  },
  components: {
    VueGallerySlideshow,
  },
  props: {
    courseId: {
      type: String,
    },
    providerId: {
      type: String,
    },
    noteFiles: [],
    datePosted: {
      type: String,
    },
    description: {
      type: String,
    },
    semester: {
      type: String,
    },
    _id: {
      type: String,
    },
  },
  computed: {
    ...mapState(["current_user"]),
  },
  methods: {
    ...mapActions(["getUser"]),
    async getUser_() {
      await this.getUser();
      this.user_id = this.current_user._id;
    },
    getLink(link) {
      let currLink = "http://localhost:3000/" + link;
      return currLink;
    },
    checkFileType(note) {
      if (note.mimetype.includes("image")) {
        return true;
      }
      return false;
    },
    imageGetter() {
      let images = [];
      this.noteFiles.map((note) => {
        if (this.checkFileType(note)) {
          images.push(this.getLink(note.path));
        }
      });
      return images;
    },
  },
  created() {
    this.getUser_();
  },
};
</script>

<style scoped>
.main-text {
  font-family: Times, serif, sans-serif;
}
.add-hover {
  cursor: pointer;
}
</style>