import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import vuetify from './plugins/vuetify';

const apiBaseURL = 'https://api.e47app.click/api/';
const instance = axios.create({
  // .. congigure axios baseURL
  baseURL: `${apiBaseURL}`,
});
instance.defaults.withCredentials = true;

Vue.prototype.$http = instance;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app');
