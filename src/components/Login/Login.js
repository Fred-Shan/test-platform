import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { withRouter } from "react-router-dom";
import "./Login.css";

const FormItem = Form.Item;

class Login extends React.Component {
    state = {
        showWarning: false
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                //139.24.217.56:8081
                fetch("http://139.24.217.56:8081/api/formlogin", {
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify({
                        username: values.userName,
                        password: values.password
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(res => res.json())
                    .then(response => {
                        if (response.code === "0") {
                            this.props.history.push("/home");
                        } else {
                            this.setState({ showWarning: true });
                        }
                    });

                // document.cookie = "JSESSIONID=001";
                // this.props.history.push("/home");
            }
        });
    };

    gotoLogon = e => {
        e.preventDefault();
        this.props.history.push("/logon");
        console.log("click");
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                {this.state.showWarning ? (
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

export default withRouter(Form.create()(Login));
