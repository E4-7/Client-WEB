<template>
  <div id="wrap-video">
    <video v-if="stream" ref="video" class="video" :volume="0" playsinline webkit-playsinline :srcObject.prop="stream" autoPlay></video>
    <div class="no-video" v-else>카메라가 인식되지 않았습니다.<br />허용 후 새로고침 해주세요.</div>
  </div>
</template>

<script>
export default {
  props: ['stream'],
};
</script>

<style scoped>
.video {
  width: 100%;
}
</style>
