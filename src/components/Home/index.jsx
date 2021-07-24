import React from "react";
import MainLayout from "../../HOC/MainLayout";
import "mapbox-gl/dist/mapbox-gl.css";
import Maps from "./Maps";
import OverviewBarChart from "./OverviewBarChart";
import { Col, Row } from "antd";

function Home(props) {
  return (
    <MainLayout>
      <Maps />
      <Row justify="center">
        <Col span={22}>
          <OverviewBarChart />
        </Col>
      </Row>
    </MainLayout>
  );
}

export default Home;
