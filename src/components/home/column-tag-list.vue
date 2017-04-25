<template lang="jade">
div.home-column(v-for="item in tagList")
	column-title(
		:title="item.title"
		:english="item.enTitle"
		column="tag"
		:tag="item.id"
		)
	small-video-view(:list="tagVideoList[item.id]", :lazy="lazyLoad")
</template>
<script>
	import columnTitle from './column-title'
	import smallVideoView from './small-video-view.vue'

	import store from '../../vuex/store.js'
	import { getTagList, getTagVideoList } from '../../vuex/actions/home.js'


	export default {
		data: function () {
			return {
				lazyLoad: true
			}
		},
		created() {
			this.getTagList();
			this.$watch('tagList', function () {
				this.tagList.forEach(function (item) {
					this.getTagVideoList({
						tagId: item.id,
						size: 8
					});
				}.bind(this));
			});
		},
		components: {
			columnTitle,
			smallVideoView
		},
		store,
		vuex: {
			getters: {
				tagList: state => state.home.tagList,
				tagVideoList: state => state.home.tagVideoList
			},
			actions: {
				getTagList,
				getTagVideoList
			}
		}

	}
</script>