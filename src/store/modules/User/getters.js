const role = (state) => state.userInfo.role;
const nickname = (state) => state.userInfo.nickname;
const avatar = (state) => state.userInfo.avatar;
const userInfo = (state) => {
	let { userInfo } = state;
	delete userInfo.role_name;
	userInfo.uid = userInfo.id;
	return userInfo
}
export default {
	role,
	nickname,
	avatar,
	userInfo
}
