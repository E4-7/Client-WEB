<template>
  <v-app>
    <v-content>
      <v-container>
        <v-row justify="center" style="padding:20px;">
          <v-col>
            <v-row justify="center" style="padding:15px;">
              <v-card min-height="400" min-width="400">
                <div>
                  <!--<agora :appid="appid" :channel="channel" :token="token">-->
                  <agora :appid="this.$store.state.room.agoraAppId" :channel="this.$store.state.room.id" :token="this.$store.state.room.agoraToken">
                    33333333333333333{{ this.$store.state.room.agoraAppId }}
                    <agora-audio-sender />
                    <agora-audio-receiver />
                    <agora-video-sender />
                  </agora>
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
            <v-row justify="center" style="padding-top:40px;">
              <v-btn text @click="submit">시험 종료</v-btn>
            </v-row>
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

export default {
  components: {
    VuePdfEmbed,
    Chatting,
  },
  data() {
    return {
      appid: '',
      channel: '',
      token: '',
      videoProfile: '480p_4',
      transcode: 'interop',
      attendeeMode: 'video',
      baseMode: 'avc',
      uid: 0,
      socketRef: null,
      examId: this.$route.params.roomId,
      userId: this.$store.state.user.id,
      name: this.$store.state.user.name,
      page: 1,
      pageCount: 1,
      source1: '/docs/a.pdf',
      currentPage: 0,
      image: 'test image',
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
  created() {
    console.log('this.$store.state.room');
    console.log(this.$store.state.room);
    console.log('this.$store.state.user');
    console.log(this.$store.state.user);

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
    },
    submit() {},
    // async submit() {
    //   const formData = new FormData();
    //   formData.append('image', this.image);

    //   try {
    //     const { data } = await axios.post('http://127.0.0.1:3000/product/create', formData, {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //     });
    //     console.log(data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
  },
};
</script>

<style scoped></style>
