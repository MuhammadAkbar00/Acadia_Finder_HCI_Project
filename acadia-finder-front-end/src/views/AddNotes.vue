<template>
  <div class="mt-15 pt-5">
    <validation-observer ref="observer">
      <v-row justify="center" class="mt-10 pa-5">
        <v-col lg="6" sm="12" md="8">
          <h2 class="mb-5">Add Notes Form</h2>
          <form @submit.prevent="submit">
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
            <input type="file" @change="onFileUpload" ref="file" />

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

            <v-btn dark class="mr-4" color="green" type="submit" rounded>
              submit
            </v-btn>
            <v-btn dark @click="clear" color="red" rounded> clear </v-btn>
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
      if (this.$refs.observer.validate()) {
        const formData = new FormData();
        formData.append("courseId", this.courseId);
        formData.append("providerId", this.providerId);
        formData.append("noteFile", this.noteFile);
        formData.append("datePosted", this.datePosted);
        formData.append("description", this.description);
        formData.append("semester", this.semester);
        const headers = { "Content-Type": "multipart/form-data" };
        await axios
          .post("http://localhost:3000/notes", formData, { headers } )
          .then(
            (res) => {
              console.log(res);
              this.$router.push("/notes");
              this.$router.go();
            },
            (err) => {
              console.log(err.response);
              this.errors = err.response.data.error;
            }
          );
      }
    },
    clear() {
      this.courseId = "";
      this.providerId = "";
      this.noteFile = "";
      this.datePosted = "";
      this.description = "";
      this.semester = "";
      this.$refs.observer.reset();
    },

    onFileUpload(event) {
      this.noteFile = event.target.files[0];
    },
  },

  created() {
    this.getUser();
  },
};
</script>