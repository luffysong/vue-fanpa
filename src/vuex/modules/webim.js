import {
	RECEIVE_WEBIMDATA,
	ADD_WEBIMDATA,
	RECEIVE_WEBIMOBJ,
	RECEIVE_WEBIMPACKMSG,
	RECEIVE_WEBIMJOINSTATUS,
	REMOVE_WEBIMDATA,
	RECEIVE_WEBIMBLOCKSTATE,
	RECEIVE_WEBIM_ISSTOPCMTUSER,
	RECEIVE_WEBIM_ISFORBIDUSER,
	RECEIVE_WEBIM_ISALLOWTALK,
	RECEIVE_WEBIM_ISROOMCONTROLUSER,
	RECEIVE_WEBIM_GROUPINFO,
	RECEIVE_IMGROUPID,
	RECEIVE_ISLOGINIM
} from '../mutation-types'

const state = {
	data: [],
	isLoginIm: false,
	imGroupid: '', //webim群id
	isAllowTalk: false, //是否允许互动
	banTalkTips: '正在登录聊天室，请稍后进行互动', //禁止互动提示文字
	imServer: null, //IMSERVER实例化后的对象
	packMsg: {}, //包装数据实例化后的对象
	msgId: 0, //消息id
	blockState: false, //锁屏
	isStopCmtUser: false, //是否被禁言
	isForbidUser: false, //是否被踢
	isRoomControlUser: { //是否是场控
		boolean: false,
		tips: ''
	},
	groupInfo: {}, //群详细信息
	forbidUsers: [], //所有被踢用户的userId集合
	joinStatus: 'not' //当前加入群的状态： not 未加入聊天室 ing 正在加入聊天室 success 加入聊天室成功 error 加入聊天室失败 notGroup 没有群组
}

const mutations = {
	[RECEIVE_WEBIMDATA] (state, data) {
		data.msgId = state.msgId++;
		state.data = data;
		window.webImData = state.data;
	},
	[RECEIVE_WEBIMOBJ] (state, obj) {
		state.imServer = obj;
	},
	[RECEIVE_WEBIMPACKMSG] (state, obj) {
		state.packMsg = obj;
	},
	[RECEIVE_WEBIMJOINSTATUS] (state, string) {
		state.joinStatus = string;
	},
	[ADD_WEBIMDATA] (state, data) {
		data.msgId = state.msgId++;
		state.data.push(data);
		if(state.data.length > 300) { //最大显示300条数据
			state.data = state.data.slice(state.data.length - 200);
		}

		window.webImData = state.data;
	},
	[REMOVE_WEBIMDATA] (state, msgId) {
		state.data = state.data.filter(function (item) {
			return item.msgId !== msgId;
		});
	},
	[RECEIVE_WEBIMBLOCKSTATE] (state, boolean, text) {
		state.blockState = boolean;
	},
	[RECEIVE_WEBIM_ISSTOPCMTUSER] (state, boolean) {
		state.isStopCmtUser = boolean;
	},
	[RECEIVE_WEBIM_ISFORBIDUSER] (state, boolean) {
		state.isForbidUser = boolean;
	},
	[RECEIVE_WEBIM_ISALLOWTALK] (state, boolean, text) {
		state.isAllowTalk = boolean;
		state.banTalkTips = text;
	},
	[RECEIVE_WEBIM_ISROOMCONTROLUSER] (state, boolean, tips) {
		state.isRoomControlUser.boolean = boolean;
		state.isRoomControlUser.tips = tips;
	},
	[RECEIVE_WEBIM_GROUPINFO] (state, response) {
		 state.groupInfo = response;
	},
	[RECEIVE_IMGROUPID] (state, id) {
		state.imGroupid = id;
	},
	[RECEIVE_ISLOGINIM] (state, boolean) {
		state.isLoginIm = boolean;
	}
}

export default {
	state,
	mutations
}