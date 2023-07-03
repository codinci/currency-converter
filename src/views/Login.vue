<template>
  <v-container class="d-flex ma-auto">
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
import axios from 'axios';
import { useField, useForm } from 'vee-validate'

  const { handleSubmit } = useForm({
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


const submit =  handleSubmit(values => {
  // console.log(JSON.stringify(values.password))
  const collectUsers = async () => {
    const response = await axios.get('db.json')
    // console.log(response.data);
    const users = response.data.users;
    const findEmail = users.find(({userEmail}) => userEmail === email.value.value);
    if (!findEmail) {
      console.log('No user with such email exists');
    } else {
      if (findEmail.userPassword !== password.value.value) {
        console.log('Incorrect password');
      } else {
        console.log('Redirect user to home page');
      }
    }
  }

  collectUsers()

})

</script>