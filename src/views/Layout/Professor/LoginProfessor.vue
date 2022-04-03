<template>
  <v-app>
    <v-main class="main-page-cardview-layout">
      <v-container fill-height fluid>
        <v-row align-center justify="center">
          <v-card
            class="main-page-cardview"
            elevation="2"
            outlined
            min-width="1200"
            min-height="700"
          >
            <v-col class="main-page-image">
              <img
                calss="main-page-logo"
                src="@/assets/images/e47_logo_blue.png"
              />
            </v-col>
            <v-col class="main-page-text">
              <p class="text-h5 font-weight: bold">
                <strong>
                  {{ information }}
                </strong>
              </p>
              <br />
              <v-col>
                <v-text-field
                  v-model="email"
                  :rules="[rules.required, rules.email]"
                  label="E-mail"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col>
                <!--나중에 눈 아이콘 넣기-->
                <v-text-field
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show ? 'text' : 'password'"
                  name="input-10-2"
                  label="비밀번호"
                  hint="At least 8 characters"
                  class="input-group--focused"
                  @click:append="show = !show"
                  outlined
                >
                </v-text-field>
              </v-col>
              <div v-show="!isloginpage">
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="name"
                    label="성함"
                    outlined
                  ></v-text-field>
                </v-col>
              </div>
              <div v-show="isloginpage">
                <p class="text--primary">
                  혹시 아이디가 없으신가요?
                  <v-btn @click="signup()" text>회원가입하기</v-btn>
                </p>
              </div>
              <v-row justify="center">
                <v-card-actions>
                  <v-btn
                    v-if="!isloginpage"
                    class="main-page-button"
                    @click="signin()"
                  >
                    뒤로</v-btn
                  >
                  <v-col class="main-page-buttons">
                    <v-row class="main-page-button-row" justify="center">
                      <v-btn
                        v-if="isloginpage"
                        class="main-page-button"
                        :to="{ name: 'Manage' }"
                      >
                        로그인</v-btn
                      >

                      <v-btn
                        v-if="!isloginpage"
                        class="main-page-button"
                        primary
                        :to="{ name: 'Manage' }"
                      >
                        회원가입</v-btn
                      >
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
export default {
  name: 'Professor',
  validations: {
    checkbox: {
      checked(val) {
        return val;
      },
    },
  },
  data: () => ({
    information: '관리자 로그인',
    isloginpage: true,
    show: false,
    name: '',
    email: '',
    rules: {
      required: value => !!value || 'Required.',
      counter: value => value.length <= 20 || 'Max 20 characters',
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || 'Invalid e-mail.';
      },
    },
  }),
  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push('You must agree to continue!');
      return errors;
    },
    selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push('Item is required');
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push('Name must be at most 10 characters long');
      !this.$v.name.required && errors.push('Name is required.');
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push('Must be valid e-mail');
      !this.$v.email.required && errors.push('E-mail is required');
      return errors;
    },
  },
  methods: {
    signup() {
      this.isloginpage = false;
      this.information = '교수 회원가입';
    },
    signin() {
      this.isloginpage = true;
      this.information = '관리자 로그인';
    },
    required() {},
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.name = '';
      this.email = '';
      this.select = null;
      this.checkbox = false;
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
