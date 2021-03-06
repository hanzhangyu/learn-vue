import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
import App from "./App.vue";

Vue.use(VueCompositionApi);

new Vue(App).$mount("#app");
