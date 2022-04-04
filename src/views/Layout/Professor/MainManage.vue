<template>
  <v-app>
    <v-main class="main-page-cardview-layout">
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
            <v-col class="professor-page-text">
              <v-row class="professor-page-card" justify="center">
                <div style="display: flex">
                  <v-card
                    class="professor-page-cardview"
                    elevation="2"
                    outlined
                    height="200"
                    width="190"
                    v-for="(classCard, id) in classCard"
                    :key="id"
                  >
                    <router-link
                      href="javascript:void(0)"
                      :to="openClassCard(classCard.id)"
                    >
                      <strong>{{ classCard.classname }}</strong>
                      <br /><br />
                      <p>{{ classCard.date }}</p>
                      <p>{{ classCard.time }}</p>
                    </router-link>
                    <v-card>
                      <li v-for="item in items">
                        {{ item.message }}
                      </li>
                    </v-card>
                  </v-card>
                </div>

                <v-card-actions>
                  <div class="page-content">
                    <hr />
                  </div>
                </v-card-actions>
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
  data() {
    return {
      components: { MenuBar },
      items: [
        { message: '조교 관리' },
        { message: '수험자 설정' },
        { message: '시험지 관리' },
        { message: '시험장 입장' },
        { message: '삭제' },
      ],
      classCard: [
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
@import '../../../assets/styles/reset.css';

.professor-page-cardview {
  justify-content: center;
  padding: 10%;
}
</style>
