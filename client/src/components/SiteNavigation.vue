<template>
  <v-container class="pa-0">
    <v-app-bar class="d-flex">
      <v-sheet class="ma-4 pa-2 me-auto">
        <v-icon class="ma-2 pa-2 mb-4" role="img" icon="mdi-cash-multiple"></v-icon>
        <router-link style="text-decoration: none; color: inherit;" to="/" class="text-subtitle-1 text-sm-h6 text-md-h5">Currency Converter</router-link>
      </v-sheet>
      <v-sheet v-if="isAuthenticated" class="ma-6 pa-2">
        <v-menu v-model="menu" :close-on-content-click="false" location="end">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" class="text-h6 hidden-sm-and-down">Profile</v-btn>
            <v-icon class="ma-2 mb-4 hidden-md-and-up" role="img" icon="mdi-account-circle"></v-icon>
          </template>
          <v-card min-width="300">
            <v-list>
              <v-list-item class="mt-4">
                <router-link style="text-decoration: none; color: inherit;" to="/profile">
                  <v-avatar color="info">
                    <v-icon role="img" icon="mdi-account-circle"></v-icon>
                  </v-avatar>
                  <span class="ma-2 pa-2">{{store.user}}</span>
                </router-link>
                <v-list-item-subtitle class="mt-2 pa-2">Account Balance: </v-list-item-subtitle>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list>
              <v-list-item>
                <router-link style="text-decoration: none; color: inherit;" to="/login" class="text-h6">
                  <span class="pa-2">Logout</span>
                  <v-icon class="ma-2 pa-2" icon="mdi-logout"></v-icon>
                </router-link>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </v-sheet>
      <v-sheet v-else class="ma-6 pa-2">
        <router-link style="text-decoration: none; color: inherit;" to="/login" class="text-h6 hidden-sm-and-down">Login</router-link>
        <router-link style="text-decoration: none; color: inherit;" to="/login" class="hidden-md-and-up">
          <v-icon class="ma-2 pa-2 mb-4" icon="mdi-login"></v-icon>
        </router-link>
      </v-sheet>
    </v-app-bar>
  </v-container>
</template>

<script setup>
import { useAuthStore as authStore } from '../store/users';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const store = authStore();
const { isAuthenticated } = storeToRefs(store);
console.log(store.user)
const menu = ref(false);

</script>
