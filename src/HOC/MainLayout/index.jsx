import { BulbOutlined, BulbTwoTone } from "@ant-design/icons";
import { Col, Layout, Menu, Row, Switch } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NewsViewActions } from "../../redux/slices/newsView";

function MainLayout(props) {
  const [theme, setTheme] = useState("light");
  const dispatch = useDispatch();
  return (
    <Layout>
      <Layout.Header
        style={{
          background: theme === "light" ? "#fff" : "#001529",
          transition: "linear 0.3s",
        }}
      >
        <Row justify="space-between" align="middle">
          <Col xs={{ span: 5 }}>
            <Menu
              theme={theme}
              mode="horizontal"
              defaultSelectedKeys="overview"
              triggerSubMenuAction="click"
              style={{ transition: "linear 0.3s" }}
            >
              <Menu.Item
                key="overview"
                onClick={() => {
                  dispatch(NewsViewActions.changeView("overview"));
                }}
              >
                Overview
              </Menu.Item>
              <Menu.Item
                key="dataTable"
                onClick={() => {
                  dispatch(NewsViewActions.changeView("dataTable"));
                }}
              >
                Data Table
              </Menu.Item>
              <Menu.Item
                key="otherNews"
                onClick={() => {
                  dispatch(NewsViewActions.changeView("otherNews"));
                }}
              >
                Other News
              </Menu.Item>
            </Menu>
          </Col>
          <Col>
            <Switch
              checkedChildren={<BulbTwoTone twoToneColor="#FAFF00" />}
              unCheckedChildren={<BulbOutlined />}
              defaultChecked
              onChange={() =>
                theme === "light" ? setTheme("dark") : setTheme("light")
              }
            />
          </Col>
        </Row>
      </Layout.Header>
      <Layout.Content
        style={
          theme === "light"
            ? {
                backgroundColor: "#fff",
                color: "#000",
                transition: "linear 0.3s",
                minHeight: "100vh",
              }
            : { backgroundColor: "#001529", color: "#fff", minHeight: "100vh" }
        }
      >
        {props.children}
      </Layout.Content>
    </Layout>
  );
}

export default MainLayout;
