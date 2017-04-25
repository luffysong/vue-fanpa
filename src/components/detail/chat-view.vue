<template>
	<div class="chat-view">
		<template v-if="webImJoinStatus === 'notGroup'">
			<div class="not-data-hint">直播开始后开启聊天室</div>
		</template>

		<template v-if="webImJoinStatus === 'not'">
			<div class="not-data-hint">正在登录聊天室，请稍候...</div>
		</template>

		<template v-if="webImJoinStatus === 'ing'">
			<div class="not-data-hint">正在加入聊天室，请稍候...</div>
		</template>

		<template v-if="webImJoinStatus === 'error'">
			<div class="not-data-hint">聊天室加入失败，请刷新页面</div>
		</template>

		<template v-if="webImJoinStatus === 'success'">
			<div v-if="webImData.length < 1" class="not-data-hint">已加入聊天室，暂时没收到消息</div>
			<ul class="chat-list">
				<li v-for="item in webImData | filterBy roomId in filterKey">
					<template v-if="item.msgType === 0 || item.msgType === 2">
						<span class="name">{{item.nickName}}：</span>
						<span class="content">{{item.content}}</span>
						<!-- <span class="time">16:52</span> -->
					</template>
					<template v-if="item.msgType === 1">
						<span class="name">{{item.nickName}}</span>
						<span class="content red">向主播赠送了{{item.giftId | giftName}}</span>
					</template>
					<template v-if="item.msgType === 3">
						<span class="name">{{item.nickName}}</span>
						<span class="content red">对主播点赞了一次</span>
					</template>
					<template v-if="item.msgType === 4">  <!-- 清屏 -->
						<span class="content red">{{item.nickName}}{{item.content}}</span>
					</template>
					<template v-if="item.msgType === 5"> 
						<span class="content red">主播将用户{{item.toUsername}}禁言</span>
					</template>
					<template v-if="item.msgType === 8"> 
						<span class="content red">主播已锁屏</span>
					</template>
					<template v-if="item.msgType === 9"> 
						<span class="content red">主播已解屏</span>
					</template>
					<template v-if="item.msgType === 10"> 
						<span class="content red">主播将用户{{item.toUsername}}踢出房间</span>
					</template>
					<template v-if="item.msgType === 11"> <!-- 场控 -->
						<span class="content red">{{item.toUsername}}被主播{{item.roomControl === "true" ? '设置为' : '解除'}}场控</span>
					</template>
				</li>
			</ul>
		</template>
	</div>
</template>
<script>
	import store from '../../vuex/store'
	import { Toast } from 'mint-ui'
	import { MessageBox } from 'mint-ui'
	import { setWebImData, setWebImJoinStatus } from '../../vuex/actions/webim.js'

	export default {
		props: ['filterKey', 'roomId'],
		created: function () {
			this.setWebImData([]); //初始化时清空数据
			this.setWebImJoinStatus('not'); //初始化时更改群组加入状态
			this.onWebImDataChange(); //新增数据后滚动条到底部
			this.onRoomControlChange(); //用户场控权限变更提示
			// this.onStopCmtUser(); //禁言提示
			this.onIsForbidUser(); //被踢房间提示
		},
		methods: {
			onWebImDataChange: function () {
				var vm = this;
				
				this.$watch('webImData', scrollToBottom);

				this.$watch('webImJoinStatus', function () {
					if(this.webImJoinStatus === 'success') {
						scrollToBottom();
					}
				});

				function scrollToBottom() {
					var oView = vm.$el,
						oList = oView.querySelector('.chat-list');

					if(oList) {
						oView.scrollTop = oList.offsetHeight - oView.offsetHeight;
					}
				}
			},
			onRoomControlChange: function () {
				this.$watch('isRoomControlUser.boolean', function () {
					Toast({
						message: this.isRoomControlUser.tips,
						position: 'bottom'
					});
				})
			},
			onStopCmtUser: function () {
				this.$watch('isStopCmtUser', function () {
					if(this.isStopCmtUser === true) {
						Toast({
							message: '你被主播禁言10分钟',
							position: 'bottom'
						});
					}
				});
			},
			onIsForbidUser: function () {
				var vm = this;

				this.$watch('isForbidUser', function () {
					if(vm.isForbidUser === true) {
						MessageBox.alert('你已被场控踢出本房间', '提示').then(action => {
							vm.$router.go({name: 'home'});
						});
					}
				});
			}
		},
		store,
		vuex: {
			getters: {
				webImData: state => state.webim.data,
				webImJoinStatus: state => state.webim.joinStatus,
				isRoomControlUser: state => state.webim.isRoomControlUser,
				isStopCmtUser: state => state.webim.isStopCmtUser,
				isForbidUser: state => state.webim.isForbidUser
			},
			actions: {
				setWebImData,
				setWebImJoinStatus
			}
		}
	}
</script>