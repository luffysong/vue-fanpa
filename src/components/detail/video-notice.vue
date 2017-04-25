<template>
	<div class="video-notice">
		<span>该直播将于 {{playDateTime}} 播出</span>
	</div>
</template>
<script>
	import store from '../../vuex/store'

	export default {
		props: ['roomDetail', 'liveTime'],
		data: function () {
			return {
				playDateTime: ''
			}
		},
		created() {
			this.getPlayDateTime();
		},
		methods:{
			getPlayDateTime() {
				var vm = this;

				handler();
				this.$watch('roomDetail', handler);

				function handler() {
					var oDate = new Date();
					oDate.setTime(vm.liveTime);
					vm.playDateTime = oDate.getFullYear() + ' 年 ' + zeroize(oDate.getMonth()+1) + ' 月 ' + zeroize(oDate.getDate()) + ' 日 ' + zeroize(oDate.getHours()) + ' : ' + zeroize(oDate.getMinutes())
				}

				function zeroize(num) {
					if(num < 10) {
						return '0' + num;
					} else {
						return '' + num
					}
				}
			}
		},
		store,
		vuex: {
			getters: {
				// roomDetail: state => state.room.roomDetail,
				// liveTime: state => state.room.roomDetail.liveTime
			}
		}
	}
</script>