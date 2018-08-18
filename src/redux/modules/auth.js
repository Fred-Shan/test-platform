import { post, get } from "../../utils/request";
import url from "../../utils/url";
import { actions as appActions } from "./app";

const initialState = {
    isLogin: null,
    username: null,
    loginFailed: false
};

// action types
export const types = {
    LOGIN: "AUTH/LOGIN", //登录
    LOGOUT: "AUTH/LOGOUT" //注销
};

// action creators
export const actions = {
    // 异步action，执行登录验证
    login: (username, password) => {
        return dispatch => {
            // 每个API请求开始前，发送app模块定义的startRequest action
            dispatch(appActions.startRequest());
            const params = { username, password };
            return post(url.login(), params).then(data => {
                // 每个API请求结束后，发送app模块定义的finishRequest action
                dispatch(appActions.finishRequest());
                // 请求返回成功，保存登录用户的信息，否则，设置全局错误信息
                if (!data.error) {
                    let name = data.code === "0" ? username : null;
                    let loginFailed = data.code === "3001" ? true : false;
                    dispatch(actions.setLoginInfo(name, loginFailed));
                } else {
                    dispatch(appActions.setError(data.error));
                }
            });
        };
    },
    logout: () => ({
        type: types.LOGOUT
    }),
    checkLogin: () => {
        return dispatch => {
            dispatch(appActions.startRequest());
            return get(url.loginstatus()).then(data => {
                dispatch(appActions.finishRequest());
                if (!data.error) {
                    let username = data.code === "0" ? data.data : null;
                    dispatch(actions.setLoginInfo(username));
                } else {
                    dispatch(appActions.setError(data.error));
                }
            });
        };
    },
    setLoginInfo: (username, loginFailed) => ({
        type: types.LOGIN,
        username: username,
        loginFailed
    })
};

// reducers
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN:
            return {
                ...state,
                username: action.username,
                isLogin: action.username ? true : false,
                loginFailed: action.loginFailed
            };
        case types.LOGOUT:
            return { ...state, username: null, isLogin: false };
        default:
            return state;
    }
};

export default reducer;

// selectors
export const getLoggedUser = state => state.auth.username;
export const getLoggedStatus = state => state.auth.isLogin;
export const isLoginFailed = state => state.auth.loginFailed;
