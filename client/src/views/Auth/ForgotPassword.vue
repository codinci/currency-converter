<template>
  <v-container class="d-flex ma-auto">
  <Notification ref="displayNotification"/>
	<v-card class="w-50 mx-auto">
    <h3 class="text-h5 text-center ma-2 pa-2">Reset Password</h3>
	  <v-form @submit.prevent class="ma-auto w-75 my-8">
		<v-text-field
			v-model="email.value.value"
			:error-messages="email.errorMessage.value"
			label="E-mail"
		></v-text-field>
		<v-text-field
			v-model="password.value.value"
			:append-inner-icon="showPassword ? 'mdi-eye-outline': 'mdi-eye-off-outline'"
			@click:append-inner="() => (showPassword = !showPassword)"
			:type="showPassword ? 'text' : 'password'"
			:error-messages="password.errorMessage.value"
			label="New Password"
		></v-text-field>
		<v-text-field
			v-model="confirmPassword.value.value"
			:append-inner-icon="showConfirmPassword ? 'mdi-eye-outline': 'mdi-eye-off-outline'"
			@click:append-inner="() => (showConfirmPassword = !showConfirmPassword)"
			:type="showConfirmPassword ? 'text' : 'password'"
			:error-messages="confirmPassword.errorMessage.value"
			label="Confirm New Password"
		></v-text-field>
		<v-btn type="submit" @click="submit" block class="mt-2">Reset Password</v-btn>
	  </v-form>
	</v-card>
  </v-container>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {reset} from '../../api/authApi'
import { useField, useForm } from 'vee-validate'
import Notification from '../../components/Notification.vue'

const displayNotification = ref(null)

const { handleSubmit, resetForm } = useForm({
	validationSchema: {

    password (value) {
      if ( /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value)) return true

      return 'Password must contain alphanumeric characters greater than 8.'
	},

	confirmPassword (value) {
		if (value &&  value === password.value.value) return true

		return 'Must match with password'
    },

    email (value) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

      return 'Must be a valid e-mail.'
    }
  },
})
const password = useField('password')
const confirmPassword = useField('confirmPassword')
const email = useField('email')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const router = useRouter()

const submit = handleSubmit(async values => {
  const res = await reset(
    {
      email: values.email,
      newPassword: values.password
    }
  )

  if (res?.code) {
    //Show error message
    if (res?.response) {
      displayNotification.value.showSnackbar(res.response.data.message, 'error')
    }
    else {
      displayNotification.value.showSnackbar(`${res.message} - server is unreachable`, 'error')
    }
  } else {
	  // Show success message
    displayNotification.value.showSnackbar(res.data.message, 'success');
    router.push({ name: 'login' });
  }
  resetForm()
})

</script>