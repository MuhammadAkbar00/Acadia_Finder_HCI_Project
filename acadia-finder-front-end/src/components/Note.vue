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
  </v-container>
</template>

<script>
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

  },
};
</script>

<style scoped>
.main-text {
  font-family: Times, serif, sans-serif;
}
</style>