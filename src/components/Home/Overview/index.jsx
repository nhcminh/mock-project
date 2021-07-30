import { Col, Row } from "antd";
import React from "react";
import Maps from "./Maps";
import OverviewBarChart from "./OverviewBarChart";

function Overview(props) {
  return (
    <>
      <Maps />
      <Row justify="center">
        <Col span={22}>
          <OverviewBarChart />
        </Col>
      </Row>
    </>
  );
}

export default Overview;
