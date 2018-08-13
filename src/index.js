import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";
import App from "./App";
import Login from "./components/Login/Login";
import Logon from "./components/Logon/Logon";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/logon" component={Logon} />
                <Route path="/" component={App} />
            </Switch>
        </div>
    </BrowserRouter>,
    document.getElementById("root")
);
registerServiceWorker();
