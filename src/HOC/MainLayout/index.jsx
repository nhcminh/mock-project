import { Col, Layout, Menu, Row } from 'antd';
import React, { useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';
import SettingMenu from '../../components/SettingMenu';
function MainLayout(props) {
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const lang = useSelector((state) => state.LanguageReducer.lang);
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);
  return (
    <Layout style={{ minHeight: '92vh' }}>
      <Layout.Header>
        <Row justify='space-between' align='middle'>
          <Col xs={{ span: 5 }}>
            <Menu
              mode='horizontal'
              defaultSelectedKeys={history.location.pathname.split('/')[1]}
              triggerSubMenuAction='click'
            >
              <Menu.Item
                key='home'
                onClick={() => {
                  history.push('/home');
                }}
              >
                {t('Header.Menu.Home')}
              </Menu.Item>
              <Menu.Item
                key='news'
                onClick={() => {
                  history.push('/news');
                }}
              >
                {t('Header.Menu.News')}
              </Menu.Item>
            </Menu>
          </Col>
          <Col lg={{ span: 8 }} xs={{ span: 12 }}>
            <SearchBar />
          </Col>
          <Col lg={{ span: 1 }}>
            <SettingMenu />
          </Col>
        </Row>
      </Layout.Header>
      <Layout.Content>{props.children}</Layout.Content>
    </Layout>
  );
}

export default withTranslation()(MainLayout);
