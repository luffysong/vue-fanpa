import format from 'date-format';

/*
包装发送数据
 */

export default function PackSendMsg() {}

PackSendMsg.prototype = {
	init: function (info) {
		this.info = {
			nickName: info.nickName,
			smallAvatar: info.smallAvatar,
			roomId: info.roomId,
			channelId: info.channelId,
			userId: info.userId,
			source: info.source
		}
	},
	getDefaultInfo: function () {
		return Object.assign(this.info, {
			time: format('hh:mm:ss', new Date())
		});
	},
	pack: function (type, content) {
		return this[type](content);
	},
	chat: function (content) { //聊天
		return Object.assign({
			msgType: 0,
			content: content,
			style: {
				"fontColor": "#999999"
			}
		}, this.getDefaultInfo());
	},
	gift: function (giftId) { //礼物
		return Object.assign({
			msgType: 1,
			giftId: giftId,
			giftNum: 1
		}, this.getDefaultInfo());
	},
	praise: function () { //点赞
		return Object.assign({
			msgType: 3
		}, this.getDefaultInfo());
	}
}