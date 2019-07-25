import { Menu } from '@/api/index';
const LoadTree = ({ commit, state }, formData) => {
    return new Promise((resolve, reject) => {
        Menu.loadTree(formData)
            .then((res) => {
                if (!res.status) {
                    reject(res);
                    return;
                }
                // 储存到state
                commit('StoreTree', res.data);
                resolve(res);
            })
    });
};
export default {
    LoadTree
}