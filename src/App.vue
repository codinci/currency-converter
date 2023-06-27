<script setup>
import SiteNavigation from './components/SiteNavigation.vue';
import Home from './views/Home.vue'
import Profile from './views/Profile.vue';
</script>

<template>
  <v-app class="d-flex mb-4">
    <SiteNavigation/>
    <Profile/>
  </v-app>
</template>

