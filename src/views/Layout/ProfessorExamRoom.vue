<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <div>
          <agora :appid="this.room.Exam.agoraAppId" :channel="this.room.Exam.id" :token="this.room.Exam.agoraToken">
            33333333333333333{{ this.room.agoraAppId }}
            <agora-audio-sender />
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
              <!--이거 레이아웃 설정하기-->
              <div>
                <agora :appid="this.room.Exam.agoraAppId" :channel="this.room.Exam.id" :token="this.room.Exam.agoraToken">
                  <agora-audio-receiver />
                  <agora-video-receiver />
                </agora>
              </div>
              <v-col v-for="n in 9" :key="n" cols="12" md="4" sm="4">
                <v-card class="pa-3" outlined tile style="height: 350px;" color="#385F73">
                  <div>
                    <!-- <agora :appid="appid" :channel="channel" :token="token">
                      <agora-audio-sender />
                      <agora-audio-receiver />
                      <agora-video-sender />
                      <agora-video-receiver />
                    </agora> -->
                    <!-- <agora-video-receiver accept="[123]"></agora-video-receiver> -->
                  </div>
                  Student #{{ n }}
                </v-card>
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
const socketURL = 'http://34.64.196.237:3000';
import io from 'socket.io-client';
import Chatting from './components/Chatting.vue';

export default {
  components: { Chatting },
  created() {
    console.log('this.$store.getters.getRoomId(this.$store.state.room.ExamId');
    console.log(this.$route.params.roomId);
    let tmpRoom = this.$store.getters.getRoomId(this.$route.params.roomId);

    this.room = tmpRoom;

    console.log('this.$store.state.room');
    console.log(this.room);
    console.log('this.room.agoraAppId');
    console.log(this.room.Exam.agoraAppId);

    // OwnerId: "574581e5-50b2-4aa7-8b69-b893f05e8221"
    // agoraAppId: "f823987e32bd491d843459d5396eed2a"
    // agoraToken: "006f823987e32bd491d843459d5396eed2aIADRYxFzSL8IX5oWlN7P/9ki6D/zvvfAzjhCcKfL3aDREa1JzVcAAAAAIgDy83Ixp42IYgQAAQCnjYhiAgCnjYhiAwCnjYhiBACnjYhi"
    // created_at: "2022-05-20T06:58:47.841Z"
    // deleted_at: null
    // exam_time: "2022-05-19T15:00:00.000Z"
    // id: "9fa83f7d-c566-4dfe-a641-1444b15aa18f"
    // is_openbook: true
    // name: "운영체제1"
    // status: 1
    // updated_at: "2022-05-20T06:58:47.841Z"

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
      videoProfile: '480p_4',
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
