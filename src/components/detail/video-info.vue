<template>
	<div class="video-info">
		<div class="v-card">
			<img v-bind:src="roomDetail.creator && roomDetail.creator.smallAvatar" height="66" width="66" alt="">
			<div class="text-wrap">
				<p class="title">{{roomDetail.roomName}}</p>
				<p class="explain">{{roomDetail.creator && roomDetail.creator.nickName}}</p>
			</div>
		</div>
		<div class="people-num">
			<!--  onlineMax  currentOnline-->
			<p v-if="roomStatus === 2">在线人数：<span>{{roomLongpoling.currentOnline || 0}}</p>
			<p v-if="roomStatus === 3">最高在线人数：<span>{{roomLongpoling.onlineMax || 0}}</span></p>

			<p>人气：<span>{{roomLongpoling.popularity || 0}}</span></p>
		</div>
	</div>
</template>
<script>
	import store from '../../vuex/store'
	import { getRoomLongPoling } from '../../vuex/actions/room'

	export default {
		data: function () {
			return {
				timer: null
			}
		},
		created: function () {
			this.applyGetRoomLongPoling();
		},
		destroyed: function () {
			clearInterval(this.timer);
		},
		methods: {
			applyGetRoomLongPoling: function () {
				this.$watch('roomId', function () {
					this.getRoomLongPoling({
						roomId: this.roomId
					});	
				});

				this.timer = setInterval(function () {
					this.getRoomLongPoling({
						roomId: this.roomId
					});	
				}.bind(this), 10000);
			}
		},
		store,
		vuex: {
			getters: {
				roomDetail: state => state.room.roomDetail,
				roomId: state => state.room.roomId,
				roomLongpoling: state => state.room.longpoling,
				roomStatus: state => state.room.roomDetail.status
			},
			actions: {
				getRoomLongPoling
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "../../styles/common/reset";

	.video-info {
		@extend .clearfix; 
	}

	.v-card {
		float:left;
		display:-webkit-box;
		width:6rem;
		img {
			width:1rem;
			height:1rem;
			border-radius:50%;
			margin-right:.1rem;
		}
	}

	.text-wrap {
		vertical-align:top;
		-webkit-box-flex:1;
		p.title {
			font-size:0.373333rem;
		}
		p.explain {
			color: #666;
		}
	}

	.people-num {
		float:right; 
		text-align:right;
		color:#999;
		span {
			color:#f5716f;
		}
	}
</style>