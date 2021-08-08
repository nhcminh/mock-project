import { Form, Input, Button, Row, Col, Typography, Spin, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Layout from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useCallback } from "react";

const Login = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const onFinish = useCallback(
    (values) => {
      const accountList = JSON.parse(localStorage.getItem("ac"));
      setIsLoading(true);
      const account = accountList.find((item) => item.email === values.email);
      message.loading("Check your account..", 1.5).then(() => {
        if (account) {
          if (
            values.email === account.email &&
            values.password === account.password
          ) {
            message
              .success("Login Successful!", 2.5)
              .then(() => message.info("Return to home in 2 second"), 2)
              .then(() => {
                history.push("/home");
                localStorage.setItem("isLogin", true);
              });
          } else {
            message
              .error("Wrong email or password!", 1)
              .then(() => setIsLoading(false));
          }
        } else {
          message
            .error("Wrong email or password!", 1)
            .then(() => setIsLoading(false));
        }
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
              <Typography.Title level={3}>Please Sign in</Typography.Title>

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
                  Or <Link to="/signup">Create an acoount</Link>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Layout>
      </Spin>
    </>
  );
};
export default Login;
