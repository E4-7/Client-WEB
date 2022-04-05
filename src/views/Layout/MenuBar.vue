<template>
  <div>
    <nav>
      <v-toolbar class="primary" dark height="65">
        <v-img
          class="mx-2"
          src="src/assets/images/e47_logo_blue.png"
          max-height="100"
          max-width="70"
          contain
        ></v-img>
        <v-toolbar-title class="text-uppercase gray--text">
          <span class="font-weight-light">E4/</span>
          <span>7</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text color="black">
          <span>Log Out</span>
          <v-icon right>exit_to_app</v-icon>
        </v-btn>
      </v-toolbar>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style></style>
