const host = "http://139.24.217.56:8081";
// const host = "http://localhost:8081";

const url = {
    registration: () => host + "/api/registration",
    login: () => host + "/api/formlogin",
    loginstatus: () => host + "/api/loginstatus",
    logout: () => host + "/api/formlogout",
    functionalLatestTestSummaryList: () =>
        host + "/api/functionalLatestTestSummaryList",
    funcNameList: () => host + "/api/functionalTestNameList",
    funcLatestSummarySingle: () => host + "/api/functionalLatestTestSummary",
    funcLatestFailed: () => host + "/api/functionalLatestFailedTestResults",
    testCaseList: () => host + "/api/testCaseList",
    functionalHistoryTestSummaryList: () =>
        host + "/api/functionalHistoryTestSummaryList",
    funcHistorySummarySingle: () => host + "/api/functionalHistoryTestSummary",
    funcHistoryFailed: () => host + "/api/functionalHistoryFailedTestResults"
};

export default url;
