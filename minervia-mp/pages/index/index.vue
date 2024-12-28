<template>
	<view class="content">
		<div class="tn-gradient-bg__blue-light fullscreen-background"></div>
		<TnSwiper v-model="currentSwiperIndex" :data="banners" width="100%" height="420" class="swiper-container"
			autoplay loop indicator indicator-type="dot">
			<template #default="{ data, active }">
				<view class="swiper-data swiper-data.animation" :class="[{ active }]">
					<image class="swiper-image" :src="data.image" mode="aspectFill" />
				</view>
			</template>
		</TnSwiper>
		<uni-grid :column="3" :showBorder="false" :square="false">
			<uni-grid-item v-for="(category, index) in categories" :index="index" :key="index">
				<view class="grid-container">
					<image class="grid-image" :src="category.src" mode="aspectFill"></image>
					<div class="tn-mb tn-text-transparent transparent tn-text-bold tn-gradient-bg__cool-6">
						{{category.text}}
					</div>
				</view>
			</uni-grid-item>
		</uni-grid>
	</view>
</template>

<script setup>
	import TnSwiper from '@/uni_modules/tuniaoui-vue3/components/swiper/src/swiper.vue'
	import {
		ref
	} from 'vue'
	import {
		getAllBanners,
		getAllCategories
	} from '../../utils/api';
	import {
		onLoad
	} from '@dcloudio/uni-app'

	let currentSwiperIndex = ref(0)

	// 轮播图数据
	let banners = ref([])

	//宫格数据
	let categories = ref([])

	onLoad(() => {
		uni.getStorage({
			key: 'banners',
			success: (res) => {
				banners.value = res.data;
			},
			fail: (err) => {
				uni.showLoading({
					title: '数据加载中'
				});
				getAllBanners().then((res) => {
					banners.value = res;
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
				categories.value = res.data
			},
			fail: (err) => {
				uni.showLoading({
					title: '数据加载中'
				});
				getAllCategories().then((res) => {
					categories.value = res
					uni.setStorage({
						key: 'categories',
						data: res
					})
				}).catch()

			}
		})
	})
</script>

<style scoped src='@/static/css/animate.min.css'></style>
<style>
	.grid-image {
		width: 48px;
		height: 48px;
		transform-style: preserve-3d;
	}

	.grid-text {
		font-size: 14px;
		margin-top: 5px;
	}

	.grid-container {
		flex: 1;
		display: inline-flex;
		position: relative;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
		border-radius: 20rpx;
	}
</style>
<style>
	.swiper-container {
		width: 100%;
		height: 420rpx;
	}

	.swiper-data {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		position: relative;
	}

	.swiper-image {
		width: 90%;
		height: 100%;
		border-radius: 20px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
	}



	.fullscreen-background {
		position: fixed;
		/* 固定定位，覆盖整个页面 */
		top: 0;
		/* 顶部为0 */
		left: 0;
		/* 左侧为0 */
		width: 100vw;
		/* 宽度为视口宽度 */
		height: 100vh;
		/* 高度为视口高度 */
		z-index: -1;
		/* 保证它位于页面其他内容的下面 */
	}

	.swiper-data.animation {
		transition: transform 0.5s linear;
		/* 动画过渡效果 */
		transform: scale(0.8);
		/* 默认缩小 */
	}

	.swiper-data.active {
		transform: scale(1);
		/* 激活时恢复正常尺寸 */
	}
</style>