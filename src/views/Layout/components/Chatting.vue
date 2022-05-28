<template>
  <div>
    <v-card style="overflow-y:scroll" min-height="820" max-width="820" max-height="820" class="mx-auto">
      <v-card-text style="text-align:right">
        <p v-for="message in messages" :key="message.id" class="text-h5 text--primary">
          {{ message }}
        </p>
        <v-spacer></v-spacer>
      </v-card-text>
    </v-card>
    <v-row cols="12" justify="center">
      <v-toolbar dark>
        <!--  max-width="700" min-width="700" -->
        <v-text-field max-width="100" type="text" label="   " placeholder="메세지를 입력하세요." filled v-model.trim="message" @keyup.enter="submitMessage"></v-text-field>
        <v-card class="pa-2" tile>
          <div @click="submitMessage" class="form__submit">
            <svg width="30" height="30" viewBox="0 0 68 68" fill="#CCCCCC" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_26_10)">
                <path
                  d="M48.0833 19.799C48.619 20.3347 48.806 21.127 48.5665 21.8457L35.8385 60.0294C35.5946 60.7614 34.9513 61.2877 34.1855 61.382C33.4198 61.4763 32.6681 61.1217 32.2539 60.4707L22.593 45.2893L7.41158 35.6285C6.76065 35.2142 6.40604 34.4625 6.50031 33.6968C6.59458 32.931 7.12092 32.2878 7.85287 32.0438L46.0366 19.3159C46.7553 19.0763 47.5476 19.2633 48.0833 19.799ZM26.5903 44.1204L33.3726 54.7782L42.0926 28.6181L26.5903 44.1204ZM39.2642 25.7897L23.7619 41.292L13.1041 34.5097L39.2642 25.7897Z"
                  fill=""
                />
              </g>
            </svg>
          </div>
        </v-card>
      </v-toolbar>
    </v-row>
  </div>
</template>

<script>
export default {
  components: {},
  mounted() {
    this.socket.on('sendMsgToAll', data => {
      this.messages.push(`${data.name}: ${data.msg}`);
    });
    console.log(this.manager);
    if (this.manager === 'p') {
      this.socket.on('sengMsgToManager', data => {
        this.messages.push(`${data.msg}`);
      });
    }
    this.socket.on;
  },
  props: ['socket', 'examId', 'userId', 'name', 'manager'],
  created() {},
  data() {
    return {
      textarea: '',
      message: '',
      messages: [],
    };
  },
  methods: {
    submitMessage() {
      const msg = this.message;
      if (msg === '') {
        alert('메시지를 입력해주세요');
        return;
      } else {
        this.message = '';
        this.socket.emit('sendMsgToAll', {
          sender: this.userId,
          name: this.name,
          msg,
          roomId: this.examId,
        });
      }
    },
  },
};
</script>

<style scoped></style>
