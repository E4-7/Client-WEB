<template>
  <v-app>
    <v-main class="main-page-cardview-layout">
      <v-container fill-height fluid>
        <v-row align-center justify="center">
          <v-stepper
            v-model="e1"
            class="main-page-cardview"
            elevation="2"
            outlined
            width="1200"
            min-height="768"
          >
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1">
                입장코드
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 2" step="2">
                학번, 이름
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="3">
                본인인증(학생증)
              </v-stepper-step>
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
                      <v-text-field
                        placeholder="input code"
                        outlined
                        label="코드   "
                        :rules="rules"
                      >
                      </v-text-field>
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
                      <v-text-field outlined label="학번" :rules="rules">
                      </v-text-field>
                      <div style="font-size: 30px">
                        이름
                      </div>
                      <br />
                      <v-text-field
                        placeholder="input your name"
                        outlined
                        label="이름"
                        :rules="rules"
                      >
                      </v-text-field>
                    </v-card-text>
                  </v-row>
                </v-card>
                <div class="verify-identity-button">
                  <v-btn text @click="e1 = 1">
                    뒤로
                  </v-btn>
                  <v-btn rounded color="primary" dark @click="e1 = 3">
                    다음
                  </v-btn>
                </div>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card
                  class="mb-12"
                  color="grey lighten-1"
                  height="500px"
                ></v-card>
                <v-btn
                  class="verify-identity-button"
                  rounded
                  color="primary"
                  @click="e1 = 1"
                >
                  완료
                </v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Student',
  components: {},
  data: () => ({
    e1: 1,
    reveal: false,
    rules: [
      value => !!value || 'Required.',
      value => (value && value.length >= 3) || 'Min 3 characters',
    ],
  }),
  methods: {},
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
