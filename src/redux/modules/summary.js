import { get } from "../../utils/request";
import url from "../../utils/url";
import { actions as appActions } from "./app";

const initialState = {
    funcLatestList: [],
    rankBy: "failed",
    rankOrder: 1
};

// action types
export const types = {
    GET_FUNC_LATEST_LIST: "SUMMARY/GET_FUNC_LATEST_LIST",
    CHAGNE_RANKBY: "SUMMARY/CHANGE_RANKBY",
    CHAGNE_RANKORDER: "SUMMARY/CHAGNE_RANKORDER"
};

// action creators
export const actions = {
    getFuncLatestList: () => {
        return dispatch => {
            dispatch(appActions.startRequest());
            return get(url.functionalLatestTestSummaryList()).then(data => {
                dispatch(appActions.finishRequest());
                if (!data.error) {
                    dispatch({ type: types.GET_FUNC_LATEST_LIST, data: data });
                } else {
                    dispatch(appActions.setError(data.error));
                }
            });
        };
    },
    changeRankBy: name => ({
        type: types.CHAGNE_RANKBY,
        data: name
    }),
    changeRankOrder: order => ({
        type: types.CHAGNE_RANKORDER,
        data: order
    })
};

// reducers
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_FUNC_LATEST_LIST:
            return { ...state, funcLatestList: action.data };
        case types.CHAGNE_RANKBY:
            return { ...state, rankBy: action.data };
        case types.CHAGNE_RANKORDER:
            return { ...state, rankOrder: action.data };
        default:
            return state;
    }
};

export default reducer;

// selectors
export const getFuncLatestList = state => state.summary.funcLatestList;
export const getRankBy = state => state.summary.rankBy;
export const getRankOrder = state => state.summary.rankOrder;
