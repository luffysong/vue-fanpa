import {
	RECEIVE_CHANNELDETAIL,
	RECEIVE_STATPOLING
} from '../mutation-types'

const state = {
	detail: {},
	id: 0,
	statPoling: {}
}

const mutations = {
	[RECEIVE_CHANNELDETAIL] (state, data) {
		state.detail = data;
		state.id = state.detail.channelId;
	},
	[RECEIVE_STATPOLING] (state, data) {
		state.statPoling = data;
	}
}

export default {
	state,
	mutations
}