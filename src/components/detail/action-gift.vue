<template>
	<a v-on:click="showDialog">
		<span class="btn-gift"></span>
		<p>礼物</p>
	</a>
	<mt-popup
	  :visible.sync="popupGiftVisible"
	  position="bottom">
		<div class="dialog">
			<div class="dialog-title">
				礼物：
			</div>
			<div class="dialog-content">
				<div class="dialog-gift">
 					<a v-for="item in giftList" v-bind:class="item.giftId | giftClass" @click="toSend(item.giftId)">
 						<i></i>
 						<p>{{item.giftId | giftName}}</p>
 					</a>
				</div>
			</div>
		</div>
	</mt-popup>
</template>
<script>
	import Vue from 'vue'
	import { Popup, Toast } from 'mint-ui'
	import '../../filters/giftName'
	import '../../filters/giftClass'
	import isAllow from '../../mixins/action-is-allow'

	import store from '../../vuex/store'
	import { addWebImData, removeWebImData } from '../../vuex/actions/webim'
	import { addRoomPraise, getGiftList, addGift } from '../../vuex/actions/room'
	import { addChannelGift } from '../../vuex/actions/channel'

	Vue.component(Popup.name, Popup);

	export default {
		data: function () {
			return {
				popupGiftVisible: false
			}
		},
		mixins: [isAllow],
		created: function () {
			this.getGiftList({
				type: 0
			});
		},
		methods: {
			showDialog: function () {
				if(this.isAllow()) {
					this.popupGiftVisible = true;
				}
			},
			toSend: function (giftId) {
				if(this.isCheck()) {
					
					var msg = this.packMsg.pack('gift', giftId),  //包装数据
						vm = this;

					vm.addWebImData(msg); //本地添加数据
					this.addGift({
						roomId: this.roomId,
						giftId: giftId,
						giftNum: 1
					}).then(function (response) {
						var data = response.data.data;
						if(data.success === true) {
							return vm.imServer.sendMsg(msg);
						} else {
							throw new Error(data.message);
						}
					}).then(function (resp) {
						// gift success
					}).catch(function (err) {
						vm.removeWebImData(msg.msgId);
						Toast({
							message: '礼物赠送失败，请检测网络是否正常',
							position: 'bottom'
						});
						// Toast('礼物没有赠送成功哦 ' + err);
					});

				}


				this.popupGiftVisible = false;
			}
		},
		store,
		vuex: {
			getters: {
				roomId: state => state.room.roomId,
				channelId: state => state.channel.id,
				praise: state => state.popularity.praise,
				imServer: state => state.webim.imServer,
				packMsg: state => state.webim.packMsg,
				giftList: state => state.gift.list,
				isLogin: state => state.user.isLogin

			},
			actions: {
				addRoomPraise,
				addWebImData,
				getGiftList,
				addGift: function (store, params) {
					if(this.$route.name === 'channel') {
						return addChannelGift({
							channelId: this.channelId
						});
					} else {
						return addGift(store, params);
					}
				},
				removeWebImData
			}
		},
		components: {
			addWebImData
		}
	}
</script>
