import { User } from '@/api/index';
const Login = async ({ commit, state }, formData) => {
	let { status, data } = await User.login(formData);
	if (status) {
		// 储存到state
		commit('setUserInfo', data);
	}
	return data;
};
const Register = async ({ commit, state }, formData) => {
	let { status, data } = await User.register(formData);
	if (status) {
		// 储存到state
		commit('setUserInfo', data);
	}
	return data;
};
const LoadInfo = async ({ commit, state }, formData) => {
	let { status, data } = await User.loadInfo(formData);
	if (status) {
		// 储存到state
		commit('setUserInfo', data);
	}
	return data;
};
const Update = async ({ commit, state }, formData) => {
	let { status, data } = await User.update(formData);
	if (status) {
		// 储存到state
		commit('setUserInfo', data);
	}
	return data;
};
export default {
	Login,
	Register,
	LoadInfo,
	Update,
}
