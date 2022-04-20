import { Button, Form, Input } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "./apis";
import { AppContext } from "./providers/appProvider";
import { Row, Text } from "./styled";

const Login = () => {
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useState<number>();
    const { isAuth } = useContext(AppContext);

    const onFinish = async (values: any) => {
        const statusInfo = await login(values.email, values.password);
        console.log(statusInfo);
        if (statusInfo === 201) {
            setLoginStatus(statusInfo);
            navigate("/dashboard");
        } else if (statusInfo === 401) {
            setLoginStatus(statusInfo);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        // console.log("Failed:", errorInfo);
    };

    if (isAuth) {
        return <Navigate to={"/dashboard"} />;
    } else {
        return (
            <div
                style={{
                    flex: 1,
                    flexDirection: "column",
                    display: "flex",
                    overflow: "auto",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        backgroundColor: "#fff",
                        padding: "15px",
                        borderRadius: "8px",
                    }}
                >
                    <Row justify="center" style={{ marginBottom: "10px" }}>
                        <Text fWeight="bold" align="center" size={"1.5em"}>
                            ITVerse Login
                        </Text>
                    </Row>
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
                                {
                                    required: true,
                                    message: "Please input your email!",
                                },
                            ]}
                        >
                            <Input type={"email"} />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                        >
                            <Input.Password />
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
                </div>
            </div>
        );
    }
};

export default Login;
