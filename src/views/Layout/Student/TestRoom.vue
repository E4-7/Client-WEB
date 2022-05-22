<template>
  <v-app>
    <v-content>
      <v-container>
        <v-row justify="center" style="padding:20px;">
          <v-col>
            <v-row justify="center" style="padding:15px;">
              <v-card min-height="400" min-width="400">
                <div>
                  <agora :appid="this.$store.state.room.agoraAppId" :channel="this.$store.state.room.id" :token="this.$store.state.room.agoraToken" :clientConfig="{ codec: 'vp8' }">
                    <agora-audio-sender />
                    <agora-audio-receiver />
                    <agora-video-sender />
                  </agora>
                  <v-btn @click="mic = !mic">
                    <v-img max-height="25" max-width="25" :src="mic ? require('@/assets/images/on_mic.png') : require('@/assets/images/off_mic.png')"></v-img>
                  </v-btn>
                  <v-btn @click="play()">
                    자세요
                  </v-btn>
                </div>
              </v-card>
            </v-row>
            <v-row justify="center">
              <v-card min-height="450" min-width="400">
                <Chatting v-if="socketRef" :userId="userId" :socket="socketRef" :name="name" :examId="examId"></Chatting>
                <div v-else>
                  네트워크에 문제가 있어 채팅을 사용할 수 없습니다. <br />
                  다시 시도해주세요.
                </div>
              </v-card>
            </v-row>
          </v-col>
          <v-col>
            <v-card min-height="900" min-width="800">
              시험지
              <button ref="pdfRef" :disabled="page <= 1" @click="page--">❮</button>
              {{ page }} / {{ pageCount }}
              <button :disabled="page >= pageCount" @click="page++">❯</button>
              <vue-pdf-embed ref="pdfRef" :page="page" @rendered="handleDocumentRender" :source="source1" />
            </v-card>
          </v-col>
          <v-col style="padding:10px;">
            <v-row justify="center" style="padding-top:50px;">
              <v-btn @click="submit()"
                >손들기
                <h1>🖐</h1></v-btn
              >
            </v-row>
            <v-row justify="center" style="padding:30px;">
              <h4 class="display-2 font-weight-bold mb-3">42:44</h4>
            </v-row>
            <v-row justify="center" style="padding:10px;">
              <h2>: 진행 중(오픈북)</h2>
            </v-row>
            <v-row justify="center" style="padding:40px;">
              <v-file-input label="File input" @change="selectFile"></v-file-input>
            </v-row>
            <v-spacer></v-spacer>
            <v-row justify="center" style="padding-top:40px; justify-content: flex-end;">
              <v-btn text @click="submit()">파일 업로드</v-btn>
            </v-row>
            <!-- <v-row justify="center" style="padding-top:40px;">
              <v-btn text @click="submit">시험 종료</v-btn>
            </v-row> -->
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
import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed';
import Chatting from '../components/Chatting.vue';
import * as posenet from '@tensorflow-models/posenet';
import * as utils from '../../../utils/utils';

export default {
  components: {
    VuePdfEmbed,
    Chatting,
  },
  data() {
    return {
      mic: true,
      videoProfile: '480p_4',
      transcode: 'interop',
      attendeeMode: 'video',
      baseMode: 'avc',
      socketRef: null,
      examId: this.$route.params.roomId,
      userId: this.$store.state.user.id,
      name: this.$store.state.user.name,
      page: 1,
      pageCount: 1,
      source1: this.$store.state.room.ExamPaper.url,
      currentPage: 0,
      image: '',
      msg: '',
      net: '',
      ctx: '',
      canvas: document.createElement('canvas'),
      video: '',
      pose: [],
      count: 0,
      isPlay: false,
    };
  },

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
  methods: {
    async play() {
      this.video = document.getElementsByClassName('agora_video_player')[0];
      this.net = await posenet.load(); // es6 모듈 불러오기
      this.isPlay = true;
      requestAnimationFrame(this.draw);
    },
    async draw() {
      this.pose = await this.net.estimateSinglePose(this.video, 0.5, false, 32);
      const returnedValue = utils.drawKeypoints(this.pose.keypoints, 0.7, this.ctx);
      console.log(returnedValue);
      if (returnedValue) {
        this.count++;
        if (this.count > 30) {
          console.log('에러 ㅋ');
        }
      } else this.count = 0;
      if (this.isPlay) {
        requestAnimationFrame(this.drawPerFrame);
      }
    },
    drawPerFrame() {
      this.draw();
    },
    handleDocumentRender() {
      this.pageCount = this.$refs.pdfRef.pageCount;
    },
    submitMessage() {
      if (this.msg) {
        this.$emit('submitMessage', this.msg);
        this.msg = '';
      }
      return;
    },
    // 파일 변경 시 이벤트 핸들러
    selectFile(file) {
      this.image = file;
      console.log(this.image);
    },
    async submit() {
      const formData = new FormData();
      formData.append('file', this.image);
      formData.append('name', this.$store.state.student.name);
      formData.append('studentID', this.$store.state.student.studentID);

      try {
        const { data } = await this.$http.post(`exams/${this.$store.state.room.id}/students/upload/answer`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(data);
        alert('시험지 제출 완료');
      } catch (err) {
        console.log(err);
        alert('시험지 제출 실패!!!');
      }
    },
  },
};
</script>

<style scoped></style>
