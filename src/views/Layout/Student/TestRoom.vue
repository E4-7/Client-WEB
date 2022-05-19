<template>
  <v-app>
    <v-content>
      <v-container>
        <v-row justify="center" style="padding:20px;">
          <v-col>
            <v-row justify="center" style="padding:15px;">
              <v-card min-height="400" min-width="400">
                <div class="wrapper meeting">
                  <div class="ag-main">
                    <!-- <div class="ag-container">
                      <AgoraVideoCall
                        :videoProfile="videoProfile"
                        :channel="channel"
                        :transcode="transcode"
                        :attendeeMode="attendeeMode"
                        :baseMode="baseMode"
                        :appId="appId"
                        :uid="uid"
                      ></AgoraVideoCall>
                    </div> -->
                  </div>
                  <!-- <div class="ag-footer">
                    <a class="ag-href" href="https://www.agora.io"><span>Powered By Agora</span></a>
                    <span>Talk to Support: 400 632 6626</span>
                  </div> -->
                </div>
                <!-- <div>
                  <agora :appid="config.appid" :token="config.token"
                    >
                    <agora-audio-sender />
                    <agora-audio-receiver />
                    <agora-video-receiver />
                    <agora-video-sender />
                  </agora></div> -->
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
//import AgoraVideoCall from '@/components/AgoraVideoCall';
import Chatting from '../components/Chatting.vue';

//import AgoraRtcVue from 'agora-rtc-vue';
//import 'agora-rtc-vue/lib/agora-rtc-vue.css';

//8bfce6e171ef47779ac175c6a9809767
//244b84aba3ed484f99eb7b72a0a9136d

// Vue.use(AgoraRtcVue, {
//   appid: 'f823987e32bd491d843459d5396eed2a',
//   token: '244b84aba3ed484f99eb7b72a0a9136d',
// });

export default {
  components: {
    VuePdfEmbed,
    Chatting,
  },
  data() {
    return {
      appId: 'f823987e32bd491d843459d5396eed2a',
      //videoProfile: //Cookies.get("videoProfile").split(",")[0] || "480p_4",
      channel: '29af7b00-321c-48ef-8d48-41798294b5aa',
      token: '244b84aba3ed484f99eb7b72a0a9136d',
      //channel: Cookies.get("channel") || "test",
      //transcode: Cookies.get("transcode") || "interop",
      //attendeeMode: Cookies.get("attendeeMode") || "video",
      //baseMode: Cookies.get("baseMode") || "avc",
      //uid: undefined,
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
