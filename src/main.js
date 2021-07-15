import Vue from 'vue'
import App from './App.vue'
import router from "./routes/index";
import store from "./store/index";
import VueMobileDetection from "vue-mobile-detection";
import "./fontAwesomeIcon.js";

Vue.config.productionTip = false

Vue.use(VueMobileDetection);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
