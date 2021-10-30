<template>
  <validation-observer ref="observer">
    <v-row justify="center" class="mt-10 pa-5">
      <v-col lg="6" sm="12" md="8">
        <h2 class="mb-5">Add Book Form</h2>
        <form @submit.prevent="submit">
          <validation-provider v-slot="{ errors }" name="Name" rules="required">
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
          <validation-provider
            v-slot="{ errors }"
            name="Book Image"
            rules="required"
          >
            <v-text-field
              v-model="bookImage"
              :error-messages="errors"
              label="Book Image"
              required
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Buying Price"
            rules="required"
          >
            <v-text-field
              v-model="buyPrice"
              :error-messages="errors"
              label="Buying Price"
              type="Number"
              required
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Rent Price"
            rules="required"
          >
            <v-text-field
              v-model="rentPrice"
              :error-messages="errors"
              label="Rent Price"
              type="Number"
              required
            ></v-text-field>
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            rules="required"
            name="For Rent"
          >
            <v-checkbox
              v-model="forRent"
              :error-messages="errors"
              value="1"
              label="For Rent"
              type="checkbox"
              required
            ></v-checkbox>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            rules="required"
            name="For Sale"
          >
            <v-checkbox
              v-model="forSale"
              :error-messages="errors"
              value="1"
              label="For Sale"
              type="checkbox"
              required
            ></v-checkbox>
          </validation-provider>

          <v-btn dark class="mr-4" color="green" type="submit" rounded>
            submit
          </v-btn>
          <v-btn dark @click="clear" color="red" rounded> clear </v-btn>
        </form>
      </v-col>
    </v-row>
  </validation-observer>
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
    forRent: Boolean,
    forSale: Boolean,
    show1: false,
    user_id: "",
  }),

  computed: {
    ...mapState(["current_user"])
  },

  methods: {
    ...mapActions(["getUser"]),
    // Get the user with token given
    async getUser_() {
      await this.getUser();
      this.user_id = this.current_user._id;
    },

    async submit() {
      if (this.$refs.observer.validate()) {
        await axios
          .post("http://localhost:3000/books", {
            name: this.name,
            courseId: this.courseId,
            edition: this.edition,
            author: this.author,
            bookImage: this.bookImage,
            userId: this.user_id,
            buyPrice: this.buyPrice,
            rentPrice: this.rentPrice,
            forRent: this.forRent,
            forSale: this.forSale,
          })
          .then(
            (res) => {
              console.log(res);
              this.$router.push("/books");
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
      this.name = "";
      this.courseId = "";
      this.edition = "";
      this.author = "";
      this.bookImage = "";
      this.userId = "";
      this.buyPrice = "";
      this.rentPrice = "";
      this.forRent = "";
      this.forSale = "";
      this.user_id = "";
      this.$refs.observer.reset();
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