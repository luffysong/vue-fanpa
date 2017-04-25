<template lang="jade">
section
	carousel-figure
	column-hot
	column-channel-rec(v-if="channelRecList.length")
	column-tag-list
</template>

<script>
	import store from '../../vuex/store'

	import carouselFigure from './carousel-figure'
	import columnHot from './column-hot'
	import columnChannelRec from './column-channel-rec'
	import columnTagList from './column-tag-list'

	import { getHomeChannelRec } from '../../vuex/actions/home'
	import { setHeaderTitle } from '../../vuex/actions/header'


	export default {
	    replace: true,
	    created() {
	    	this.getHomeChannelRec();
	    	this.setHeaderTitle('让世界吃你偶像安利！');
	    },
	    methods: {

	    },
	    components: {
	    	carouselFigure,
	    	columnHot,
	    	columnChannelRec,
	    	columnTagList
	    },
	    store,
	    vuex: {
	    	getters: {
	    		allHotList: state => state.home.allHotList,
	    		channelRecList: state => state.home.channelRecList
	    	},
	    	actions: {
	    		setHeaderTitle,
	    		getHomeChannelRec
	    	}
	    }
	}

</script>
