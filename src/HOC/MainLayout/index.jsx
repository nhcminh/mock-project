import { Col, Layout, Menu, Row } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import SettingMenu from "../../components/SettingMenu";
function MainLayout(props) {
  const history = useHistory();

  return (
    <Layout style={{ minHeight: "92vh" }}>
      <Layout.Header
        style={{
          background: "#fff",
          transition: "linear 0.3s",
        }}
      >
        <Row justify="space-between" align="middle">
          <Col xs={{ span: 5 }}>
            <Menu
              theme={"light"}
              mode="horizontal"
              defaultSelectedKeys={history.location.pathname.split("/")[1]}
              triggerSubMenuAction="click"
              style={{ transition: "linear 0.3s" }}
            >
              <Menu.Item
                key="home"
                onClick={() => {
                  history.push("/home");
                }}
              >
                Home
              </Menu.Item>
              <Menu.Item
                key="news"
                onClick={() => {
                  history.push("/news");
                }}
              >
                News
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
      <Layout.Content style={{ background: "fff" }}>
        {props.children}
      </Layout.Content>
    </Layout>
  );
}

export default MainLayout;
