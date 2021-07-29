import React from "react";
import { Menu, Dropdown, Typography } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { useCallback } from "react";
function SettingMenu(props) {
  const [isLogin, setIsLogin] = useState(
    JSON.parse(localStorage.getItem("isLogin"))
  );
  const [visible, setVisible] = useState(false);
  const handleMenuClick = useCallback((e) => {
    if (e.key === "2") {
      setVisible(false);
    }
  }, []);
  const handleVisibleChange = useCallback((flag) => {
    setVisible(flag);
  }, []);
  useEffect(() => {
    setIsLogin(JSON.parse(localStorage.getItem("isLogin")));
  }, [isLogin, visible]);

  const menu = (
    <Menu style={{ background: "aliceblue" }} onClick={handleMenuClick}>
      <Menu.Item key="0">Dark Mode</Menu.Item>
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
