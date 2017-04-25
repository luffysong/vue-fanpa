import Vue from 'vue'
import VueResource from 'vue-resource'
import {API_ROOT, DEVICE_INFO, ACCESS_TOKEN} from '../config'

Vue.use(VueResource);

Vue.http.interceptors.push((request, next) => {
	//发送请求前的处理

	//将GET请求更改为JSONP请求
	(request.method === 'GET') && (request.method = 'JSONP');

	//所有请求的参数加上deviceinfo
	Object.assign(request.params, DEVICE_INFO);

	if(typeof ACCESS_TOKEN !== 'undefined') {
		Object.assign(request.params, {
			access_token: 'web-' + ACCESS_TOKEN
		});
	}

	next((response) => {
		//接受响应后执行回调前的处理
		// console.log(response);
	});
});

export const roomResource = () => Vue.resource(API_ROOT + 'room/{port}.json');
export const popularityResource = () => Vue.resource(API_ROOT + 'popularity/{port}.json');
export const userResource = () => Vue.resource(API_ROOT + 'user/{port}.json');
export const giftResource = () => Vue.resource(API_ROOT + 'gift/{port}.json');
export const messageResource = () => Vue.resource(API_ROOT + 'message/{port}.json');

export const homeResource = () => Vue.resource(API_ROOT + 'home/{port}.json');
export const tagResource = () => Vue.resource(API_ROOT + 'tag/{port}.json');

export const channelResource = () => Vue.resource(API_ROOT + 'channel/{port}.json');
