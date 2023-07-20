<script setup>
import SiteNavigation from './components/SiteNavigation.vue';
</script>

<template>
  <v-app class="d-flex mb-4">
    <SiteNavigation/>
    <router-view/>
  </v-app>
</template>

