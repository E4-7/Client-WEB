<template>
  <v-app>
    <v-main v-if="this.room">
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
                  <agora-video-sender></agora-video-sender>
                  <v-btn @click="mic = !mic">
                    <v-img max-height="25" max-width="25" :src="mic ? require('@/assets/images/on_mic.png') : require('@/assets/images/off_mic.png')"></v-img>
                  </v-btn>
                  <agora-audio-receiver />
                  <agora-video-receiver><div class="player"></div></agora-video-receiver>
                </agora>
              </div>
              <!-- <v-col v-for="n in 9" :key="n" cols="12" md="4" sm="4">
                <v-card class="pa-3" outlined tile style="height: 350px;" color="#385F73"> Student #{{ n }} </v-card>
              </v-col> -->
            </v-row>
            <!-- <div class="text-center" style="padding: 20px;">
              <v-pagination v-model="page" :length="6"></v-pagination>
            </div> -->
          </v-col>
          <v-col cols="4">
            <v-row cols="12" justify="center" style="padding: 20px; padding-top: 70px;">
              <!--시험상태 : {{ 진행중 }}-->
              <h2>[{{ this.examStatus }}]오픈북 여부 :{{ this.room.Exam.is_openbook }}</h2>
            </v-row>
            <v-row v-if="roleType == 2" justify="center" style="padding: 10px;">
              <v-col cols="3"><v-btn @click="startExam()">시험 시작</v-btn></v-col>
              <v-col cols="3"><v-btn @click="stopExam()">시험 종료</v-btn></v-col>
            </v-row>
            <Chatting ref="ChatingBox" v-if="socketRef" :userId="userId" :socket="socketRef" :name="name" :examId="examId" manager="p"></Chatting>
            <div v-if="socketRef == null">
              네트워크에 문제가 있어 채팅을 사용할 수 없습니다. <br />
              다시 시도해주세요.
            </div>
          </v-col>
        </v-row>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
const socketURL = 'https://chat.e47app.click';
import io from 'socket.io-client';
import Chatting from './components/Chatting.vue';
import BaseDialog from './components/BaseDialog.vue';

export default {
  components: { Chatting, BaseDialog },
  async created() {
    if (this.$store.state?.roomList?.length !== 0) {
      this.room = this.$store.getters.getRoomId(this.$route.params.roomId);
      if (this.room.Exam.status === 3) {
        alert('이미 종료된 시험입니다.');
        this.$router.push('/main');
      }
    } else {
      // undefined
      const response = await this.$http.get(`exams/${this.$route.params.roomId}`);
      this.room = response.data.data;
      if (this.room.Exam.status === 3) {
        alert('이미 종료된 시험입니다.');
        this.$router.push('/main');
      }
    }
    await this.getStudentTable();
    const examPayload = { roomId: this.examId };
    const socket = io.connect(socketURL, {
      transports: ['websocket'],
    });
    socket.on('connect', async () => {
      this.socketRef = socket;
      socket.emit('joinRoom', examPayload);
      //socket on sengMsgToManager
    });
  },
  data() {
    return {
      room: null,
      examStatus: '시험 대기 중',
      roleType: this.$store.state.user.Role.type,
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
  methods: {
    async showDialog(type) {
      await this.getStudentTable();
      this[`base${type}Dialog`] = true;
    },
    hideDialog(type) {
      this[`base${type}Dialog`] = false;
    },
    startExam() {
      if (this.socketRef) {
        console.log('startRoom');
        this.socketRef.emit('startRoom', {
          sender: this.userId,
          name: this.name,
          roomId: this.examId,
        });
        this.examStatus = '시험 중';
      }
    },
    stopExam() {
      if (this.socketRef) {
        this.socketRef.emit('exitRoom', {
          sender: this.userId,
          name: this.name,
          roomId: this.examId,
        });
        this.examStatus = '시험 종료';
        this.$router.push(`/main/${this.$route.params.roomId}/score`);
      }
    },
    async getStudentTable() {
      const response = await this.$http.get(`exams/${this.$route.params.roomId}/students`);
      this.studentList = [];
      for (let i = 0; i < response.data.data.length; i++) {
        console.log(response.data.data[i]);
        this.studentList.push({
          AnswerId: response.data.data[i].ExamAnswer?.url,
          studentID: response.data.data[i].studentID,
          name: response.data.data[i].name,
          CertificatedImage: response.data.data[i].CertificatedImage?.url,
          is_certified: response.data.data[i].is_certified, //response.data.data[i].CertificatedImage ? true : false,
        });
      }
    },
  },
};
</script>

<style scoped>
.player {
  width: 300px;
  height: 300px;
  border-radius: 100px;
  overflow: hidden;
  border: 5px solid red;
  margin: 20px;
}
</style>
