import * as types from '../mutation-types'
import api from '../../api/index'
import { setHeaderTitle } from './header'

export const getChannelDetail = ({dispatch}, params) => {
	api.getChannelDetail(params).then((response) => {
		if(response.data.msg === "SUCCESS") {
			var data = response.data.data;
			// dispatch(types.RECEIVE_ROOMDETAIL, response.data.data);
			dispatch(types.RECEIVE_CHANNELDETAIL, data);
			// dispatch(types.RECEIVE_ROOMDETAILSUCCESS, true);
			setHeaderTitle({ dispatch }, data.channelName);
			dispatch(types.RECEIVE_ROOMID, data.channelId); //更改roomId
			if(data.liveStatus !== -1) {
				dispatch(types.RECEIVE_IMGROUPID, data.channelShow.imGroupid); //更改webim群id
			}
		} else {
			// dispatch(types.RECEIVE_ROOMDETAILSUCCESS, false);
		}
	});
}

export const getChannelStatPoling = ({dispatch}, params) => {
	api.getChannelStatPoling(params).then((response) => {
		dispatch(types.RECEIVE_STATPOLING, response.data.data)
	});
}

//popularity
export const addChannelPraise = (params) => {
	return api.addChannelPraise(params);
}

export const addChannelTop = (params) => {
	return api.addChannelTop(params);
}

export const addChannelGift = (params) => {
	return api.addChannelGift(params);
}

export const enterChannel = ({dispatch}, params) => {
	return api.enterOrExitChannel(Object.assign({type: 1}, params));
}

export const exitChannel = ({dispatch}, params) => {
	return api.enterOrExitChannel(Object.assign({type: 2}, params));
}