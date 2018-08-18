import { types as authTypes } from "./auth";

const initialState = {
    siderCollapsed: false
};

// action types
export const types = {
    TOGGLE_SIDER: "UI/TOGGLE_SIDER" // 开关侧边栏
};

// action creators
export const actions = {
    // 开关侧边栏
    toggleSider: collapsed => ({
        type: types.TOGGLE_SIDER,
        collapsed
    })
};

// reducers
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.TOGGLE_SIDER:
            return { ...state, siderCollapsed: action.collapsed };
        default:
            return state;
    }
};

export default reducer;

// selectors
export const isSiderCollapsed = state => state.ui.siderCollapsed;
