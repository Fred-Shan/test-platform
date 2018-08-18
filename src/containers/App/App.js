import React, { Component } from "react";
import { Layout, Icon } from "antd";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getLoggedUser, getLoggedStatus } from "../../redux/modules/auth";
import { isSiderCollapsed } from "../../redux/modules/ui";
import { actions as authActions } from "../../redux/modules/auth";
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
    }

    handleLogout = () => {
        this.props.logout();
        post(url.logout(), { username: this.props.username }).then(data =>
            console.log(data)
        );
    };

    render() {
        if (this.props.isLogin === null) {
            return <h1>Loading...</h1>;
        }
        if (this.props.isLogin === false) {
            return <Login />;
        }
        return (
            <Layout style={{ minHeight: "100vh" }}>
                <Header>
                    <div
                        style={{
                            float: "right",
                            color: "white"
                        }}
                        onClick={this.handleLogout}
                    >
                        <span>Welcome, {this.props.username}</span>
                        {/* <Icon type="logout" /> */}
                        <span style={{ marginLeft: "1em", cursor: "pointer" }}>
                            Log out
                        </span>
                    </div>
                    <div style={{ color: "white" }}>Header</div>
                </Header>
                <Layout>
                    <Sider
                        collapsible
                        collapsed={this.props.siderCollapsed}
                        onCollapse={this.props.toggleSider}
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
                            <Route path="/func" component={FuncTest} />
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
        isLogin: getLoggedStatus(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(authActions, dispatch),
        ...bindActionCreators(uiActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(App));
