<template>
  <div>
    <h1>404</h1>
    <p>
      찾을 수 없는 페이지입니다.<br />
      요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨어요. 😉
    </p>

    <router-link to="/"><button>홈으로</button></router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    return {};
  },
});
</script>
