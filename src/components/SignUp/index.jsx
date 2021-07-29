import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Col, Form, Input, Layout, Row, Typography } from "antd";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../HOC/LoadingSpinner";

function SignUp(props) {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const onFinish = useCallback((values) => {
    setIsLoading(true);
    const accountList = JSON.parse(localStorage.getItem("ac"));
    setTimeout(() => {
      setIsLoading(false);
      if (!accountList) return;
      const account = accountList.find((item) => {
        return item.email === values.email;
      });
      if (account) {
        setIsError(true);
        return;
      }
      if (values.password === values.re_password) {
        accountList.push({
          email: values.email,
          password: values.password,
        });
        localStorage.setItem("ac", JSON.stringify(accountList));
        setIsSuccess(true);
        return;
      }
      setIsError(true);
    }, 1500);
  }, []);
  useEffect(() => {
    setTimeout(setIsLoading(false), 1500);
    return () => {
      clearTimeout();
    };
  }, []);
  return (
    <>
      {isLoading && <LoadingSpinner />}
      {isSuccess ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <img
            className="animate__animated animate__fadeInUp"
            width="300"
            src="https://image.flaticon.com/icons/png/512/190/190411.png"
            alt="success"
          />
          <h1
            className="animate__animated animate__fadeInUp"
            style={{ fontSize: "2rem", textAlign: "center" }}
          >
            Success! <br />
            <Link style={{ fontSize: "2rem" }} to="/login">
              Log in?
            </Link>
          </h1>
        </div>
      ) : (
        <Layout
          style={{
            minHeight: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Row>
            <Col>
              <Typography.Title level={3} style={{ textAlign: "center" }}>
                Create Your Account
              </Typography.Title>
              {isError && (
                <Alert
                  className="animate__animated animate__bounceIn"
                  style={{ margin: "1rem auto" }}
                  message="Email is exist or Wrong Re-Password"
                  type="error"
                  showIcon
                  closable
                  onClose={() => setIsError(false)}
                />
              )}
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
                    Log in
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Layout>
      )}
    </>
  );
}

export default SignUp;
