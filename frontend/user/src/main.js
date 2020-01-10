/*!

=========================================================
* Vue Argon Design System - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system/blob/master/LICENSE.md)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from "vue";
import App from "./App.vue";
import { router } from "./router";
import Argon from "./plugins/argon-kit";
import vSelect from "vue-select";
import VueI18n from "vue-i18n";
import './registerServiceWorker'
import messages from './i18n';
// import Vuex from 'vuex';
// import { authAction, alert } from "./store";
import { store } from './store';

Vue.config.productionTip = false;
Vue.use(Argon);
Vue.use(VueI18n);
// Vue.use(Vuex);


// const store = new Vuex.Store({});
// store.registerModule('auth',  authAction);
// store.registerModule('alert'  ,alert);

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  silentFallbackWarn: true,
  messages
});


Vue.component('v-select', vSelect);
Vue.mixin({
  methods: {
    isEmpty(str){
      return str === null || str === undefined || str === false || str === "";
    }
  }
});
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
