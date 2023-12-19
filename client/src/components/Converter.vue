<template>
  <v-card :width="width" class="d-sm-flex align-center ma-auto">
    <v-container>
      <v-row>
        <v-col>
          <v-select
            variant="outlined"
            class="rounded"
            v-model="fromSelectedCurrency"
            :label="fromSelectedCurrency ? fromSelectedCurrency.flag : 'select currency'"
            :items="updatedCountries"
            item-title="symbol"
            return-object
            searchable
            clearable
          >
            <template v-slot:item="{ props, item }">
              <v-list-item v-bind="props">
                <span class="pr-2">{{item.raw.flag}}</span><span>{{item.raw.name}}</span>
              </v-list-item>
            </template>
          </v-select>
          <v-text-field label="amount"></v-text-field>
          <v-row class="justify-space-around mt-n2 mb-2">
            <p>BTC</p>
            <p>BTC</p>
            <p>BTC</p>
            <p>BTC</p>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-row class="justify-center ma-2 pa-2">
      <v-icon color="green" icon="mdi-swap-horizontal"></v-icon>
    </v-row>
    <v-container>
      <v-row>
        <v-col>
          <v-select
            variant="outlined"
            class="rounded"
            v-model="toSelectedCurrency"
            :label="toSelectedCurrency ? toSelectedCurrency.flag : 'select currency'"
            :items="updatedCountries"
            item-title="symbol"
            return-object
            searchable
            clearable
          >
            <template v-slot:item="{ props, item }">
              <v-list-item v-bind="props">
                <span class="pr-2">{{item.raw.flag}}</span><span>{{item.raw.name}}</span>
              </v-list-item>
            </template>
          </v-select>
          <v-text-field label="amount"></v-text-field>
          <v-row class="justify-space-around mt-n2 mb-2">
            <p>BTC</p>
            <p>BTC</p>
            <p>BTC</p>
            <p>BTC</p>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useDisplay } from 'vuetify'
import axios from 'axios'



const { name } = useDisplay()

const width = computed(() => {
  // name is reactive and must use .value
  switch (name.value) {
    case 'xs':
    case 'sm':
      return '100%'
    case 'md':
    case 'lg':
    case 'xl':
    case 'xxl':
      return '60%'
    default:
      return undefined
  }
})
onMounted(() => width)

const fromSelectedCurrency = ref(null)
const toSelectedCurrency = ref(null)

const getCountriesCurrency = async () => {
  try {
    const { data } = await axios.get('https://restcountries.com/v3.1/all')
    return data
  } catch (error) {
    console.error(error)
  }
}

const countriesData = await getCountriesCurrency()

const uniqueCurrencies = [];
const uniqueCurrencyNames = new Set();

// Iterate through the array of countries
countriesData.forEach(country => {
  // Check if the country has currencies information
  if (country.currencies) {
    // Extract currency information
    const currencyCode = Object.keys(country.currencies);
    const currencyObject = country.currencies[currencyCode];

    // Check if the currency name is defined and not already in the set
    if (currencyObject && !uniqueCurrencyNames.has(currencyObject.name)) {
      // Add the currency name to the set
      uniqueCurrencyNames.add(currencyObject.name);

      // Create an object for the unique currency and push it to the array
      const currencyValues = {
        symbol: currencyCode[0],
        name: currencyObject.name,
      };

      uniqueCurrencies.push(currencyValues);
    }
  }
});

const matchedCurrenciesWithFlags = uniqueCurrencies.map(currency => {
  // Find the corresponding flag based on the currency symbol
  const countryWithFlag = countriesData.find(country => {
    if (country.currencies) {
      const currencyCode = Object.keys(country.currencies)[0];
      return currencyCode === currency.symbol;
    }
    return false;
  });

  // Get the flag from the country or set a default value
  let flag = countryWithFlag ? countryWithFlag.flag : "Unknown Flag";

  // Return an object containing currency information and flag
  return {
    ...currency,
    flag,
  };
});

// console.log(matchedCurrenciesWithFlags)

const updatedCountries = matchedCurrenciesWithFlags.map(country => {
  switch (country.symbol) {
    case 'USD':
      return { ...country, flag: '🇺🇸' };
    case 'EUR':
      return { ...country, flag: '🇪🇺' };
    case 'GBP':
      return { ...country, flag: '🇬🇧' };
    case 'AUD':
      return { ...country, flag: '🇦🇺' };
    default:
      return country;
  }
});


</script>
