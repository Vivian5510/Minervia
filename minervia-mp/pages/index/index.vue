<template>
	<view class="content">
		AI面试官
	</view>
</template>

<script setup>
	import {
		getAllBanners,
		getAllCategories
	} from '../../utils/api';
	import {
		onLoad
	} from '@dcloudio/uni-app'

	onLoad(() => {
		uni.getStorage({
			key: 'banners',
			success: (res) => {
				console.log('banner已加载到本地');
			},
			fail: (err) => {
				console.log('banner未加载到本地');
				uni.showLoading({
					title: '数据加载中'
				});
				getAllBanners().then((res) => {
					console.log('加载网络banner资源到本地');
					uni.setStorage({
						key: 'banners',
						data: res
					})
				}).catch()

			}
		});
		uni.getStorage({
			key: 'categories',
			success: (res) => {
				console.log('categories已加载到本地');
			},
			fail: (err) => {
				console.log('categories未加载到本地');
				uni.showLoading({
					title: '数据加载中'
				});
				getAllCategories().then((res) => {
					console.log('加载网络categories资源到本地');
					uni.setStorage({
						key: 'categories',
						data: res
					})
				}).catch()

			}
		})
	})
</script>