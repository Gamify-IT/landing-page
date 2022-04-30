import Vue from "vue";
import App from "./App.vue";

import { MdButton, MdField, MdCard } from "vue-material/dist/components";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

import "./unity-script";

Vue.use(MdButton);
Vue.use(MdField);
Vue.use(MdCard);

new Vue({
  el: "#app",
  render: h => h(App)
});
