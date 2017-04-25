<template>
	<a @click="showChat">
		<span class="btn-chat"></span>
		<p>聊天</p>
	</a>
	<mt-popup
	  :visible.sync="popupChatVisible"
	  position="bottom">
		<div class="dialog dialog-chat-wrap">
			<input type="text" :class="{'chat-input': true, 'red-color': isRed}" v-model="msg">
			<input type="button" @click="sendData" class="btn-primary" value="发 送">
		</div>
	</mt-popup>

</template>
<script>
	import Vue from 'vue'
	import { Popup, Toast } from 'mint-ui'
	import store from '../../vuex/store'
	import { addWebImData, removeWebImData } from '../../vuex/actions/webim'
	import isAllow from '../../mixins/action-is-allow'

	Vue.component(Popup.name, Popup);

	export default {
		data: function () {
			return {
				popupChatVisible: false,
				msg: '',
				isRed: false
			}
		},
		computed: {
			isRed: function () {
	    		if(this.msg.length > 20) {
	    			return true;
	    		} else {
	    			return false;
	    		}
			}
		},
		mixins: [isAllow],
		methods: {
			showChat: function () {
				if(!this.isAllow('chat')) {
					return;
				}

				// if(this.roomStatus === 2) { //直播状态
				// 	Toast({
				// 		message: '直播房间聊天仅限音悦台APP可以使用哦~',
				// 		position: 'bottom'
				// 	});
				// 	return;
				// }

				this.popupChatVisible = true;
				setTimeout(function() {
					var oInput = this.$el.nextElementSibling.nextElementSibling.querySelector('.chat-input');
					oInput.focus();
				}.bind(this), 300);
			},
			sendData: function () {
				if(this.isCheck()) {

					this.msg = this.msg.trim(); //去掉空格

					if(this.msg.length > 20) {
						Toast({
							message: '字数超过20字，请减少',
							position: 'bottom',
							className: 'send-text-tips'
						});
						return;
					} else if(this.msg.length === 0) {
						Toast({
							message: '发送内容不能为空',
							position: 'bottom',
							className: 'send-text-tips'
						});
						return;
					}

					var msg = this.packMsg.pack('chat', this.msg),  //包装数据
						vm = this;

					vm.addWebImData(msg); //本地添加数据

					this.imServer.sendMsg(msg).then(function (resp) {
					}).catch(function (err) {
						vm.removeWebImData(msg.msgId);
						Toast({
							message: '消息发送失败，请检测网络是否正常',
							position: 'bottom'
						});
						// Toast('消息发送失败' + err.ErrorInfo);
					});

				}

				this.popupChatVisible = false;
				this.msg = '';
			}
		},
		store,
		vuex: {
			getters: {
				imServer: state => state.webim.imServer,
				packMsg: state => state.webim.packMsg,
				isLogin: state => state.user.isLogin,
				roomStatus: state => state.room.roomDetail.status
			},
			actions: {
				addWebImData,
				removeWebImData
			}
		}
	}
</script>