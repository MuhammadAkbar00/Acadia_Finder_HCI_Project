<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center" dense>
      <v-col cols="12" lg="5" md="5" sm="8">
        <div class="div-label" justify="center" align="center">
          <p>Message Us With Your Concerns</p>
          <p style="font-size:11pt">We'll get back to you as soon as possible</p>
        </div>
        <v-card elevation="0" class="pt-2">
          <v-img src="../assets/logo2.png" max-height="110" contain></v-img>
          <v-card-text>
            <v-form class="pt-10" ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="name"
                :counter="20"
                :rules="nameRules"
                label="Name"
                required
              ></v-text-field>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
              <v-textarea
                v-model="message"
                :rules="messageRules"
                label="Message"
                required
              ></v-textarea>
              <v-card-actions>
                <v-btn
                  class="white--text mr-4"
                  :disabled="!valid"
                  color="light-blue darken-4"
                  @click="validate"
                  >Submit</v-btn
                >
                <v-btn color="red darken-3" class="white--text mr-4" @click="reset">Reset</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ContactUs",
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 20) || "Name must be less than 20 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    message: "",
    messageRules: [
      (v) => !!v || "Message is required",
      (v) => (v && v.length >= 10) || "Message must be more than 10 characters",
    ],
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
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