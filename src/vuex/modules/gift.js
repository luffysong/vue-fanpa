import {
	RECEIVE_GIFTLIST
} from '../mutation-types'

const state = {
	list: ''
}

const mutations = {
	[RECEIVE_GIFTLIST] (state, dataList) {
		state.list = dataList;
	}
}

export default {
	state,
	mutations
}


