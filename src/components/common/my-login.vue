<template>
	<span v-if="isLogin" v-on:click="goCenter" class="header-user">{{nickName}}</span>
	<a v-else v-on:click="login" class="header-login">登录</a>

	<!-- <mt-popup
	  :visible.sync="popupVisible"
	  position="bottom">
		<div class="dialog">
			<div class="dialog-logout">
				<div class="text-hint">
					是否退出登录？
				</div>
				<div class="btn-area">
					<input type="button" class="btn-default-logout" @click="popupVisible = false" value="取消">
					<input type="button" class="btn-primary-logout" @click="logout" value="确定">
				</div>
			</div>
		</div>
	</mt-popup> -->
</template>
<script>
	import store from '../../vuex/store';

	import Vue from 'vue'
	import { Popup, Toast } from 'mint-ui'
	Vue.component(Popup.name, Popup)

	export default {
		data: function () {
			return {
				popupVisible: false
			}
		},
		methods: {
			login: function () {
				location.href = "http://m.yinyuetai.com/login?redirect=" + encodeURIComponent(location.href);
			},
			goCenter: function () {
				this.$router.go({name: 'i'});
			}
			// logoutAgent: function () {
			// 	this.popupVisible = true;
			// },
			// logout: function () {
			// 	location.href = "http://login.yinyuetai.com/logout";
			// }
		},
		computed: {
		},
		store,
		vuex: {
			getters: {
				isLogin: state => state.user.isLogin,
				nickName: state => state.user.info.nickName
			}
		}
	}
</script>
