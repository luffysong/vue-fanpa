import Vue from 'vue'
import { Toast } from 'mint-ui'
import store from '../vuex/store'

var isAllow = {
	methods: {
		isAllow: function (type) {
			// if(this.roomStatus !== 2 && this.roomStatus !== 3 && type !== 'top') { //预告页检测
			if(!this.webImIsAllowTalk && type !== 'top') { //预告页检测
				Toast({
					message: this.webImBndTalkTips,
					position: 'bottom'
				});
				return false;
			} else if(!this.isLogin) { //登录检测
				Toast({
					message: '登录后即可与大家进行互动哦~',
					position: 'bottom'
				});
				return false;
			} 
			return true;
		},
		isCheck: function () {
			if(!this.webImIsAllowTalk) { //房间是否允许互动检测
				Toast({
					message: this.webImBndTalkTips,
					position: 'bottom'
				});
				return false;
			} else if (this.isStopCmtUser) {
				Toast({
					message: '你已被主播禁言10分钟，请稍候发言',
					position: 'bottom'
				});
				return false;
			}
			return true;
		},
		webImState: function () { //使用vuex方式，此方法暂时未用到
			if (this.webImJoinStatus === 'not') {
				Toast({
					message: '正在登录聊天室，请稍后进行互动',
					position: 'bottom'
				});
				return false;
			} else if(this.webImJoinStatus === 'ing') {
				Toast({
					message: '正在加入聊天室，请稍后进行互动',
					position: 'bottom'
				});
				return false;
			} else if (this.webImJoinStatus === 'error') {
				Toast({
					message: '聊天室加入失败，无法进行互动，请刷新页面',
					position: 'bottom'
				});
				return false;
			} else if(this.webImBlockState) {
				Toast({
					message: '主播已经锁屏，无法进行互动',
					position: 'bottom'
				});
				return false;
			}

			return true;
		}
	},
	store,
	vuex: {
		getters: {
			isLogin: state => state.user.isLogin,
			roomStatus: state => state.room.roomDetail.status,
			webImBlockState: state => state.webim.blockState,
			webImJoinStatus: state => state.webim.joinStatus,
			webImIsAllowTalk: state => state.webim.isAllowTalk,
			webImBndTalkTips: state => state.webim.banTalkTips,
			isStopCmtUser: state => state.webim.isStopCmtUser
		}
	}
}

export default isAllow;