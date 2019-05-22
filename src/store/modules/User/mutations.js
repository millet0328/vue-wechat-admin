const SaveUserInfo = (state, user) => {
	state.uid = user.id;
	state.token = user.token;
	state.role = user.role;
}
export default {
	SaveUserInfo,
}