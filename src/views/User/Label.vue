<template>
	<div>
		{{count}}
		<p>
			<button @click="increment">+</button>
			<button @click="decrement">-</button>
		</p>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	export default {
		data() {
			return {

			}
		},
		created() {

		},
		computed: {
			...mapState('counter', [
				'count'
			])
		},
		methods: {
			...mapMutations([
				'counter/increment',
				'counter/decrement',
			])
		}
	};
</script>
<style>

</style>
