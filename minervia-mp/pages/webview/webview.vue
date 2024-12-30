<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script setup>
	import {
		Ref
	} from 'vue';

	let url = uni.getStorageSync('wvUrl')
</script>

<style>

</style>