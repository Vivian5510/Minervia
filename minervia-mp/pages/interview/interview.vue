<template>
	<view class="header">
		<uni-card class="picker tn-shadow-lg">
			<picker :range="models" range-key="name" @change="modelSelect">
				<view>
					{{model.name}}
				</view>
			</picker>
		</uni-card>
		<uni-card class="picker tn-shadow-lg">
			<picker :range="categoryItems" range-key="text" @change="categoryItemSelect">
				<view>
					{{categoryItem.text}}
				</view>
			</picker>
		</uni-card>
	</view>
	<view>

	</view>
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
		ref,
		reactive
	} from 'vue';

	let categoryName;
	let models = ref([])
	let categoryItems = ref([])
	let model = reactive({
		name: '请选择AI模型',
		charge: undefined
	})
	let categoryItem = reactive({
		text: '请选择试题分类',
		name: undefined
	})

	function modelSelect(event) {
		Object.assign(model, models.value[event.detail.value])
	}

	function categoryItemSelect(event) {
		Object.assign(categoryItem, categoryItems.value[event.detail.value])
	}


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
					models.value = res
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

<style lang="scss">
	.header {
		position: fixed;
		width: 100%;
		top: 0;
		background-color: #ffffff; // 白色背景
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); // 添加轻微阴影
		border-radius: 15px; // 圆角
		z-index: 1000; // 确保在其他元素之上
		padding: 10px 15px; // 增加内边距
		border-bottom: 1px solid #eaeaea; // 底部边框增加层次感

		.picker {
			font-size: 14px; // 调整字体大小
			color: #333; // 深灰色文字
			text-align: center; // 内容居中
			width: 42%; // 调整宽度稍微小一点，增加间距
			display: inline-block;
			vertical-align: top; // 确保与其他元素对齐
			margin: 0 1%; // 添加左右间距
			border-radius: 8px; // 圆角
			background-color: #f9f9f9; // 浅灰色背景，区分内容区域
			padding: 10px; // 增加内边距
			box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); // 增加柔和阴影
			transition: transform 0.3s ease, box-shadow 0.3s ease; // 添加过渡效果

			&:hover {
				transform: translateY(-3px); // 悬停时略微上移
				box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15); // 悬停时增加阴影
			}
		}
	}
</style>