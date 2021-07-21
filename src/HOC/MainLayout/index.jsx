import { BulbOutlined, BulbTwoTone } from "@ant-design/icons";
import { Col, Layout, Menu, Row, Switch } from "antd";
import Search from "antd/lib/input/Search";
import React, { useState } from "react";

function MainLayout(props) {
  const [theme, setTheme] = useState("light");
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
              style={{ transition: "linear 0.3s" }}
            >
              <Menu.Item key="overviews">Overview</Menu.Item>
              <Menu.Item key="dataTable">Data Table</Menu.Item>
              <Menu.Item key="otherNews">Other News</Menu.Item>
            </Menu>
          </Col>
          <Col xs={{ span: 12 }}>
            <Search
              placeholder="Search"
              // onSearch={onSearch}
              style={{ verticalAlign: "middle" }}
            />
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
