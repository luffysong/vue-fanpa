import Vue from 'vue'

Vue.filter('posterPic', function (src) {
	return src.replace('_0x0', '_600x400');
});