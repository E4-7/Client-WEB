import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import vuetify from './plugins/vuetify';
import 'agora-rtc-vue/lib/agora-rtc-vue.css';
import AgoraRtcVue from 'agora-rtc-vue';
const apiBaseURL = 'https://api.e47app.click/api/';

const instance = axios.create({
  // .. congigure axios baseURL
  baseURL: `${apiBaseURL}`,
});
instance.defaults.withCredentials = true;

Vue.prototype.$http = instance;

Vue.use(AgoraRtcVue, {
  appid: '8bfce6e171ef47779ac175c6a9809767',
  token: '244b84aba3ed484f99eb7b72a0a9136d',
});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app');
