export const login = () => {
	uni.login({
		provider: "weixin",
		success: (loginRes) => {
			console.log('openid		>>>>' + loginRes.code)
			uni.request({
				url: 'http://localhost:8080/mp/login',
				data: {
					js_code: loginRes.code
				},
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					console.log('mp-token >>>>' + res.data.data)
					uni.setStorage({
						key: 'mp-token',
						data: res.data.data,
						success: () => {
							console.log('success')
						}
					})
				}
			})
		}
	})
}