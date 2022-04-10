<template v-slot:activator="{ on, attrs }">
  <v-app>
    <v-alert type="error">{{ errormessage }}</v-alert>
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
              <br />
              <v-col>
                <v-text-field v-model="user.email" :rules="[rules.required, rules.email]" label="아이디 or E-mail" outlined></v-text-field>
              </v-col>
              <v-col>
                <!--나중에 눈 아이콘 넣기-->
                <v-text-field
                  v-model="user.password"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show ? 'text' : 'password'"
                  label="비밀번호"
                  hint="input your password"
                  class="input-group--focused"
                  @click:append="show = !show"
                  outlined
                >
                </v-text-field>
              </v-col>
              <div v-show="!isloginpage">
                <v-col cols="12" sm="6">
                  <v-text-field v-model="name" label="성함" outlined></v-text-field>
                </v-col>
              </div>
              <div v-show="isloginpage">
                <p class="text--primary">
                  혹시 아이디가 없으신가요?
                  <v-btn @click="gosignup()" text>회원가입하기</v-btn>
                </p>
              </div>
              <v-row justify="center">
                <v-card-actions>
                  <v-btn v-if="!isloginpage" class="main-page-button" @click="gosignin()"> 뒤로</v-btn>
                  <v-col class="main-page-buttons">
                    <v-row class="main-page-button-row" justify="center">
                      <v-btn :loading="loading" v-if="isloginpage" class="main-page-button" @click="goManagePage()"> 로그인</v-btn>

                      <v-btn v-if="!isloginpage" class="main-page-button" primary @click="submit()"> 회원가입</v-btn>
                    </v-row>
                  </v-col>
                </v-card-actions>
              </v-row>
            </v-col>
          </v-card>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import AlertTextDialog from '../components/AlertTextDialog.vue';
//import Modal from '../components/Modal.vue';

export default {
  name: 'Login',
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
    errormessage: '테스튼데 놀라지마세여.. 히히',
    information: '관리자 로그인',
    isloginpage: true,
    show: false,
    rules: {
      required: value => !!value || 'Required.',
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || 'Invalid e-mail.';
      },
    },
  }),
  computed: {
    // vaildation 고민중,, 무거워지려나
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push('Must be valid e-mail');
      !this.$v.email.required && errors.push('E-mail is required');
      return errors;
    },
  },
  methods: {
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
    gosignup() {
      this.onReset();
      this.isloginpage = false;
      this.information = '교수 회원가입';
    },
    gosignin() {
      this.onReset();
      this.isloginpage = true;
      this.information = '관리자 로그인';
    },
    submit() {
      // 회원가입시 처리해줘야 하는 것
    },
    goManagePage() {
      // 로그인 되었을 시,
      // 서버랑 통신하는 거
      if (this.user.email) {
        //this.user.email == 'a@e4.seven'
        if (this.user.password) {
          this.showDialog('Text');
          alert('로그인 ok');
          this.$router.push('/professor');
        } else {
          this.loading = true;
          this.showDialog('Text');
          alert('비번 틀림');
          this.loading = false;
          //showDialog;
        }
      } else {
        this.loading = true;
        this.showDialog('Text');
        alert('존재하지 않는 아이디');
        this.loading = false;
      }
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
