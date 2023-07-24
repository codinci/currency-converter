<template>
  <v-container class="d-flex ma-auto">
	<v-card class="ma-auto mt-16 pa-2 w-75">
    <h3 class="text-h4 text-center ma-2 pa-2">Create Account</h3>
	  <v-form @submit.prevent>
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

        <v-row>
            <v-col cols="12" md="6">
              <vue-tel-input
                v-model="phone"
                :dropdownOptions="{showDialCodeInList: true, showFlags: true, showSearchBox: true}"
                @validate="numberValidation">
              </vue-tel-input>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
                label="E-mail"
              ></v-text-field>
            </v-col>
          </v-row>


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
        <v-btn type="submit" @click="submit" block class="mt-2">Sign Up</v-btn>
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
  import { ref } from 'vue';

  const { handleSubmit, handleReset } = useForm({
    validationSchema: {
      fName(value) {
        if (/^[a-z]{3}$/i.test(value)) return true

        return 'First Name must contain letters greater than 3'
      },
      lName(value) {
        if (/^[a-z]{3}$/i.test(value)) return true

        return 'Last Name must contain letters greater than 3'
      },
      password (value) {
        if (/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value)) return true

        return 'Password must contain alphanumeric characters greater than 8.'
      },
      confirmPwd(value) {
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
  const email = useField('email')
  const fName = useField('fName')
  const lName = useField('lName')
  const confirmPwd = useField('confirmPwd')

  const phone = ref('')

  const numberValidation = ({country, formatted, valid}) => {

    console.log(`Phone No: ${formatted}, Validation: ${valid}, Country: ${country.name}`);
  }


  const submit = handleSubmit(values => {
    alert(JSON.stringify(values, null, 2))
  })

</script>


