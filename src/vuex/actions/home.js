import * as types from '../mutation-types'
import api from '../../api/index'

export const getHomeVideoRec = ({dispatch}, params) => {
	api.getHomeVideoRec(params).then((response) => {
		dispatch(types.RECEIVE_VIDEOREC, response.data.data);
	});
}

export const getHomeAllHotList = ({dispatch}) => {
	api.getRoomAllHotList({
		size: 4
	}).then((response) => {
		dispatch(types.RECEIVE_HOMEALLHOTLIST, response.data.data.list);
	});
}

export const getHomeChannelRec = ({dispatch}) => {
	api.getHomeChannelRec({
		type: 'YYT',
		size: 1
	}).then((response) => {
		dispatch(types.RECEIVE_CHANNELREC, response.data.data.list);
	});
}

export const getTagList = ({dispatch}, params) => {
	api.getTagList(params).then((response) => {
		dispatch(types.RECEIVE_TAGLIST, response.data.data);
	});
}

export const getTagVideoList = ({dispatch}, params) => {
	api.getTagVideoList(params).then((response) => {
		dispatch(types.ADD_TAGVIDEOLIST, params.tagId, response.data.data.list);
	});
}


