<template>
  <v-app>
    <v-main class="main-page-cardview-layout">
      <v-container fill-height fluid>
        <v-row align-center justify="center">
          <v-card class="main-page-cardview" elevation="2" outlined min-width="1200" min-height="700">
            <v-col class="main-page-image">
              <img calss="main-page-logo" src="@/assets/images/e47_logo_blue.png" />
            </v-col>
            <v-col class="main-page-text">
              <p class="text-h5 font-weight: bold">
                <strong>
                  {{ information }}
                </strong>
              </p>
              {{ subInformation }}
              <br />
              <v-row justify="center">
                <v-card-actions>
                  <v-btn v-if="!isloginpage" class="main-page-button" @click="gosignin()"> 뒤로</v-btn>
                </v-card-actions>
              </v-row>
              <v-row justify="center" style="padding:40px;">
                <v-file-input label="File input" @change="selectFile"></v-file-input>
              </v-row>
              <v-spacer></v-spacer>
              <v-row justify="center" style="padding-top:40px; justify-content: flex-end;">
                <v-btn @click="submitAnswer()">채점하기</v-btn>
              </v-row>
            </v-col>
          </v-card>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {mapActions, mapState} from 'vuex';
// import AlertTextDialog from '../components/AlertTextDialog.vue';
//import Modal from '../components/Modal.vue';

export default {
  name: 'Score',
  components: {
    //Modal,
    // 'alert-text-dialog': AlertTextDialog,
  },
  validations: {
    checkbox: {
      checked(val) {
        return val;
      },
    },
  },
  data: () => ({
    loading: false,
    setDialog: {
      dialog: false,
      dialogTitle: '',
      dialogMode: '',
      set: {
        _id: '',
        name: '',
      },
    },
    user: {
      email: '',
      password: '',
      name: '',
    },
    information: '시험지 자동 채점',
    subInformation: '시험지 자동채점을 위해 답이 기제된 시험지의 PNG 파일을 업로드 하고 "채점하기" 버튼을 눌러주세요.',
    isloginpage: true,
    show: false,
  }),
  computed: {
    ...mapState(['isLogin', 'isLoginError']),
  },
  methods: {
    // 파일 변경 시 이벤트 핸들러
    selectFile(file) {
      this.image = file;
      console.log(this.image);
    },
    async submitAnswer() {
      const formData = new FormData();
      formData.append('file', this.image);

      try {
        const {data} = await this.$http.post(`exams/${this.$route.params.roomId}/uploadAnswer`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        window.open(data.data.AnswerUrl);
        alert('시험지 제출 완료');
        this.$router.push('/main');
      } catch (err) {
        console.log(err);
        alert('시험지 제출 실패!!!');
      }
    },
    ...mapActions(['loginStore']),
    showDialog(mode) {
      console.log('다이알로그 열림');
      this.setDialog.dialog = true;
      this.setDialog.dialogMode = mode;
    },
    hideDialog() {
      console.log('다이알로그 닫음');
      this.setDialog.dialog = false;
    },
    onReset() {
      this.user.email = '';
      this.user.password = '';
      this.user.name = '';
    },
  },
};
</script>

<style scoped>
.main-page-cardview-layout {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); /* 자식요소에 translate 값 주기*/
}
.main-page-cardview {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.main-page-image {
  flex-basis: 30%;
  display: flex;
  flex-direction: column;
  background-color: #1187cf;
}
.main-page-text {
  text-align: center;
  justify-content: baseline;
  margin: auto;
}
.main-page-button-row {
  padding: 10%;
  margin: 10%;
}
.main-page-logo {
  text-align: left;
  vertical-align: top;
}
</style>
