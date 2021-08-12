import React from 'react';
import { Menu, Dropdown, Typography, Switch, Select } from 'antd';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ThemeActions } from '../../redux/slices/theme';
import darkVars from '../../HOC/MainLayout/styles/dark.json';
import lightVars from '../../HOC/MainLayout/styles/light.json';
import { useTranslation } from 'react-i18next';
import { LanguageActions } from '../../redux/rootAction';
function SettingMenu(props) {
  const [isLogin, setIsLogin] = useState(
    JSON.parse(localStorage.getItem('isLogin'))
  );
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');
  const handleMenuClick = useCallback((e) => {
    if (e.key === '2') {
      setVisible(false);
    }
  }, []);
  const handleVisibleChange = useCallback((flag) => {
    setVisible(flag);
  }, []);
  const onChangeTheme = (checked) => {
    if (checked) {
      window.less.modifyVars(darkVars);
      dispatch(ThemeActions.changeTheme('dark'));
    } else {
      window.less.modifyVars(lightVars);
      dispatch(ThemeActions.changeTheme('light'));
    }
  };
  const handleLanguageChange = (value) => {
    setLang(value);
    dispatch(LanguageActions.function(value));
    localStorage.setItem('lang', value);
  };
  useEffect(() => {
    setIsLogin(JSON.parse(localStorage.getItem('isLogin')));
  }, [isLogin, visible]);

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key='0'>
        {t('Header.Settings.Mode')}
        <Switch
          unCheckedChildren={
            <img
              src='https://image.flaticon.com/icons/png/512/1196/1196517.png'
              alt='light'
              width='20px'
              style={{ verticalAlign: 'baseline' }}
            />
          }
          checkedChildren={
            <img
              src='https://image.flaticon.com/icons/png/512/2204/2204369.png'
              alt='dark'
              width='20px'
              style={{ verticalAlign: 'baseline' }}
            />
          }
          onChange={onChangeTheme}
        />
      </Menu.Item>
      <Menu.Item key='1'>
        {t('Header.Settings.Lang')}
        <Select
          style={{ width: '120px', margin: '0 1rem' }}
          defaultValue={lang}
          onChange={handleLanguageChange}
        >
          <Select.Option value='en'>English</Select.Option>
          <Select.Option value='vi'>Tiếng Việt</Select.Option>
        </Select>
      </Menu.Item>
      {isLogin ? (
        <Menu.Item
          key='2'
          onClick={() => {
            localStorage.removeItem('isLogin');
            setIsLogin(false);
          }}
        >
          <Link to='/news'>{t('Header.Settings.LogOut')}</Link>
        </Menu.Item>
      ) : (
        <Menu.Item key='2'>
          <Link to='/login'>{t('Header.Settings.SignIn')}</Link>
        </Menu.Item>
      )}
    </Menu>
  );
  return (
    <>
      <Dropdown
        overlay={menu}
        trigger={['click']}
        onVisibleChange={handleVisibleChange}
        visible={visible}
      >
        <Typography.Link
          className='ant-dropdown-link'
          onClick={(e) => e.preventDefault()}
        >
          <SettingOutlined />
        </Typography.Link>
      </Dropdown>
    </>
  );
}

export default SettingMenu;
