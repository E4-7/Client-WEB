<template>
  <v-app>
    <v-main>
      <div>
        <v-btn text :to="{ name: 'Home' }" exact>Home</v-btn>
        <v-btn text :to="{ name: 'About' }" exact>About</v-btn>
      </div>

      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Base',
  components: {},
};
</script>
