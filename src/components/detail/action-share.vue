<template>
	<a v-on:click="popupShareVisible = true">
		<span class="btn-share" ></span>
		<p>分享</p>
	</a>

	<mt-popup
	  :visible.sync="popupShareVisible"
	  position="bottom">
		<div class="dialog">
			<div class="dialog-title">分享：</div>
			<div class="dialog-content">
				<div class="share-wrap">
					<a target="_blank" class="weibo" :href="weiboApi"><i></i><p>新浪</p></a>
					<a class="weixin" @click="weixinHandler"><i></i><p>微信</p></a>
					<!-- <a class="pengyouquan" @click="weixinHandler"><i></i><p>朋友圈</p></a> -->
					<a target="_blank" class="qq" :href="qqApi"><i></i><p>QQ</p></a>
					<a class="qzone" :href="qzoneApi"><i></i><p>空间</p></a>
				</div>
			</div>
		</div>
	</mt-popup>

</template>
<script>
	import Vue from 'vue'
	import store from '../../vuex/store'
	import { Popup, Toast } from 'mint-ui'
	import urlencode from '../../utils/urlencode'

	Vue.component(Popup.name, Popup);

	export default {
		data: function () {
			return {
				popupShareVisible: false,
				weibo: "http://service.weibo.com/share/share.php",
				// weibo: "http://v.t.sina.com.cn/share/share.php",
				// qzone: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey",
				qzone: "http://qzs.qzone.qq.com/open/connect/widget/mobile/qzshare/index.html",
				qq: "http://connect.qq.com/widget/shareqq/index.html",
				renren: "http://share.renren.com/share/buttonshare.do?title={title}&link={url}&pic={pic}",
				douban: "http://www.douban.com/share/service?bm=&image={pic}&href={url}&updated=&name={title}"			
			}		
		},
		computed: {
			shareText: vm => {
				return '我在【饭趴】观看直播，小伙伴们快来看看吧~';
			},
			weiboApi: vm => {
				return vm.weibo + urlencode({
					url:  location.href,
					title: vm.shareText,
					pic: vm.posterPic
				});
			},
			qqApi: vm => {
				return vm.qq + urlencode({
					title: vm.shareText,
					url:  location.href,
					pics: vm.posterPic,
					desc: vm.roomName + '，大家快来看看~',
					summary: vm.roomName + '，大家快来看看~',
					site: '音悦台',
					showcount: 1
				});
			},
			qzoneApi: vm => {
				return vm.qzone + urlencode({
					imageUrl: vm.posterPic,
					title: vm.shareText,
					url: location.href
				});
			}
		},
		methods: {
			weixinHandler: function () {
				this.popupShareVisible = false;
				Toast({
					message: '请至地址栏长按即可复制链接发送给你的好友啦~',
					position: 'bottom'
				});
			}
		},
		store,
		vuex: {
			getters: {
				nickName: state => state.user.info.nickName,
				roomName: state => state.room.roomDetail.roomName,
				posterPic: state => state.room.roomDetail.posterPic
			}
		}
	}
</script>