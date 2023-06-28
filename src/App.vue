<script setup>
import SiteNavigation from './components/SiteNavigation.vue';
import Home from './views/Home.vue'
import Profile from './views/Profile.vue';
import Login from './views/Login.vue';
import Signup from './views/Signup.vue';
</script>

<template>
  <v-app class="d-flex mb-4">
    <SiteNavigation/>
    <router-view/>
  </v-app>
</template>

