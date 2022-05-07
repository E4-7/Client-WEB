<template>
  <v-app>
    <v-main class="main-page-cardview-layout">
      <menu-bar></menu-bar>
      <v-container fill-height fluid>
        <v-row dense>
          <v-col v-for="(classCard, id) in classCards" :key="id" cols="12" md="3" sm="6">
            <v-card class="pa-3" outlined tile style="height: 300px;" color="#1F7087">
              <v-toolbar height="65" class="professor-page-class-toolbar" color="primary">
                <v-toolbar-title>
                  <strong>{{ classCard.Exam.name }}</strong></v-toolbar-title
                >
                <v-spacer></v-spacer>
                <v-btn icon @click="openAlert(classCard.Exam)">
                  <v-icon>more_vert</v-icon>
                </v-btn>
              </v-toolbar>
              <router-link href="javascript:void(0)" :to="openClassCard(classCard.Exam.id)">
                <v-card class="professor-page-cardview" elevation="2" outlined height="200">
                  <v-card-text>
                    <br />
                    <strong class="professor-page-class-name">
                      {{ classCard.Exam.name }}
                    </strong>
                    <br />
                    <br />
                    <p>{{ classCard.Exam.exam_time }}</p>
                    <p>[ 오픈북 여부 : {{ classCard.Exam.is_openbook }} ]</p>
                  </v-card-text>
                </v-card>
              </router-link>
              <v-expand-transition>
                <v-card v-if="reveal[classCard.Exam.id]" class="transition-fast-in-fast-out v-card--reveal" style="height: 78%; width: auto;">
                  <v-card-actions class="pt-0">
                    <v-col justify="center" align-content-lg>
                      <v-btn
                        class="professor-page-card-button"
                        block
                        @click="
                          what = 'B';
                          showDialog('Text', id);
                        "
                        >조교 관리</v-btn
                      >
                      <v-btn
                        class="professor-page-card-button"
                        block
                        color="primary"
                        @click="
                          what = 'C';
                          showDialog('Text', id);
                        "
                        >수험자 설정</v-btn
                      >
                      <v-btn
                        class="professor-page-card-button"
                        block
                        @click="
                          what = 'D';
                          showDialog('Text', id);
                        "
                        >시험지 관리</v-btn
                      >
                      <v-btn
                        class="professor-page-card-button"
                        block
                        color="primary"
                        @click="
                          what = 'F';
                          showDialog('Text', id);
                        "
                        >시험장 수정</v-btn
                      >
                      <v-btn
                        class="professor-page-card-button"
                        block
                        @click="
                          what = 'E';
                          showDialog('Text', id);
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
        <v-dialog transition="dialog-top-transition" max-width="600" v-model="baseTextDialog">
          <base-dialog v-if="what === 'A'" toolbar-header-title="시험장 생성" header-title="시험장을 생성해주세요." @hide="hideDialog('Text')" @submit="submitDialog('Text')">
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
                          <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                            <!--:return-value.sync="date"-->
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field filled dense v-model="date" label="시험 날짜" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="date" no-title @input="menu1 = false">
                              <v-spacer></v-spacer>
                            </v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="12" sm="6" md="4">
                          <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                            <!-- :return-value.sync="time" -->
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field filled dense v-model="time" label="시험 시작 시각" prepend-icon="mdi-clock-time-four-outline" v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-time-picker v-if="menu2" v-model="time" full-width @click:minute="$refs.menu.save(time)"></v-time-picker>
                          </v-menu>
                        </v-col>
                        <v-spacer></v-spacer>
                      </v-row>
                    </template>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="12">
                  <v-checkbox v-model="checkbox" :label="`오픈북 여부: ${checkbox.toString()}`"></v-checkbox>
                </v-col>
              </v-row>
            </template>
          </base-dialog>
          <base-dialog v-else-if="what === 'B'" toolbar-header-title="조교 관리" header-title="조교 계정 생성" @hide="hideDialog('Text')" @submit="submitDialog('Text')">
            <template v-slot:body>
              <v-card>
                <v-card-title>
                  <v-row>
                    <v-col>
                      <h5>이름</h5>
                      <v-text-field v-model="inputForm.name" placeholder="조교 이름" />
                    </v-col>
                    <v-col>
                      <h5>이메일</h5>
                      <v-text-field v-model="inputForm.email" placeholder="조교 이메일" />
                    </v-col>
                    <v-col>
                      <h5>비밀번호</h5>
                      <v-text-field v-model="inputForm.password" placeholder="조교 비밀번호" />
                    </v-col>
                    <v-col>
                      <h5>.</h5>
                      <v-btn @click="saveAssistant()">추가하기</v-btn>
                    </v-col>
                  </v-row>
                  <h5>조교 계정 목록</h5>
                  <v-spacer></v-spacer>
                  <v-text-field v-model="search" append-icon="mdi-magnify" label="이름으로 검색" single-line hide-details></v-text-field>
                </v-card-title>
                <v-data-table :headers="headers" :items="datasets" :search="search"></v-data-table>
              </v-card>
              <!-- <data-table>njknjk</data-table> -->
            </template>
          </base-dialog>
          <base-dialog v-else-if="what === 'C'" toolbar-header-title="수험자 관리" header-title="수험자 관리" @hide="hideDialog('Text')" @submit="submitDialog('Text')">
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
              <v-icon style="margin-right:10px;" large color="#41B883">cloud_upload</v-icon>
              <input type="file" accept="application/pdf" @change="getFile($event)" />
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
                <v-text-field filled dense v-model="input_class_name"></v-text-field>
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
                        <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                          <!--:return-value.sync="date"-->
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field filled dense v-model="date" label="시험 날짜" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                          </template>
                          <v-date-picker v-model="date" no-title @input="menu1 = false">
                            <v-spacer></v-spacer>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col cols="12" sm="6" md="4">
                        <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                          <!-- :return-value.sync="time" -->
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field filled dense v-model="time" label="시험 시작 시각" prepend-icon="mdi-clock-time-four-outline" v-bind="attrs" v-on="on"></v-text-field>
                          </template>
                          <v-time-picker v-if="menu2" v-model="time" full-width @click:minute="$refs.menu.save(time)"></v-time-picker>
                        </v-menu>
                      </v-col>
                      <v-spacer></v-spacer>
                    </v-row>
                  </template>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="12">
                <v-checkbox v-model="checkbox" :label="`오픈북 여부: ${checkbox.toString()}`"></v-checkbox>
              </v-col>
            </template>
          </base-dialog>
          <base-dialog v-else toolbar-header-title="삭제" header-title="" footer-submit-title="삭제하기" @hide="hideDialog('Text')" @submit="submitDialog('Text')">
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
//import DataTable from '../components/DataTable.vue';
import Vue from 'vue';

export default {
  name: 'Professor',
  components: { MenuBar, BaseDialog }, //, DataTable },
  data() {
    return {
      inputForm: {
        name: '',
        email: '',
        password: '',
      },
      search: '',
      headers: [
        {
          text: '이름',
          align: 'start',
          value: 'name',
        },
        { text: '이메일', value: 'email' },
        { text: '', value: '.', sortable: false },
      ],
      datasets: [],
      file: null,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
      menu: false,
      menu1: false,
      modal: false,
      menu2: false,
      input_class_name: '',
      time: '00:00',
      modal2: false,
      what: 'B',
      editClassName: '',
      checkbox: true,
      baseTextDialog: false,
      baseListDialog: false,
      baseImageDialog: false,
      dialog: false, //true : Dialog열림, false : Dialog닫힘
      visible: false,
      reveal: [],
      currentClassId: null,
      classCards: [],
    };
  },
  methods: {
    async saveAssistant() {
      const uuid = this.classCards[this.currentClassId].Exam.id;
      this.$http
        .post(`exams/${uuid}/assistant`, {
          email: this.inputForm.email,
          name: this.inputForm.name,
          password: this.inputForm.password,
        })
        .then(res => {
          this.datasets.push({
            name: res.data.data.name,
            email: res.data.data.email,
          });
          console.log(res);
        })
        .catch(error => {
          alert(error.response.data.data);
        });
    },
    async getFile(event) {
      console.log(event);
      this.file = event.target.files[0];
    },
    openAlert(event) {
      Vue.set(this.reveal, event.id, !this.reveal[event.id]);
    },
    async showDialog(type, id) {
      this[`base${type}Dialog`] = true;
      console.log(id);
      if (typeof id === 'number') {
        this.currentClassId = id;
      }
      if (this.what === 'B') {
        const uuid = this.classCards[this.currentClassId].Exam.id;
        await this.$http
          .get(`exams/${uuid}`)
          .then(Response => {
            this.datasets = [];
            for (let i = 0; i < Response.data.data.length; i++) {
              this.datasets.push({
                name: Response.data.data[i].User.name,
                email: Response.data.data[i].User.email,
              });
            }
          })
          .catch(Error => {
            console.log(Error);
          });
      }
    },
    hideDialog(type) {
      this[`base${type}Dialog`] = false;
    },
    async buttonClickCaseManage() {
      const uuid = this.classCards[this.currentClassId].Exam.id;
      if (this.what === 'A') {
        // 시험장 추가
        this.$http
          .post('exams', {
            name: this.input_class_name,
            exam_time: this.date + 'T' + this.time + ':00+09:00', //'2021-07-17T14:30:00+09:00',
            is_openbook: this.checkbox,
          })
          .then(res => {
            this.classCards.push({
              Exam: res.data.data,
              created_at: res.data.data.created_at,
            });
            alert('시험장 추가 완료');
          })
          .catch(error => {
            alert(error.response.data.data);
          });
      } else if (this.what === 'F') {
        // 시험장 수정
        this.$http
          .patch(`exams/${uuid}`, {
            name: this.input_class_name,
            exam_time: this.date + 'T' + this.time + ':00+09:00', //'2021-07-17T14:30:00+09:00',
            is_openbook: this.checkbox,
          })
          .then(res => {
            const data = this.classCards[this.currentClassId];
            const updatedData = Object.assign({}, data);
            updatedData.Exam = Object.assign({}, data.Exam);
            updatedData.Exam.name = this.input_class_name;
            updatedData.Exam.exam_time = this.date + 'T' + this.time + ':00+09:00';
            updatedData.Exam.is_openbook = this.checkbox;
            Vue.set(this.classCards, this.currentClassId, updatedData);
            alert('시험장 수정 완료');
          })
          .catch(error => {
            alert(error.response.data.data);
          });
      } else if (this.what === 'D') {
        // 시험지 등록
        if (this.file == null) {
          alert('문제가 생겼습니다. 다시 시도해주세요.');
        } else {
          const formData = new FormData();
          formData.append('file', this.file);

          //const uuid = this.classCards[this.currentClassId].Exam.id;
          await this.$http
            .post(`/exams/${uuid}/upload`, formData, {
              Headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            .then(res => {
              console.log(res);
              alert('시험지 등록 완료');
            })
            .catch(err => {
              console.log(err);
              console.log(err.response.data);
              alert(err.response.data.data);
            });
        }
      } else {
        // 시험장 삭제
        const uuid = this.classCards[this.currentClassId].Exam.id;
        this.$http
          .delete(`exams/${uuid}`, {
            examId: this.input_class_name,
          })
          .then(_ => {
            this.classCards.splice(this.currentClassId, 1);
            alert('시험장 삭제 완료');
          })
          .catch(error => {
            alert(error.response.data.data);
          });
      }
    },
    submitDialog(type, id) {
      console.log('submit 완료!');
      this.buttonClickCaseManage(id);
      this.hideDialog(type);
    },
    openClassCard: function(title) {
      return document.location.pathname + '/' + title;
    },
    initClassList(response) {
      var aJson = new Object();
      for (let i = 0; i < this.classCards.length; i++) {
        console.log('response');
        console.log(response);
        console.log('this._classCards');
        console.log(this._classCards);
        console.log(this.classCards);
        Vue.set(this._classCards, i, response);
        aJson[this.classCards[i].Exam.id] = false;
        this.reveal.push(JSON.stringify(aJson));
      }
      console.log(this.reveal);
    },
    getClassInformation() {
      this.$http
        .get('exams/')
        .then(Response => {
          console.log('respnese');
          console.log('this.classInformation');
          console.log(this.classCards);
          console.log(Response.data.data);
          this.classCards = Response.data.data;
          this.initClassList(Response.data.data);

          console.log('this.classCards');
          console.log(this.classCards);

          //Vue.set(this.classCards, 'id', Response.data.data);
        })
        .catch(Error => {
          console.log('Error');
          console.log(Error);
        });
    },
  },
  mounted() {
    // 페이지 시작하면은 자동 함수 실행
    this.getClassInformation();
    // this.$nextTick(() => {
    //   this.currentTitle = this.$route.params.recrumentId;
    // });
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
