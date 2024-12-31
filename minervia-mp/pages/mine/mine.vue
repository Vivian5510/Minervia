<template>
	<view class="page">
		<view class="top">
			<view class="background tn-gradient-bg__purplered-single"></view>
		</view>
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
							<div class="tn-mb tn-text-transparent transparent tn-gradient-bg__purple-single">
								Welcome to</div>
						</view>
						<view class="user-text">
							<div
								class="tn-mb tn-text-transparent transparent tn-text-bold tn-gradient-bg__purple-single">
								Minervia!
							</div>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="list-card">
			<view class="card">
				<view class="item item-bottom-solid" hover-class="click-view">
					<view class="left flex-center">
						<image src="@/static/icon/iconly-icon-export-1735205510.png" mode="aspectFit"></image>
					</view>
					<view class="center tn-text-transparent tn-gradient-bg__bluepurple-single tn-text-bold">
						<text> 面试记录</text>
					</view>
					<view class="right flex-center">
						<u-icon class="icon" name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
			<view class="card">
				<view class="item item-bottom-solid" hover-class="click-view">
					<view class="left flex-center">
						<image src="@/static/icon/iconly-icon-export-1735205493.png" mode="aspectFit"></image>
					</view>
					<view class="center tn-text-transparent tn-gradient-bg__bluepurple-single tn-text-bold">
						<text> 关于</text>
					</view>
					<view class="right flex-center">
						<u-icon class="icon" name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="quit flex-center">
			<view class="btn flex-center tn-gradient-bg__purplered">
				退出登录
			</view>
		</view>
	</view>
</template>
<style lang="scss" scoped>
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

		height: 170rpx;
		padding: 0px 15px;

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
		padding: 0 15px;

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
					width: 65%;
					display: flex;
					justify-content: start;
					align-items: center;
					font-size: 1.1em;
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
		margin-top: 100px;

		.btn {
			background-color: #4f99ff;
			border-radius: 30px;
			width: 80%;
			color: white;
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

<script>
	//import {  } from "@/common/api/{$}.js";
	export default {
		data() {
			return {};
		},
		//监听页面初始化，其参数同 onLoad 参数，为上个页面传递的数据，参数类型为 Object（用于页面传参），触发时机早于 onLoad
		onInit() {},
		//监听页面加载，其参数为上个页面传递的数据，参数类型为 Object（用于页面传参）
		onLoad() {},
		//监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发
		onReady() {},
		//监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
		beforeDestroy() {},
		//页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据。
		onReachBottom() {},
		onShareAppMessage(res) {},
		created() {},
		methods: {},
	};
</script>