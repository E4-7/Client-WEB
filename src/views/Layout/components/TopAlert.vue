<template lang="html">
  <v-alert v-model="openAlert" class="toast" transition="fade" :type="type">
    {{ description }}
  </v-alert>
</template>

<script>
export default {
  name: 'action',
  props: ['open', 'isSuccess', 'description'],
  data() {
    return {};
  },
  watch: {
    open(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.$emit('closeAlert');
        }, 4000);
      }
    },
  },
  computed: {
    type() {
      return this.isSuccess ? 'success' : 'error';
    },
    openAlert: {
      get() {
        return this.open;
      },
      set() {
        this.$emit('closeAlert');
      },
    },
  },
};
</script>
