<template>
  <v-container class="main-text">
    <v-card-title>
      <h3>
        {{ courseId }}
      </h3>
    </v-card-title>
    <v-row align="center">
      <v-col cols="12" lg="8" md="8" sm="12">
        <div class="ml-5">Semester: {{ semester }}</div>
        <p class="ml-5">Date: {{ datePosted }}</p>
        <div class="pa-5">
          <p >Description: {{ description }}</p>
        </div>
      </v-col>
      <v-col cols="12" lg="4" md="4" sm="12">
        <v-img width="100" :src="providerId"></v-img>
      </v-col>
    </v-row>
    <v-card-actions>
      <v-btn outlined rounded text v-if="datePosted" @click="onClick()">
        Download
      </v-btn>
    </v-card-actions>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  props: {
    courseId: {
      type: String,
    },
    providerId: {
      type: String,
    },
    noteFile: {
      type: String,
    },
    datePosted: {
      type: String,
    },
    description: {
      type: String,
    },
    semester: {
      type: String,
    },
  },
  methods: {
    onClick() {
      return axios({
        url: this.getLink(this.noteFile),
        method: 'GET',
        responseType: 'blob'
      }).then((response) => {
        const fileUrl = window.URL.createObjectURL(new Blob([response.data]))
        const fileLink = document.createElement('a')
        fileLink.href = fileUrl

        fileLink.setAttribute('download',response.request.responseURL.split('note_uploads/')[1])
        document.body.appendChild(fileLink)

        fileLink.click()
      })
    },
    getLink(link) {
      let currLink = "http://localhost:3000/" + link;
      return currLink;
    },
  },
};
</script>

<style scoped>
.main-text {
  font-family: Times, serif, sans-serif;
}
</style>