<template>
	<div class="user-action">
		<action-chat></action-chat>
		<action-share></action-share>
		<action-top></action-top>
		<action-gift></action-gift>
		<action-praise></action-praise>
	</div>
</template>
<script>
	import actionPraise from './action-praise'
	import actionGift from './action-gift'
	import actionChat from './action-chat'
	import actionTop from './action-top'
	import actionShare from './action-share'

	export default {
		components: {
			actionPraise,
			actionGift,
			actionChat,
			actionTop,
			actionShare
		}
	}
</script>