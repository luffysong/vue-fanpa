import {
	RECEIVE_ROOMPRAISE,
	RECEIVE_ROOMTOP
} from '../mutation-types'

const state = {
	praise: {
		likeCount: 0,
		message: '',
		success: false
	},
	top: 0
}

const mutations = {
	[RECEIVE_ROOMPRAISE] (state, data) {
		state.praise = data;
	},
	[RECEIVE_ROOMTOP] (state, data) {
		state.top = data;
	}
}

export default {
	state,
	mutations
}
