import Vue from 'vue';
import Vuex from 'vuex';
//import router from '@/router';
//import createPersistedState from 'vuex-persistedstate';
//import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  // plugins: [
  //   createPersistedState({
  //     storage: window.sessionStorage,
  //     //sessionStorage.clear();사용자가 수동으로 로그 아웃 할 때 사용합니다 .
  //   }),
  // ],
  // 데이터, View와 직접적으로 연결되어 있는 Model
  // 변경 불가능하고 mutations을 통해서만 변경 가능, 반응적으로 View 업데이트
  state: {
    user: {
      id: '1f948424-a1f8-447a-bfac-f66c2d7126f1',
      email: 'a@e47.com',
      name: '김나영',
      status: 1,
      Role: {
        type: 2,
      },
    },
  },
  // state 변경하는 유일한 방법이고 이벤트와 유사
  // 첫번째 인자 state / 두번째 인자 payload
  mutations: {
    login: function(state, payload) {
      state.user = payload;
      console.log('payload');
      console.log(payload);
      console.log('state.user');
      console.log(state.user);
      // state.user.id = payload.id;
      // state.user.name = payload.name;
      // state.user.type = payload.Role.type;
    },
    logout: function(state) {
      if (state.user) {
        alert(state.user);
        state.user.id = '';
        state.user.email = '';
        state.user.name = '';
        state.user.status = '';
        state.user.Role.type = 0;

        // state.user = {
        //   id: '1f948424-a1f8-447a-bfac-f66c2d7126f1',
        //   email: 'a@e47.com',
        //   name: '구나영',
        //   status: 1,
        //   type: 2,
        // };
        alert('로그아웃 되었음');
      }
    },
    // loginCheck: function(state) {
    //   if (!state.token) {
    //     router.push({ name: 'login' }).catch(error => {
    //       console.log(error);
    //     });
    //   }
    // },
  },
  // mutations와 비슷하지만 비동기 작업 가능
  // 첫번째 인자를 context, context에는 state, commit, dispatch, rootstate / 두번째 인자 payload
  actions: {
    // signOut({ commit, state }) {
    //   const mb_name = state.user.name;
    //   commit(state.user, null);
    //   return mb_name;
    // },
  },
  // Computed 라고 봄.
  modules: {},
});
