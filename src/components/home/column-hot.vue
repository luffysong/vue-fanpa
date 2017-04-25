<template lang="jade">
div.home-column
	column-title(title="精彩饭趴", english="HOT LIVE", column="hot")
	small-video-view(:list="allHotList", :lazy="lazyLoad")
</template>
<script>
	import store from '../../vuex/store'

	import columnTitle from './column-title'
	import smallVideoView from './small-video-view.vue'

	import { getHomeAllHotList } from '../../vuex/actions/home'

	export default {
		data: function () {
			return {
				lazyLoad: false
			}
		},
		created() {
			this.getHomeAllHotList();
		},
		components: {
			columnTitle,
			smallVideoView
		},
		store,
		vuex: {
			getters: {
				allHotList: state => state.home.allHotList
			},
			actions: {
				getHomeAllHotList
			}
		}
	}
</script>