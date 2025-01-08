<template>
	<view class="header">
		<view class="picker tn-shadow-lg">
			<picker :range="models" range-key="name" @change="modelSelect">
				<div class="tn-text-transparent tn-gradient-bg__cool-8 tn-text-bold tn-text-xl">
					{{model.name}}
				</div>
			</picker>
		</view>
		<view class="picker tn-shadow-lg">
			<picker :range="categoryItems" range-key="text" @change="categoryItemSelect">
				<div class="tn-text-transparent tn-gradient-bg__cool-8 tn-text-bold tn-text-xl">
					{{categoryItem.text}}
				</div>
			</picker>
		</view>
	</view>
	<view class="body">
		<scroll-view :scroll-top="0" :scroll-y="true" class="scroll-container tn-shadow-lg">
			<uni-card class="content" v-show="content.show" title="Minervia" :extra="`${categoryItem.text}面试题`">
				<text class="question-text">{{content.text}}</text>
			</uni-card>
		</scroll-view>
	</view>

	<view class="footer">
		<view v-show="btnSwitch.show">
			<TnButton class="start-btn" width="650rpx" height="80rpx" bg-color="#3d3d3d" :disabled="btnSwitch.disabled"
				@click="startInterview">
				<div class="tn-text-transparent tn-text-bold tn-text-xl tn-gradient-bg__cool-8">
					{{btnSwitch.text}}
				</div>
			</TnButton>
		</view>

		<view v-show="!btnSwitch.show">
			<TnSuspendButton class="answer-btn" size="lg" bg-color="#3d3d3d" right="75%" top="90%"
				:disabled="!btnSwitch.disabled" @click="answerQuestion('A')">
				<div class="tn-text-transparent tn-gradient-bg__cool-8 tn-text-bold tn-text-3xl">
					A
				</div>
			</TnSuspendButton>
			<TnSuspendButton class="answer-btn" size="lg" bg-color="#3d3d3d" right="54%" top="90%"
				:disabled="!btnSwitch.disabled" @click="answerQuestion('B')">
				<div class="tn-text-transparent tn-gradient-bg__cool-8 tn-text-bold tn-text-3xl">
					B
				</div>
			</TnSuspendButton>
			<TnSuspendButton class="answer-btn" size="lg" bg-color="#3d3d3d" right="33%" top="90%"
				:disabled="!btnSwitch.disabled" @click="answerQuestion('C')">
				<div class="tn-text-transparent tn-gradient-bg__cool-8 tn-text-bold tn-text-3xl">
					C
				</div>
			</TnSuspendButton>
			<TnSuspendButton class="answer-btn" size="lg" bg-color="#3d3d3d" right="12%" top="90%"
				:disabled="!btnSwitch.disabled" @click="answerQuestion('D')">
				<div class="tn-text-transparent tn-gradient-bg__cool-8 tn-text-bold tn-text-3xl">
					D
				</div>
			</TnSuspendButton>
		</view>
	</view>
</template>

<script setup>
	import {
		getSessionId
	} from '@/utils/tool'
	import TnSuspendButton from 'tnuiv3p-tn-suspend-button/index.vue'
	import TnButton from '@/uni_modules/tuniaoui-vue3/components/button/src/button.vue'
	import {
		getAllModels,
		getAllCategoryItems,
		chat
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
		name: '请选择考官模型',
		charge: undefined
	})
	let categoryItem = reactive({
		text: '请选择试题分类',
		name: undefined
	})

	let btnSwitch = reactive({
		text: '开 始 面 试',
		disabled: false,
		show: true
	})

	let content = reactive({
		text: '',
		show: false
	})

	function answerQuestion(answer) {
		let mpRequest = {
			sessionId: getSessionId(false),
			subject: categoryName,
			content: answer,
			type: 'a',
			modelName: model.name
		}

		uni.showLoading({
			title: '面试官正在思考',
		})

		// btnSwitch.show = !btnSwitch.show
		// content.show = true
		// content.text =
		// 	'您的选择是：B（索引可以提高数据的写入速度）。答案是不正确的。\n\n 详细解析：\n A.索引可以加快数据的检索速度。\n 正确。 索引通过快速定位数据， 减少查询扫描行数， 从而加快检索速度。\n\n B.索引可以提高数据的写入速度。\ n不正确。 索引的维护会增加额外开销， 特别是在插入、 更新、 删除时， 数据库需要同步更新索引信息， 降低了写入效率。\n\n C.索引的创建会增加数据库的存储空间消耗。\n 正确。 索引的创建需要额外存储空间， 用于存储索引结构和元数据。\n\n D.在进行表连接操作时， 索引不会提高查询效率。\n 不正确。 索引在表连接操作中非常重要， 能显著提高连接效率， 减少全表扫描。\n\n 结论： 您选择的 B 是正确答案， 因为它是题目中关于索引描述的错误项。 '

		btnSwitch.disabled = !btnSwitch.disabled;
		chat(mpRequest).then(res => {
			btnSwitch.show = !btnSwitch.show
			content.show = true
			content.text = res.content
		})

		uni.hideLoading()
	}

	function startInterview() {
		if (model.name == '请选择AI模型') {
			uni.showToast({
				image: '../../static/icon/angel.svg',
				title: '请选择AI模型',
				duration: 1000
			})
			return;
		} else if (categoryItem.text == '请选择试题分类') {
			uni.showToast({
				image: '../../static/icon/angel.svg',
				title: '请选择试题分类',
				duration: 1000
			})
			return;
		}

		let mpRequest = {
			sessionId: getSessionId(true),
			subject: categoryName,
			content: categoryItem.name,
			type: 'q',
			modelName: model.name
		}

		uni.showLoading({
			title: '面试官正在思考',
		})

		// btnSwitch.disabled = !btnSwitch.disabled;
		// btnSwitch.show = !btnSwitch.show
		// btnSwitch.text = '再 来 一 题'
		// content.show = true
		// content.text =
		// 	'在MySQL中，关于索引的描述，以下哪项是不正确的？\n\rA. 索引可以加快数据的检索速度。\n\rB. 索引可以提高数据的写入速度。\n\rC. 索引的创建会增加数据库的存储空间消耗。\n\rD. 在进行表连接操作时，索引不会提高查询效率。'

		chat(mpRequest).then(res => {
			btnSwitch.show = !btnSwitch.show
			btnSwitch.text = '再来一题'
			content.show = true
			content.text = res.content
		})
		uni.hideLoading()
	}

	function refresh() {
		btnSwitch.disabled = false
		btnSwitch.show = true
		btnSwitch.text = '开 始 面 试'
		content.show = false
		content.text = ''
	}

	function modelSelect(event) {
		refresh()
		Object.assign(model, models.value[event.detail.value])
	}

	function categoryItemSelect(event) {
		refresh()
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
		top: 20rpx;
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
			background-color: #3d3d3d; // 浅灰色背景，区分内容区域
			padding: 10px; // 增加内边距
			box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); // 增加柔和阴影
			transition: transform 0.3s ease, box-shadow 0.3s ease; // 添加过渡效果

			&:hover {
				transform: translateY(-3px); // 悬停时略微上移
				box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15); // 悬停时增加阴影
			}
		}
	}

	.body {
		position: fixed;
		top: 100rpx;
		bottom: 64rpx;
		left: 0;
		right: 0;
		background-color: #f5f5f5; // 页面背景色
		display: flex;
		justify-content: center;
		align-items: center;

		.scroll-container {
			width: 85%;
			height: 93%;
			background-color: #ffffff; // 滚动容器背景
			border-radius: 20rpx; // 圆角
			overflow: hidden;

			.content {

				.question-text {
					font-size: 23rpx; // 字体大小
					color: #333333; // 字体颜色
					line-height: 40rpx; // 行高
					white-space: pre-wrap; // 支持换行
					word-wrap: break-word; // 长文本换行
				}
			}
		}
	}


	.footer {
		position: fixed;
		bottom: 20rpx;
		width: 100%;
		height: 64rpx;
		background-color: #f5f5f5;
		opacity: 1;
		display: flex;
		align-items: center;
		justify-content: center;

		.start-btn {}

		.moveon-btn {}

		.answer-btn {}
	}
</style>