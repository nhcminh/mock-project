import { Col, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Maps from "./Maps";
import OverviewBarChart from "./OverviewBarChart";

function Overview(props) {
  const [data, setData] = useState({});
  useEffect(() => {
    axios
      .get("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
      .then((res) => setData(res.data))
      .catch((e) => console.log(e));
  }, []);
  return (
    <>
      <Maps />
      <Row justify="center">
        <Col span={22}>
          <OverviewBarChart data={data} />
        </Col>
      </Row>
    </>
  );
}

export default Overview;
