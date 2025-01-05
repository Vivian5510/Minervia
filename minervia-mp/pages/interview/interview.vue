<template>
	<view>

	</view>
</template>

<script setup>
	import {
		getAllModels,
		getAllCategoryItems
	} from '@/utils/api';
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		ref
	} from 'vue';

	let categoryName;
	let models = ref([])
	let categoryItems = ref([])
	onLoad((options) => {
		categoryName = options.categoryName
		uni.getStorage({
			key: 'models',
			success: (res) => {
				models.value = res.data
			},
			fail: (err) => {
				uni.showLoading({
					title: '数据加载中'
				});
				getAllModels().then((res) => {
					models.value = data
					uni.setStorage({
						key: 'models',
						data: res
					})
				}).catch()

			}
		})
		uni.getStorage({
			key: 'category_' + categoryName,
			success: (res) => {
				categoryItems.value = res.data
			},
			fail: (err) => {
				uni.showLoading({
					title: '数据加载中'
				});
				getAllCategoryItems(categoryName).then((res) => {
					categoryItems.value = res
					uni.setStorage({
						key: 'category_' + categoryName,
						data: res
					})
				}).catch()

			}
		})
	})
</script>

<style>

</style>