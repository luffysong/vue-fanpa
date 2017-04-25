import * as types from '../mutation-types'
import api from '../../api/index'

//webim
export const addWebImData = ({ state, dispatch }, oNewMsg) => {
	switch (oNewMsg.msgType) {
	    case 4: //清屏
	        setWebImData({dispatch}, []);
	        break;
	    case 8: //锁屏
	        setWebImBlockState({ state, dispatch }, true, '主播已锁屏，无法进行互动');
	        break;
	    case 9: //解屏
	        setWebImBlockState({ state, dispatch }, false, '');
	        break;
	    case 5: //禁言
	        (parseInt(oNewMsg.userId) === state.user.info.userId) && setWebImIsStopCmtUser({state, dispatch});
	        break;
        case 10: //踢人
        	(parseInt(oNewMsg.toUser) === state.user.info.userId) && setWebImIsForbidUser({dispatch}, true); //改变被踢状态
        	break;
        case 11: //场控
        	if(parseInt(oNewMsg.toUser) === state.user.info.userId) {
        		let tips = oNewMsg.roomControl + '' === 'true' ? '你被主播设置为场控，需要到PC或下载口袋fan使用管理功能' : '你被主播解除场控权限';
				dispatch(types.RECEIVE_WEBIM_ISROOMCONTROLUSER, oNewMsg.roomControl, tips);
        	}
	        break;
	}

	dispatch(types.ADD_WEBIMDATA, oNewMsg);
}

export const removeWebImData = ({dispatch}, data) => {
	dispatch(types.REMOVE_WEBIMDATA, data);
}

export const setWebImData = ({dispatch}, data) => {
	dispatch(types.RECEIVE_WEBIMDATA, data);
}

export const setWebImObj = ({dispatch}, obj) => {
	dispatch(types.RECEIVE_WEBIMOBJ, obj);
}

export const setWebImPackMsg = ({dispatch}, obj) => {
	dispatch(types.RECEIVE_WEBIMPACKMSG, obj);
}

export const setWebImJoinStatus = ({dispatch}, string) => {
	var bIsAllowTalk = false, sTips = '';
	switch(string) {
		case 'not':
			sTips = '正在登录聊天室，请稍后进行互动';
			break;
		case 'ing':
			sTips = '正在加入聊天室，请稍后进行互动';
			break;
		case 'error':
			sTips = '聊天室加入失败，无法进行互动，请刷新页面';
			break;
		case 'notGroup':
			sTips = '直播开始后才可以进行互动'
			break;
		default:
			bIsAllowTalk = true;
	}

	dispatch(types.RECEIVE_WEBIM_ISALLOWTALK, bIsAllowTalk, sTips); //设置是否允许互动
	dispatch(types.RECEIVE_WEBIMJOINSTATUS, string); //更改加入群组的当前状态
}

export const setWebImBlockState = ({ state, dispatch }, boolean, sTips) => {
	if(state.room.roomDetail.status !== 2) { //非直播房间禁止锁屏
		boolean = false;
		sTips = '';
	}
	dispatch(types.RECEIVE_WEBIMBLOCKSTATE, boolean);
	dispatch(types.RECEIVE_WEBIM_ISALLOWTALK, !boolean, sTips); //设置是否允许互动
}


export const setWebImIsStopCmtUser = ({ dispatch, state }) => {
	var roomId = state.room.roomId,
	    itemKey = roomId + 'isStopCmtUser',
	    iAllTime = 10 * 60 * 1000;

	localStorage.setItem(itemKey, Date.now());
	dispatch(types.RECEIVE_WEBIM_ISSTOPCMTUSER, true);

	setTimeout(function() {
	    if (Date.now() - localStorage.getItem(itemKey) >= iAllTime - 1000) {
	        localStorage.removeItem(itemKey);
	        dispatch(types.RECEIVE_WEBIM_ISSTOPCMTUSER, false);
	    }
	}, iAllTime);
}

export const getWebImIsStopCmtUser = ({ dispatch, state }) => {
	var roomId = state.room.roomId,
		itemKey = roomId + 'isStopCmtUser',
	    iAllTime = 10 * 60 * 1000,
	    currentTime = Date.now(),
	    startTime = parseInt(localStorage.getItem(itemKey)),
	    endTime = iAllTime + startTime;

	if (startTime && currentTime < endTime) {
	    dispatch(types.RECEIVE_WEBIM_ISSTOPCMTUSER, true);

	    setTimeout(function() {
	        localStorage.removeItem(itemKey);
	        dispatch(types.RECEIVE_WEBIM_ISSTOPCMTUSER, false);
	    }, endTime - currentTime);
	} else {
	    localStorage.removeItem(itemKey);
	    dispatch(types.RECEIVE_WEBIM_ISSTOPCMTUSER, false);
	}
}

export const setWebImIsForbidUser = ({dispatch}, boolean) => {
	dispatch(types.RECEIVE_WEBIM_ISFORBIDUSER, boolean);
}

export const getRoomImMsgList = ({dispatch, state}, params) => {
	var roomId = state.room.roomId;
	api.getRoomImMsgList({
		roomId: roomId,
		timeSort: 2,
		limit: 200
	}).then(function (response) {
		if(response.data.msg === 'SUCCESS') {
			var aList = historyListToWebImList(response.data.data.list, roomId);
			setWebImData({ dispatch }, aList);
		}
	});
}

export const setGroupInfo = ({state, dispatch}, data) => {
	var GroupInfo = data.GroupInfo[0],
	    Introduction = GroupInfo.Introduction,
	    Notification = GroupInfo.Notification,
	    blockState = Introduction ? JSON.parse(Introduction).blockState : false,
	    forbidUsers = Notification ? JSON.parse(Notification).forbidUsers : [],
	    aForbidUsers = forbidUsers.filter(function (item) {
	        return parseInt(item) === state.user.info.userId;
	    });

    dispatch(types.RECEIVE_WEBIM_GROUPINFO, data); //改变群信息
	setWebImIsForbidUser({dispatch}, (aForbidUsers.length > 0)); //改变被踢状态
	setWebImBlockState({ state, dispatch }, blockState, '主播已锁屏，无法进行互动'); //设置锁屏状态

}

export const setIsLoginIm = ({ dispatch }, boolean) => {
	dispatch(types.RECEIVE_ISLOGINIM, boolean);
}

function historyListToWebImList(aList, roomId) {
	var arr = [];
	aList.forEach(function (item) {
		var newItem = Object.assign(item.author, item.data);
		newItem.roomId = roomId;
		arr.unshift(newItem);
	});
	return arr;
}

