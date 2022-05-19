<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <!-- <AgoraVideoCall :videoProfile="videoProfile" :channel="channel" :transcode="transcode" :attendeeMode="attendeeMode" :baseMode="baseMode" :appId="appId" :uid="uid"></AgoraVideoCall>
        <agora :appid="appId">
          <agora-video-sender type="camera">
            <div style="width:400px;height:300px"></div>
          </agora-video-sender>
        </agora> -->
        <div>
          <agora :channel="channel">
            <agora-audio-sender />
            <agora-audio-receiver />
            <agora-video-receiver />
            <agora-video-sender />
          </agora>
        </div>
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
//import AgoraRtcVue from 'agora-rtc-vue';
const socketURL = 'http://34.64.196.237:3000';
import io from 'socket.io-client';
import Chatting from './components/Chatting.vue';
//import AgoraVideoCall from './components/AgoraVideoCall.vue';
export default {
  components: { Chatting },
  created() {
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
      appId: '8bfce6e171ef47779ac175c6a9809767',
      videoProfile: '480p_4',
      channel: '1234',
      transcode: 'interop',
      attendeeMode: 'video',
      baseMode: 'avc',
      uid: undefined,
      examId: this.$route.params.roomId,
      userId: this.$store.state.user.id,
      name: this.$store.state.user.name,
      socketRef: null,
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

  methods: {
    submitMessage() {
      if (this.msg) {
        this.msg = '';
      }
      return;
    },
  },
};
</script>

<style scoped></style>
