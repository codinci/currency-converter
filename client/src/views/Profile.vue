<template>
  <v-container class="my-16">
    <v-card :width="width" class="ma-4 pa-2">
      <v-tabs v-model="tab">
        <v-tab v-for="item in items" :key="item.tab">
          {{ item.tab }}
        </v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab">
          <v-window-item v-for="item in items" :key="item.tab" class="ma-2 pa-2">
            <component :is="item.content" :width="width" />
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useDisplay } from 'vuetify';
import ProfileInfo from '../components/ProfileInfo.vue';
import Transactions from '../components/Transactions.vue';


const tab = ref('Personal Details');

const items = [
  { tab: 'Personal Details', content: ProfileInfo },
  { tab: 'Transactions', content: Transactions },
];

const { name } = useDisplay();

const width = computed(() => {
  switch (name.value) {
    case 'xs':
      return '90%';
    case 'sm':
      return '90%';
    case 'md':
      return '80%';
    case 'lg':
      return '60%';
    case 'xl':
      return '60%';
    case 'xxl':
      return '60%';
    default:
      return undefined;
  }
});

</script>
