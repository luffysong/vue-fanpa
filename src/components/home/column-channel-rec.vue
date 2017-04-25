<template lang="jade">
div.home-column
	column-title(title="官方频道", english="OFFICIAL CHANNEL", column="rec")
	big-video-item(:item="channelRecList[0]")
</template>
<script>
	import columnTitle from './column-title'
	import bigVideoItem from '../common/big-video-item'

	import store from '../../vuex/store.js'

	export default {
		created() {
		},
		components: {
			columnTitle,
			bigVideoItem
		},
		store,
		vuex: {
			getters: {
				channelRecList: state => state.home.channelRecList
			},
			actions: {
			}
		}
	}
</script>