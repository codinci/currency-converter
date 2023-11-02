<template>
  <div>
    <button @click="showForm('email')">Update Email</button>
    <button @click="showForm('phone')">Update Phone Number</button>
    <button @click="showForm('password')">Update Password</button>

    <DynamicForm :onSubmit="submitForm">
      <template v-slot:formValues="{ email, phone, password }">
        <div v-if="activeForm === 'email'">
          <input v-model="email" type="email" placeholder="Email" />
        </div>
        <div v-if="activeForm === 'phone'">
          <input v-model="phone" type="tel" placeholder="Phone Number" />
        </div>
        <div v-if="activeForm === 'password'">
          <input v-model="password" type="password" placeholder="Password" />
        </div>
      </template>
    </DynamicForm>
  </div>
</template>

<script setup>
import { ref } from "vue";

const activeForm = ref(null);

const showForm = (form) => {
activeForm.value = form;
};

const submitForm = (formValues) => {
console.log("Submitting form with values:", formValues);
};
</script>
