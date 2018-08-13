import React, { Component } from "react";
import { Layout } from "antd";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./components/Home/Home";
import AutoTest from "./components/AutoTest/AutoTest";
import PerformTest from "./components/PerformTest/PerformTest";
import CreateProject from "./components/CreateProject/CreateProject";

const { Sider, Content } = Layout;

class App extends Component {
    state = {
        siderCollapsed: false,
        login: false
    };

    componentDidMount() {
        fetch("http://139.24.217.56:8081/api/loginstatus", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.msg && res.msg === "success") {
                    this.setState({ login: true });
                } else {
                    this.props.history.push("/login");
                }
            });
    }

    onSiderCollapse = siderCollapsed => {
        this.setState({ siderCollapsed });
    };
    render() {
        if (!this.state.login) {
            return <h1>Loading...</h1>;
        }
        return (
            <Layout style={{ minHeight: "100vh" }}>
                <Sider
                    collapsible
                    collapsed={this.state.siderCollapsed}
                    onCollapse={this.onSiderCollapse}
                >
                    <Sidebar />
                </Sider>
                <Content>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => <Redirect to="/home" />}
                        />
                        <Route exact path="/home" component={Home} />
                        <Route path="/auto" component={AutoTest} />
                        <Route path="/perform" component={PerformTest} />
                        <Route path="/create" component={CreateProject} />
                    </Switch>
                </Content>
            </Layout>
        );
    }
}

export default withRouter(App);
