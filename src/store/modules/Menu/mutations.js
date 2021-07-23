//菜单折叠
const ToggleMenu = (state) => {
    state.isCollapse = !state.isCollapse;
};
//储存菜单数据
const StoreMenu = (state, menus) => {
    state.menus = menus;
};
//修改菜单图标
const UpdateIcon = (state, payload) => {
    let menu = state.menus.find((item) => item.id === payload.id);
    menu.icon = payload.icon;
    menu.icon_id = payload.icon_id;
};
//编辑菜单
const UpdateMenu = (state, payload) => {
    let menu = state.menus.find((item) => item.id === payload.id);
    //Object.assign 方法只会拷贝源对象自身的并且可枚举的属性到目标对象。该方法使用源对象的[[Get]]和目标对象的[[Set]]，所以它会调用相关 getter 和 setter。
    Object.assign(menu, payload);
};
//添加菜单
const AppendMenu = (state, payload) => {
    state.menus.push(payload);
}
//删除菜单
const DeleteMenu = (state, payload) => {
    let index = state.menus.findIndex((item) => item.id === payload);
    state.menus.splice(index, 1);
}

export default {
    ToggleMenu,
    StoreMenu,
    UpdateIcon,
    UpdateMenu,
    AppendMenu,
    DeleteMenu,
}
