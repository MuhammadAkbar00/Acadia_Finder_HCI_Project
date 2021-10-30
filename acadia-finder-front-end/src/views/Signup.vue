<template>
  <validation-observer ref="observer">
    <v-row justify="center" class="mt-10 pa-5">
      <v-col lg="6" sm="12" md="8">
        <h2 class="mb-5">Signup Form</h2>
        <form @submit.prevent="submit">
          <validation-provider
            v-slot="{ errors }"
            name="First name"
            rules="required"
          >
            <v-text-field
              v-model="firstName"
              :error-messages="errors"
              label="First name"
              required
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Last name"
            rules="required"
          >
            <v-text-field
              v-model="lastName"
              :error-messages="errors"
              label="Last name"
              required
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Username"
            rules="required"
          >
            <v-text-field
              v-model="userName"
              :error-messages="errors"
              label="Username"
              required
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Password"
            rules="required"
          >
            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              :error-messages="errors"
              label="Password"
              hint="At least 8 characters"
              @click:append="show1 = !show1"
              required
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="phoneNumber"
            :rules="{
              required: true,
              digits: 10,
            }"
          >
            <v-text-field
              v-model="phoneNumber"
              :error-messages="errors"
              label="Phone Number"
              required
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="email"
            rules="required|email"
          >
            <v-text-field
              v-model="email"
              :error-messages="errors"
              label="E-mail"
              required
            ></v-text-field>
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            name="Major"
            rules="required"
          >
            <v-text-field
              v-model="major"
              :error-messages="errors"
              label="Major - program of study"
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
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    phoneNumber: "",
    email: "",
    major: "",
    show1: false,
  }),

  methods: {
    async submit() {
      if (this.$refs.observer.validate()) {
        await axios
          .post("http://localhost:3000/users/signup", {
            firstName: this.firstName,
            lastName: this.lastName,
            userName: this.userName,
            email: this.email,
            password: this.password,
            phoneNumber: this.phoneNumber,
            major: this.major,
          })
          .then(
            (res) => {
              console.log(res);
              this.$router.push("/");
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
      this.firstName = "";
      this.lastName = "";
      this.userName = "";
      this.password = "";
      this.phoneNumber = "";
      this.email = "";
      this.major = "";
      this.$refs.observer.reset();
    },
  },
};
</script>