import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Form, Input, Button } from "antd";

const FormItem = Form.Item;

class Logon extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        showWarning: false
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                fetch("http://139.24.217.56:8081/api/registration", {
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
                    .then(res => {
                        if (res.code === "0") {
                            this.props.history.push("/login");
                        } else {
                            this.setState({ showWarning: true });
                        }
                    });
            }
        });
    };

    handleConfirmBlur = e => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue("password")) {
            callback("Two passwords that you enter is inconsistent!");
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(["confirm"], { force: true });
        }
        callback();
    };

    handleWebsiteChange = value => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = [".com", ".org", ".net"].map(
                domain => `${value}${domain}`
            );
        }
        this.setState({ autoCompleteResult });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 }
            }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 16,
                    offset: 8
                }
            }
        };

        return (
            <Form
                onSubmit={this.handleSubmit}
                style={{ maxWidth: 500, margin: "5em auto" }}
            >
                {this.state.showWarning ? (
                    <div style={{ color: "red" }}>Registration failed!</div>
                ) : null}
                <FormItem {...formItemLayout} label="Username">
                    {getFieldDecorator("username", {
                        rules: [
                            {
                                required: true,
                                message: "Please input your username!",
                                whitespace: true
                            }
                        ]
                    })(<Input />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Password">
                    {getFieldDecorator("password", {
                        rules: [
                            {
                                required: true,
                                message: "Please input your password!"
                            },
                            {
                                validator: this.validateToNextPassword
                            }
                        ]
                    })(<Input type="password" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Confirm Password">
                    {getFieldDecorator("confirm", {
                        rules: [
                            {
                                required: true,
                                message: "Please confirm your password!"
                            },
                            {
                                validator: this.compareToFirstPassword
                            }
                        ]
                    })(
                        <Input
                            type="password"
                            onBlur={this.handleConfirmBlur}
                        />
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

export default withRouter(Form.create()(Logon));
