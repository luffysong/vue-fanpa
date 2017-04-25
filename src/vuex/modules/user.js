import {
	RECEIVE_ISLOGIN,
	RECEIVE_USERINFO,
	RECEIVE_USERSIG
} from '../mutation-types'


const state = {
	isLogin: false,
	info: {},
	sig: {}
}

const mutations = {
	[RECEIVE_ISLOGIN] (state, boolean) {
		state.isLogin = boolean;
	},
	[RECEIVE_USERINFO] (state, data) {
		state.info = data;
	},
	[RECEIVE_USERSIG] (state, data) {
		state.sig = data;
	}
}

export default {
	state,
	mutations
}


