import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from "./router";
import vuex from "vuex";
import store from "./store";


Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  vuex,
  store,
  render: h => h(App)
}).$mount('#app')
