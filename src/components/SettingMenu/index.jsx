import React from "react";
import { Menu, Dropdown, Typography, Switch } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ThemeActions } from "../../redux/slices/theme";
import darkVars from "../../HOC/MainLayout/styles/dark.json";
import lightVars from "../../HOC/MainLayout/styles/light.json";
function SettingMenu(props) {
  const [isLogin, setIsLogin] = useState(
    JSON.parse(localStorage.getItem("isLogin"))
  );
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const handleMenuClick = useCallback((e) => {
    if (e.key === "2") {
      setVisible(false);
    }
  }, []);
  const handleVisibleChange = useCallback((flag) => {
    setVisible(flag);
  }, []);
  const onChangeTheme = (checked) => {
    if (checked) {
      window.less.modifyVars(darkVars);
      dispatch(ThemeActions.changeTheme("dark"));
    } else {
      window.less.modifyVars(lightVars);
      dispatch(ThemeActions.changeTheme("light"));
    }
  };
  useEffect(() => {
    setIsLogin(JSON.parse(localStorage.getItem("isLogin")));
  }, [isLogin, visible]);

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="0">
        <Switch onChange={onChangeTheme} />
      </Menu.Item>
      <Menu.Item key="1">Lang:</Menu.Item>
      {isLogin ? (
        <Menu.Item
          key="2"
          onClick={() => {
            localStorage.removeItem("isLogin");
            setIsLogin(false);
          }}
        >
          <Link to="/news">Log Out</Link>
        </Menu.Item>
      ) : (
        <Menu.Item key="2">
          <Link to="/login">Log In</Link>
        </Menu.Item>
      )}
    </Menu>
  );
  return (
    <>
      <Dropdown
        overlay={menu}
        trigger={["click"]}
        onVisibleChange={handleVisibleChange}
        visible={visible}
      >
        <Typography.Link
          className="ant-dropdown-link"
          onClick={(e) => e.preventDefault()}
        >
          <SettingOutlined />
        </Typography.Link>
      </Dropdown>
    </>
  );
}

export default SettingMenu;
