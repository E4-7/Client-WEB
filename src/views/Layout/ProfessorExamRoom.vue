<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <v-row justify="center" style="padding:20px; padding-left: 90px;">
          <v-col justify="center">
            <v-row justify="center" cols="12" class="text-center" style="padding: 20px;">
              <h1 class="display-2 font-weight-bold mb-3 text-center">
                {{ this.room.Exam.name }}
              </h1>
              <v-btn text @click="showDialog('Text')" style="color: blue;">학생관리</v-btn>
              <v-dialog transition="dialog-top-transition" max-width="600" v-model="baseTextDialog">
                <base-dialog toolbar-header-title="수험자 관리" header-title="수험자 관리" :footerSubmit="false" @hide="hideDialog('Text')">
                  <template v-slot:body
                    ><v-card>
                      <v-card-title>
                        <h5>학생 계정 목록</h5>
                        <v-spacer></v-spacer>
                        <v-text-field v-model="search" append-icon="mdi-magnify" label="이름으로 검색" single-line hide-details></v-text-field>
                      </v-card-title>
                      <v-data-table :headers="headerMember" :items="studentList" :search="search"> </v-data-table>
                    </v-card>
                  </template>
                </base-dialog>
              </v-dialog>
            </v-row>
            <v-row dense>
              <!--이거 레이아웃 설정하기-->
              <div>
                <agora :appid="this.room.Exam.agoraAppId" :channel="this.room.Exam.id" :token="this.room.Exam.agoraToken" :clientConfig="{ codec: 'vp8' }">
                  <agora-audio-sender v-if="mic"></agora-audio-sender>
                  <agora-video-sender />
                  <v-btn @click="mic = !mic">
                    <v-img max-height="25" max-width="25" :src="mic ? require('@/assets/images/on_mic.png') : require('@/assets/images/off_mic.png')"></v-img>
                  </v-btn>
                  <agora-audio-receiver />
                  <agora-video-receiver />
                </agora>
              </div>
              <v-col v-for="n in 9" :key="n" cols="12" md="4" sm="4">
                <v-card class="pa-3" outlined tile style="height: 350px;" color="#385F73"> Student #{{ n }} </v-card>
              </v-col>
            </v-row>
            <div class="text-center" style="padding: 20px;">
              <v-pagination v-model="page" :length="6"></v-pagination>
            </div>
          </v-col>
          <v-col cols="4">
            <v-row cols="12" justify="center" style="padding: 20px; padding-top: 70px;">
              <!--시험상태 : {{ 진행중 }}-->
              <h1>오픈북 여부 :{{ this.room.Exam.is_openbook }}</h1>
            </v-row>
            <v-row justify="center" style="padding: 20px;">
              <v-col cols="2"><v-btn>시험 시작</v-btn></v-col>
              <v-col cols="2"><v-btn>시험 종료</v-btn></v-col>
            </v-row>
            <Chatting v-if="socketRef" :userId="userId" :socket="socketRef" :name="name" :examId="examId"></Chatting>
            <div v-if="socketRef == null">
              네트워크에 문제가 있어 채팅을 사용할 수 없습니다. <br />
              다시 시도해주세요.
            </div>
          </v-col>
        </v-row>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
const socketURL = 'http://34.64.196.237:3000';
import io from 'socket.io-client';
import Chatting from './components/Chatting.vue';
import BaseDialog from './components/BaseDialog.vue';

export default {
  components: { Chatting, BaseDialog },
  created() {
    this.getStudentTable();
    this.room = this.$store.getters.getRoomId(this.$route.params.roomId);
    const examPayload = { roomId: this.examId };
    const socket = io.connect(socketURL, {
      transports: ['websocket'],
    });
    socket.on('connect', async () => {
      this.socketRef = socket;
      socket.emit('joinRoom', examPayload);
    });
  },
  data() {
    return {
      room: {
        appid: 'f823987e32bd491d843459d5396eed2a',
        channel: '9fa83f7d-c566-4dfe-a641-1444b15aa18f',
        token: '006f823987e32bd491d843459d5396eed2aIADRYxFzSL8IX5oWlN7P/9ki6D/zvvfAzjhCcKfL3aDREa1JzVcAAAAAIgDy83Ixp42IYgQAAQCnjYhiAgCnjYhiAwCnjYhiBACnjYhi',
      },
      search: '',
      baseTextDialog: false,
      mic: true,
      videoProfile: '480p_4',
      transcode: 'interop',
      attendeeMode: 'video',
      baseMode: 'avc',
      examId: this.$route.params.roomId,
      userId: this.$store.state.user.id,
      name: this.$store.state.user.name,
      socketRef: null,
      page: 1,
      studentList: [],
      headerMember: [
        {
          text: '이름',
          align: 'start',
          value: 'name',
        },
        {
          text: '학번',
          value: 'studentID',
        },
        {
          text: '답안지',
          value: 'AnswerId',
        },
        {
          text: '인증 이미지',
          value: 'CertificatedImage',
        },
        {
          text: '인증 여부',
          value: 'is_certified',
        },
      ],
    };
  },
  computed: {},
  methods: {
    async showDialog(type) {
      this.getStudentTable();
      this[`base${type}Dialog`] = true;
    },
    hideDialog(type) {
      this[`base${type}Dialog`] = false;
    },
    async getStudentTable() {
      const response = await this.$http.get(`exams/${this.$route.params.roomId}/students`);
      this.studentList = [];
      for (let i = 0; i < response.data.data.length; i++) {
        this.studentList.push({
          AnswerId: response.data.data[i].AnswerId,
          studentID: response.data.data[i].studentID,
          name: response.data.data[i].name,
          //CertificatedImage: response.data.data[i].CertificatedImage.url,
          is_certified: response.data.data[i].is_certified, //response.data.data[i].CertificatedImage ? true : false,
        });
      }
    },
  },
};
</script>

<style scoped></style>
