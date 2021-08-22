import { User } from '@/api/index';

const LoadInfo = async ({ commit, state }, formData) => {
    let { status, data } = await User.info(formData);
    if (status) {
        // 储存到state
        commit('SetProfile', data);
    }
    return { status, data };
};

const Update = async ({ commit, state }, formData) => {
    let { status, msg } = await User.update(formData);
    if (status) {
        // 储存到state
        commit('SetProfile', formData);
    }
    return { status, msg };
};
export default {
    LoadInfo,
    Update,
}
