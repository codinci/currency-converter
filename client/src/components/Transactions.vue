<template>
  <div>
    <v-list class="ma-2 pa-2" lines="two">
      <v-list-item
        v-for="(item) in pagedTransactions"
        :key="item.transactionID"
      >
      <v-container>
        <v-row class="pa-2">
            <span v-if="item.type === 'received'">
              <!-- Display icon for type A -->
              <v-icon icon="mdi-call-received"></v-icon>
            </span>
            <span v-else>
              <!-- Display icon for type B -->
              <v-icon icon="mdi-send"></v-icon>
            </span>
            <span class="ml-2 text-subtitle-1"> {{ item.date }}</span>
        </v-row>
        <v-row class="pa-2">
          {{ item.amount }} {{ item.currency }} {{ item.type === 'received'? 'from' : 'to' }} {{ item.description }}
        </v-row>
      </v-container>
      </v-list-item>
    </v-list>
    <v-pagination v-model="pageNo" :length="numPages"></v-pagination>
  </div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue'
import axios from 'axios';

const pageNo = ref(1);
const pageSize = ref(2);
const loadTransactions = ref(false)
const transactions = ref([]);

const fetchTransactions = async () => {
  loadTransactions.value = true
  try {
    const response = await axios.get('db.json')
    transactions.value = response.data.transactions
  } catch (error) {
    console.error(error);
  } finally {
    loadTransactions.value = false
  }
}

// console.log(transactions.value);

const numPages = computed(() => {
  return Math.ceil(transactions.value.slice().length / pageSize.value);
})

const pagedTransactions = computed(() => {
  // get the start index for your paged result set.
  // The page number starts at 1 so the active item in the pagination is displayed properly.
  // However for our calculation the page number must start at (n-1)
  const startIndex = (pageNo.value - 1) * pageSize.value;

  // create a copy of your assets list so we don't modify the original data set
  const data = [...transactions.value];

  // only return the data for the current page using splice
  return data.splice(startIndex, pageSize.value);

})


onMounted(fetchTransactions);
</script>