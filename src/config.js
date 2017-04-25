import Auxiliary from 'auxiliary-additions';

export const ACCESS_TOKEN = Auxiliary.cookie.get('token');

// export const API_ROOT = 'http://beta.yinyuetai.com:9019/';
export const API_ROOT = 'http://lapi.yinyuetai.com/';

export const DEVICE_INFO = {
	deviceinfo: '{"aid":"30001001","as":"WAP"}'
}

export const DEFAULT_ROOMID = 809;