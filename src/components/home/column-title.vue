<template lang="jade">
div.home-column-title
	span.title
		span.text {{ title }}
		span.english {{ english }}
	a.more(@click="toList()") MORE>
</template>

<script>
	export default {
		props: ['title', 'english', 'column', 'tag'],
		methods: {
			toList: function () {
				this.$router.go(this.moreLink);
			}
		},
		computed: {
			moreLink: function () {
				var params;
				if(typeof this.tag === 'undefined') {
					params = this.column;
				} else {
					params = this.column + '/' + this.tag;
				}

				return {
					name: 'list',
					params: { 
						column: params
					}
				};
			}
		}
	}
</script>