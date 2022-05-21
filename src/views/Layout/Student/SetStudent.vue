<template>
  <v-app>
    <v-main>
      <v-container fill-height>
        <v-row>
          {{ preInformation }}
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
              <v-btn :disabled="validated == 1" @click="goOCRCheck()" x-large>{{ buttonMessage }}</v-btn>
            </v-row>
            <v-btn text @click="changeIdentity()">
              {{ preInformationButton }}
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
      buttonMessage: '신원확인하기',
      validated: 0,
      reveal: false,
      stream: null,
      count: 0,
      items: ['Programming', 'Design', 'Vue', 'Vuetify'],
      check: false,
      urlappend: '',
      preInformation: '',
      preInformationButton: '',
      isIdentityStudentIDCard: true,
      studentIdCardInformationMessage:
        '[안내] 부정행위 의심 행동이 발각될 시에는 감독관에게 안내가 갑니다. \
      채팅 기능으로 실시간 감독관에게 연락할 수 있습니다. \
      신원확인은 화면에 학생증을 대고 버튼을 눌러주세요. \
      약 5초 뒤에 신원인증이 완료된다면, 시험장 화면으로 넘어갑니다. \
      만일, 학생증이 없거나 인식이 안된다면, "신원확인하기" 버튼 \
      아래의 "혹시 학생증이 없거나 인식이 안되나요?" 버튼을 클릭해주세요.',
      identityInformationMessage: '[안내] 카메라에 신분증을 얼굴 옆에 들고 신원확인하기 버튼을 눌러주세요. 아래와 같이 사진을 찍어주세요 (예시사진)',
      StudentIdCardButtonMessage: '혹시 학생증이 없거나 인식이 안되나요?',
      IdentityButtonMessage: '학생증으로 인증하고 싶어요!',
    };
  },
  methods: {
    changeIdentity: function() {
      if (this.isIdentityStudentIDCard) {
        // 학생증 -> 신분증으로 인증 버튼 누름
        this.isIdentityStudentIDCard = false;
        this.preInformation = this.identityInformationMessage;
        this.preInformationButton = this.IdentityButtonMessage;
      } else {
        // 학생증으로 인증할래요
        this.isIdentityStudentIDCard = true;
        this.preInformation = this.studentIdCardInformationMessage;
        this.preInformationButton = this.StudentIdCardButtonMessage;
      }

      //this.goTestPage();
    },
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
      this.buttonMessage = '신원확인 중,, 잠시만 기다려주세요.';
      try {
        const myFile = new File([imageCapture], 'image.jpeg', {
          type: imageCapture.type,
        });
        const frm = new FormData();
        frm.append('file', myFile);
        frm.append('studentID', this.$route.query.id);
        frm.append('name', this.$route.query.name);

        if (this.isIdentityStudentIDCard) {
          this.urlappend = '';
        } else {
          this.urlappend = '/image';
        }
        const { data } = await this.$http.post(`exams/${this.$route.params.roomId}/students/authentication` + this.urlappend, frm);

        console.log('data');
        console.log(data);
        //{"code":200,"success":true,"data":{"student":{"created_at":"2022-05-17T05:11:09.740Z","updated_at":"2022-05-17T09:26:30.465Z","id":"1a417272-9e90-4801-b50a-b7eac1bea967","ExamId":"29af7b00-321c-48ef-8d48-41798294b5aa","name":"조찬민","studentID":17011604,"is_certified":false,"lastLogin":null,"deleted_at":null,"ExamAnswer":null,"CertificatedImage":null},"data":{"url":"http://naver.com"}}}

        if (data.success) {
          alert('성공', data);
          this.$store.commit('SET_STUDENT_INFORMATION', data.data.student);
          this.$store.commit('SET_STUDENT_ROOM', data.data.room);
          this.goTestPage();
        }
      } catch (err) {
        console.log(err.message);
        alert('인식이 안되었습니다. 다시 시도해주세요.');
        this.validated = 0;
        this.buttonMessage = '신원확인';
      }
    },
  },
  async created() {
    this.preInformation = this.studentIdCardInformationMessage;
    this.preInformationButton = this.StudentIdCardButtonMessage;
    await this.getMediaStream();
  },
  beforeDestroy() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => {
        track.stop();
      });
    }
  },
};
</script>

<style scoped></style>
