<template>
	<footer>Copyright © 2016 yinyuetai.com</footer>
</template>
<script>
	export default {
		ready() {
			this.changeBg();
			this.$watch('routeName', this.changeBg);
		},
		methods: {
			changeBg: function () {
				if(this.routeName === 'i') {
					this.$el.classList.add('white-bg');
				} else {
					this.$el.classList.remove('white-bg');
				}
			}
		},
		computed: {
			routeName: vm => vm.$route.name
		}
	}
</script>
<style lang="scss">
	.white-bg {
		background-color:#fff;
	}
</style>