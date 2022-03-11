<template>
  <div>Hello world</div>
  <HelloWorld></HelloWorld>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
export default defineComponent({
  components: {
    HelloWorld,
  },
  props: {},
  setup(props) {
    return {
      props,
    };
  },
});
</script>

<style></style>
