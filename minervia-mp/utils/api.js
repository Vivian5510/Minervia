const BASE_URL = 'http://localhost:8080/mp'

export const request = (options) => {
	return new Promise((resolve, rejects) => {
		// 获取登录过期时间
		let login_expire_time = uni.getStorageSync('login_expire_time');

		if (!login_expire_time || login_expire_time < new Date().getTime()) {
			// 令牌已过期，执行登录操作
			uni.login({
				provider: "weixin",
				success: (loginRes) => {
					uni.request({
						url: BASE_URL + '/login',
						data: {
							js_code: loginRes.code
						},
						method: 'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						success: (res) => {
							uni.setStorageSync('mp-token', res.data.data);
							uni.setStorageSync('login_expire_time', new Date()
								.getTime() + 3600 * 1000, // 设置过期时间为1小时
							);
							handleRequest(options, resolve, rejects);
						}
					});
				}
			});
		} else {
			handleRequest(options, resolve, rejects);
		}
	});
};


export const handleRequest = (options, resolve, rejects) => {
	uni.request({
		url: BASE_URL + options.url,
		data: options.data,
		method: options.method,
		header: {
			'content-type': 'application/json',
			'mp-token': uni.getStorageSync('mp-token')
		},
		success: (res) => {
			return resolve(res.data);
		},
		fail: (err) => {
			return rejects(err);
		},
		complete: () => {
			uni.hideLoading();
		}
	});
}

export const getAllBanners = () => {
	return request({
		url: '/banners',
		method: 'GET'
	})
}

export const getAllCategories = () => {
	return request({
		url: '/categories',
		method: 'GET'
	})
}

export const getAllModels = () => {
	return request({
		url: '/models',
		method: 'GET'
	})
}

export const getAllCategoryItems = (categoryName) => {
	return request({
		url: '/categoryItems/' + categoryName,
		method: 'GET'
	})
}

export const chat = (data) => {
	return request({
		url: '/chat',
		method: 'POST',
		data: data
	})
}