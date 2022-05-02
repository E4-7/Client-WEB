import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
//import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      //sessionStorage.clear();사용자가 수동으로 로그 아웃 할 때 사용합니다 .
    }),
  ],
  // 데이터, View와 직접적으로 연결되어 있는 Model
  // 변경 불가능하고 mutations을 통해서만 변경 가능, 반응적으로 View 업데이트
  state: {
    host: 'http://localhost:8080/',
    databaseURL: 'http://34.64.135.58:3000/api/',
  },
  // state 변경하는 유일한 방법이고 이벤트와 유사
  // 첫번째 인자 state / 두번째 인자 payload
  mutations: {},
  // mutations와 비슷하지만 비동기 작업 가능
  // 첫번째 인자를 context, context에는 state, commit, dispatch, rootstate / 두번째 인자 payload
  actions: {},
  // Computed 라고 봄.
  modules: {},
});
