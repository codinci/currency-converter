<template>
  <v-container class="d-flex ma-auto">
  <Notification ref="displayNotification"/>
	<v-card class="w-50 mx-auto">
    <h3 class="text-h5 text-center ma-2 pa-2">Login</h3>
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
        label="Password"
      ></v-text-field>
      <v-btn type="submit" @click="submit" block class="mt-2">Login</v-btn>
	  </v-form>
	  <v-row class="ma-auto w-75">
      <v-col>
        <router-link style="text-decoration: none" to="/reset/password" class="font-weight-medium text-info">Forgot Password?</router-link>
      </v-col>
      <v-col>
        	<p
            class="font-weight-medium">Don't have an account?
            <router-link style="text-decoration: none;" class="text-info" to="/signup">
              Sign Up
            </router-link>
          </p>
      </v-col>
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
const showPassword = ref(false)

const router = useRouter()

const submit = handleSubmit(async values => {
  const res = await login(
    {
      email: values.email,
      password: values.password
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
    displayNotification.value.showSnackbar('Login Successful', 'success');
    router.push({ name: 'profile' });
  }
  resetForm()
})

</script>