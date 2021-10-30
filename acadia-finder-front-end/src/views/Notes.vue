<template>
  <v-container class="mt-10">
    <h2 class="mb-10">
       Available Notes
    </h2>
    <v-row>
      <v-col cols="12" lg="6" md="12" sm="12" v-for="(note, i) in notesArray" :key="i">
        <v-card>
          <note
            :providerId="note.providerId"
            :courseId="note.courseId"
            :noteFile="note.noteFile"
            :datePosted="note.datePosted"
            :description="note.description"
            :semester="note.semester"
              
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Note from "../components/Note.vue";
export default {
  data() {
    return {
      notesArray: [],
    };
  },
  components: {
    Note,
  },
  computed: {
    ...mapState(["notes"]),
  },
  methods: {
    ...mapActions(["getNotes"]),
    async loadNotes() {
      await this.getNotes();
      this.notesArray = this.notes;
    },
  },
  created() {
    this.loadNotes();
  },
};
</script>