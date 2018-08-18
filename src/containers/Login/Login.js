import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
    actions as authActions,
    isLoginFailed
} from "../../redux/modules/auth";
import { getLoggedStatus } from "../../redux/modules/auth";
import { bindActionCreators } from "redux";
import "./Login.css";

const FormItem = Form.Item;

class Login extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                this.props.login(values.userName, values.password);
            }
        });
    };

    componentDidUpdate() {
        if (this.props.isLogin) {
            this.props.history.push("/home");
        }
    }

    gotoLogon = e => {
        e.preventDefault();
        this.props.history.push("/logon");
        console.log("click");
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                {this.props.loginFailed ? (
                    <div style={{ color: "red" }}>
                        Invalid username or password!
                    </div>
                ) : null}
                <FormItem>
                    {getFieldDecorator("userName", {
                        rules: [
                            {
                                required: true,
                                message: "Please input your username!"
                            }
                        ]
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="user"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                />
                            }
                            placeholder="Username"
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator("password", {
                        rules: [
                            {
                                required: true,
                                message: "Please input your Password!"
                            }
                        ]
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="lock"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                />
                            }
                            type="password"
                            placeholder="Password"
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator("remember", {
                        valuePropName: "checked",
                        initialValue: true
                    })(<Checkbox>Remember me</Checkbox>)}
                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        Log in
                    </Button>
                    Or{" "}
                    <a href="/logon" onClick={this.gotoLogon}>
                        register now!
                    </a>
                </FormItem>
            </Form>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        isLogin: getLoggedStatus(state),
        loginFailed: isLoginFailed(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(authActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Form.create()(Login)));
