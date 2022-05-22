<template>
  <v-app>
    <v-main class="main-page-cardview-layout">
      <v-container fill-height fluid>
        <v-row align-center justify="center">
          <v-stepper v-model="e1" class="main-page-cardview" elevation="2" outlined width="1200" min-height="768">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1">
                입장코드
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 2" step="2">
                학번, 이름
              </v-stepper-step>
              <!-- <v-divider></v-divider>
              <v-stepper-step step="3">
                본인인증(학생증)
              </v-stepper-step> -->
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card class="mb-12" color="grey lighten-1" height="500px">
                  <v-row class="main-page-text">
                    <v-card-text>
                      <br />
                      <br />
                      <div style="font-size: 30px">
                        입장 코드
                      </div>
                      <br />
                      <p class="body-1 my-4 bold text--primary">
                        전달 받은 입장 코드를 입력해주세요!
                      </p>
                      <br />
                      <br />
                      <v-text-field placeholder="input code" autofocus @keyup.enter="e1 = 2" outlined label="코드" v-model="enterCode" :rules="rules"> </v-text-field>
                    </v-card-text>
                  </v-row>
                </v-card>
                <div class="verify-identity-button">
                  <v-btn rounded color="primary" dark @click="e1 = 2">
                    다음
                  </v-btn>
                </div>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-card class="mb-12" color="grey lighten-1" height="500px">
                  <v-row class="main-page-text">
                    <v-card-text>
                      <div style="font-size: 30px">
                        학번
                      </div>
                      <br />
                      <v-text-field outlined label="학번" v-model="enterStudentId" :rules="rules" @keyup.enter="checkStudentIdentity"> </v-text-field>
                      <div style="font-size: 30px">
                        이름
                      </div>
                      <br />
                      <v-text-field placeholder="input your name" outlined label="이름" v-model="enterName" :rules="rules" @keyup.enter="checkStudentIdentity"> </v-text-field>
                    </v-card-text>
                  </v-row>
                </v-card>
                <div class="verify-identity-button">
                  <v-btn text @click="e1 = 1">
                    뒤로
                  </v-btn>
                  <v-btn rounded color="primary" dark @click="checkStudentIdentity">
                    다음
                  </v-btn>
                </div>
              </v-stepper-content>

              <v-stepper-content step="3">
                {{ infromessage }}
                <!-- <v-card class="mb-12" color="grey lighten-1" height="500px"
                  ><div>
                    <agora :channel="channel">
                      <agora-audio-sender />
                      <agora-audio-receiver />
                      <agora-video-receiver />
                      <agora-video-sender />
                    </agora></div
                ></v-card> -->

                <!-- <v-btn text @click="changeIdentity()">
                  혹시 학생증이 없거나 인식이 안되나요?
                </v-btn>
                <v-btn class="verify-identity-button" rounded color="primary" @click="enterStudentSettingPage()">
                  완료
                </v-btn> -->
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
//import Waiting from './WaitingRoom.vue';

export default {
  name: 'Student',
  components: {},
  data: () => ({
    channel: '123111',
    enterCode: '',
    enterStudentId: '',
    enterName: '',
    infromessage: '사각형에 맞춰 학생증을 맞추고 기다려주세요..',
    e1: 1,
    reveal: false,
    rules: [value => !!value || 'Required.', value => (value && value.length >= 2) || 'Min 2 characters'],
  }),
  methods: {
    checkStudentIdentity: function() {
      this.$http
        .post(`exams/${this.enterCode}/students/authentic`, {
          name: this.enterName,
          studentID: this.enterStudentId,
        }) //065eef1e-28c7-4ed6-b70f-f9ea0753d0f6
        .then(res => {
          console.log(res);
          this.enterStudentSettingPage();
          //this.e1 = 3;
        })
        .catch(error => {
          console.log(error);
          alert('올바르지 않은 사용자 입니다.');
        });
    },
    enterStudentSettingPage: function() {
      alert('Hello !22');
      let p = '/set/' + this.enterCode;
      this.$router.push({ path: p, query: { id: this.enterStudentId, name: this.enterName } }); // ,
      // vuex로 바꾸기
    },
    addStudentExamId: function(id) {
      return document.location.pathname + '/' + id;
    },
    changeIdentity: function() {
      // 신분증으로 신원확인하기
      this.infromessage = '신분증을 얼굴 옆에 들어주고 기다려주세요.';
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
  /* display: flex; */
}
.main-page-text {
  float: none;
  margin: auto;
}
.main-page-image {
  background-color: blue;
}
.verify-identity-button {
  float: right;
}
</style>
