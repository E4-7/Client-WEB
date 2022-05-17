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
              <v-btn @click="goTestPage()" x-large>입장하기</v-btn>
            </v-row>
            <v-row justify="center" style="padding:20px;">
              <v-select :items="items" label="마이크 선택"></v-select>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Video from '../../../components/Video.vue';
import setTimer from '@/plugins/setTimer';

export default {
  name: 'Set',
  components: { Video },
  data: () => ({
    reveal: false,
    stream: null,
    items: ['Programming', 'Design', 'Vue', 'Vuetify'],
  }),
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
    },
    async goOCRCheck(id, name) {
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
      try {
        const myFile = new File([imageCapture], 'image.jpeg', {
          type: imageCapture.type,
        });
        const frm = new FormData();
        frm.append('image', myFile);
        frm.append('studentID', this.user.id);
        frm.append('name', this.user.name);

        const { data } = this.$http.post(`exams/${this.$route.params.roomId}/students/authentication`, frm);
        if (data.success) {
          alert('회원가입 되셨습니다. 반갑습니다.', data);
        }
      } catch (err) {
        alert('에라 에라 에라');
      }

      if (this.count >= 3) {
        alert('학생증 인증 실패!\n인증버튼을 다시 눌러 진행해주세요!');
      } else {
        this.count++;
        await setTimer(12000);
        await this.goOCRCheck(id, name);
      }
    },
    async goAuthentic() {
      //계속해서
      this.count = 0;
      const id = this.user.id;
      const name = this.user.name;
      if (id === '' || name === '') {
        alert('학번이나 이름을 입력해주세요.');
        return;
      }
      //id와 name을 서버에 보내고 OCR해서 맞는지 확인하고 디비 통신해서 있는 사용자 확인하고 맞으면 true로 넘어감
      await this.goOCRCheck(id, name);
    },
  },
  async created() {
    await this.getMediaStream();
  },
};
</script>

<style scoped></style>
