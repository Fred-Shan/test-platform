import { get } from "../../utils/request";
import url from "../../utils/url";
import { actions as appActions } from "./app";
import moment from "moment";

const initialState = {
    funcLatestList: [],
    funcLatestSingle: null,
    rankBy: "failed",
    rankOrder: 1,
    funcNameList: null,
    performNameList: [],
    funcHistoryList: [],
    funcHistoryFrom: "",
    funcHistoryTo: "",
    funcHistorySingle: null
};

// action types
export const types = {
    GET_FUNC_LATEST_LIST: "SUMMARY/GET_FUNC_LATEST_LIST",
    SET_FUNC_LATEST_LIST: "SUMMARY/SET_FUNC_LATEST_LIST",
    GET_FUNC_HISTORY_LIST: "SUMMARY/GET_FUNC_HISTORY_LIST",
    GET_FUNC_LATEST_SINGLE: "RESULTS/GET_FUNC_LATEST_SINGLE",
    SET_FUNC_LATEST_SINGLE: "RESULTS/SET_FUNC_LATEST_SINGLE",
    CHAGNE_RANKBY: "SUMMARY/CHANGE_RANKBY",
    CHAGNE_RANKORDER: "SUMMARY/CHAGNE_RANKORDER",
    GET_FUNC_NAME_LIST: "SUMMARY/GET_FUNC_NAME_LIST",
    CLEAR_SINGLE_FUNC_DATA: "SUMMARY/CLEAR_SINGLE_FUNC_DATA",
    SET_FUNC_HISTORY_RANGE: "SUMMARY/SET_FUNC_HISTORY_RANGE",
    GET_FUNC_HISTORY_SINGLE: "RESULTS/GET_FUNC_HISTORY_SINGLE"
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
                    dispatch(actions.setFuncHistoryRange(from, to));
                    if (!data.error) {
                        let sortedData = data.sort((a, b) =>
                            moment(a.timestamp).isAfter(moment(b.timestamp))
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
    queryFuncHistorySingle: (testName, timestamp) => {
        return dispatch => {
            dispatch(appActions.startRequest());
            return get(
                url.funcHistorySummarySingle() +
                    "?testName=" +
                    testName +
                    "&timestamp=" +
                    timestamp
            ).then(data => {
                dispatch(appActions.finishRequest());
                if (!data.error) {
                    dispatch({
                        type: types.GET_FUNC_HISTORY_SINGLE,
                        data: data
                    });
                } else {
                    dispatch(appActions.setError(data.error));
                    dispatch({
                        type: types.GET_FUNC_HISTORY_SINGLE,
                        data: null
                    });
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
    }),
    setFuncHistoryRange: (from, to) => ({
        type: types.SET_FUNC_HISTORY_RANGE,
        from: from,
        to: to
    }),
    setFuncLatestList: data => ({
        type: types.SET_FUNC_LATEST_LIST,
        data: data
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
        case types.SET_FUNC_LATEST_LIST:
            let newList = [...state.funcLatestList];
            let index = -1;
            for (let i = 0; i < newList.length; i++) {
                if (newList[i].testName === action.data.testName) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                newList[index] = action.data;
            } else {
                newList.push(action.data);
            }
            return {
                ...state,
                funcLatestList: newList,
                funcNameList: index
                    ? state.funcNameList
                    : newList.map(test => test.testName).sort()
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
        case types.GET_FUNC_HISTORY_SINGLE:
            return {
                ...state,
                funcHistorySingle: action.data
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
        case types.SET_FUNC_HISTORY_RANGE:
            return {
                ...state,
                funcHistoryFrom: action.from,
                funcHistoryTo: action.to
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
export const getFuncHistorySingle = state => state.summary.funcHistorySingle;
export const getFuncHistoryRange = state => ({
    from: state.summary.funcHistoryFrom,
    to: state.summary.funcHistoryTo
});
