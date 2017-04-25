import {
	RECEIVE_HEADERTITLE
} from '../mutation-types'

const state = {
	title: ''
}

const mutations = {
	[RECEIVE_HEADERTITLE] (state, string) {
		state.title = string;
	}
}

export default {
	state,
	mutations
}


