import * as types from '../mutation-types'
import api from '../../api/index'

export const getDataList = ({dispatch, state}, iPage) => {
	var promise,
		params = {
			size: state.list.size,
			offset: state.list.nextOffset,
			status: state.list.nextStatus
		};
		
	switch(state.list.column) {
		case 'hot':
			promise = api.getRoomAllHotList(params);
			break;
		case 'rec':
			promise = api.getHomeChannelRec(Object.assign({type: 'YYT'}, params));
			break;
		case 'tag':
			promise = api.getTagVideoList(Object.assign({tagId: state.list.tagId}, params));
	}
	return promise.then((response) => {
		dispatch(types.ADD_DATALIST, response.data.data);
	});
}

export const resetData = ({dispatch}) => {
	dispatch(types.RESET_LISTDATA);
}

export const setColumn = ({dispatch}, column) => {
	dispatch(types.RECEIVE_COLUMN, column);
}

export const setTagId = ({dispatch}, tagId) => {
	dispatch(types.RECEIVE_TAGID, tagId);
}

export const setTagName = ({dispatch, state}) => {
	switch(state.list.column) {
		case 'hot':
			dispatch(types.RECEIVE_TAGNAME, '精彩饭趴');
			break;
		case 'rec':
			dispatch(types.RECEIVE_TAGNAME, '官方频道');
			break;
		case 'tag':
			api.getTagList().then((response) => {
				var tag = response.data.data.filter(function (item) {
					return item.id === state.list.tagId;
				});
				console.log(state.list.tagId);
				dispatch(types.RECEIVE_TAGNAME, tag[0].title);
			});
			break;
	}
}
