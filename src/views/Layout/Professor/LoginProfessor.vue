<template v-slot:activator="{ on, attrs }">
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
              <br />
              <v-col>
                <v-text-field v-model="user.email" @keyup.enter="goManagePage()" :rules="[rules.required, rules.email]" label="아이디 or E-mail" outlined></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="user.password"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show ? 'text' : 'password'"
                  label="비밀번호"
                  @keyup.enter="goManagePage()"
                  hint="input your password"
                  class="input-group--focused"
                  @click:append="show = !show"
                  outlined
                >
                </v-text-field>
              </v-col>
              <div v-show="!isloginpage">
                <v-col cols="12" sm="6">
                  <v-text-field v-model="user.name" label="성함" outlined></v-text-field>
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
import { mapState, mapActions } from 'vuex';
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
    ...mapState(['isLogin', 'isLoginError']),
  },
  methods: {
    ...mapActions(['loginStore']),
    $_comm_checkEmail(email) {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(email);
    },
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
      this.$http
        .post('users', {
          email: this.user.email,
          password: this.user.password,
          name: this.user.name,
        })
        .then(res => {
          if (res.data.success) {
            alert('회원가입 되셨습니다. 반갑습니다.', res.data);
            this.gosignin();
          } else {
            alert(res.data.data);
          }
        })
        .catch(error => {
          //console.error('There', error.response.data.data);
          alert(error.response.data.data);
        });
    },
    goManagePage() {
      //this.user.email == 'a@e4.seven'
      // 로그인,
      console.log('check');
      this.$http
        .post('users/login', {
          email: this.user.email,
          password: this.user.password,
        })
        .then(res => {
          if (res.data.data.Role.type == 2) {
            // 교수
            alert('로그인 되셨습니다. 교수님 반갑습니다.', res.data);
            console.log(res.data);
            console.log(res.data.data);
            this.$store.commit('login', res.data.data);
            this.$router.push('/main');
          } else {
            alert('로그인 되셨습니다. 조교님 반갑습니다.', res.data);
            // 콘솔
            this.$store.commit('login', res.data.data);
            this.$router.push('/main');
          }
        })
        .catch(error => {
          console.log(error);
          console.error('error cat', error.response.data.data);
          alert(error.response.data.data);
        });
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
