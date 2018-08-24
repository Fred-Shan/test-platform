import { get } from "../../utils/request";
import url from "../../utils/url";
import { actions as appActions } from "./app";

const initialState = {
    isLatestFuncResults: true,
    funcLatestFailed: null,
    funcHistoryFailed: null,
    testCaseList: null
};

// action types
export const types = {
    GET_FUNC_LATEST_FAILED: "RESULTS/GET_FUNC_LATEST_FAILED",
    GET_FUNC_HISTORY_FAILED: "RESULTS/GET_FUNC_HISTORY_FAILED",
    SWITCH_LATEST_AND_HISTORY: "RESULTS/SWITCH_LATEST_AND_HISTORY",
    GET_TEST_CASE_LIST: "RESULTS/GET_TEST_CASE_LIST",
    CLEAR_SINGLE_FUNC_DATA: "RESULTS/CLEAR_SINGLE_FUNC_DATA"
};

// action creators
export const actions = {
    queryFuncLatestFailed: testName => {
        return dispatch => {
            dispatch(appActions.startRequest());
            return get(url.funcLatestFailed() + "?testName=" + testName).then(
                data => {
                    dispatch(appActions.finishRequest());
                    if (!data.error) {
                        if (!data.code) {
                            dispatch({
                                type: types.GET_FUNC_LATEST_FAILED,
                                data: data
                            });
                        } else {
                            dispatch({
                                type: types.GET_FUNC_LATEST_FAILED,
                                data: null
                            });
                        }
                    } else {
                        dispatch(appActions.setError(data.error));
                    }
                }
            );
        };
    },
    queryFuncHistoryFailed: (testName, timestamp) => {
        return dispatch => {
            dispatch(appActions.startRequest());
            return get(
                url.funcHistoryFailed() +
                    "?testName=" +
                    testName +
                    "&timestamp=" +
                    timestamp
            ).then(data => {
                dispatch(appActions.finishRequest());
                if (!data.error) {
                    if (!data.code) {
                        dispatch({
                            type: types.GET_FUNC_HISTORY_FAILED,
                            data: data
                        });
                    } else {
                        dispatch({
                            type: types.GET_FUNC_HISTORY_FAILED,
                            data: null
                        });
                    }
                } else {
                    dispatch(appActions.setError(data.error));
                    dispatch({
                        type: types.GET_FUNC_HISTORY_FAILED,
                        data: null
                    });
                }
            });
        };
    },
    queryTestCaseList: testName => {
        return dispatch => {
            dispatch(appActions.startRequest());
            return get(url.testCaseList() + "?testName=" + testName).then(
                data => {
                    dispatch(appActions.finishRequest());
                    if (!data.error) {
                        dispatch({
                            type: types.GET_TEST_CASE_LIST,
                            data: data
                        });
                    } else {
                        dispatch(appActions.setError(data.error));
                    }
                }
            );
        };
    },
    clearSingleFuncData: () => ({
        type: types.CLEAR_SINGLE_FUNC_DATA
    }),
    switchLatestAndHistory: bool => ({
        type: types.SWITCH_LATEST_AND_HISTORY,
        data: bool
    })
};

// reducers
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SWITCH_LATEST_AND_HISTORY:
            return {
                ...state,
                isLatestFuncResults: action.data
            };
        case types.GET_FUNC_LATEST_FAILED:
            return {
                ...state,
                funcLatestFailed: action.data,
                isLatestFuncResults: true
            };
        case types.GET_FUNC_HISTORY_FAILED:
            return {
                ...state,
                funcHistoryFailed: action.data,
                isLatestFuncResults: false
            };
        case types.GET_TEST_CASE_LIST:
            return {
                ...state,
                testCaseList: action.data
            };
        case types.CLEAR_SINGLE_FUNC_DATA:
            return {
                ...state,
                isLatestFuncResults: true,
                funcLatestFailed: null,
                testCaseList: null
            };
        default:
            return state;
    }
};

export default reducer;

// selectors
export const isLatestFuncResults = state => state.results.isLatestFuncResults;
export const getFuncLatestFailed = state => state.results.funcLatestFailed;
export const getFuncHistoryFailed = state => state.results.funcHistoryFailed;
export const getTestCaseList = state => state.results.testCaseList;
