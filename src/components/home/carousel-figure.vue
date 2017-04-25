<template lang="jade">
mt-swipe.home-carousel(
		:auto = 7000
		:prevent = true
	)
	mt-swipe-item(v-for="item in videoRec")
		img(
			:src = "item.posterPic | posterPic"
			v-link = "{name: 'detail', params: {roomId: item.videoId}}"
		)
</template>

<script>
	import Vue from 'vue';
	import { Swipe, SwipeItem } from 'mint-ui';

	import store from '../../vuex/store';
	import { getHomeVideoRec } from '../../vuex/actions/home';

	import '../../filters/posterPic.js'

	Vue.component(Swipe.name, Swipe);
	Vue.component(SwipeItem.name, SwipeItem);

	export default {
		created: function () {
			this.getHomeVideoRec({
				size: 5
			});
		},
		store,
		vuex: {
			getters: {
				videoRec: state => state.home.videoRec
			},
			actions: {
				getHomeVideoRec
			}
		}
	}
</script>
