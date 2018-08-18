import { combineReducers } from "redux";
import app from "./app";
import auth from "./auth";
import ui from "./ui";
import summary from "./summary";

// 合并所有模块的reducer成一个根reducer
const rootReducer = combineReducers({
    app,
    auth,
    ui,
    summary
});

export default rootReducer;

// complex selectors
