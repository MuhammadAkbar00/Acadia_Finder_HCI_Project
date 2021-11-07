<template>
  <div class="mt-10 pt-5">
    <validation-observer ref="observer">
      <v-row justify="center" class="mt-10 pa-5">
        <v-col lg="6" sm="12" md="8">
          <h2 class="mb-5">Add Book Form</h2>
          <form @submit.prevent="submit" ref="form" v-on:keyup="validator">
            <validation-provider
              v-slot="{ errors }"
              name="Name"
              rules="required"
            >
              <v-text-field
                v-model="name"
                :error-messages="errors"
                label="Name"
                required
              ></v-text-field>
            </validation-provider>
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
              name="Edition"
              rules="required"
            >
              <v-text-field
                v-model="edition"
                :error-messages="errors"
                label="Edition"
                required
              ></v-text-field>
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              name="Author"
              rules="required"
            >
              <v-text-field
                v-model="author"
                :error-messages="errors"
                label="Book Author"
                required
              ></v-text-field>
            </validation-provider>

            <validation-provider v-slot="{ errors }" name="Buying Price">
              <v-text-field
                v-model="buyPrice"
                :error-messages="errors"
                label="Buying Price"
                type="Number"
              ></v-text-field>
            </validation-provider>
            <validation-provider v-slot="{ errors }" name="Rent Price">
              <v-text-field
                v-model="rentPrice"
                :error-messages="errors"
                label="Rent Price"
                type="Number"
              ></v-text-field>
            </validation-provider>

            <validation-provider v-slot="{ errors }" name="For Rent">
              <v-checkbox
                v-model="forRent"
                :error-messages="errors"
                value="1"
                label="For Rent"
                type="checkbox"
              ></v-checkbox>
            </validation-provider>
            <validation-provider v-slot="{ errors }" name="For Sale">
              <v-checkbox
                v-model="forSale"
                :error-messages="errors"
                value="1"
                label="For Sale"
                type="checkbox"
              ></v-checkbox>
            </validation-provider>
            <div class="mb-10">
              <div>
                <img v-if="url" :src="url" height="200" class="book" />
              </div>
              <div class="my-2">
                <v-btn class="text-capitalize white--text mb-10" 
                  rounded 
                  small
                  color="rgb(6 67 121)"
                >
                  <label for="book-file">
                    <v-icon>mdi-upload</v-icon>
                    Add Book image
                  </label>
                </v-btn>
                <div class="red--text caption">
                  {{ image_errors }}
                </div>
                <input
                  id="book-file"
                  type="file"
                  @change="onFileUpload"
                  hidden
                  ref="file"
                />
              </div>
            </div>
            <v-btn
              class="mr-4 white--text"
              color="rgb(6 67 121)"
              type="submit"
              rounded
              :disabled="!validated"
            >
              submit
            </v-btn>
            <v-btn 
              @click="clear" 
              class="white--text"
              color="red darken-3" 
              rounded
            > 
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
import { mapActions, mapState } from "vuex";
import Swal from "sweetalert2";

setInteractionMode("eager");

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
});

extend("required", {
  ...required,
  message: "{_field_} cannot be empty",
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
    name: "",
    courseId: "",
    edition: "",
    author: "",
    bookImage: "",
    userId: "",
    buyPrice: "",
    rentPrice: "",
    forRent: false,
    forSale: false,
    show1: false,
    user_id: "617da58dab4ec46974ea7351",
    url: "",
    validated: false,
    errors: "",
    image_errors: "",
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
    },

    async submit() {
      if (await this.$refs.observer.validate()) {
        if (this.bookImage === "") {
          this.image_errors = "File upload cannot be empty";
          return;
        }
        const formData = new FormData();
        formData.append("name", this.name);
        formData.append("courseId", this.courseId);
        formData.append("edition", this.edition);
        formData.append("author", this.author);
        formData.append("userId", this.user_id);
        formData.append("buyPrice", this.buyPrice);
        formData.append("rentPrice", this.rentPrice);
        formData.append("forRent", this.forRent);
        formData.append("forSale", this.forSale);
        formData.append("bookImage", this.bookImage);
        const headers = { "Content-Type": "multipart/form-data" };
        await axios
          .post("http://localhost:3000/books", formData, { headers })
          .then(
            (res) => {
              console.log(res);
              this.$router.push("/books");
              Swal.fire({
                icon: "success",
                title: "Book Successfully Added",
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
      this.name = "";
      this.courseId = "";
      this.edition = "";
      this.author = "";
      this.bookImage = "";
      this.userId = "";
      this.buyPrice = "";
      this.rentPrice = "";
      this.forRent = false;
      this.forSale = false;
      this.user_id = "";
      this.image_errors = "";
      this.validated = false;
      this.$refs.observer.reset();
    },

    onFileUpload(event) {
      this.bookImage = event.target.files[0];
      this.url = URL.createObjectURL(this.bookImage);
    },
  },

  created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
    this.getUser_();
  },
};
</script>

<style scoped>
.book {
  margin: 50;
}
</style>
