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
                    <p>[ 오픈북 여부 : {{ classCard.openbook }} ]</p>
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
                      <v-btn
                        class="professor-page-card-button"
                        block
                        @click="
                          what = 'B';
                          showDialog('Text');
                        "
                        >조교 관리</v-btn
                      >
                      <v-btn
                        class="professor-page-card-button"
                        block
                        color="primary"
                        @click="
                          what = 'C';
                          showDialog('Text');
                        "
                        >수험자 설정</v-btn
                      >
                      <v-btn
                        class="professor-page-card-button"
                        block
                        @click="
                          what = 'D';
                          showDialog('Text');
                        "
                        >시험지 관리</v-btn
                      >
                      <v-btn
                        class="professor-page-card-button"
                        block
                        color="primary"
                        @click="
                          what = 'F';
                          showDialog('Text');
                        "
                        >시험장 수정</v-btn
                      >
                      <v-btn
                        class="professor-page-card-button"
                        block
                        @click="
                          what = 'E';
                          showDialog('Text');
                        "
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
                  what = 'A';
                  showDialog('Text');
                "
                elevation="2"
                outlined
                height="300px"
                width="100%"
              >
                <p class="text-h2">+</p>
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
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
              <br />
              <br />
              <v-row>
                <h3>시험 과목 지정</h3>
                <v-col cols="12" sm="6" md="12">
                  <v-text-field label="과목명" filled dense></v-text-field>
                </v-col>
                <h3>시험 날짜와 시험 시작시각 지정</h3>
                <v-col cols="12" sm="6" md="12">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="time"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-menu
                            ref="menu1"
                            v-model="menu1"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <!--:return-value.sync="date"-->
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                filled
                                dense
                                v-model="date"
                                label="시험 날짜"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="date"
                              no-title
                              @input="menu1 = false"
                            >
                              <v-spacer></v-spacer>
                            </v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="12" sm="6" md="4">
                          <v-menu
                            ref="menu2"
                            v-model="menu2"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                          >
                            <!-- :return-value.sync="time" -->
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                filled
                                dense
                                v-model="time"
                                label="시험 시작 시각"
                                prepend-icon="mdi-clock-time-four-outline"
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                              v-if="menu2"
                              v-model="time"
                              full-width
                              @click:minute="$refs.menu.save(time)"
                            ></v-time-picker>
                          </v-menu>
                        </v-col>
                        <v-spacer></v-spacer>
                      </v-row>
                    </template>
                  </v-menu>
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
            toolbar-header-title="조교 관리"
            header-title="조교 계정 생성"
            @hide="hideDialog('Text')"
            @submit="submitDialog('Text')"
          >
            <template v-slot:body>
              <data-table></data-table>
              </template>
          </base-dialog>
          <base-dialog
            v-else-if="what === 'C'"
            toolbar-header-title="수험자 관리"
            header-title="수험자 관리"
            @hide="hideDialog('Text')"
            @submit="submitDialog('Text')"
          >
            <template v-slot:body>
              <v-text-field placeholder="내용을 입력하세요" />
            </template>
          </base-dialog>
          <base-dialog
            v-else-if="what === 'D'"
            toolbar-header-title="시험지 관리"
            header-title="시험지 업로드해주세요."
            footer-hide-title="sadas"
            @hide="hideDialog('Text')"
            @submit="submitDialog('Text')"
          >
            <template v-slot:body>
              <v-icon style="margin-right:10px;" large color="#41B883"
                >cloud_upload</v-icon
              >
              <span class="headline" large>파일 업로드</span>
            </template>
          </base-dialog>
          <base-dialog
            v-else-if="what === 'F'"
            toolbar-header-title="수험장 수정"
            header-title="수정하고 싶은 수험장 정보를 바꾼 후, 저장을 눌러주세요."
            footer-hide-title="sadas"
            @hide="hideDialog('Text')"
            @submit="submitDialog('Text')"
          >
            <template v-slot:body>
              <br />
              <br />
              <h3>시험 과목 지정</h3>
              <v-col cols="12" sm="6" md="12">
                <v-text-field filled dense>{{
                  classCards[0].classname
                }}</v-text-field>
              </v-col>
              <h3>시험 날짜와 시험 시작시각 지정</h3>
              <v-col cols="12" sm="6" md="12">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="time"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-menu
                          ref="menu1"
                          v-model="menu1"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <!--:return-value.sync="date"-->
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              filled
                              dense
                              v-model="date"
                              label="시험 날짜"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="date"
                            no-title
                            @input="menu1 = false"
                          >
                            <v-spacer></v-spacer>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col cols="12" sm="6" md="4">
                        <v-menu
                          ref="menu2"
                          v-model="menu2"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                        >
                          <!-- :return-value.sync="time" -->
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              filled
                              dense
                              v-model="time"
                              label="시험 시작 시각"
                              prepend-icon="mdi-clock-time-four-outline"
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-if="menu2"
                            v-model="time"
                            full-width
                            @click:minute="$refs.menu.save(time)"
                          ></v-time-picker>
                        </v-menu>
                      </v-col>
                      <v-spacer></v-spacer>
                    </v-row>
                  </template>
                </v-menu>
              </v-col>
            </template>
          </base-dialog>
          <base-dialog
            v-else
            toolbar-header-title="삭제"
            header-title=""
            footer-submit-title="삭제하기"
            @hide="hideDialog('Text')"
            @submit="submitDialog('Text')"
          >
            <template v-slot:body>
              <h2>정말로 시험장을 삭제하시겠습니까?</h2>
            </template>
          </base-dialog>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import MenuBar from '../MenuBar.vue';
import BaseDialog from '../components/BaseDialog.vue';
import MemberTable from '../components/DataTable.vue'
import DataTable from '../components/DataTable.vue'

export default {
  name: 'Professor',
  components: { MenuBar, BaseDialog, MemberTable, DataTable },
  data() {
    return {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      time: '00:00',
      modal2: false,
      what: 'B',
      checkbox: true,
      baseTextDialog: false,
      baseListDialog: false,
      baseImageDialog: false,
      dialog: false, //true : Dialog열림, false : Dialog닫힘
      visible: false,
      reveal: false,
      classCards: [
        {
          id: '1',
          classname: '운영체제',
          date: '2022.04.15',
          time: '16:00',
          openbook: true,
        },
        {
          id: '2',
          classname: '데이터베이스------------------',
          date: '2022.04.16',
          time: '12:00',
          openbook: false,
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
