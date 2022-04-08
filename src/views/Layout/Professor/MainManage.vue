<template>
  <v-app>
    <v-main class="main-page-cardview-layout">
      <menu-bar></menu-bar>
      <v-container fill-height fluid>
        <v-row dense>
          <v-col
            v-for="(classCard, id) in classCards"
            :key="id"
            cols="12"
            md="3"
            sm="6"
          >
            <v-card
              class="pa-3"
              outlined
              tile
              style="height: 300px;"
              color="#1F7087"
            >
              <v-toolbar
                height="65"
                class="professor-page-class-toolbar"
                color="primary"
              >
                <v-toolbar-title>
                  <strong>{{ classCard.classname }}</strong></v-toolbar-title
                >
                <v-spacer></v-spacer>
                <v-btn icon @click="reveal = !reveal">
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
                >
                  <v-card-text>
                    <br />
                    <strong class="professor-page-class-name">
                      {{ classCard.classname }}
                    </strong>
                    <br />
                    <br />
                    <p>{{ classCard.date }}</p>
                    <p>{{ classCard.time }}</p>
                  </v-card-text>
                </v-card>
              </router-link>
              <v-expand-transition>
                <v-card
                  v-if="reveal"
                  class="transition-fast-in-fast-out v-card--reveal"
                  style="height: 78%; width: auto;"
                >
                  <v-card-actions class="pt-0">
                    <v-col justify="center" align-content-lg>
                      <v-btn class="professor-page-card-button" block
                        >조교 관리</v-btn
                      >
                      <v-btn
                        class="professor-page-card-button"
                        block
                        color="primary"
                        >수험자 설정</v-btn
                      >
                      <v-btn
                        @click="openDialog()"
                        class="professor-page-card-button"
                        block
                        >시험지 관리</v-btn
                      >
                      <v-btn
                        class="professor-page-card-button"
                        block
                        color="primary"
                        >시험장 수정</v-btn
                      >
                      <v-btn class="professor-page-card-button" block
                        >삭제</v-btn
                      >
                    </v-col>
                  </v-card-actions>
                </v-card>
              </v-expand-transition>
            </v-card>
          </v-col>
          <v-col cols="12" md="3" sm="6">
            <v-card outlined tile style="height: 300px;" color="#1F7087">
              <v-btn
                @click="
                  showDialog('Text');
                  what = 'A';
                "
                elevation="2"
                outlined
                height="300px"
                width=100%
              >
                <p class="text-h2">+</p>
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
        <!-- <v-row align-center justify="center">
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
            </v-col> -->
        <!--
        <v-row dense class="main-page-text">
          <v-col>
            <div style="display: flex">
              <v-card
                max-width="190"
                v-for="(classCard, id) in classCards"
                :key="id"
              >
                <v-toolbar
                  height="65"
                  class="professor-page-class-toolbar"
                  color="primary"
                >
                  <v-toolbar-title>
                    <strong>{{ classCard.classname }}</strong></v-toolbar-title
                  >
                  <v-spacer></v-spacer>
                  <v-btn icon @click="reveal = !reveal">
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
                    <v-card-text>
                      <strong class="professor-page-class-name">
                        {{ classCard.classname }}
                      </strong>
                      <br />
                      <br />
                      <p>{{ classCard.date }}</p>
                      <p>{{ classCard.time }}</p>
                    </v-card-text>
                  </v-card>
                </router-link>
                <v-expand-transition>
                  <v-card
                    v-if="reveal"
                    class="transition-fast-in-fast-out v-card--reveal"
                    style="height: 78%;"
                  >
                    <v-card-actions class="pt-0">
                      <v-col justify="center" align-content-lg>
                        <v-btn class="professor-page-card-button" block
                          >조교 관리</v-btn
                        >
                        <v-btn
                          class="professor-page-card-button"
                          block
                          color="primary"
                          >수험자 설정</v-btn
                        >
                        <v-btn
                          @click="openDialog()"
                          class="professor-page-card-button"
                          block
                          >시험지 관리</v-btn
                        >
                        <v-btn
                          class="professor-page-card-button"
                          block
                          color="primary"
                          >시험장 수정</v-btn
                        >
                        <v-btn class="professor-page-card-button" block
                          >삭제</v-btn
                        >
                      </v-col>
                    </v-card-actions>
                  </v-card>
                </v-expand-transition>
              </v-card>
              <v-btn
                @click="
                  showDialog('Text');
                  what = 'A';
                "
                elevation="2"
                outlined
                height="265"
                width="190"
              >
                <p class="text-h2">+</p>
              </v-btn>
            </div>-->
            <v-dialog
              transition="dialog-top-transition"
              max-width="600"
              v-model="baseTextDialog"
            >
              <base-dialog
                v-if="what === 'A'"
                toolbar-header-title="시험장 생성"
                header-title="시험장을 생성해주세요."
                @hide="hideDialog('Text')"
                @submit="submitDialog('Text')"
              >
                <template v-slot:body>
                  <v-row>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field label="과목명" filled dense></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-menu
        ref="menu"
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="time"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="time"
            label="Picker in menu"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="menu2"
          elevation="15"
          v-model="time"
          full-width
          @click:minute="$refs.menu.save(time)"
        ></v-time-picker>
      </v-menu>
                      <v-text-field label="시험기간" filled dense></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-checkbox
                        v-model="checkbox"
                        :label="`오픈북 여부: ${checkbox.toString()}`"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </template>
              </base-dialog>
              <base-dialog
                v-else-if="what === 'B'"
                toolbar-header-title="시험장 생성"
                header-title="시험장을 생성해주세요."
                @hide="hideDialog('Text')"
                @submit="submitDialog('Text')"
              >
                <template v-slot:body>
                  <v-icon style="margin-right:10px;" large color="#41B883"
                    >cloud_upload</v-icon
                  >
                  <span class="headline" large>파일 업로드</span>
                  <div class="text-h2 pa-12">Hello world!</div>
                  <v-text-field placeholder="내용을 입력하세요" />
                  <template v-if="ok">
                    <h1>Title</h1>
                    <p>Paragraph 1</p>
                    <p>Paragraph 2</p>
                  </template>
                </template>
              </base-dialog>
              <base-dialog
                v-else
                toolbar-header-title="시험장 생성"
                header-title="시험장을 생성해주세요."
                @hide="hideDialog('Text')"
                @submit="submitDialog('Text')"
              >
                <template v-slot:body>
                  <v-icon style="margin-right:10px;" large color="#41B883"
                    >cloud_upload</v-icon
                  >
                  <span class="headline" large>파일 업로드</span>
                  <div class="text-h2 pa-12">Hello world!</div>
                  <v-text-field placeholder="내용을 입력하세요" />
                  <template v-if="ok">
                    <h1>Title</h1>
                    <p>Paragraph 1</p>
                    <p>Paragraph 2</p>
                  </template>
                </template>
              </base-dialog>
            </v-dialog>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import MenuBar from '../MenuBar.vue';
import BaseDialog from '../components/BaseDialog.vue';

export default {
  name: 'Professor',
  components: { MenuBar, BaseDialog },
  data() {
    return {
      time: null,
        menu2: false,
        modal2: false,
      what: 'B',
      checkbox: true,
      baseTextDialog: false,
      baseListDialog: false,
      baseImageDialog: false,
      item: 1,
      items: [{ text: '피자' }, { text: '라떼' }, { text: '짜글이' }],
      dialog: false, //true : Dialog열림, false : Dialog닫힘
      visible: false,
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
          classname: '데이터베이스------------------',
          date: '2022.04.16',
          time: '12:00',
        },
      ],
    };
  },
  methods: {
    showDialog(type) {
      this[`base${type}Dialog`] = true;
    },
    hideDialog(type) {
      this[`base${type}Dialog`] = false;
    },
    submitDialog(type) {
      console.log('submit 완료!');
      this.hideDialog(type);
    },
    openDialog() {
      //Dialog 열리는 동작
      this.dialog = true;
    },
    closeDialog() {
      //Dialog 닫히는 동작
      this.dialog = false;
    },
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
  text-align: center;
}
.professor-page-class-toolbar {
  vertical-align: middle;
}
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
.professor-page-card-button {
  margin: 1%;
}
.professor-page-class-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100px;
}
</style>
