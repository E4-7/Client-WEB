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
export default {
  name: 'Set',
  components: {},
  data: () => ({
    reveal: false,
    items: ['Programming', 'Design', 'Vue', 'Vuetify'],
  }),
  methods: {
    goTestPage: function() {
      alert('??');
      this.$router.push('/test');
    },
  },
};
</script>

<style scoped></style>
