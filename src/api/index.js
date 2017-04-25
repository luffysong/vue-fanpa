import Vue from 'vue'
import VueResource from 'vue-resource'
import {roomResource, userResource, popularityResource,giftResource, messageResource, homeResource, tagResource, channelResource} from './resources'

Vue.use(VueResource);

export default {
	// room	
	getRoomDetail: options => roomResource().get(Object.assign({port: 'detail'}, options)),
	getRoomAllHotList: options => roomResource().get(Object.assign({port: 'all_hot_list'}, options)),
	getRoomLongPoling: options => roomResource().get(Object.assign({port: 'longpolling'}, options)),
	enterOrExitRoom: options => roomResource().get(Object.assign({port: 'enter_or_exit'}, options)),
	getRoomImMsgList: options => roomResource().get(Object.assign({port: 'im_msg/list'}, options)),

	//channel
	getChannelDetail: options => channelResource().get(Object.assign({port: 'detail'}, options)),
	getChannelStatPoling: options => channelResource().get(Object.assign({port: 'stat_polling'}, options)),
	addChannelTop: options => channelResource().get(Object.assign({port: 'popularity_add', type: 3}, options)),
	addChannelPraise: options => channelResource().get(Object.assign({port: 'popularity_add', type: 2}, options)),
	addChannelGift: options => channelResource().get(Object.assign({port: 'popularity_add', type: 4}, options)),
	enterOrExitChannel: options => channelResource().get(Object.assign({port: 'online_record'}, options)),

	//user
	getUserInfo: options => userResource().get(Object.assign({port: 'info'}, options)),
	getUserSig: options => userResource().get(Object.assign({port: 'sig_get'}, options)),

	//popularity
	addRoomPraise: options => popularityResource().get(Object.assign({port: 'add', type: 1}, options)),
	addRoomTop: options => popularityResource().get(Object.assign({port: 'add', type: 2}, options)),

	//gift
	getGiftList: options =>  giftResource().get(Object.assign({port: 'list'}, options)),

	//message
	addGift: options => messageResource().get(Object.assign({port: 'gift_send'}, options)),

	//home
	getHomeVideoRec: options => homeResource().get(Object.assign({port: 'video_rec'}, options)), //首页轮播
	getHomeChannelRec: options => homeResource().get(Object.assign({port: 'channel_rec'}, options)), //官方频道

	//tag
	getTagList: options => tagResource().get(Object.assign({port: 'list'}, options)), //自定义频道列表
	getTagVideoList: options => tagResource().get(Object.assign({port: 'video/list'}, options)), //自定义频道下视频列表
}