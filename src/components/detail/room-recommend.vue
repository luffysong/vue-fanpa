<template>
	<div class="recommend">
		<div class="column-title"><i></i><span>猜你喜欢</span></div>
		<div class="list-container">
			<div class="list" :style="{width: listWidth}">
				<a v-for="item in allHotList" @click="routerGo({name: 'detail', params: {roomId: item.roomId}})" track-by="roomId">
					<img v-bind:src="item.posterPic" alt="">
					<p>{{item.roomName}}</p>
				</a>
			</div>
		</div>
	</div>
</template>
<script>
	import store from '../../vuex/store';
	import { Toast, Indicator } from 'mint-ui'

	export default {
		props: ['allHotList'],
		data: function () {
			return {
				listWidth: '100rem'
			}
		},
		ready() {
			this.$watch('allHotList', function () {
				this.setListWidth();
			});
		},
		methods: {
			routerGo: function (path) {
				if(( this.webImJoinStatus === 'not' || this.webImJoinStatus === 'ing' ) && path.params.roomId !== this.roomId ) {
					Toast({
						message: '当前聊天室正在加入中，请稍候切换其他房间',
						position: 'bottom'
					});
					// Indicator.open('房间切换中');
					// var unwatch = this.$watch('webImJoinStatus', function () {
					// 	if(this.webImJoinStatus !== 'ing') {
					// 		setTimeout(function() {
					// 			Indicator.close();
					// 		}, 200);
					// 		this.$router.go(path);
					// 		unwatch();
					// 	}
					// })

				} else {
					this.$router.go(path);
				}

			},
			setListWidth: function () {
				var oContainer = this.$el.querySelector('.list-container'),
					oList = oContainer.querySelector('.list'),
					aA = oList.querySelectorAll('a');

				this.listWidth = ( ( aA[0].offsetWidth + parseInt(getComputedStyle(aA[0], false)['marginRight']) ) * (aA.length+1) ) + 'px';
			}
		},
		store,
		vuex: {
			getters: {
				roomId: state => state.room.roomId,
				webImJoinStatus: state => state.webim.joinStatus
			}
		}
	}
</script>
<style lang="scss" scoped>
	.recommend {
		background:#fff;
		padding:0.48rem;
	}

	.column-title {
		margin-bottom:0.266667rem;
		span {
			display:inline-block;
			vertical-align:middle;
			font-size:0.48rem;
		}
		i {
			display:inline-block;
			height:0.533333rem;
			width:0.106667rem;
			background-color: #ff6769;
			vertical-align:middle;
			border-radius:0.053333rem;
			margin-right:0.266667rem;
		}
	}

	.list-container {
		overflow-x:auto;
	}

	.list {
		width:100rem;
		a {
			float:left;
			width:3.786667rem;
			margin-right:0.533333rem;
			taxt-align:center;
		}
		img {
			width:3.733333rem;
			height:2.133333rem;
			border-radius:0.066667rem;
		}
		p {
			font-size:0.346667rem;
			text-align:center;
		}
	}

</style>