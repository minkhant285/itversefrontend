import { Button, Form, Input } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./apis";
import { Text } from "./styled";

const Login = () => {
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useState<number>();

    const onFinish = async (values: any) => {
        const statusInfo = await login(values.email, values.password);
        console.log(statusInfo);
        if (statusInfo === 201) {
            setLoginStatus(statusInfo);
            navigate("/");
        } else if (statusInfo === 401) {
            setLoginStatus(statusInfo);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: "Please input your email!" },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    { required: true, message: "Please input your password!" },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
            {loginStatus && (
                <Text color={loginStatus === 401 ? "red" : "green"}>
                    {" "}
                    {loginStatus === 401
                        ? "Login Failed! Try Again"
                        : " Login Success! "}
                </Text>
            )}
        </Form>
    );
};

export default Login;
