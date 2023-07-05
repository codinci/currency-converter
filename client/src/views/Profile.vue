<template>
<v-container class="my-16">
	<v-card :width="width" class="ma-4 pa-2">
    <v-tabs
      v-model="tab"
    >
     <v-tab v-for="item in items" :key="item.tab">
          {{ item.tab }}
        </v-tab>
    </v-tabs>
    
    <v-card-text>
      <v-window v-model="tab">
        <v-window-item v-for="item in items" :key="item.tab" class="ma-2 pa-2">
          <component :width="width" v-bind:is="item.content"></component>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</v-container>
</template>

<script>
import ProfileInfo from '../components/ProfileInfo.vue';
import Transactions from '../components/Transactions.vue'

import { computed } from 'vue'
import { useDisplay } from 'vuetify'
export default {
  components: {
    ProfileInfo,
    Transactions
  },
  data() {
    return {
      tab: null,
      items: [
        { tab: 'Personal Details', content: 'ProfileInfo' },
        { tab: 'Transactions', content: 'Transactions' }
      ]
    };
  },
  setup () {
		const { name } = useDisplay()

		const width = computed(() => {
		// name is reactive and
		// must use .value
		switch (name.value) {
			case 'xs': return '90%'
			case 'sm': return '90%'
			case 'md': return '80%'
			case 'lg': return '60%'
			case 'xl': return '60%'
			case 'xxl': return '60%'
		}

		return undefined
		})

		return { width }
	},

};

</script>
