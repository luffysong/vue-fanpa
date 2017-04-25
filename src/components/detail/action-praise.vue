<template>
	<a  href="javascript:void(0)" v-on:click="praiseHandler">
		<span class="btn-praise"></span>
		<p>赞</p>
	</a>
</template>
<script>
	import store from '../../vuex/store'
	import { addWebImData, removeWebImData } from '../../vuex/actions/webim'
	import { addRoomPraise } from '../../vuex/actions/room'
	import { addChannelPraise } from '../../vuex/actions/channel'
	import isAllow from '../../mixins/action-is-allow'

	import { Toast } from 'mint-ui'

	export default {
		data: function () {
			return {
				praisePermit: true
			}
		},
		mixins: [isAllow],
		methods: {
			praiseHandler: function () {
				if(!this.isAllow()) {
					return;
				}

				if(!this.isCheck()) {
					return;
				}
				
				if(this.praisePermit) {
					var msg = this.packMsg.pack('praise', this.msg),  //包装数据
						vm = this;
					console.log(msg);
					vm.addWebImData(msg); //本地添加数据
					vm.addRoomPraise().then(function () {
						return vm.imServer.sendMsg(msg);
					}).then(function (resp) {
						// Toast({
						// 	message: '点赞成功~',
						// 	position: 'bottom'
						// });
					}).catch(function (err) {
						vm.removeWebImData(msg.msgId);
						console.log(err);
						Toast({
							message: '点赞失败，请检测网络是否正常',
							position: 'bottom'
						});
					});


					vm.praisePermit = false;
					setTimeout(function() {
						vm.praisePermit = true;
					}, 3000);
				} else {
					Toast({
						message: '点赞太频繁，请稍后点赞哦~',
						position: 'bottom'
					});
				}


			}
		},
		store,
		vuex: {
			getters: {
				roomId: state => state.room.roomId,
				channelId: state => state.channel.id,
				praise: state => state.popularity.praise,
				imServer: state => state.webim.imServer,
				packMsg: state => state.webim.packMsg
			},
			actions: {
				addRoomPraise: function () {
					if(this.$route.name === 'channel') {
						return addChannelPraise({
							channelId: this.channelId
						});
					} else {
						return addRoomPraise(store, {
							roomId: this.roomId
						});
					}
				},
				addWebImData,
				removeWebImData
			}
		}
	}
</script>
