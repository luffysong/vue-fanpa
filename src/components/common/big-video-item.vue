<template lang="jade">
div.big-video-item(
	:style="{ backgroundImage: bgPic }"
	@click="routerGo()"
	)
	div.info-bg
		div.info 
			p.video-name {{ videoName }}
			div.author-info
				img.author-pic(:src="item.creator && item.creator.smallAvatar")
				span.author-name {{ item.creator && item.creator.nickName }}

		div.popularity 人气：{{ popularity }}

	span.notice-icon(v-if="item.status === 1")
	span.live-icon(v-if="item.status === 2")
</template>
<script>
	export default {
		props: ['item'],
		computed: {
			bgPic: function () {
				return 'url("' + this.item.posterPic + '")';
			},
			videoName: function () {
				return this.item.channelName || this.item.roomName || this.item.videoName
			},
			popularity: function () {
				return this.item.realPopularity || this.item.popularity
			}
		},
		methods: {
			routerGo: function () {
				var options = { 
						name:'detail',
						params: {}
					};
				if(typeof this.item.channelId !== 'undefined') {
					options.name = 'channel';
					options.params.channelId = this.item.channelId;
				} else {
					options.params.roomId = ( this.item.roomId || this.item.videoId );
				}
				this.$router.go(options);
			}
		}
	}
</script>