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
				commit('SaveUserInfo', res.data);
				resolve(res);
			})
	});
}
const Register = ({ commit, state }, formData) => {
	return new Promise((resolve, reject) => {
		User.register(formData)
			.then((res) => {
				if (!res.status) {
					reject(res);
					return;
				}
				// 储存到state
				commit('SaveUserInfo', res.data);
				resolve(res);
			})
	});
}
export default {
	Login,
	Register
}
