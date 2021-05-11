import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import ErrorMessage from "@/components/error.vue";

import { formatTime, formatDate } from "@/filters/filters";

Vue.config.productionTip = false;

Vue.filter("formatTime", formatTime);
Vue.filter("formatDate", formatDate);

Vue.component("error-message", ErrorMessage);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
