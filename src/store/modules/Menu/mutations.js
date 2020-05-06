const ToggleMenu = (state, user) => {
	state.isCollapse = !state.isCollapse;
};
const StoreTree = (state, data) => {
	state.tree = data;
};
export default {
	ToggleMenu,
	StoreTree,
}
