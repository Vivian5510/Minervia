export const getSessionId = (start) => {
	let sessionId;
	if (start == true) {
		sessionId = generateSessionId();
		uni.setStorage({
			key: 'sessionId',
			data: sessionId
		})
	} else {
		uni.getStorageSync({
			key: 'sessionId',
			success: (res) => {
				sessionId = res.data
			},
			fail: (err) => {

			}
		});
	}

	return sessionId;
}

const generateSessionId = () => {
	return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
		(c ^ Math.random() * 16 >> c / 4).toString(16)
	);
};