import { get } from "../../utils/request";
import url from "../../utils/url";
import { actions as appActions } from "./app";

const initialState = {
    funcLatestList: [],
    funcLatestSingle: null,
    rankBy: "failed",
    rankOrder: 1,
    funcNameList: null,
    performNameList: [],
    funcHistoryList: []
};

// action types
export const types = {
    GET_FUNC_LATEST_LIST: "SUMMARY/GET_FUNC_LATEST_LIST",
    GET_FUNC_HISTORY_LIST: "SUMMARY/GET_FUNC_HISTORY_LIST",
    GET_FUNC_LATEST_SINGLE: "RESULTS/GET_FUNC_LATEST_SINGLE",
    SET_FUNC_LATEST_SINGLE: "RESULTS/SET_FUNC_LATEST_SINGLE",
    CHAGNE_RANKBY: "SUMMARY/CHANGE_RANKBY",
    CHAGNE_RANKORDER: "SUMMARY/CHAGNE_RANKORDER",
    GET_FUNC_NAME_LIST: "SUMMARY/GET_FUNC_NAME_LIST",
    CLEAR_SINGLE_FUNC_DATA: "SUMMARY/CLEAR_SINGLE_FUNC_DATA"
};

// action creators
export const actions = {
    queryFuncLatestList: () => {
        return dispatch => {
            dispatch(appActions.startRequest());
            return get(url.functionalLatestTestSummaryList()).then(data => {
                dispatch(appActions.finishRequest());
                if (!data.error) {
                    if (!data.code) {
                        dispatch({
                            type: types.GET_FUNC_LATEST_LIST,
                            data: data
                        });
                    } else {
                        dispatch({
                            type: types.GET_FUNC_LATEST_LIST,
                            data: []
                        });
                    }
                } else {
                    dispatch(appActions.setError(data.error));
                }
            });
        };
    },
    queryFuncHistoryList: (testName, from, to, limit) => {
        return dispatch => {
            dispatch(appActions.startRequest());
            let query = `?testName=${testName}&from=${from}&to=${to}&limit=${limit}`;
            return get(url.functionalHistoryTestSummaryList() + query).then(
                data => {
                    dispatch(appActions.finishRequest());
                    if (!data.error) {
                        let mappedData = data.map(ele => {
                            ele.timestamp = new Date(ele.timestamp);
                            return ele;
                        });
                        let sortedData = mappedData.sort(
                            (a, b) => a.timestamp - b.timestamp
                        );
                        dispatch({
                            type: types.GET_FUNC_HISTORY_LIST,
                            data: sortedData
                        });
                    } else {
                        dispatch(appActions.setError(data.error));
                    }
                }
            );
        };
    },
    queryFuncLatestSingle: testName => {
        return dispatch => {
            dispatch(appActions.startRequest());
            return get(
                url.funcLatestSummarySingle() + "?testName=" + testName
            ).then(data => {
                dispatch(appActions.finishRequest());
                if (!data.error) {
                    dispatch({
                        type: types.GET_FUNC_LATEST_SINGLE,
                        data: data
                    });
                } else {
                    dispatch(appActions.setError(data.error));
                }
            });
        };
    },
    setFuncLatestSingle: data => ({
        type: types.SET_FUNC_LATEST_SINGLE,
        data: data
    }),
    queryFuncNameList: () => {
        return dispatch => {
            dispatch(appActions.startRequest());
            return get(url.funcNameList()).then(data => {
                dispatch(appActions.finishRequest());
                if (!data.error) {
                    if (!data.code) {
                        dispatch({
                            type: types.GET_FUNC_NAME_LIST,
                            data: data
                        });
                    } else {
                        dispatch({
                            type: types.GET_FUNC_NAME_LIST,
                            data: null
                        });
                    }
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
    }),
    clearSingleFuncSummaryData: () => ({
        type: types.CLEAR_SINGLE_FUNC_DATA
    })
};

// reducers
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_FUNC_LATEST_LIST:
            return {
                ...state,
                funcLatestList: action.data,
                funcNameList: action.data.map(test => test.testName).sort()
            };
        case types.GET_FUNC_HISTORY_LIST:
            return {
                ...state,
                funcHistoryList: action.data
            };
        case types.GET_FUNC_LATEST_SINGLE:
            return {
                ...state,
                funcLatestSingle: action.data
            };
        case types.SET_FUNC_LATEST_SINGLE:
            return {
                ...state,
                funcLatestSingle: action.data
            };
        case types.CHAGNE_RANKBY:
            return { ...state, rankBy: action.data };
        case types.CHAGNE_RANKORDER:
            return { ...state, rankOrder: action.data };
        case types.GET_FUNC_NAME_LIST:
            return {
                ...state,
                funcNameList:
                    action.data && action.data.map(ele => ele.testName).sort()
            };
        case types.CLEAR_SINGLE_FUNC_DATA:
            return {
                ...state,
                funcLatestSingle: null
            };
        default:
            return state;
    }
};

export default reducer;

// selectors
export const queryFuncLatestList = state => state.summary.funcLatestList;
export const queryFuncHistoryList = state => state.summary.funcHistoryList;
export const getRankBy = state => state.summary.rankBy;
export const getRankOrder = state => state.summary.rankOrder;
export const getFuncNameList = state => state.summary.funcNameList;
export const getPerformNameList = state => state.summary.performNameList;
export const getFuncLatestSingle = state => state.summary.funcLatestSingle;
