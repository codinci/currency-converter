<template>
		<v-card :width="width" class="d-sm-flex align-center ma-auto ">
			<v-container>
				<v-row>
					<v-col>
						<v-select
							variant="outlined"
							class="rounded"
							label="KSH"
							:items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
							>
						</v-select>
						<v-text-field label="amount"></v-text-field>
						<v-row class="justify-space-around mt-n2 mb-2">
							<p>BTC</p>
							<p>BTC</p>
							<p>BTC</p>
							<p>BTC</p>
						</v-row>
					</v-col>
				</v-row>
			</v-container>
			<v-row class="justify-center ma-2 pa-2">
				<v-icon color="green" icon="mdi-swap-horizontal"></v-icon>
			</v-row>
			<v-container>
				<v-row>
					<v-col>
						<v-select
							variant="outlined"
							class="rounded"
							label="KSH"
							:items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
						>
						</v-select>
						<v-text-field label="amount"></v-text-field>
						<v-row class="justify-space-around mt-n2 mb-2">
							<p>BTC</p>
							<p>BTC</p>
							<p>BTC</p>
							<p>BTC</p>
						</v-row>
					</v-col>
				</v-row>
			</v-container>
		</v-card>
</template>



<script setup>
import { onMounted, computed } from 'vue'
import { useDisplay } from 'vuetify'


const { name } = useDisplay()

const width = computed(() => {
	// name is reactive and
	// must use .value
	switch (name.value) {
		case 'xs': return '100%'
		case 'sm': return '100%'
		case 'md': return '60%'
		case 'lg': return '60%'
		case 'xl': return '50%'
		case 'xxl': return '50%'
	}

	return undefined
})
onMounted(() => width)
</script>



