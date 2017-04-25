<template>
	<section>
		<video-view v-if="bShowVideo" :url="channelDetail.channelShow && channelDetail.channelShow.liveStream"></video-view>
		<video-notice v-if="!bShowVideo" :room-detail="channelDetail" :live-time="channelDetail.channelShow.beginTime"></video-notice>
		<div class="video-info-box">
			<video-info></video-info>
		</div>
		<action-view></action-view>
		<chat-view :filter-key="'channelId'" :room-id="channelId"></chat-view>
		<room-recommend v-bind:all-hot-list="roomAllHotList"></room-recommend>
		<download></download>
	</section>
</template>

<script>
	import store from '../../vuex/store';
	import { getRoomDetail, getRoomAllHotList, enterRoom } from '../../vuex/actions/room';
	import { getChannelDetail, enterChannel } from '../../vuex/actions/channel';


	import download from '../common/download';                                                              
	import videoView from '../detail/video-view';
	import videoNotice from '../detail/video-notice';
	import videoInfo from './video-info';
	import roomRecommend from '../detail/room-recommend';
	import actionView from '../detail/action-view';
	import chatView from '../detail/chat-view';

	import webimMixins from '../../mixins/webim';

	import { DEFAULT_ROOMID } from '../../config'

	import { Toast, Indicator } from 'mint-ui'
	import { MessageBox } from 'mint-ui'

	import PackSendMsg from '../../utils/webIm/pack-send-msg'

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
			this.onLiveStatus();
			// this.watchRoomDetailSuccess();
		},
		methods: {
			onLiveStatus: function () {
				this.$watch('channelDetail', handler.bind(this));

				function handler() {
					if(this.liveStatus === -1) {
						MessageBox.alert('该频道暂无节目，更多精彩，敬请期待', '提示').then(action => {
							this.$router.go({name: 'home'});
						});
					}

				}
			},
			requestDataHandler: function () {
				this.requestAllData();
				this.$watch('routeRoomId', this.requestAllData);
			},
			requestAllData: function () {
				this.getChannelDetail({ channelId: this.routeRoomId });
				this.getRoomAllHotList();
				this.enterChannelHandler();
			},
			enterChannelHandler: function () { //进入房间统计
				var vm = this;

				if(this.userSig.nickName) {
					enterChannel();
				} else {
					var unwatch = this.$watch('userSig', function () {
						enterChannel();
						unwatch();
					})
				}

				function enterChannel() {
					vm.enterChannel({ channelId: vm.routeRoomId, touristId: vm.userSig.nickName.substr(2)});
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
			},
			initPackData: function() { //初始化包装数据
			    this.$watch('userSig', function() {
			        var packMsg = new PackSendMsg();

			        packMsg.init(Object.assign(this.userSig, {
			            channelId: this.channelId,
			            userId: this.userId,
			            source: 2
			        }));

			        this.setWebImPackMsg(packMsg);

			        //切换房间后更换包装数据的channelId
			        this.$watch('channelId', function() {
			            this.packMsg.info.channelId = this.channelId
			        });
			    });
			},
			showRoomImMsgList: function () { //获取历史记录
			}
		},
		computed:  {
			routeRoomId: vm => parseInt(vm.$route.params.channelId),
			bShowVideo: function () {
				if(this.liveStatus === 1) {
					return false;
				} else {
					return true;
				}
			}
		},
		store,
		vuex: {
			getters: {
				channelId: state => state.channel.id,
				isLogin: state => state.user.isLogin,
				roomDetail: state => state.room.detail,
				channelDetail: state => state.channel.detail,
				roomDetailSuccess: state => state.room.roomDetailSuccess,
				liveStatus: state => state.channel.detail.liveStatus,
				roomAllHotList: state => state.room.roomAllHotList,
				joinStatus: state => state.webim.joinStatus,
				userSig: state => state.user.sig
			},
			actions: {
				getChannelDetail,
				getRoomAllHotList,
				enterChannel
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