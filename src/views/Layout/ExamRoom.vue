<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <v-row justify="center" style="padding:20px; padding-left: 90px;">
          <v-col justify="center">
            <v-row justify="center" cols="12" class="text-center" style="padding: 20px;">
              <h1 class="display-2 font-weight-bold mb-3 text-center">
                {{ this.classInformation.title }}
              </h1>
              <v-btn text style="color: blue;">학생관리(35/37)</v-btn>
            </v-row>
            <v-row dense>
              <v-col v-for="n in 9" :key="n" cols="12" md="4" sm="4">
                <v-card class="pa-3" outlined tile style="height: 350px;" color="#385F73"> Student #{{ n }} </v-card>
              </v-col>
            </v-row>
            <div class="text-center" style="padding: 20px;">
              <v-pagination v-model="page" :length="6"></v-pagination>
            </div>
          </v-col>
          <v-col>
            <v-row cols="12" justify="center" style="padding: 20px; padding-top: 70px;">
              <h1>시험상태 : {{ this.classInformation.state }}({{ this.classInformation.kind }})</h1>
            </v-row>
            <v-row cols="12" justify="center">
              <h4 class="display-2 font-weight-bold mb-3">42:44(</h4>
            </v-row>
            <v-row justify="center" style="padding: 20px;">
              <v-col cols="2"><v-btn>시험 시작</v-btn></v-col>
              <v-col cols="2"><v-btn>시험 종료</v-btn></v-col>
            </v-row>
            <v-row cols="12">
              <v-card class="mx-auto" min-height="800" max-width="700" min-width="700">
                <v-card-text>
                  <div>채팅tddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddhe Day</div>
                  <p class="text-h4 text--primary">
                    채팅채팅채팅채팅채팅채팅채팅
                  </p>
                  <p>채팅채팅</p>
                  <div class="text--primary">
                    채팅채팅.<br />
                    채팅채팅
                  </div>
                  <v-spacer></v-spacer>
                </v-card-text>
              </v-card>
            </v-row>
            <v-row cols="12" justify="center">
              <v-toolbar dark max-width="700" min-width="700">
                <v-text-field max-width="100" type="text" label="   " placeholder="메세지를 입력하세요." filled v-model.trim="msg" @keyup.enter="submitMessage"></v-text-field>
                <v-card class="pa-2" tile>
                  <div @click="submitMessage" class="form__submit">
                    <svg width="30" height="30" viewBox="0 0 68 68" fill="#CCCCCC" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_26_10)">
                        <path
                          d="M48.0833 19.799C48.619 20.3347 48.806 21.127 48.5665 21.8457L35.8385 60.0294C35.5946 60.7614 34.9513 61.2877 34.1855 61.382C33.4198 61.4763 32.6681 61.1217 32.2539 60.4707L22.593 45.2893L7.41158 35.6285C6.76065 35.2142 6.40604 34.4625 6.50031 33.6968C6.59458 32.931 7.12092 32.2878 7.85287 32.0438L46.0366 19.3159C46.7553 19.0763 47.5476 19.2633 48.0833 19.799ZM26.5903 44.1204L33.3726 54.7782L42.0926 28.6181L26.5903 44.1204ZM39.2642 25.7897L23.7619 41.292L13.1041 34.5097L39.2642 25.7897Z"
                          fill=""
                        />
                      </g>
                    </svg>
                  </div>
                </v-card>
              </v-toolbar>
            </v-row>
          </v-col>
        </v-row>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      msg: '',
      classInformation: {
        title: '알고리즘',
        kind: '오픈북',
        state: '진행중',
        time: '??',
      },
      path: {
        recrumentId: '',
        companyId: '',
        current: '',
      },
    };
  },
  created() {
    // this.path.companyId = this.$route.params.id;
    // this.path.recrumentId = this.$route.params.recrumentId;
    // this.path.current = document.location.pathname;
  },
  methods: {
    submitMessage() {
      if (this.msg) {
        this.$emit('submitMessage', this.msg);
        this.msg = '';
      }
      return;
    },
  },
};
</script>

<style scoped></style>
