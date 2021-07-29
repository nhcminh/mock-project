import { Col, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../../HOC/LoadingSpinner";
import Maps from "./Maps";
import OverviewBarChart from "./OverviewBarChart";

function Overview(props) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <>
      {isLoading && <LoadingSpinner />}
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
