import {
	RECEIVE_VIDEOREC,
	RECEIVE_TAGLIST,
	ADD_TAGVIDEOLIST,
	RECEIVE_HOMEALLHOTLIST,
	RECEIVE_CHANNELREC
} from '../mutation-types'

import Vue from 'vue'

const state = {
	videoRec: [],
	allHotList: [],
	channelRecList: [],
	tagList: [],
	tagVideoList: {}
}

const mutations = {
	[RECEIVE_VIDEOREC] (state, dataList) {
		state.videoRec = dataList;
	},
	[RECEIVE_TAGLIST] (state, dataList) {
		state.tagList = dataList;
	},
	[ADD_TAGVIDEOLIST] (state, key, dataList) {
		Vue.set(state.tagVideoList, key, dataList.slice(0, 4));
	},
	[RECEIVE_HOMEALLHOTLIST] (state, dataList) {
		state.allHotList = dataList;
	},
	[RECEIVE_CHANNELREC] (state, dataList) {
		state.channelRecList = dataList;
	}
}

export default {
	state,
	mutations
}


