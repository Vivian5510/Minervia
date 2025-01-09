<template>
	<view class="body">
		<z-paging ref="paging" v-model="records" @query="queryRecords">
			<uni-card class="record-card" v-for="(record, index) in records" :key="index" @click="recordDetail(record)">
				<view class="card-header">
					<text class="card-title">面试记录 {{ index + 1 }}</text>
					<text class="card-date">{{ formatDate(record.question.createTime) }}</text>
				</view>
				<view class="card-content">
					<text class="card-text">{{ record.question.content }}</text>
				</view>
				<view class="card-footer">
					<TnTag class="card-tag" shape="round" bg-color="tn-gradient-bg__cool-8" bold="true" size="sm">
						{{record.question.category}}
					</TnTag>
					<TnTag class="card-tag" shape="round" bg-color="tn-gradient-bg__cool-14" bold="true" size="sm">
						{{record.question.subject}}
					</TnTag>
				</view>
			</uni-card>
		</z-paging>
	</view>
</template>

<script setup>
	import TnTag from '@/uni_modules/tuniaoui-vue3/components/tag/src/tag.vue'
	import {
		getAllRecords
	} from '@/utils/api';
	import {
		ref,
		getCurrentInstance
	} from 'vue';

	const {
		proxy
	} = getCurrentInstance();

	let records = ref([]);
	let paging = ref(null);

	function formatDate(date) {
		const d = new Date(date); // 将日期转换为Date对象
		const year = d.getFullYear().toString(); // 取年份的后两位
		const month = (d.getMonth() + 1).toString().padStart(2, '0'); // 获取月份并补齐为2位
		const day = d.getDate().toString().padStart(2, '0'); // 获取日期并补齐为2位

		return `${year}-${month}-${day}`; // 返回格式化后的字符串
	}

	function queryRecords(pageNum) {
		console.log(pageNum);
		uni.showLoading({
			title: '正在查找面试记录',
		});
		getAllRecords(pageNum)
			.then((res) => {
				console.log(res);
				proxy.$refs.paging.complete(res);
			})
			.catch((err) => {
				proxy.$refs.paging.complete(false);
			})
			.finally(() => {
				uni.hideLoading();
			});
	}

	function recordDetail(record) {
		uni.setStorage({
			key: 'record',
			data: record,
			success() {
				uni.navigateTo({
					url: '/pages/records-detail/records-detail'
				})
			}
		})
	}
</script>

<style lang="scss">
	.body {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 16px;
		background-color: #f8f9fa;

		.record-card {
			width: 100%;
			margin-bottom: 16px;
			border-radius: 15px;
			background-color: #ffffff;
			padding: 16px;

			.card-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 8px;

				.card-title {
					font-size: 16px;
					font-weight: bold;
					color: #333333;
				}

				.card-date {
					font-size: 12px;
					color: #888888;
				}
			}

			.card-footer {
				margin-top: 15rpx;

				.card-tag {
					margin-right: 10rpx;
				}
			}

			.card-content {
				.card-text {
					font-size: 14px;
					line-height: 1.5;
					color: #555555;
				}
			}
		}
	}
</style>