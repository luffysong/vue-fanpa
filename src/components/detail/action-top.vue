<template>
	<a v-on:click="showDialog">
		<span class="btn-top"></span>
		<p>顶上去</p>
	</a>

	<mt-popup
	  :visible.sync="popupTopVisible"
	  position="bottom">
		<div class="dialog">
			<div class="dialog-content dialog-top">
				<div class="top-text">
					使用{{iOneMark}}积分支持MC，是否支持？
				</div>
				<div class="btn-wrap">
					<button class="btn-primary-x" @click="toTop">OK</button>
				</div>
				<div class="integral">
					您目前剩余<em>{{totalMarks}}</em>积分
					<span v-if="totalMarks < iOneMark">，积分不足</span>
				</div>
			</div>
		</div>
	</mt-popup>

</template>
<script>
	import Vue from 'vue'
	import { Popup, Toast } from 'mint-ui'

	import store from '../../vuex/store'
	import { addRoomTop } from '../../vuex/actions/room'
	import { addChannelTop } from '../../vuex/actions/channel'
	import { getUserInfo } from '../../vuex/actions/user'
	import isAllow from '../../mixins/action-is-allow'


	Vue.component(Popup.name, Popup);

	export default {
		data: function () {
			return {
				iOneMark: 20,
				popupTopVisible: false
			}	
		},
		mixins: [isAllow],
		methods: {
			showDialog: function () {
				if(this.isAllow('top')) {
					this.popupTopVisible = true;
				}
			},
			toTop: function () {

				if(this.totalMarks >= this.iOneMark) {
					this.addRoomTop({
						roomId: this.roomId
					}).then(() => {
						this.getUserInfo(); //重新请求用户信息
						// this.info.totalMarks = 10;
						Toast({
							message: '顶上去成功，人气上涨20~',
							position: 'bottom'
						});
					}).catch(() => {
						Toast({
							message: '顶上去失败,请检测网络是否正常',
							position: 'bottom'
						});
					});
				} else {
					Toast({
						message: '积分不够哦~',
						position: 'bottom'
					});
				}
				this.popupTopVisible = false;
			}
		},
		store,
		vuex: {
			getters: {
				roomId: state => state.room.roomId,
				channelId: state => state.channel.id,
				totalMarks: state => state.user.info.totalMarks //用户积分总量
			},
			actions: {
				addRoomTop: function () {
					if(this.$route.name === 'channel') {
						return addChannelTop({
							channelId: this.channelId
						});
					} else {
						return addRoomTop(store, {
							roomId: this.roomId
						});
					}
				},
				getUserInfo
			}
		}
	}
</script>