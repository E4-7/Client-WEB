import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import vuetify from './plugins/vuetify';
import AgoraRtcVue from 'agora-rtc-vue';
import 'agora-rtc-vue/lib/agora-rtc-vue.css';
import io from 'socket.io-client'; // 서버와 소켓 연결을 위한 모듈

const apiBaseURL = 'https://api.e47app.click/api/';
const socket = io(apiBaseURL); // 연결하고자 하는 서버의 url(바뀔 가능성)

const instance = axios.create({
  // .. congigure axios baseURL
  baseURL: `${apiBaseURL}`,
});
instance.defaults.withCredentials = true;

Vue.prototype.$http = instance;
Vue.prototype.$socket = socket; //socket을 vue 인스턴스 변수로 등록하여 컴포넌트에서 사용하도록

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
