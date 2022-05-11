<template>
  <v-app>
    <v-content>
      <v-container>
        <v-row justify="center" style="padding:20px;">
          <!-- style="padding:20px;" -->
          <v-col>
            <v-row justify="center" style="padding:15px;">
              <v-card min-height="400" min-width="400">얼굴</v-card>
            </v-row>
            <v-row justify="center">
              <v-card min-height="450" min-width="400">
                채팅
                <Chatting></Chatting>
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
          <!-- <v-col>
            <v-row cols="12">
              <v-card class="mx-auto" min-height="800" max-width="700" min-width="700">
                <v-card-text>
                  <div>채팅tddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddhe Day</div>
                  <p class="text-h4 text--primary">
                    채팅채팅채팅채팅채팅채팅채팅
                  </p>
                  <p>채팅채팅</p>
                  <div class="text--primary">
                    채팅채팅.<br />
                    채팅채팅
                  </div>
                  <v-spacer></v-spacer>
                </v-card-text>
              </v-card>
            </v-row>
          </v-col> -->
        </v-row>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed';
import Chatting from '../components/Chatting.vue';

export default {
  components: {
    VuePdfEmbed,
    Chatting,
  },
  data() {
    return {
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
    // this.path.companyId = this.$route.params.id;
    // this.path.recrumentId = this.$route.params.recrumentId;
    // this.path.current = document.location.pathname;
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
