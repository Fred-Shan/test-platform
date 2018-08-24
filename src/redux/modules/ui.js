import { types as authTypes } from "./auth";

const initialState = {
    siderCollapsed: false,
    funcActiveTabKey: "1"
};

// action types
export const types = {
    TOGGLE_SIDER: "UI/TOGGLE_SIDER", // 开关侧边栏
    CHAGNE_FUNC_KEY: "UI/CHAGNE_FUNC_KEY"
};

// action creators
export const actions = {
    // 开关侧边栏
    toggleSider: collapsed => ({
        type: types.TOGGLE_SIDER,
        collapsed
    }),
    switchFuncTab: key => ({
        type: types.CHAGNE_FUNC_KEY,
        key
    })
};

// reducers
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.TOGGLE_SIDER:
            return { ...state, siderCollapsed: action.collapsed };
        case types.CHAGNE_FUNC_KEY:
            return { ...state, funcActiveTabKey: action.key };
        default:
            return state;
    }
};

export default reducer;

// selectors
export const isSiderCollapsed = state => state.ui.siderCollapsed;
export const getFuncTabKey = state => state.ui.funcActiveTabKey;
