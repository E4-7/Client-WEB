import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
const apiBaseURL = 'https://api.e47app.click/api/';

const instance = axios.create({
  // .. congigure axios baseURL
  baseURL: `${apiBaseURL}`,
});
instance.defaults.withCredentials = true;

Vue.prototype.$http = instance;

import AgoraRtcVue from 'agora-rtc-vue';
import 'agora-rtc-vue/lib/agora-rtc-vue.css';
Vue.use(AgoraRtcVue, {});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app');
