<template>
	<view class="page custom-font">
		<view class="top">
			<view class="background tn-gradient-bg__cool-13"></view>
		</view>
		<view class="outer-container">
			<view class="user-card">
				<view class="card">
					<view class="top">
						<view class="userImage">
							<image
								src="http://sogoqjp87.hn-bkt.clouddn.com/2024/12/14/4571330bce0d4e72a879d4fa7c9775a0.jpg">
							</image>
						</view>
					</view>
					<view class="bottom">
						<view class="left">
							<view class="user-phone">
								<div
									class="tn-mb tn-text-transparent transparent tn-text-bold tn-text-4xl tn-gradient-bg__cool-14">
									Welcome to</div>
							</view>
							<view class="user-text">
								<div
									class="tn-mb tn-text-transparent transparent tn-text-bold tn-text-4xl tn-gradient-bg__cool-14">
									Minervia!
								</div>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="list-card">
				<view class="card">
					<view class="item item-bottom-solid" hover-class="click-view" @click="itemClick('records')">
						<view class="left flex-center">
							<image src="@/static/icon/Calendar.svg" mode="aspectFit"></image>
						</view>
						<view
							class="center tn-text-transparent tn-gradient-bg__bluepurple-single tn-text-bold tn-text-2xl">
							Interview History
						</view>
					</view>
				</view>
				<view class="card">
					<view class="item item-bottom-solid" hover-class="click-view" @click="itemClick('about')">
						<view class="left flex-center">
							<image src="@/static/icon/Rocket.svg" mode="aspectFit"></image>
						</view>
						<view
							class="center tn-text-transparent tn-gradient-bg__bluepurple-single tn-text-bold tn-text-4xl">
							About
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="quit flex-center">
			<view class="btn flex-center tn-gradient-bg__purplered">
				<div class="tn-mb tn-text-transparent transparent tn-text-bold tn-text-4xl tn-gradient-bg__blue-light"
					style="margin-top: 15rpx">
					Q u i t
				</div>
			</view>
		</view>
	</view>

	<TnPopup v-model="showPopup" open-direction="bottom" height="400rpx" radius="15px">
		<view class="tn-p-lg tn-gradient-bg__grey">
			<div class="tn-mb tn-text-transparent transparent tn-text-bold tn-text-3xl tn-gradient-bg__cool-8">Halo,
				This's Minervia!</div>
			<div class="tn-mb tn-text-transparent transparent tn-text-bold tn-text-2xl tn-gradient-bg__cool-8">
				Developer:
				Rosy</div>
			<div class="tn-mb tn-text-transparent transparent tn-text-bold tn-text-2xl tn-gradient-bg__cool-8">
				Contact: github.com/Vivian5510</div>
			<div class="tn-mb tn-text-transparent transparent tn-text-bold tn-text-2xl tn-gradient-bg__cool-8">Version:
				0.0.1</div>
		</view>
	</TnPopup>
</template>

<style lang="scss" scoped>
	@font-face {
		font-family: 'GoMonoNerdFont';
		/* 字体名称 */
		src: url('http://spm6tumtq.hn-bkt.clouddn.com/regular/font/GoMonoNerdFont-BoldItalic.ttf?e=1736137294&token=8Xps1jRWyIv6dKbl4Nztc_xsRpgulRtlVnmaJYIe:WWd8USNcqUOqjNh8VcGwBN0_Rbs=') format('truetype');
		font-weight: bold;
		font-style: italic;
	}

	.custom-font {
		font-family: 'GoMonoNerdFont', sans-serif;
	}

	.outer-container {
		height: 700rpx;
		border: 2px solid #d4d6da;
		border-radius: 15px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
		padding: 0px 30px;
		background-color: #ffffff;
	}

	.top {
		height: 250rpx;
		position: relative;

		.background {
			border-bottom-left-radius: 22px;
			border-bottom-right-radius: 22px;
			position: absolute;
			height: 360rpx;
			width: 100%;
		}
	}

	.click-view {
		background-color: #dbe2f3;
		color: #d4d6da;
	}

	.icon {
		color: #96a1ae;
		font-size: 20rpx;
	}

	.user-card {
		height: 250rpx;

		.card {
			position: relative;
			bottom: 62px;
			height: 250rpx;
			background-color: white;
			border-radius: 5px;

			.top {
				height: 50%;
				position: relative;

				.userImage {
					position: absolute;
					bottom: 24%;
					left: 10%;
					width: 150rpx;
					height: 150rpx;
					overflow: hidden;
					border-radius: 50%;
					border: 2px solid white;
				}
			}

			.bottom {
				display: flex;
				height: 70%;

				.left {
					width: 80%;
					height: 100%;
					position: relative;

					.user-text {
						width: 100%;
						font-size: 1.6em;
						height: 50%;
						padding-left: 80rpx;
					}

					.user-phone {
						color: #96a1ae;
						padding-left: 80rpx;
						width: 100%;
						font-size: 1.2em;
					}
				}

				.right {
					width: 20%;
					height: 50%;
				}
			}
		}
	}

	.list-card {

		.card {
			border-radius: 5px;
			position: relative;
			background-color: white;
			border-radius: 5px;
			padding: 0px 30px;

			.item {
				display: flex;
				height: 120rpx;

				.left {
					width: 15%;

					image {
						width: 70rpx;
						height: 70rpx;
					}
				}

				.center {
					width: 80%;
					display: flex;
					justify-content: start;
					align-items: center;
				}

				.right {
					width: 20%;
					justify-content: flex-end;
				}
			}
		}
	}

	.item-bottom-solid {
		border-bottom: 1px solid #d4d6da;
	}

	.quit {
		height: 100rpx;
		margin-top: 50px;

		.btn {
			border-radius: 30px;
			width: 80%;
			font-size: 1.2em;
			height: 100%;
		}
	}

	.flex-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>

<script setup>
	import TnPopup from '@/uni_modules/tuniaoui-vue3/components/popup/src/popup.vue'
	import {
		ref
	} from 'vue'

	let showPopup = ref(false)

	function itemClick(item) {
		if (item == 'records') {

		} else {
			showPopup.value = true
		}
	}
</script>