<template>
  <v-snackbar v-model="show" :color="color">
    {{ message }}
  </v-snackbar>
</template>

<script setup>
import { ref } from 'vue';
const show = ref(false);
const message = ref('');
const color = ref('success');

const showSnackbar = (newMessage, newColor) => {
	show.value = true;
	message.value = newMessage;
	color.value = newColor;
}

defineExpose({
	showSnackbar
})

</script>