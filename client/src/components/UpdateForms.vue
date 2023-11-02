<template>
  <form @submit.prevent="submitForm">
    <slot v-bind="slotProps"></slot>
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>

const submitForm = () => {
  if (onSubmit) {
    onSubmit(slotProps.formValues);
  }
};
</script>
