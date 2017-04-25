import {
	RECEIVE_ROOMDETAIL,
	RECEIVE_ROOMALLHOTLIST,
	RECEIVE_ROOMLONGPOLING,
	RECEIVE_ROOMDETAILSUCCESS,
	RECEIVE_ROOMID,
	RESET_ROOMSTATE
} from '../mutation-types'

// const defaultState = {
// 	roomDetail: {},
// 	roomDetailSuccess: true, //房间信息请求成功
// 	roomId: 0,
// 	roomAllHotList: {},
// 	longpoling: {}
// }

// var state = JSON.parse(JSON.stringify(defaultState));

const state = {
	roomDetail: {},
	roomDetailSuccess: true, //房间信息请求成功
	roomId: 0,
	roomAllHotList: {},
	longpoling: {}
}


const mutations = {
	[RECEIVE_ROOMDETAIL] (state, data) {
		state.roomDetail = data;
		state.roomId = state.roomDetail.id;
	},
	[RECEIVE_ROOMDETAILSUCCESS] (state, boolean) {
		state.roomDetailSuccess = boolean;
	},
	[RECEIVE_ROOMALLHOTLIST] (state, data) {
		state.roomAllHotList = data;
	},
	[RECEIVE_ROOMLONGPOLING] (state, data) {
		state.longpoling = data;
	},
	[RECEIVE_ROOMID] (state, id) {
		state.roomId = id;
	},
	[RESET_ROOMSTATE] (state) {
		state.roomId = 0;
	}
}

export default {
	state,
	mutations
}