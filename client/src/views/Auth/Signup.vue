<template>
  <v-container class="d-flex ma-auto">
	<v-card class="ma-auto mt-16 pa-2 w-75">
    <h3 class="text-h4 text-center ma-2 pa-2">Create Account</h3>
	  <v-form @submit.prevent class="">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            	<v-text-field
                v-model="fName.value.value"
                :error-messages="fName.errorMessage.value"
                label="First Name"
              ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            	<v-text-field
                v-model="lName.value.value"
                :error-messages="lName.errorMessage.value"
                label="Last Name"
              ></v-text-field>
          </v-col>
        </v-row>

    <!-- Row 2 -->
    <v-row>
      <v-col cols="4" md="3">
        <v-select
          variant="outlined"
          class="rounded"
          label="+254"
          :items="['+256', '+255', '+89', '+250', '+506', '+189']"
          >
				</v-select>
      </v-col>
      <v-col cols="8" md="9">
        	<v-text-field
            variant="outlined"
            class="rounded"
            v-model="phoneNo.value.value"
            :error-messages="phoneNo.errorMessage.value"
            label="Phone Number"
          ></v-text-field>
      </v-col>
    </v-row>

    <!-- Row 3 -->
    <v-row>
      <v-col cols="12">
       	<v-text-field
          v-model="email.value.value"
          :error-messages="email.errorMessage.value"
          label="E-mail"
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- Row 4 -->
    <v-row>
      <v-col cols="12" md="6">
        	<v-text-field
            v-model="password.value.value"
            :error-messages="password.errorMessage.value"
            label="Password"
          ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
       	<v-text-field
          v-model="confirmPwd.value.value"
          :error-messages="confirmPwd.errorMessage.value"
          label="Confirm Password"
        ></v-text-field>
      </v-col>
    </v-row>
        <v-btn type="submit" block class="mt-2">Sign Up</v-btn>
      </v-container>
	  </v-form>
	  <v-row class="justify-center ma-4">
		<p>Already have an account? <router-link to="/login">Login</router-link></p>
	  </v-row>
	</v-card>
  </v-container>
</template>
<script setup>
  import { useField, useForm } from 'vee-validate'

  const { handleSubmit, handleReset } = useForm({
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
const fName = useField('fName')
  const lName = useField('lName')
const phoneNo = useField('phoneNo')
const confirmPwd = useField('confirmPwd')
const countryCode = useField('countryCode')

  const submit = handleSubmit(values => {
    alert(JSON.stringify(values, null, 2))
  })
</script>