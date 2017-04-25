import Vue from 'vue'
import Vuex from 'vuex'

import room from './modules/room'
import user from './modules/user'
import popularity from './modules/popularity'
import webim from './modules/webim'
import gift from './modules/gift'
import home from './modules/home'
import header from './modules/header'
import list from './modules/list'
import channel from './modules/channel'

Vue.use(Vuex);

export default new Vuex.Store({
	// strict: true,
	modules: {
		home,
		room,
		user,
		popularity,
		webim,
		gift,
		header,
		list,
		channel
	}
})