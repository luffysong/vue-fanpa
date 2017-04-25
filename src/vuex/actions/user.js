import * as types from '../mutation-types'
import api from '../../api/index'
import { ACCESS_TOKEN } from '../../config'

//user
export const getIsLogin = ({dispatch}) => {
	if(typeof ACCESS_TOKEN !== 'undefined') {
		dispatch(types.RECEIVE_ISLOGIN, true);
	}
}

export const getUserInfo = ({dispatch}, params) => {
	api.getUserInfo(params).then((response) => {
		dispatch(types.RECEIVE_USERINFO, response.data.data);
	});
}

export const getUserSig = ({dispatch}, params) => {
	api.getUserSig(params).then((response) => {
		dispatch(types.RECEIVE_USERSIG, response.data.data);
	});
}
