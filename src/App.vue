<script setup>
import SiteNavigation from './components/SiteNavigation.vue';
import Home from './views/Home.vue'
</script>

<template>
  <v-app class="d-flex mb-4">
    <SiteNavigation/>
    <v-container class="fluid ma-auto">
      <Home/>
    </v-container>
  </v-app>
</template>

