<template>
  <div class="mt-15 pt-5">
    <validation-observer ref="observer">
      <v-row justify="center" class="mt-10 pa-5">
        <v-col lg="6" sm="12" md="8">
          <h2 class="mb-5">Add Notes Form</h2>
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
                <span v-for="(note_f, i) in noteFile" :key="i">
                  {{ note_f.name }}<span class="black--text"> ,</span>
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
              submit
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
    noteFile: "",
    datePosted: "",
    description: "",
    semester: "",
    validated: false,
    errors: "",
    file_errors: "",
  }),

  methods: {
    // Get the user with token given
    async getUser() {
      if (localStorage.getItem("token") != null) {
        await axios
          .get("http://localhost:3000/users/user", {
            headers: { token: localStorage.getItem("token") },
          })
          .then((res) => {
            console.log(res);
            this.providerId = res.data.user._id;
          })
          .catch((err) => {
            this.errors = err.response.data.message;
          });
      }
    },

    async submit() {
      if (await this.$refs.observer.validate()) {
        if (this.noteFile === "") {
          this.file_errors = "File upload cannot be empty";
          return;
        }
        const formData = new FormData();
        Array.from(this.noteFile).forEach((file) => {
          formData.append("noteFiles", file);
        });
        formData.append("courseId", this.courseId);
        formData.append("providerId", this.providerId);
        // formData.append("noteFile", this.noteFile);
        formData.append("datePosted", this.datePosted);
        formData.append("description", this.description);
        formData.append("semester", this.semester);
        const headers = { "Content-Type": "multipart/form-data" };
        await axios
          .post("http://localhost:3000/notes", formData, { headers })
          .then(
            (res) => {
              console.log(res);
              this.$router.push("/notes");
              Swal.fire({
                icon: "success",
                title: "Note Successfully Added",
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
      this.noteFile = "";
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
      this.noteFile = event.target.files;
    },
  },

  created() {
    this.getUser();
  },
};
</script>