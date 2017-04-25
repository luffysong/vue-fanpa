<template lang="jade">
section
	div.list-view(
		v-infinite-scroll="loadMore()"
		infinite-scroll-disabled="loading && firstLoadEnd"
		infinite-scroll-distance="10"
		)
		big-video-item(v-for="item in dataList", :item="item")
	div.list-loading-view(v-show="hasNextOffset")
		mt-spinner(type="fading-circle", color="#888")
		span.text 加载中...
</template>
<script>
	import store from '../../vuex/store'

	import { setColumn, setTagId, setTagName, getDataList, resetData } from '../../vuex/actions/list'
	import { setHeaderTitle } from '../../vuex/actions/header'

	import Vue from 'vue';
	import { InfiniteScroll } from 'mint-ui';
	Vue.use(InfiniteScroll);
	import { Spinner } from 'mint-ui';
	Vue.component(Spinner.name, Spinner);

	import bigVideoItem from '../common/big-video-item.vue'

	export default {
		data: function () {
			return {
				iPage: 0,
				loading: true,
				firstLoadEnd: false
			}	
		},
		created() {
			this.scrollTopHandler();
			this.setHeaderTitle('让世界吃你偶像安利！');
			this.$watch('tagName', function () {
				this.setHeaderTitle(this.tagName);
			});
			this.initHandler();
			this.$watch('RouterColumn', this.columnHandler);
			this.$watch('RouteTagId', this.TagIdHandler);
		},
		methods: {
			scrollTopHandler: function () {
				document.body.scrollTop = 0;
			},
			columnHandler: function () {
				if(this.RouterColumn !== 'tag') {
					this.initHandler();
				}
			},
			TagIdHandler: function () {
				if(!isNaN(this.RouteTagId)) {
					this.initHandler();
				}
			},
			initHandler: function (newVal, oldVal) {
				var self = this;
				this.setColumn(this.RouterColumn);
				this.setTagId(this.RouteTagId);
				this.setTagName();
				this.resetData(); //重置数据
				this.getDataList(this.iPage++).then(function () {
					setTimeout(function() {
						self.firstLoadEnd = true;
					}, 100);
				});
			},
			loadMore: function (id) {
				var self = this;
				if(self.firstLoadEnd) {
					self.loading = true;
					self.getDataList(self.iPage++).then(function () {
						setTimeout(function() {
							self.loading = false;
						}, 100);
					});
				}
			}
		},
		computed: {
			RouterColumn: vm => vm.$route.params.column,
			RouteTagId: vm => parseInt(vm.$route.params.tagId),
			loading: vm => !vm.hasNextOffset
		},
		components: {
			bigVideoItem
		},
		store,
		vuex: {
			getters: {
				dataList: state => state.list.dataList,
				tagName: state => state.list.tagName,
				hasNextOffset: state => state.list.hasNextOffset
			},
			actions: {
				setColumn,
				setTagId,
				setTagName,
				getDataList,
				setHeaderTitle,
				resetData
			}
		}
	}
</script>