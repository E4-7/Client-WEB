<template>
  <div><MyCanvas /></div>
</template>

<script>
import MyCanvas from './MovieCanvas.vue';
export default {
  components: {
    MyCanvas,
  },
  data() {
    return {
      src: '',
    };
  },
  methods: {
    onSelect(event) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => {
        this.src = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style></style>
