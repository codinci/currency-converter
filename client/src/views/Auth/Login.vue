<template>
  <v-container class="d-flex ma-auto">
  <Notification ref="displayNotification"/>
	<v-card class="w-100 mx-auto">
	  <v-form @submit.prevent class="ma-auto w-75 my-8">
		<v-text-field
			v-model="email.value.value"
			:error-messages="email.errorMessage.value"
			label="E-mail"
		></v-text-field>
		<v-text-field
			v-model="password.value.value"
			:error-messages="password.errorMessage.value"
			label="Password"
		></v-text-field>
		<v-btn type="submit" @click="submit" block class="mt-2">Login</v-btn>
	  </v-form>
	  <v-row class="justify-center ma-4">
		<p>Don't have an account? <router-link to="/signup">Sign Up</router-link></p>
	  </v-row>
	</v-card>
  </v-container>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {login} from '../../api/authApi'
import { useField, useForm } from 'vee-validate'
import Notification from '../../components/Notification.vue'

const displayNotification = ref(null)

const { handleSubmit, resetForm } = useForm({
  validationSchema: {
    password (value) {
      if ( /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value)) return true

      return 'Password must contain alphanumeric characters greater than 8.'
    },
    
    email (value) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

      return 'Must be a valid e-mail.'
    }
  },
})
const password = useField('password')
const email = useField('email')

const router = useRouter()

const submit = handleSubmit(async values => {
  const response = await login(
    {
      email: values.email,
      password: values.password
    }
  )
  if (response.status === 200) {
    // Show success message
    displayNotification.value.showSnackbar('Login Successful', 'success');
    router.push({ name: 'profile' });
  } else {
    // Show error message
    displayNotification.value.showSnackbar(response.data.message, 'error')
  }
  resetForm()
})

</script>