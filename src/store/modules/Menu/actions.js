import { Menu } from '@/api/index';
//根据角色加载侧边栏菜单
const LoadMenu = async ({ commit, state }, formData) => {
    let { status, data } = await Menu.loadTree(formData);
    if (status) {
        // 储存到state
        commit('StoreMenu', data);
    }
    return { status, data };
};
//设置菜单图标
const SetIcon = async ({ commit, state }, menuData) => {
    let { status, msg } = await Menu.setIcon(menuData.id, menuData);
    if (status) {
        // 储存到state
        commit('UpdateIcon', menuData);
    }
    return { status, msg };
};
//编辑菜单
const EditMenu = async ({ commit, state }, menuData) => {
    let { status, msg } = await Menu.update(menuData.id, menuData);
    if (status) {
        // 储存到state
        commit('UpdateMenu', menuData);
    }
    return { status, msg };
};
//添加菜单
const CreateMenu = async ({ commit, state }, menuData) => {
    let { status, msg, data } = await Menu.add(menuData);
    if (status) {
        // 储存到state
        commit('AppendMenu', { ...data, ...menuData });
    }
    return { status, msg, data };
};
//删除菜单
const RemoveMenu = async ({ commit, state }, id) => {
    let { status, msg } = await Menu.remove(id);
    if (status) {
        // 储存到state
        commit('DeleteMenu', id);
    }
    return { status, msg };
};

export default {
    LoadMenu,
    SetIcon,
    EditMenu,
    CreateMenu,
    RemoveMenu,
}
