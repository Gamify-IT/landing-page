import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import { MdButton, MdField, MdCard } from "vue-material/dist/components";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

import CxltToastr from 'cxlt-vue2-toastr'

import { hasToken } from "./js/login-rest-client";

Vue.use(CxltToastr)

import "./style.css";

Vue.use(MdButton);
Vue.use(MdField);
Vue.use(MdCard);

router.beforeEach((to, from, next) => {
  if (hasToken() && (to.name == "Login" || to.name == "Register")) {
    next({ name: "App" });
  } else if (!hasToken() && to.name == "App") {
    next({ name: "Login" });
  } else if (to.name == "Not-Found") {
    next({ name: "App" });
  }
  next();
});

new Vue({
  router,
  el: "#app",
  render: (h) => h(App),
});
