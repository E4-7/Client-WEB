<template>
  <v-app>
    <v-main>
      <v-container fill-height>
        <v-row>
          [안내] 어쩌구어쩌구 녹화는 되고, 부정행위 의심 모션을 취했을때는 채팅으로 경고를 주고, 동영상이 저장되어 검토가 이루어집니다. 질문이 있을때는 손버튼을 클릭하시거나 손을 드시면 됩니다??
          채팅기능 가능합니다 고사장 비디오 오디오 장치 변경하거나 끌 수있다. 등등 설명
        </v-row>
        <v-row justify="center">
          <v-col col="2">
            <v-card min-height="500">
              얼굴
              <Video :stream="stream"></Video>
            </v-card>
          </v-col>
          <v-col align-self="center" justify="center" col="2">
            <v-row justify="center" style="padding:20px;">
              <v-btn :disabled="validated == 1" @click="goOCRCheck()" x-large>신원확인하기</v-btn>
            </v-row>
            <v-btn text @click="changeIdentity()">
              혹시 학생증이 없거나 인식이 안되나요?
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Video from '../../../components/CommonVideo.vue';

export default {
  name: 'Set',
  components: { Video },
  data: () => {
    return {
      validated: 0,
      reveal: false,
      stream: null,
      count: 0,
      items: ['Programming', 'Design', 'Vue', 'Vuetify'],
      check: false,
    };
  },
  methods: {
    goTestPage: function() {
      this.$router.push('/test/' + this.$route.params.roomId);
    },
    async getMediaStream(deviceId) {
      const initialConstrains = {
        audio: false,
        video: {
          facingMode: 'user',
        },
      };
      const cameraConstraints = {
        audio: false,
        video: {
          deviceId: { exact: deviceId },
        },
      };
      try {
        this.stream = await navigator.mediaDevices.getUserMedia(deviceId ? cameraConstraints : initialConstrains);
      } catch (e) {
        console.log(e);
      }
      console.log('check');
    },
    async goOCRCheck() {
      if (!this.stream) {
        alert('캠을 켜고 다시 시도해주세요');
        return;
      }
      const track = this.stream.getVideoTracks()[0];
      let imageCapture = new ImageCapture(track);
      imageCapture = await imageCapture.takePhoto();
      // await store.dispatch('CHECK_STUDENT_BY_OCR', {
      //   imageCapture,
      //   id,
      //   name,
      // });
      this.validated = 1;
      try {
        const myFile = new File([imageCapture], 'image.jpeg', {
          type: imageCapture.type,
        });
        const frm = new FormData();
        frm.append('file', myFile);
        frm.append('studentID', this.$route.query.id);
        frm.append('name', this.$route.query.name);

        const { data } = await this.$http.post(`exams/${this.$route.params.roomId}/students/authentication`, frm);

        console.log('data');
        console.log(data);
        //{"code":200,"success":true,"data":{"student":{"created_at":"2022-05-17T05:11:09.740Z","updated_at":"2022-05-17T09:26:30.465Z","id":"1a417272-9e90-4801-b50a-b7eac1bea967","ExamId":"29af7b00-321c-48ef-8d48-41798294b5aa","name":"조찬민","studentID":17011604,"is_certified":false,"lastLogin":null,"deleted_at":null,"ExamAnswer":null,"CertificatedImage":null},"data":{"url":"http://naver.com"}}}

        if (data.success) {
          alert('성공', data);
          this.goTestPage();
        }
      } catch (err) {
        console.log(err.message);
        alert('인식이 안되었습니다. 다시 시도해주세요.');
      }

      // if (this.count >= 3) {
      //   alert('학생증 인증 실패!\n인증버튼을 다시 눌러 진행해주세요!');
      // } else {
      //   this.count++;
      //   await this.goOCRCheck(this.$route.query.id, this.$route.query.name);
      // }
    },
    // async goAuthentic() {
    //   this.count = 0;
    //   const id = this.user.id;
    //   const name = this.user.name;
    //   if (id === '' || name === '') {
    //     alert('학번이나 이름을 입력해주세요.');
    //     return;
    //   }
    //   //id와 name을 서버에 보내getMediaStream고 OCR해서 맞는지 확인하고 디비 통신해서 있는 사용자 확인하고 맞으면 true로 넘어감
    //   await this.goOCRCheck(id, name);
    // },
  },
  async created() {
    await this.getMediaStream();
  },
};
</script>

<style scoped></style>
