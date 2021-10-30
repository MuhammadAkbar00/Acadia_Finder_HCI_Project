import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Books from "./views/Books.vue";
<<<<<<< HEAD
import Login from "./views/Login.vue";
=======
import Signup from "./views/Signup.vue";
>>>>>>> origin/main


Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/books",
      name: "books",
      component: Books
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
    }
  ]
});
