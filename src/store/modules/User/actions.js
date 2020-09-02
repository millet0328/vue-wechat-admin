import { User } from '@/api/index';
const Login = async ({ commit, state }, formData) => {
	let res = await User.login(formData);
	let { status, data } = res;
	if (status) {
		// 储存到state
		commit('setUserInfo', data);
	}
	return res;
};
const Register = async ({ commit, state }, formData) => {
	let res = await User.register(formData);
	let { status, data } = res;
	if (status) {
		// 储存到state
		commit('setUserInfo', data);
	}
	return res;
};
const LoadInfo = async ({ commit, state }, formData) => {
	let { status, data } = await User.info(formData);
	if (status) {
		// 储存到state
		commit('setUserInfo', data);
	}
	return data;
};
const Update = async ({ commit, state }, formData) => {
	let res = await User.update(formData);
	let { status, data } = res;
	if (status) {
		// 储存到state
		commit('setUserInfo', data);
	}
	return res;
};
export default {
	Login,
	Register,
	LoadInfo,
	Update,
}
