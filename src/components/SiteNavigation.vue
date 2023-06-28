<template>
	<v-container class="pa-0">
		<v-app-bar  class="d-flex">
			<v-sheet class="ma-4 pa-2 me-auto hidden-sm-and-down">
				<v-icon class="ma-2 pa-2 mb-4" icon="mdi-cash-multiple"></v-icon>
				<router-link  style="text-decoration: none; color: inherit;" to="/" class="text-h5">Currency Converter</router-link>
			</v-sheet>
			<v-sheet class="ma-2 pa-2 me-auto hidden-md-and-up">
				<v-icon class="ma-2 pa-2 mb-4" icon="mdi-cash-multiple"></v-icon>
				<router-link  style="text-decoration: none; color: inherit;" to="/" class="text-h6">Currency Converter</router-link>			</v-sheet>
			<v-sheet class="ma-6 pa-2 hidden-sm-and-down">
				<router-link  style="text-decoration: none; color: inherit;" to="/login" class="text-h6">Login</router-link>
			</v-sheet>
			<v-sheet class="ma-6 pa-2 hidden-md-and-up">
				<router-link  style="text-decoration: none; color: inherit;" to="/login"><v-icon class="ma-2 pa-2 mb-4" icon="mdi-login"></v-icon></router-link>
			</v-sheet>
		</v-app-bar>
	</v-container>
</template>
