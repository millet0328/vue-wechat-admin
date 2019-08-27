import { User } from '@/api/index';
const Login = ({ commit, state }, formData) => {
	return new Promise((resolve, reject) => {
		User.login(formData)
			.then((res) => {
				if (!res.status) {
					reject(res);
					return;
				}
				// 储存到state
				commit('setUserInfo', res.data);
				resolve(res);
			})
	});
};
const Register = ({ commit, state }, formData) => {
	return new Promise((resolve, reject) => {
		User.register(formData)
			.then((res) => {
				if (!res.status) {
					reject(res);
					return;
				}
				// 储存到state
				commit('setUserInfo', res.data);
				resolve(res);
			})
	});
};
const LoadInfo = ({ commit, state }, formData) => {
	return new Promise((resolve, reject) => {
		User.loadInfo(formData)
			.then((res) => {
				if (!res.status) {
					reject(res);
					return;
				}
				// 储存到state
				commit('setUserInfo', res.data);
				resolve(res);
			})
	});
};
const Update = ({ commit, state }, formData) => {
	return new Promise((resolve, reject) => {
		User.update(formData)
			.then((res) => {
				if (!res.status) {
					reject(res);
					return;
				}
				// 储存到state
				commit('setUserInfo', formData);
				resolve(res);
			})
	});
};
export default {
	Login,
	Register,
	LoadInfo,
	Update,
}
