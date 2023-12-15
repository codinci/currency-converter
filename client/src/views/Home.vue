<template>
	<SiteNavigation/>
	<v-container class="ma-auto">
		<Suspense>
			<Converter/>
			<template #fallback>Loading ...</template>
		</Suspense>

	</v-container>
</template>
<script setup>
import Converter from '../components/Converter.vue';
import SiteNavigation from '../components/SiteNavigation.vue';
</script>