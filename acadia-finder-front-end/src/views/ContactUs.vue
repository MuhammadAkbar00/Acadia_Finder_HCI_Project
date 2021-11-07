<template>
  <validation-observer ref="observer">
    <v-row justify="center" class="mt-10 pt-10">
      <v-col cols="12" lg="5" md="5" sm="8">
        <div class="div-label" justify="center" align="center">
          <p>Message Us With Your Concerns</p>
          <p style="font-size: 11pt">
            We'll get back to you as soon as possible
          </p>
        </div>

        <v-card elevation="0" class="pt-2">
          <v-img src="../assets/logo2.png" max-height="110" contain></v-img>
          <v-card-text>
            <div v-if="errors" class="text-left errors red--text">
              {{ errors }}
            </div>
            <form
              class="pt-10"
              ref="form"
              @submit.prevent="sendMessage"
              v-on:keyup="validator"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Name"
                rules="required"
              >
                <v-text-field
                  :error-messages="errors"
                  v-model="name"
                  :counter="20"
                  label="Name"
                  required
                ></v-text-field>
              </validation-provider>
              <validation-provider
                name="E-mail"
                rules="required|email"
                v-slot="{ errors }"
              >
                <v-text-field
                  :error-messages="errors"
                  v-model="email"
                  label="E-mail"
                  required
                ></v-text-field>
              </validation-provider>
              <validation-provider
                name="Message"
                rules="required"
                v-slot="{ errors }"
              >
                <v-textarea
                  :error-messages="errors"
                  v-model="message"
                  label="Message"
                  required
                ></v-textarea>
              </validation-provider>
              <v-card-actions>
                <v-btn
                  rounded
                  class="white--text mr-4"
                  color="rgb(6 67 121)"
                  type="submit"
                  :disabled="!validated"
                  >Submit</v-btn
                >
                <v-btn
                  rounded
                  color="red darken-3"
                  class="white--text mr-4"
                  @click="reset"
                  >Reset</v-btn
                >
              </v-card-actions>
            </form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </validation-observer>
</template>

<script>
import { required, email } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import axios from "axios";
import Swal from "sweetalert2";

setInteractionMode("eager");

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
    email: "",
    message: "",
    validated: false,
    errors: "",
  }),
  methods: {
    async sendMessage() {
      if (await this.$refs.observer.validate()) {
        await axios
          .post("http://localhost:3000/contact", {
            name: this.name,
            email: this.email,
            message: this.message,
          })
          .then(
            (res) => {
              console.log(res);
              this.$router.push("/contact");
              Swal.fire({
                icon: "success",
                title: "Message Successfully Sent",
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
    reset() {
      this.name = "";
      this.email = "";
      this.message = "";
      this.$refs.form.reset();
    },
  },
};
</script>

<style scoped>
.div-label {
  font-family: sans-serif;
  font-size: 18pt;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 50px;
  color: black;
}
</style>
