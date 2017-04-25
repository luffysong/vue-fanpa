import './styles/main.scss' // 公用css

import './scripts/flexible.debug' // 引入flexible布局

import './scripts/webim' //引入webimSDK

import './scripts/ban-gesture' //关闭手势

import fastclick from 'fastclick'

import Vue from 'vue'

import VueRouter from 'vue-router'

import VueResource from 'vue-resource'

import registerRouters from './routers'

import App from './app.vue'

import store from './vuex/store'

import "./scripts/cnzz"

// fastclick.attach(document.body);

Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(VueResource);

var router = new VueRouter({
    hashbang: false,
});

registerRouters(router);

router.start(App, '#app');
