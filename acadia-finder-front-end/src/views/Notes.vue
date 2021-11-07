<template>
  <v-container class="mt-15 pt-15">
    <h2 class="mb-10">Available Notes</h2>
    <v-row class="my-10">
      <v-col cols="12" lg="6" md="8">
        <div>
          <v-text-field
            label="Search for a note by Course Id or Semester"
            hide-details="auto"
            v-model="search"
          ></v-text-field>
          <p class="mb-10">
            Sort By Date:
            <span v-bind:class="checkSortAsc()" @click="setSort('Ascending')"
              >Ascending</span
            >/<span
              v-bind:class="checkSortDesc()"
              class="add-hover"
              @click="setSort('Descending')"
              >Descending</span
            >
          </p>
        </div>
      </v-col>
      <v-col cols="12" lg="6" md="4" v-if="isLoggedIn">
        <v-btn 
          to="/addnotes" 
          class="float-right white--text" 
          color="rgb(6 67 121)"
          rounded 
        >
          Add a note
        </v-btn>
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
        <v-card height="100%" class="d-flex flex-column">
          <Note
            :providerId="note.providerId"
            :courseId="note.courseId"
            :noteFiles="note.noteFiles"
            :datePosted="note.datePosted"
            :description="note.description"
            :semester="note.semester"
            :_id="note._id"
          />
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-btn
              class="white--text mt-5"
              color="rgb(6 67 121)"
              small
              rounded
              @click="onClick(note.noteFiles)"
              v-if="isLoggedIn"
            >
              Download
            </v-btn>
            <v-btn 
              to="/login" 
              v-else 
              class="white--text mt-5"
              small
              color="rgb(6 67 121)"
              rounded
            >
              Login to download
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapActions, mapState } from "vuex";
import Note from "../components/Note.vue";

export default {
  data() {
    return {
      notesArray: [],
      search: "",
      sorting: "Ascending",
    };
  },
  components: {
    Note,
  },
  computed: {
    ...mapState(["notes", "isLoggedIn"]),
    filteredNotes: function () {
      const filteredArr = this.notesArray.filter((notes) => {
        return (
          notes.courseId.toLowerCase().match(this.search.toLowerCase()) ||
          notes.semester.toLowerCase().match(this.search.toLowerCase())
        );
      });
      if (this.sorting && this.sorting === "Ascending") {
        filteredArr.sort((a, b) => {
          return b.datePosted.localeCompare(a.datePosted);
        });
      }
      if (this.sorting && this.sorting === "Descending") {
        filteredArr.sort((a, b) => {
          return a.datePosted.localeCompare(b.datePosted);
        });
      }
      return filteredArr;
    },
  },
  methods: {
    ...mapActions(["getNotes"]),
    async loadNotes() {
      await this.getNotes();
      this.notesArray = this.notes;
    },
    onClick(noteFiles) {
      noteFiles.map((file) => {
        axios({
          url: this.getLink(file.path),
          method: "GET",
          responseType: "blob",
        }).then((response) => {
          const fileUrl = window.URL.createObjectURL(new Blob([response.data]));
          const fileLink = document.createElement("a");
          fileLink.href = fileUrl;

          fileLink.setAttribute("download", file.originalname);
          document.body.appendChild(fileLink);

          fileLink.click();
        });
      });
    },
    getLink(link) {
      let currLink = "http://localhost:3000/" + link;
      return currLink;
    },
    setSort(s) {
      this.sorting = s;
    },
    checkSortAsc() {
      if (this.sorting === "Ascending") {
        return "add-hover active";
      }
      return "add-hover";
    },
    checkSortDesc() {
      if (this.sorting === "Descending") {
        return "add-hover active";
      }
      return "add-hover";
    },
  },
  created() {
    this.loadNotes();
  },
};
</script>
<style scoped>
.add-hover {
  cursor: pointer;
}
.active {
  font-weight: bold;
  color: #2e608e;
}
</style>