import { Form, Input, Button, Row, Col, Typography, Spin, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Layout from 'antd/lib/layout/layout';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const Login = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const { t } = useTranslation();
  const onFinish = useCallback(
    (values) => {
      const accountList = JSON.parse(localStorage.getItem('ac'));
      setIsLoading(true);
      const account = accountList.find((item) => item.email === values.email);
      message.loading(t('LoginPage.Message.Loading'), 1.5).then(() => {
        if (account) {
          if (
            values.email === account.email &&
            values.password === account.password
          ) {
            message
              .success(t('LoginPage.Message.Success'), 1.5)
              .then(() => message.info(t('LoginPage.Message.Info')), 1)
              .then(() => {
                history.push('/home');
                localStorage.setItem('isLogin', true);
              });
          } else {
            message
              .error(t('LoginPage.Message.Error'), 1)
              .then(() => setIsLoading(false));
          }
        } else {
          message
            .error(t('LoginPage.Message.Error'), 1)
            .then(() => setIsLoading(false));
        }
      });
    },
    [history, t]
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
            minHeight: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Row>
            <Col>
              <Typography.Title level={3}>
                {t('LoginPage.Title')}
              </Typography.Title>

              <Form name='normal_login' size='large' onFinish={onFinish}>
                <Form.Item
                  name='email'
                  rules={[
                    {
                      required: true,
                      message: t('LoginPage.ValidationErr.Email'),
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    type='email'
                    placeholder={t('LoginPage.Form.Email')}
                  />
                </Form.Item>
                <Form.Item
                  name='password'
                  rules={[
                    {
                      required: true,
                      message: t('LoginPage.ValidationErr.Password'),
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder={t('LoginPage.Form.Password')}
                  />
                </Form.Item>

                <Form.Item>
                  <Button type='primary' htmlType='submit' block>
                    {t('LoginPage.CallToAction.Button')}
                  </Button>
                  <Link to='/signup'>{t('LoginPage.CallToAction.Link')}</Link>
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
