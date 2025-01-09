<template>
	<view v-if="record" class="body">
		<view class="tab-container">
			<TnSwitchTab v-model="currentTabIndex" :tabs="tabs">
				<view v-if="currentTabIndex === 0">
					<text class="content-text">
						{{record.question.content}}
					</text>
				</view>
				<view v-if="currentTabIndex === 1">
					<text class="content-text">
						{{record.answer.content}}
					</text>
				</view>
			</TnSwitchTab>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import TnSwitchTab from '@/uni_modules/tuniaoui-vue3/components/switch-tab/src/switch-tab.vue';

	let record = ref(null);
	const currentTabIndex = ref(0);
	const tabs = ['题目', '答案'];

	onLoad(() => {
		uni.getStorage({
			key: 'record',
			success: res => {
				record.value = res.data;
			}
		});
	});
</script>

<style lang="scss">
	.body {
		background-color: #ffffff;

		.tab-container {
			background-color: #ffffff;
			border-radius: 10rpx;
			box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.2);
			padding: 40rpx;
			margin: 20rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			.TnSwitchTab {
				width: 100%;

				.tab {
					font-size: 28rpx;
					color: #333;
					padding: 15rpx 0;
					text-align: center;
					border-bottom: 2rpx solid transparent;
					cursor: pointer;

					&.active {
						border-bottom-color: #007bff;
						color: #007bff;
					}
				}

				.content-text {
					font-size: 26rpx;
					color: #555;
					line-height: 1.6;
					text-align: justify;
					margin-top: 20rpx;
					white-space: pre-wrap;
				}
			}
		}
	}
</style>