<template>
  <v-container class="d-flex ma-auto">
  <Notification ref="displayNotification"/>
	<v-card class="ma-auto mt-16 pa-2 w-75">
    <h3 class="text-h5 text-center ma-2 pa-2">Create Account</h3>
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
            class="pa-2"
              v-model="phoneNumber"
              :dropdownOptions="{showDialCodeInList: true, showFlags: true, showSearchBox: true}"
              @validate="phoneNumberValidation">
            </vue-tel-input>
            <span v-if="!isPhoneNumberValid"  class="ma-2 pa-2 text-error text-subtitle-2">{{phoneNumberErrorMessage}}</span>

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
                :append-inner-icon="showPassword ? 'mdi-eye-outline': 'mdi-eye-off-outline'"
                @click:append-inner="() => (showPassword = !showPassword)"
                :type="showPassword ? 'text' : 'password'"
                :error-messages="password.errorMessage.value"
                label="Password"
              ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="confirmPwd.value.value"
              :append-inner-icon="showConfirmPassword ? 'mdi-eye-outline': 'mdi-eye-off-outline'"
              @click:append-inner="() => (showConfirmPassword = !showConfirmPassword)"
              :type="showConfirmPassword ? 'text' : 'password'"
              :error-messages="confirmPwd.errorMessage.value"
              label="Confirm Password"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn type="submit" @click="submit" block class="mt-2">Sign Up</v-btn>
      </v-container>
	  </v-form>
	  <v-row class="justify-center ma-4">
		  <p class="font-weight-medium">Already have an account? <router-link style="text-decoration: none;" class="font-weight-bold" to="/login">Login</router-link></p>
	  </v-row>
	</v-card>


  </v-container>
</template>
<script setup>

  import { useField, useForm } from 'vee-validate'
  import { ref } from 'vue';
  import { register } from '../../api/authApi'
  import Notification from '../../components/Notification.vue'
  import { useRouter } from 'vue-router'

  const displayNotification = ref(null)

  const { handleSubmit, resetForm } = useForm({
    validationSchema: {
      fName(value) {
        if (value && value.length >= 2 && /^[ a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'`'\-]+$/.test(value)) return true

        return 'First Name must contain at least 2 letters'
      },
      lName(value) {
        if (value && value.length >= 2 && /^[ a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'`'\-]+$/.test(value)) return true

        return 'Last Name must contain at least 2 letters'
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
      },
    },
  })

  const password = useField('password')
  const email = useField('email')
  const fName = useField('fName')
  const lName = useField('lName')
  const confirmPwd = useField('confirmPwd')
  const phoneNumber = ref('')
  const phoneNumberErrorMessage = ref('')
  const isPhoneNumberValid = ref(false)
  const showPassword = ref(false)
  const showConfirmPassword = ref(false)
  const countryCode = ref('')
  const userCountry = ref('')
  const userContact = ref('')

  const router = useRouter()

  //validating phone number
  const phoneNumberValidation = ({ countryCallingCode, number, valid, country }) => {
    countryCode.value = countryCallingCode
    userContact.value = number
    isPhoneNumberValid.value = valid
    userCountry.value= country.name
  }

  //handling form submission
  const submit = handleSubmit(async values => {

    if (!isPhoneNumberValid.value) {
      phoneNumberErrorMessage.value = 'Invalid phone number'
      return
    }


    phoneNumberErrorMessage.value = ''
    const userDetails = {
      first_name: values.fName,
      last_name: values.lName,
      email: values.email,
      password: values.password,
      phone_number: userContact.value,
      country_code: countryCode.value,
      country_name: userCountry.value
    }

    const res = await register(userDetails)

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
      displayNotification.value.showSnackbar('Please verify your email', 'success');
      router.push({ name: 'verificationAlert' });
    }
    //resetting form
    resetForm()
  })



</script>


