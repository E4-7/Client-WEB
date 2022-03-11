<template>
  <div>Hello world components</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
export default defineComponent({
  props: {},
  setup(props) {
    return {
      props,
    };
  },
});
</script>

<style></style>
