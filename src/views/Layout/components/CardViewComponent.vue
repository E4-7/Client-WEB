<template>
  <v-main class="main-page-cardview-layout">
    <v-container fill-height fluid>
      <v-row align-center justify="center">
        <v-card class="main-page-cardview" min-width="900" min-height="500"> </v-card>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: 'cardview-component',
  data() {
    return {
      title: void 0,
    };
  },
  methods: {
    showTitle() {
      this.title = 'cardview Component!!';
    },
  },
};
</script>

<style scoped>
div {
  padding: 20px;
}

div span {
  margin: 20px;
}
</style>
