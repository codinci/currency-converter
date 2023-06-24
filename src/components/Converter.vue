<template>
	<v-row justify="center" align="center" >
		<v-card width="650px" >
			<v-row class="ma-2 pa-2">
				<v-col>
					<v-select
						label="Select"
						:items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
						>
					</v-select>
				</v-col>
				<v-col>
					<v-select
						label="Select"
						:items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
						>
					</v-select>
				</v-col>
			</v-row>
			<v-row class="ma-2 pa-2">
				<v-text-field label="amount" class="ma-2 pa-2"></v-text-field>
				<v-icon class="mt-8 pa-2 mx-2" icon="mdi-swap-horizontal"></v-icon>
 				<v-text-field label="amount" class="ma-2 pa-2"></v-text-field>
			</v-row>
		</v-card>
	</v-row>
</template>
