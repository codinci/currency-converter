<template>
	<v-container class="d-flex ma-auto">
		<v-card class="text-center mx-auto w-50">
			<h3 class="text-center ma-2 pa-2">{{ message }}</h3>
			<v-container v-if="isVerified">
				<v-icon
					color="success"
					icon="mdi-check-circle"
					size="x-large"
					class="mx-auto"
				></v-icon>
				<p class="text-center">Your Account has been verified. Please <router-link  to="/login">login</router-link> to continue.</p>
			</v-container>
			<v-container v-else>
				<v-icon class="ma-2 pa-2 text-center" color="error" icon="mdi-close-circle-outline" size="x-large"></v-icon>
				<p class="text-center ma-2 pa-2">Your account could not be verified. Please <router-link  to="/signup">register</router-link> to continue.</p>
			</v-container>
		</v-card>
	</v-container>

</template>
<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { verify } from '../../api/authApi';

const route = useRoute()

const verificationDetails = {
	userId: route.params.id,
	userToken: route.params.token
}

const message = ref('')
const isVerified = ref(false)



onMounted(async () => {
	const res = await verify(verificationDetails)

	if (res?.code) {
		//Show error message
		if (res?.response) {
			message.value = res.response.data.message
		}
		else {
			message.value = res.message
		}
	} else {
		isVerified.value = true
		message.value = res.data.message
		// Show success message
	}

})
</script>