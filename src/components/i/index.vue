<template lang="jade">
div.my-center
	div.pic-wrap
		img.pic(:src="userInfo.largeAvatar", alt="")
	div.name {{ userInfo.nickName }}
	ul.data-list
		li.item 剩余积分：
			span {{ userInfo.totalMarks }}
		li.item 观看直播次数：
			span {{ userCount && userCount.viewCount }}
		li.item 点赞次数：
			span {{ userCount && userCount.likeCount }}
		li.item 送出礼物数：
			span {{ userCount && userCount.propCount }}
	div.logout-btn
		input.btn-primary-logout-big(type="button", value="退出登录", @click="logoutAgent")

	mt-popup(
		:visible.sync="popupVisible"
		position="bottom")
		div(class="dialog")
			div(class="dialog-logout")
				div(class="text-hint") 是否退出登录？
				div(class="btn-area")
					input.btn-default-logout(
						type="button"
						@click="popupVisible = false"
						value="取消")
					input(
						type="button"
						class="btn-primary-logout" 
						@click="logout" value="确定"
						)
</template>
<script>
	import Vue from 'vue'
	import store from '../../vuex/store'
	import { setHeaderTitle } from '../../vuex/actions/header'

	import { Popup, Toast } from 'mint-ui'
	Vue.component(Popup.name, Popup)


	export default {
		data: function () {
			return {
				popupVisible: false
			}
		},					
		created() {
			this.setHeaderTitle('个人中心');
			if(!this.isLogin) {
				this.$router.go({name: 'home'});
			}
		},
		methods: {
			logoutAgent: function () {
				this.popupVisible = true;
			},
			logout: function () {
				location.href = "http://login.yinyuetai.com/logout";
			}
		},
		store,
		vuex: {
			getters: {
				userInfo: state => state.user.info,
				userCount: state => state.user.info.userCount,
				isLogin: state => state.user.isLogin
			},
			actions: {
				setHeaderTitle
			}
		}
	}
</script>