<template>
	<v-container class="d-flex ma-auto">
		<v-card class="ma-auto mt-16 pa-2 w-75">
				<h3 class="ma-2 pa-2 text-h4 text-center font-weight-bold">Check Your Email</h3>
				<p class="ma-4 pa-2 font-weight-bold">Verify your email address to use your account.</p>
				<p class="mx-4 mb-2 pa-2">We've sent you an email with a link to verify your email.</p>
				<p class="mx-4 mb-2 pa-2">Did you receive an email? If not check your spam folder. The link is only
					active for 24hrs. If you have not verified by then you will need to create
					a new account.
				</p>
				<v-container class="ma-auto">
					<p class="text-center"><router-link to="/">Home</router-link></p>
				</v-container>

		</v-card>
	</v-container>
</template>