<template>
	<section>
		<video-view v-if="bShowVideo" :url="roomDetail.hlsUrl"></video-view>
		<video-notice v-if="!bShowVideo" :room-detail="roomDetail" :live-time="roomDetail.liveTime"></video-notice>
		<div class="video-info-box">
			<video-info></video-info>
		</div>
		<action-view></action-view>
		<chat-view :filter-key="'roomId'" :room-id="roomId"></chat-view>
		<room-recommend v-bind:all-hot-list="roomAllHotList"></room-recommend>
		<download></download>
	</section>
</template>

<script>
	import store from '../../vuex/store';
	import { getRoomDetail, getRoomAllHotList, enterRoom, resetRoomState } from '../../vuex/actions/room';

	import download from '../common/download';                                                             
	import videoView from './video-view';
	import videoNotice from './video-notice';
	import videoInfo from './video-info';
	import roomRecommend from './room-recommend';
	import actionView from './action-view';
	import chatView from './chat-view';

	import webimMixins from '../../mixins/webim';

	import { DEFAULT_ROOMID } from '../../config'

	import { Toast, Indicator } from 'mint-ui'

	export default {
		name: 'detail',
		replace: true,
		mixins: [webimMixins],
		data: function () {
			return {
				bShowVideo: true
			}
		},
		created() {
			this.requestDataHandler();
			this.changeRoomTips();
			this.watchRoomDetailSuccess();
		},
		destroyed() {
			console.log('destroyed');
			this.resetRoomState();
		},
		methods: {
			requestDataHandler: function () {
				this.requestAllData();
				this.$watch('routeRoomId', this.requestAllData);
			},
			requestAllData: function () {
				this.getRoomDetail({ roomId: this.routeRoomId });
				this.getRoomAllHotList();
				this.enterRoomHandler();
			},
			enterRoomHandler: function () { //进入房间统计
				var vm = this;

				if(this.userSig.nickName) {
					enterRoom();
				} else {
					var unwatch = this.$watch('userSig', function () {
						enterRoom();
						unwatch();
					})
				}

				function enterRoom() {
					vm.enterRoom({ roomId: vm.routeRoomId , touristId: vm.userSig.nickName.substr(2)});
				}
			},
			watchRoomDetailSuccess: function () {
				this.$watch('roomDetailSuccess', function () {
					if(this.roomDetailSuccess === false) {
						this.$router.go({name: 'detail', params: {roomId: DEFAULT_ROOMID}});
					}
				});
			},
			changeRoomTips: function () {

				this.$watch('routeRoomId', function () {
					Indicator.open('房间切换中...');
				});

				//webim成功切换房间后关闭loading
				this.$watch('joinStatus', function () {
					if(this.joinStatus !== 'ing')  {
						Indicator.close();
					}
				})
			}
		},
		computed:  {
			routeRoomId: vm => parseInt(vm.$route.params.roomId),
			bShowVideo: function () {
				if(this.roomStatus === 0 || this.roomStatus === 1) {
					return false;
				} else {
					return true;
				}
			}
		},
		store,
		vuex: {
			getters: {
				isLogin: state => state.user.isLogin,
				roomDetail: state => state.room.roomDetail,
				roomDetailSuccess: state => state.room.roomDetailSuccess,
				roomStatus: state => state.room.roomDetail.status,
				roomAllHotList: state => state.room.roomAllHotList,
				joinStatus: state => state.webim.joinStatus,
				userSig: state => state.user.sig
			},
			actions: {
				getRoomDetail,
				getRoomAllHotList,
				enterRoom,
				resetRoomState
			}
		},
		components: {
			download,
			videoView,
			videoNotice,
			videoInfo,
			roomRecommend,
			actionView,
			chatView
		}
	}
	
</script>

<style lang="scss">
	$color: #f5716f;

	h1 {
		font-size: 30px;
		-webkit-box-shadow:0px 0 5px #ccc;
		box-shadow:0px 0 5px #ccc;
		span {
			font-size: 50px;
		}
	}
	.video-info-box {
		//margin:0.133333rem 0;
		background:#fff;
		padding:0.346667rem;
	}
</style>