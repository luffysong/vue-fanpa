// import home from './components/home.vue'
// import list from './components/list.vue'
// import detail from './components/detail/detail.vue'

import { DEFAULT_ROOMID } from './config'

export default function(router) {
    router.map({
        '/': {
            name: 'home',
            component: home
        },
        '/list/:column': {
            name: 'list',
            component: list,
            subRoutes: {
                '/:tagId': {
                    component: list
                }
            }
        },
        '/detail/:roomId': {
            name: 'detail',
            component: detail
        },
        '/channel/:channelId': {
            name: 'channel',
            component: channel
        },
        '/i': {
            name: 'i',
            component: i
        }
    });

    router.redirect({
        '*': '/'
    });

}

function home(resolve) {
    require.ensure(["./components/home/index.vue"], function() {
       require(['./components/home/index.vue'], resolve);
    }, 'home');
}

function list(resolve) {
    require.ensure(["./components/list/index.vue"], function() {
        require(['./components/list/index.vue'], resolve);
    }, 'list');
}

function detail(resolve) {
    require.ensure(["./components/detail/detail.vue"], function() {
       require(['./components/detail/detail.vue'], resolve);
    }, 'detail');
}

function channel(resolve) {
    require.ensure(["./components/channel/index.vue"], function() {
       require(['./components/channel/index.vue'], resolve);
    }, 'channel');
}

function i(resolve) {
    require.ensure(["./components/i/index.vue"], function() {
        require(['./components/i/index.vue'], resolve);
    }, 'i');
}

