<template>
  <div class="mt-15 pt-5">
    <validation-observer ref="observer">
      <v-row justify="center" class="mt-10 pa-5">
        <v-col lg="6" sm="12" md="8">
          <h2 class="mb-5">Edit Notes Form</h2>
          <form @submit.prevent="submit" ref="form" v-on:keyup="validator">
            <validation-provider
              v-slot="{ errors }"
              name="Course ID"
              rules="required"
            >
              <v-text-field
                v-model="courseId"
                :error-messages="errors"
                label="Course ID"
                required
              ></v-text-field>
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              name="Date Posted"
              rules="required"
            >
              <v-text-field
                v-model="datePosted"
                :error-messages="errors"
                type="Date"
                required
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Description"
              rules="required"
            >
              <v-text-field
                v-model="description"
                :error-messages="errors"
                label="Description"
                required
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Semester"
              rules="required"
            >
              <v-text-field
                v-model="semester"
                :error-messages="errors"
                label="Semester (Eg. FA01)"
                required
              ></v-text-field>
            </validation-provider>
            <div class="mb-10">
              <div class="blue--text my-3">
                <span v-for="(note_f, i) in noteFiles" :key="i">
                  <span v-if="'originalname' in note_f">{{ note_f.originalname }}<span class="black--text"> ,</span></span>
                  <span v-else>{{ note_f.name }}<span class="black--text"> ,</span></span>
                </span>
              </div>
              <v-btn class="text-capitalize" rounded outlined>
                <label for="note-files">
                  <v-icon>mdi-upload</v-icon>
                  Add note file
                </label>
              </v-btn>
              <div class="red--text caption">
                {{ file_errors }}
              </div>
              <input
                id="note-files"
                type="file"
                @change="onFileUpload"
                ref="file"
                multiple="multiple"
                hidden
              />
            </div>
            <v-btn
              class="mr-4 white--text"
              color="green"
              type="submit"
              rounded
              :disabled="!validated"
            >
              Edit
            </v-btn>
            <v-btn dark @click="clear" class="secondary" rounded outlined>
              clear
            </v-btn>
          </form>
        </v-col>
      </v-row>
    </validation-observer>
  </div>
</template>

<script>
import { required, digits, email } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import { mapActions, mapState } from "vuex";
import axios from "axios";
import Swal from "sweetalert2";

setInteractionMode("eager");

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
});

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    courseId: "",
    providerId: "",
    noteFiles: "",
    datePosted: "",
    description: "",
    semester: "",
    validated: false,
    errors: "",
    file_errors: "",
    note: "",
    user_id: ""
  }),
  computed: {
    ...mapState(["current_user"]),
  },
  methods: {
        ...mapActions(["getUser"]),
    // Get the user with token given
    async getUser_() {
      await this.getUser();
      this.user_id = this.current_user._id;
      this.getNotes()
    },
    async getNotes() {
      return axios
        .get(`http://localhost:3000/notes/${this.$route.params.id}`)
        .then(async (response) => {
          if (this.user_id !== response.data.providerId) {
            alert("YOU ARE NOT THE OWNER");
            this.$router.push("/notes");
          }
          this.note = response.data
          this.courseId = response.data.courseId;
          this.providerId = response.data.providerId;
          this.noteFiles = response.data.noteFiles;
          this.datePosted = response.data.datePosted;
          this.description = response.data.description;
          this.semester = response.data.semester;
          console.log(this.noteFiles)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async submit() {
      if (await this.$refs.observer.validate()) {
        if (this.noteFiles === "") {
          this.file_errors = "File upload cannot be empty";
          return;
        }
        const formData = new FormData();
        Array.from(this.noteFiles).forEach((file) => {
          formData.append("noteFiles", file);
        });
        formData.append("courseId", this.courseId);
        formData.append("providerId", this.providerId);
        formData.append("datePosted", this.datePosted);
        formData.append("description", this.description);
        formData.append("semester", this.semester);
        const headers = { "Content-Type": "multipart/form-data" };
        await axios
          .patch(`http://localhost:3000/notes/${this.note._id}`, formData, { headers })
          .then(
            (res) => {
              console.log(res);
              this.$router.push("/notes");
              Swal.fire({
                icon: "success",
                title: "Note Successfully Edited",
                showConfirmButton: false,
                timer: 5000,
              });
              this.$router.go();
            },
            (err) => {
              console.log(err.response);
              this.errors = err.response.data.error;
            }
          );
      }
    },
    async validator() {
      if (this.$refs.form.checkValidity()) {
        if (await this.$refs.observer.validate()) {
          return (this.validated = true);
        }
      }
      this.validated = false;
    },
    clear() {
      this.courseId = "";
      this.providerId = "";
      this.noteFiles = "";
      this.datePosted = "";
      this.description = "";
      this.semester = "";
      this.file_errors = "";
      this.validated = false;
      this.$refs.observer.reset();
    },

    onFileUpload(event) {
      if (event.target.files.length > 8) {
        this.$refs.file.value = null;
        return alert("You can not upload more than 8 files");
      }
      this.noteFiles = event.target.files;
      this.validator()
    },
  },

  created() {
    this.getUser_();
  },
};
</script>