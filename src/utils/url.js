// const host = "http://139.24.217.56:8081";
const host = "http://localhost:8081";

const url = {
    registration: () => host + "/api/registration",
    login: () => host + "/api/formlogin",
    loginstatus: () => host + "/api/loginstatus",
    logout: () => host + "/api/formlogout",
    functionalLatestTestSummaryList: () =>
        host + "/api/functionalLatestTestSummaryList"
};

export default url;
