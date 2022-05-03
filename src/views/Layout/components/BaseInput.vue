<template>
  <div>
    <v-text-field v-bind:value="value" v-on:input="updateInput" outlined />
  </div>
</template>

<script>
export default {
  props: ['value'],
  methods: {
    updateInput: function(event) {
      this.$emit('input', event.target.value); // v-model이 한글 인식 오류
    },
  },
};
</script>
