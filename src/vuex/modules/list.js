import {
	RECEIVE_COLUMN,
	RESET_LISTDATA,
	ADD_DATALIST,
	RECEIVE_TAGID,
	RECEIVE_TAGNAME
} from '../mutation-types'

import Vue from 'vue'

const state = {
	column: 'hot',
	tagId: null, //2 3 4 8
	dataList: [],
	tagName: '',
	size: 20, //一页个数
	nextOffset: 0, //下次请求偏移量
	nextStatus: 2, //下次请求视频类型
	hasNextOffset: true //是否有下一页
}

const mutations = {
	[RECEIVE_COLUMN] (state, column) {
		state.column = column;
	},
	[ADD_DATALIST] (state, response) {
		var dataList,
			nextOffset = 0,
			nextStatus = 2,
			hasNextOffset = false;

		if(response instanceof Array) {
			dataList = response;
		} else {
			dataList = response.list;
			nextOffset = response.nextOffset;
			nextStatus = response.nextStatus;
			hasNextOffset = response.hasNextOffset;
		}
		state.dataList = state.dataList.concat(dataList);
		state.nextOffset = nextOffset;
		state.nextStatus = nextStatus;
		state.hasNextOffset = hasNextOffset;
	},
	[RESET_LISTDATA] (state) {
		state.dataList = [];
		state.nextOffset = 0;
		state.nextStatus = 2;
		state.hasNextOffset = true;
	},
	[RECEIVE_TAGID] (state, tagId) {
		state.tagId = tagId;
	},
	[RECEIVE_TAGNAME] (state, tagName) {
		state.tagName = tagName;
	}
}

export default {
	state,
	mutations
}


