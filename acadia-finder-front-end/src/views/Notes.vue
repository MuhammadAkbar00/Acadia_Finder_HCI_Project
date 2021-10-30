<template>
  <v-container class="mt-10">
    <h2 class="mb-10">Available Notes</h2>
    <v-row class="my-10">
      <v-col cols="12" lg="6" md="8">
        <div>
          <v-text-field
            label="Search for a note by Course Id or Semester"
            hide-details="auto"
            v-model="search"
          ></v-text-field>
        </div>
      </v-col>
      <v-col cols="12" lg="6" md="4">
        <v-btn to="/addnotes" class="float-right" rounded> Add a note </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        lg="6"
        md="12"
        sm="12"
        v-for="(note, i) in filteredNotes"
        :key="i"
      >
        <v-card>
          <Note
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
      search: "",
    };
  },
  components: {
    Note,
  },
  computed: {
    ...mapState(["notes"]),
    filteredNotes: function () {
      return this.notesArray.filter((notes) => {
        return (
          notes.courseId.toLowerCase().match(this.search.toLowerCase()) ||
          notes.semester.toLowerCase().match(this.search.toLowerCase())
        );
      });
    },
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