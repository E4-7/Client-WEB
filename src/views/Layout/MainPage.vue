<template>
  <v-app>
    <v-main class="main-page-cardview-layout">
      <v-container fill-height fluid>
        <v-row align-center justify="center">
          <v-card class="main-page-cardview" min-width="900" min-height="500">
            <v-col class="main-page-image"></v-col>
            <v-col class="main-page-text">
              <v-card-text>
                <div>세종대학교 비대면 시험 감독</div>
                <p class="text-h4 text--primary">
                  E4/7
                </p>
                <div class="text--primary">어서오세요.<br /></div>
              </v-card-text>
              <v-card-actions>
                <v-col class="main-page-buttons">
                  <v-row class="main-page-button-row" justify="center">
                    <v-btn
                      class="main-page-button"
                      rounded
                      color="primary"
                      dark
                      v-on:click="enterStudentPage"
                      >학생 입장</v-btn
                    >
                  </v-row>
                  <v-row class="main-page-button-row" justify="center">
                    <v-btn
                      class="main-page-button"
                      rounded
                      color="primary"
                      dark
                      @click="reveal = true"
                      >감독관 입장</v-btn
                    >
                  </v-row>
                </v-col>
              </v-card-actions>
            </v-col>
          </v-card>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Main',
  components: {},
  data: () => ({
    reveal: false,
  }),
  methods: {
    enterStudentPage: function() {
      alert('Hello !');
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
  background-color: blue;
}
.main-page-text {
  left: 50%;
  top: 50%;
}
.main-page-button-row {
  padding: 10%;
  margin: 10%;
}
.main-page-button {
  font-size: 2ch;
}
</style>
