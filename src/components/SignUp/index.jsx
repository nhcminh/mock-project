import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Layout,
  message,
  Row,
  Spin,
  Typography,
} from "antd";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

function SignUp(props) {
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const onFinish = useCallback(
    (values) => {
      setIsLoading(true);
      const accountList = JSON.parse(localStorage.getItem("ac"));
      const account = accountList.find((item) => {
        return item.email === values.email;
      });
      message.loading("Check if email exist", 2).then(() => {
        if (account) {
          setIsLoading(false);

          return message.error("Email is exist!", 1);
        }
        if (values.password !== values.re_password) {
          setIsLoading(false);
          return message.error("Re-password does not match!", 1);
        }
        message.success("Sign Up successful!", 1).then(() => {
          accountList.push({
            email: values.email,
            password: values.password,
          });
          localStorage.setItem("ac", JSON.stringify(accountList));
          message.info("Return to Log in", 1).then(history.push("/login"));
        });
      });
    },
    [history]
  );
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
    return () => {
      clearTimeout();
    };
  }, []);
  return (
    <>
      <Spin spinning={isLoading}>
        <Layout
          style={{
            minHeight: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Row>
            <Col>
              <Typography.Title level={3}>Create Your Account</Typography.Title>
              <Form name="normal_login" size="large" onFinish={onFinish}>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    type="email"
                    placeholder="Email"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item
                  name="re_password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password again!",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Re-Password"
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Sign Up
                  </Button>
                  Or Already have account? <Link to="/login">Login</Link>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Layout>
      </Spin>
    </>
  );
}

export default SignUp;
