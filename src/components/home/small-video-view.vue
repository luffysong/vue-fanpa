<template lang="jade">
ul.small-video-view
	li.small-video-item(
		v-for="item in list"
		v-link="{ name:'detail', params:{roomId: item.roomId ||  item.videoId} }"
		)
		img.poster-pic(v-if="lazy", v-lazy="item.posterPic")
		img.poster-pic(v-else, :src="item.posterPic")
		span.notice-icon(v-if="item.status === 1")
		span.live-icon(v-if="item.status === 2")
		p.video-title {{ item.roomName || item.videoName }}
		p.anchor-info
			img.anchor-pic(v-if="lazy", v-lazy="item.creator.smallAvatar")
			img.anchor-pic(v-else, :src="item.creator.smallAvatar")
			span.anchor-name {{ item.creator.nickName }}
div.small-view-loader(v-if="!(list && list.length > 0)")
	div.loader
		mt-spinner(type="triple-bounce", color="#ff6769")
</template>
<script>
	import Vue from 'vue';
	import { Lazyload } from 'mint-ui';
	Vue.use(Lazyload);

	import { Spinner } from 'mint-ui';
	Vue.component(Spinner.name, Spinner);

	export default {
		props: ['list', 'lazy'],
		ready() {
		}
	}
</script>