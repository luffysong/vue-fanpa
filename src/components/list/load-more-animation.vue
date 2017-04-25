<style lang="scss">

.loaddingAnmation {
    margin: 0 auto;
    width: 100px;
}

.loadding-icon {
    float: left;
}

.loadding-text {
    height: 28px;
    display: block;
    width: 60px;
    line-height: 28px;
    float: left;
    padding-left: 10px;
}

</style>

<template>

    <div class="loaddingAnmation clearfix" v-show="toggleShowLoadding">
        <div class="loadding-icon">
            <mt-spinner type="fading-circle"></mt-spinner>
        </div>
        <span class="loadding-text">
            加载中...
        </span>
    </div>

</template>

<script>

import Vue from 'vue';
// 加载更多
import { Spinner } from 'mint-ui';
Vue.component(Spinner.name, Spinner);

export default {
    props: ['toggleShowLoadding']
}

</script>
