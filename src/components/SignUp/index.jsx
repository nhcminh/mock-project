import { LockOutlined, UserOutlined } from '@ant-design/icons';
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
} from 'antd';
import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';

function SignUp(props) {
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const { t } = useTranslation();
  const onFinish = useCallback(
    (values) => {
      setIsLoading(true);
      const accountList = JSON.parse(localStorage.getItem('ac'));
      const account = accountList.find((item) => {
        return item.email === values.email;
      });
      message.loading(t('SignUpPage.Message.Loading'), 2).then(() => {
        if (account) {
          setIsLoading(false);

          return message.error(t('SignUpPage.Message.Error.Email'), 1);
        }
        if (values.password !== values.re_password) {
          setIsLoading(false);
          return message.error(t('SignUpPage.Message.Error.RePassword'), 1);
        }
        message.success(t('SignUpPage.Message.Success'), 1).then(() => {
          accountList.push({
            email: values.email,
            password: values.password,
          });
          localStorage.setItem('ac', JSON.stringify(accountList));
          message
            .info(t('SignUpPage.Message.Info'), 1)
            .then(history.push('/login'));
        });
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
                {t('SignUpPage.Title')}
              </Typography.Title>
              <Form name='normal_login' size='large' onFinish={onFinish}>
                <Form.Item
                  name='email'
                  rules={[
                    {
                      required: true,
                      message: t('SignUpPage.ValidationErr.Email'),
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    type='email'
                    placeholder={t('SignUpPage.Form.Email')}
                  />
                </Form.Item>
                <Form.Item
                  name='password'
                  rules={[
                    {
                      required: true,
                      message: t('SignUpPage.ValidationErr.Password'),
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder={t('SignUpPage.Form.Password')}
                  />
                </Form.Item>
                <Form.Item
                  name='re_password'
                  rules={[
                    {
                      required: true,
                      message: t('SignUpPage.ValidationErr.RePassword'),
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder={t('SignUpPage.Form.RePassword')}
                  />
                </Form.Item>
                <Form.Item>
                  <Button type='primary' htmlType='submit' block>
                    {t('SignUpPage.CallToAction.Button')}
                  </Button>
                  {t('SignUpPage.CallToAction.Message')}
                  <Link to='/login'>{t('SignUpPage.CallToAction.Link')}</Link>
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
