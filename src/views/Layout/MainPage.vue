<template>
  <v-app>
    <v-main class="main-page-cardview-layout">
      <v-container fill-height fluid>
        <v-row align-center justify="center">
          <v-card class="main-page-cardview" elevation="2" outlined width="1200" min-height="768">
            <v-col class="main-page-image">
              <img calss="main-page-logo" src="@/assets/images/e47_logo_blue.png" />
            </v-col>
            <v-col class="main-page-text">
              <v-row justify="center">
                <v-card-text>
                  <div style="font-size: 20px">세종대학교 비대면 시험 감독</div>
                  <br />
                  <p class="text-h3 bold text--primary">
                    E4/7
                  </p>
                  <div class="text--primary">어서오세요.<br /></div>
                </v-card-text>
              </v-row>
              <v-row justify="center">
                <v-card-actions>
                  <v-col class="main-page-buttons">
                    <v-row class="main-page-button-row" justify="center">
                      <v-btn class="main-page-button" text :to="{ name: 'Student' }">학생 입장</v-btn>
                    </v-row>
                    <v-row class="main-page-button-row" justify="center">
                      <v-btn class="main-page-button" text color="colors.menu_background_color" :to="{ name: 'Login' }"> 감독관 입장</v-btn>
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
import {mapState} from 'vuex';
//import CardViewConponent from '@/components/CardViewComponent';

export default {
  name: 'Main',
  components: {},
  data: () => ({
    reveal: false,
  }),
  computed: mapState(['menus', 'colors']),
  methods: {
    enterStudentPage: function() {
      alert('Hello !22');
      this.$http.post(this.$store.state.host + '/student');
    },
    enterProfessorPage: function() {
      alert('Hello Professor !');
      this.$http.post(this.$store.state.host + '/login');
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

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
  background-color: #1187cf;
}
.main-page-text {
  float: none;
  margin: auto;
}
.main-page-button-row {
  padding: 10%;
  margin: 10%;
}
.main-page-button {
  font-size: 3ch;
}
.main-page-logo {
  text-align: left;
  vertical-align: top;
}
</style>
