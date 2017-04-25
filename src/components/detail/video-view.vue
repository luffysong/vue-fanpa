<template>
	<video controls preload webkit-playsinline :src="url"  :class="{'video-height': isSetHeight}"></video>
</template>
<script>
	import store from '../../vuex/store';

	export default {
		props: ['url'],
		data: function () {
			return {
				isSetHeight: true
			}
		},
		ready() {
			this.setVideoHeight();
			this.resetVideo();
		},
		methods: {
			setVideoHeight: function () {
				var vm = this,
					oVideo = this.$el;
					
				oVideo.onplay = function () {
					vm.isSetHeight = false;
				};

				this.$watch('roomId', function () {
					vm.isSetHeight = true;
				});
			},
			resetVideo: function () {
				this.$watch('url', function () {
					this.$el.load();
				});
			}
		},
		store,
		vuex: {
			getters: {
				roomId: state => state.room.roomId
			}
		}
	}
</script>
<style lang="scss" scoped>

	video {
		width:10rem;
		height:10rem / 16 * 9;
	}

	//video.video-height {
	//	height:5rem;
	//}

</style>