<template>
	<header>
		<img v-if="isWeixin" class="weixin-pic" :src="sharePosterPic" alt="">
		<span class="logo" v-link="{ name: 'home' }">饭趴</span>
		<span class="title">{{title}}</span>
		<my-login></my-login>
	</header>
</template>
<script>
	import store from '../../vuex/store';
	import myLogin from './my-login.vue';

	export default {
		data: function () {
			return {
				isWeixin: (function () {
					var ua = navigator.userAgent.toLowerCase();
					if(ua.match(/micromessenger/i) == "micromessenger") {
						return true;
				 	} else {
						return false;
					}
				})()
			}
		},
		methods: {
			login: () => {
				location.href = "http://m.yinyuetai.com/login?redirect=" + encodeURIComponent(location.href);
			}
		},
		computed: {
			sharePosterPic: function () { //微信自带分享抓取图片
				if(typeof this.posterPic === 'string') {
					return this.posterPic.replace('300x170', '600x400');
				} else {
					return null;
				}
			}
		},
		components: {
			myLogin
		},
		store,
		vuex: {
			getters: {
				title: state => state.header.title,
				isLogin: state => state.user.isLogin,
				nickName: state => state.user.info.nickName,
				roomDetail: state => state.room.roomDetail,
				posterPic: state => state.room.roomDetail.posterPic
			}
		}
	}
</script>
<style lang="scss" scoped>
	.title {
		overflow: hidden;
		display: inline-block;
		width: 5rem;
		//margin-left:0.8rem;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.logo {
		display:inline-block;
		width:0.933333rem;
		height:0.453333rem;
		background:url('../../images/logo.png');
		background-size:cover;
		position:absolute;
		left:0.453333rem;
		top:0.32rem;
		font-size:0;
		overflow:hidden;
		text-indent:-10rem;
	}
	.weixin-pic {
		height: 0;
		overflow:hidden;
	}

</style>
