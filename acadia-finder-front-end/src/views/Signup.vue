<template>
  <div class="mt-15 pt-5">
    <validation-observer ref="observer">
      <v-row justify="center" class="mt-10 pa-5">
        <v-col lg="6" sm="12" md="8">
          <h2 class="mb-5">Signup Form</h2>
          <div v-if="errors" class="text-left errors red--text text--darken-3">
            {{ errors }}
          </div>
          <form @submit.prevent="submit" ref="form" v-on:keyup="validator">
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
              name="Email"
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
              name="Password"
              rules="required"
              vid="password"
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
              name="Confirm Password"
              rules="confirmed:password"
            >
              <v-text-field
                v-model="confirmPassword"
                :type="show1 ? 'text' : 'password'"
                :error-messages="errors"
                label="Confirm Password"
                hint="Password must match"
                required
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Phone Number"
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
              name="Major"
              rules="required"
            >
              <v-text-field
                v-model="major"
                :error-messages="errors"
                label="Major - Program of Study"
                required
              ></v-text-field>
            </validation-provider>

            <v-btn
              class="mr-4 mt-10 white--text"
              color="rgb(6 67 121)"
              type="submit"
              rounded
              :disabled="!validated"
            >
              submit
            </v-btn>
            <v-btn 
              rounded
              class="mt-10 white--text"
              color="red darken-3" 
              @click="clear" 
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
import { required, digits, email, confirmed } from "vee-validate/dist/rules";
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
  message: "{_field_} must to be {length} digits. ({_value_})",
});

extend("required", {
  ...required,
  message: "{_field_} cannot be empty",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

extend("confirmed", {
  ...confirmed,
  message: "Password must match",
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
    confirmPassword: "",
    phoneNumber: "",
    email: "",
    major: "",
    show1: false,
    validated: false,
    errors: "",
  }),

  methods: {
    async submit() {
      if (await this.$refs.observer.validate()) {
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
            async (res) => {
              await axios
                .post("http://localhost:3000/users/login", {
                  email: res.data.email,
                  password: this.password,
                })
                .then(
                  (res) => {
                    //if successfull
                    if (res.status === 200) {
                      localStorage.setItem("token", res.data.token);
                      this.$router.push("/");
                    }
                    Swal.fire({
                      icon: "success",
                      title: "Account Successfully Created",
                      showConfirmButton: false,
                      timer: 2000,
                    });
                    this.$store.state.isLoggedIn = true;
                  },
                  (err) => {
                    this.errors = err.response.data.error;
                  }
                );
              // this.$router.push("/login");
              // this.$router.go();
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
      this.firstName = "";
      this.lastName = "";
      this.userName = "";
      this.password = "";
      this.confirmPassword = "";
      this.phoneNumber = "";
      this.email = "";
      this.major = "";
      this.errors = "";
      this.$refs.observer.reset();
    },
  },
};
</script>