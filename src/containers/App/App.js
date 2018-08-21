import React, { Component } from "react";
import { Layout, Icon, Button } from "antd";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
    getLoggedUser,
    getLoggedStatus,
    actions as authActions
} from "../../redux/modules/auth";
import {
    getFuncNameList,
    getPerformNameList,
    actions as summaryActions
} from "../../redux/modules/summary";
import { isSiderCollapsed } from "../../redux/modules/ui";
import { actions as uiActions } from "../../redux/modules/ui";
import Sidebar from "../Sidebar/Sidebar";
import Home from "../Home/Home";
import FuncTest from "../FuncTest/FuncTest";
import PerformTest from "../PerformTest/PerformTest";
import CreateProject from "../CreateProject/CreateProject";
import Login from "../Login/Login";
import { bindActionCreators } from "redux";
import { post } from "../../utils/request";
import url from "../../utils/url";

const { Sider, Content, Header } = Layout;

class App extends Component {
    componentDidMount() {
        this.props.checkLogin();
        this.props.queryFuncNameList();
    }

    componentDidUpdate() {
        !this.props.funcNameList && this.props.queryFuncNameList();
    }

    handleLogout = () => {
        // this.props.logout();
        post(url.logout(), { username: this.props.username }).then(data =>
            console.log(data)
        );
        window.location.href = "/login";
    };

    render() {
        if (this.props.isLogin === null) {
            return <h1>Loading...</h1>;
        }
        if (this.props.isLogin === false) {
            return <Login />;
        }
        return (
            <Layout style={{ height: "100vh" }}>
                <Header>
                    <div
                        style={{
                            float: "right",
                            color: "white"
                        }}
                    >
                        <span>Welcome, {this.props.username}</span>
                        {/* <Icon type="logout" /> */}
                        <Button
                            type="primary"
                            style={{ marginLeft: "1em" }}
                            onClick={this.handleLogout}
                        >
                            Log out
                        </Button>
                    </div>
                    <div style={{ color: "white" }}>Header</div>
                </Header>
                <Layout style={{ height: "100%" }}>
                    <Sider
                        collapsible
                        collapsed={this.props.siderCollapsed}
                        onCollapse={this.props.toggleSider}
                        width={250}
                        style={{
                            overflow: "auto",
                            height: "calc(100vh - 64px)"
                        }}
                    >
                        <Sidebar
                            data={{
                                funcNameList: this.props.funcNameList,
                                performNameList: this.props.performNameList
                            }}
                        />
                    </Sider>
                    <Content>
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={() => <Redirect to="/home" />}
                            />
                            <Route exact path="/home" component={Home} />
                            <Route path="/func/:name" component={FuncTest} />
                            <Route path="/perform" component={PerformTest} />
                            <Route path="/create" component={CreateProject} />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        username: getLoggedUser(state),
        siderCollapsed: isSiderCollapsed(state),
        isLogin: getLoggedStatus(state),
        funcNameList: getFuncNameList(state),
        performNameList: getPerformNameList(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(authActions, dispatch),
        ...bindActionCreators(uiActions, dispatch),
        ...bindActionCreators(summaryActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(App));
