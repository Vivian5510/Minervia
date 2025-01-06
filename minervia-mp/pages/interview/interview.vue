<template>

	<TnPicker v-model="modelsPickerValue" v-model:open="openModelsPicker" :data="modelsPickerData" />
	<TnPicker v-model="categoryItemsPickerValue" v-model:open="openCategoryItemsPicker"
		:data="categoryItemsPickerData" />


	<view>

	</view>

	<view>

	</view>
</template>

<script setup>
	import TnPicker from '@/uni_modules/tuniaoui-vue3/components/picker/src/picker.vue'
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

	let openModelsPicker = ref(false)
	let modelsPickerValue = ref('数值2')
	let modelsPickerData = ['数值1', '数值2', '数值3', '数值4', '数值5']

	let openCategoryItemsPicker = ref(false)
	let categoryItemsPickerValue = ref('数值2')
	let categoryItemsPickerData = ['数值1', '数值2', '数值3', '数值4', '数值5']
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

<style>

</style>