import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Books from "./views/Books.vue";
import Users from "./views/Users.vue";
import Login from "./views/Login.vue";
import Signup from "./views/Signup.vue";
import Notes from "./views/Notes.vue";
import AddBooks from "./views/AddBooks.vue";
import AddNotes from "./views/AddNotes.vue";
import ContactUs from "./views/ContactUs.vue";


Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/books",
      name: "books",
      component: Books
    },
    {
      path: "/users",
      name: "users",
      component: Users
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
    },
    {
      path: "/notes",
      name: "notes",
      component: Notes
    },
    {

      path: "/addbooks",
      name: "addbooks",
      component: AddBooks
    },
    {
      path: "/addnotes",
      name: "addnotes",
      component: AddNotes
    },
    {
      path: "/contact",
      name: "contact",
      component: ContactUs
    }
  ]
});
