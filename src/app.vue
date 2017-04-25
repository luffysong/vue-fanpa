<template>
    <my-header></my-header>
    <router-view class="g-container"></router-view>
    <my-footer></my-footer>
</template>
<script>
    import store from './vuex/store'
    import { getIsLogin, getUserInfo } from './vuex/actions/user'
    import { Indicator } from 'mint-ui';

    import myHeader from './components/common/my-header'
    import myFooter from './components/common/my-footer'

    export default {
        replace: false,
        created: function () {
            this.getIsLogin(); //判断是否登录
            if(this.isLogin) {
                this.getUserInfo(); //获取用户信息
            }
            this.changeLoading(); //切换组件加载
        },
        methods: {
            changeLoading: function () {
                var vm = this,
                    router = this.$route.router,
                    routeName = '';
                router.beforeEach(function ({to, from, next}) {
                    if(to.name !== from.name) {
                        Indicator.open();
                    }
                    next();
                });

                router.afterEach(function ({to, from}) {
                    if(to.name !== from.name) {
                        document.body.scrollTop = 0;
                        Indicator.close();
                    }
                });
            }
        },
        components: {
            myHeader,
            myFooter
        },
        store,
        vuex: {
            getters: {
                isLogin: state => state.user.isLogin
            },
            actions: {
                getIsLogin,
                getUserInfo
            }
        }
    }
</script>
<style>
</style>
