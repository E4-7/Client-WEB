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
    student: {},
    room: {},
    roomList: [],
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
    },
    logout: function(state) {
      if (state.user) {
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
    SET_USER_INFORMATION: function(state, payload) {
      state.user = payload;
    },
    SET_STUDENT_INFORMATION: function(state, payload) {
      state.student = payload;
    },
    SET_STUDENT_ROOM: function(state, payload) {
      state.room = payload;
    },
    SET_ROOMLIST(state, data) {
      state.roomList = data;
    },

    //  SET_NOWPASSWORD(state,data){
    //     state.password=data;
    //  },
    //  SET_NOWMANGEROOMID(state,data){
    //     state.nowManageRoomId.status=data.status;
    //     state.nowManageRoomId.isOpenbook=data.isOpenbook;
    //  },

    //  SET_NOW_EXAM_STATE(state,data){
    //     state.nowRoomId.status = data;
    //  },
    //  SET_OPENBOOK(state,data){
    //     state.nowRoomId.isOpenBook=data;
    //  },
    //  SET_NOW_STUDENT_DATA(state,data){
    //     state.nowStudentList=data;
    //  }
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
    // async CHECK_ROOM_VALID({ commit }, id){
    //         try{
    //             return await fetchIsValidRoom(id);
    //         }catch(err){
    //             throw new Error('failed to fetch new items');
    //         }
    //     },
    //     async CHECK_ROOM_MANAGE_VALID({ commit }, data){
    //         return await fetchIsValidRoomManager(data.id, data.password);
    //     },
    //     async CHECK_MANAGER_VALID({ commit }, data){
    //         return await fetchIsValidManager(data.roomNumber,data.password);
    //     },
    //     async CHECK_STUDENT_BY_OCR({ commit }, data){
    //         return await fetchStudentOCR(data.imageCapture,data.id,data.name);
    //     },
    //     async CREATE_HOST_ROOM({commit}, data){
    //         return await fetchCreateHost(data.subjectName,data.hostName,data.password,data.openTime,data.isOpenbook);
    //     },
    //     //관리자 시험 시작/중지
    //     async ONOFF_EXAM({commit}, data){
    //         return await fetchONOFFExam(data.roomNumber,data.status);
    //     },
    //     //학생 목록 리스트 디비에 저장
    //     async CREATE_GUEST_LIST({commit}, data){
    //         return await fetchCreateGuestList(data.lists,data.roomNumber);
    //     },
    //     async CHECK_GUEST_LIST({commit}, data){
    //         return await fetchGetGuestList(data.roomNumber);
    //     },
    //     // 학생 파일 업로드
    //     async CREATE_GUEST_EXAM_FILE({commit}, data){
    //         return await fetchCreateGuestExamFile(data.roomNumber,data.userName,data.file);
    //     },
    //     // 부정행위 인식
    //     async CHECK_CAM_MOBILE({commit}, data){
    //         return await fetchStudentMobileCam(data.imageCapture);
    //     }
  },
  // Computed 라고 봄.
  modules: {},
  getters: {
    // getRoomId: function(state) {
    //   return (state.count = state.count + 1);
    // },
    getRoomId: state => roomId => {
      // console.log('---roomList');
      // console.log(state.roomList);
      // console.log('roomId');
      // console.log(roomId);
      // console.log('state.roomList.find(roomList => roomList.roomId === roomId)');
      // console.log(state.roomList.find(roomList => roomList.roomId === roomId));
      return state.roomList.find(roomList => roomList.Exam.id === roomId);
    },
  },
});
