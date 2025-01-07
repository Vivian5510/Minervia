<template>
	<view class="header">
		<view class="picker tn-shadow-lg">
			<picker :range="models" range-key="name" @change="modelSelect">
				<view>
					{{model.name}}
				</view>
			</picker>
		</view>
		<view class="picker tn-shadow-lg">
			<picker :range="categoryItems" range-key="text" @change="categoryItemSelect">
				<view>
					{{categoryItem.text}}
				</view>
			</picker>
		</view>
	</view>
	<view>

	</view>
	<view class="footer">
		<view v-show="btnSwitch.show">
			<TnButton class="start-btn" width="650rpx" height="80rpx" bg-color="#3d3d3d" :disabled="btnSwitch.disabled">
				<div class="tn-text-transparent tn-text-bold tn-text-xl tn-gradient-bg__cool-8">
					{{btnSwitch.text}}
				</div>
			</TnButton>
		</view>

		<view v-show="!btnSwitch.show">
			<TnSuspendButton class="answer-btn" size="lg" bg-color="#3d3d3d" right="75%" top="90%"
				:disabled="!btnSwitch.disabled">
				<div class="image-containner">
					<image class="image-size" src="@/static/icon/A.svg" mode="aspectFit"></image>
				</div>
			</TnSuspendButton>
			<TnSuspendButton class="answer-btn" size="lg" bg-color="#3d3d3d" right="54%" top="90%"
				:disabled="!btnSwitch.disabled">
				<div class="image-containner">
					<image class="image-size" src="@/static/icon/B.svg" mode="aspectFit"></image>
				</div>
			</TnSuspendButton>
			<TnSuspendButton class="answer-btn" size="lg" bg-color="#3d3d3d" right="33%" top="90%"
				:disabled="!btnSwitch.disabled">
				<div class="image-containner">
					<image class="image-size" src="@/static/icon/C.svg" mode="aspectFit"></image>
				</div>
			</TnSuspendButton>
			<TnSuspendButton class="answer-btn" size="lg" bg-color="#3d3d3d" right="12%" top="90%"
				:disabled="!btnSwitch.disabled">
				<div class="image-containner">
					<image class="image-size" src="@/static/icon/D.svg" mode="aspectFit"></image>
				</div>
			</TnSuspendButton>
		</view>
	</view>
</template>

<script setup>
	import TnSuspendButton from 'tnuiv3p-tn-suspend-button/index.vue'
	import TnButton from '@/uni_modules/tuniaoui-vue3/components/button/src/button.vue'
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

	let btnSwitch = ref({
		text: '开 始 面 试',
		disabled: false,
		show: false
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
		top: 0rpx;
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
			width: 47%; // 调整宽度稍微小一点，增加间距
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

	.footer {
		position: fixed;
		bottom: 20rpx;
		width: 100%;
		height: 64rpx;
		background-color: #ffffff;
		opacity: 1;
		display: flex;
		align-items: center;
		justify-content: center;

		.start-btn {}

		.moveon-btn {}

		.answer-btn {

			.image-containner {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 40rpx;
				height: 40rpx;

				.image {
					width: 35rpx;
					height: 35rpx;
				}
			}
		}
	}
</style>