import Vue from 'vue'

Vue.filter('giftClass', function (giftId) {
	switch(giftId) {
		case 5:
			return 'love';
			break;
		case 6:
			return 'flower';
			break;
		case 7:
			return 'beer';
			break;
		case 8:
			return 'fireworks';
			break;
		case 9:
			return 'clap';
			break;
	}

});