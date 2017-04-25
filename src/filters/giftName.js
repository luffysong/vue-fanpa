import Vue from 'vue'

Vue.filter('giftName', function (giftId) {
	switch(giftId) {
		case 5:
			return '爱心';
			break;
		case 6:
			return '鲜花';
			break;
		case 7:
			return '啤酒';
			break;
		case 8:
			return '礼花';
			break;
		case 9:
			return '鼓掌';
			break;
		default:
			return '未知';
	}
});