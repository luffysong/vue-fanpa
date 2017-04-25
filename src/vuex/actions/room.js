import * as types from '../mutation-types'
import api from '../../api/index'

//room
export const getRoomDetail = ({dispatch}, params) => {
	api.getRoomDetail(params).then((response) => {
		if(response.data.msg === "SUCCESS") {
			dispatch(types.RECEIVE_ROOMDETAIL, response.data.data);
			dispatch(types.RECEIVE_ROOMDETAILSUCCESS, true);
			dispatch(types.RECEIVE_HEADERTITLE, response.data.data.roomName);
			dispatch(types.RECEIVE_IMGROUPID, response.data.data.imGroupid); //更改webim群id
		} else {
			dispatch(types.RECEIVE_ROOMDETAILSUCCESS, false);
		}
	});
}

export const getRoomAllHotList = ({dispatch} , params) => {
	api.getRoomAllHotList(params).then((response) => {
		dispatch(types.RECEIVE_ROOMALLHOTLIST, response.data.data.list);
	});
}

export const getRoomLongPoling = ({dispatch}, params) => {
	api.getRoomLongPoling(params).then((response) => {
		dispatch(types.RECEIVE_ROOMLONGPOLING, response.data.data);
	});
}

export const enterRoom = ({dispatch}, params) => {
	return api.enterOrExitRoom(Object.assign({type: 1}, params));
}

export const exitRoom = ({dispatch}, params) => {
	return api.enterOrExitRoom(Object.assign({type: 2}, params));
}


//popularity
export const addRoomPraise = ({dispatch}, params) => {
	return api.addRoomPraise(params).then((response) => {
		dispatch(types.RECEIVE_ROOMPRAISE, response.data.data);
	});
}

export const addRoomTop = ({dispatch}, params) => {
	return api.addRoomTop(params).then((response) => {
		dispatch(types.RECEIVE_ROOMTOP, response.data.data);
	});
}

//gift
export const getGiftList = ({dispatch, params}) => {
	api.getGiftList(params).then((response) => {
		dispatch(types.RECEIVE_GIFTLIST, response.data.data);
	});
}

//message
export const addGift = ({dispatch}, params) => {
	return api.addGift(params);
}

export const resetRoomState = ({dispatch}) => {
	dispatch(types.RESET_ROOMSTATE)
}
