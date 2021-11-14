<template>
  <v-container class="mt-15 pt-15 text-center">
    <v-form @submit.prevent="loginUser" v-model="valid" ref="form">
      <h1 class="mb-10">Admin Login</h1>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-text-field
            v-model="email"
            :counter="50"
            label="Email"
            :rules="emailRules"
            required
            class="my-5"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            :rules="passwordRules"
            required
            placeholder=" "
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
          ></v-text-field>
          <div v-if="errors" class="text-left errors">
            {{ errors }}
          </div>
          <v-btn
            block
            rounded
            class="mt-15 white--text"
            color="rgb(6 67 121)"
            type="submit"
            >Login</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    valid: false,
    show1: false,
    errors: "",
    email: "",
    emailRules: [
      (v) => !!v || "Username is required",
      (v) => v.length <= 50 || "Username must be 50 characters or less",
    ],
    password: "",
    passwordRules: [(v) => !!v || "Password is required"],
  }),
  methods: {
    async loginUser() {
      if (this.$refs.form.validate()) {
        await axios
          .post("http://localhost:3000/admin/login", {
            email: this.email,
            password: this.password,
          })
          .then(
            (res) => {
              //if successfull
              if (res.status === 200) {
                // localStorage.setItem("admin_token", res.data.admin_token);
                localStorage.setItem("admin_token", res.data.admin_token);
                localStorage.setItem("admin", res.data.admin.name);
                this.$router.push("/admin");
              }
              this.$store.state.adminLoggedIn = true;
            },
            (err) => {
              this.errors = err.response.data.error;
            }
          );
      }
    },
  },
};
</script>

<style scoped>
.errors {
  color: #b71c1c;
  line-height: 12px;
}
</style>