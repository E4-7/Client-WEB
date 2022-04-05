<template>
  <v-app>
    <v-main class="main-page-cardview-layout">
      <menu-bar></menu-bar>
      <v-container fill-height fluid>
        <v-row align-center justify="center">
          <v-card
            class="main-page-cardview"
            elevation="2"
            outlined
            width="1200"
            min-height="768"
          >
            <v-col class="main-page-image">
              <img
                calss="main-page-logo"
                src="@/assets/images/e47_logo_blue.png"
              />
            </v-col>
            <v-col class="main-page-text">
              <v-row justify="center">
                <div style="display: flex">
                  <v-card v-for="(classCard, id) in classCards" :key="id">
                   <v-toolbar class="professor-page-class-toolbar" 
                    color="primary">
                    <v-btn text>입장
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn icon
                    @click="reveal = !reveal"
                    >
                      <v-icon>more_vert</v-icon>
                    </v-btn>
                  </v-toolbar>
                    <router-link
                      href="javascript:void(0)"
                      :to="openClassCard(classCard.id)"
                    >
                      <v-card
                        class="professor-page-cardview"
                        elevation="2"
                        outlined
                        height="200"
                        width="190"
                      >
                    </v-btn>
                        <strong>{{ classCard.classname }}</strong>
                        <br /><br />
                        <p>{{ classCard.date }}</p>
                        <p>{{ classCard.time }}</p>
                      </v-card>
                    </router-link>
                    <v-expand-transition>
      <v-card
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal"
        style="height: 100%;"
      >
        <v-card-text class="pb-0">
          <p class="text-h4 text--primary">
            Origin
          </p>
          <p>late 16th century (as a noun denoting a pl from medieval Latin eleemosynarius, from late Latin eleemosyna ‘alms’, from Greek eleēmosunē ‘compassion’ </p>
        </v-card-text>
        <v-card-actions class="pt-0">
        </v-card-actions>
      </v-card>
    </v-expand-transition>
                   
                  </v-card>
                </div>
              </v-row>
              <br />
            </v-col>
          </v-card>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import MenuBar from '../MenuBar.vue';

export default {
  name: 'Professor',
  components: { MenuBar },
  data() {
    return {
      reveal: false,
      classCards: [
        {
          id: '1',
          classname: '운영체제',
          date: '2022.04.15',
          time: '16:00',
        },
        {
          id: '2',
          classname: '데이터베이스',
          date: '2022.04.16',
          time: '12:00',
        },
      ],
    };
  },
  methods: {
    openClassCard: function(title) {
      return document.location.pathname + '/' + title;
    },
    getClassList() {
      // 데이터 가져오기
    },
  },
  mounted() {
    // 페이지 시작하면은 자동 함수 실행
    this.getClassList();
  },
};
</script>

<style>
.professor-page-cardview {
  justify-content: center;
  padding: 20%;
}
.professor-page-class-toolbar{
    vertical-align: middle;

}
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 70%;
}
</style>
