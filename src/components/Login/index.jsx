import { Form, Input, Button, Row, Col, Typography, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Layout from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../../HOC/LoadingSpinner";
import { useCallback } from "react";

const Login = (props) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const onFinish = useCallback(
    (values) => {
      setTimeout(() => {
        if (values.email === "admin@admin.com" && values.password === "admin") {
          history.push("/home");
          localStorage.setItem("isLogin", true);
          return;
        }
        setIsError(true);
      }, 1500);
    },
    [history]
  );
  useEffect(() => {
    setTimeout(setIsLoading(false), 1500);
    return () => {
      clearTimeout();
    };
  }, []);
  return (
    <>
      {isLoading && <LoadingSpinner />}
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
              Please Sign in
            </Typography.Title>
            {isError && (
              <Alert
                className="animate__animated animate__bounceIn"
                style={{ margin: "1rem auto" }}
                message="Wrong username or email"
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
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Layout>
    </>
  );
};
export default Login;
