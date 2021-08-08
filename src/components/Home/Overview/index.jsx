import { Typography } from "antd";
import React from "react";
import PieChart from "./PieChart";

function Overview(props) {
  return (
    <>
      <img
        src="https://image.flaticon.com/icons/png/512/2949/2949893.png"
        alt="globe"
        width="50%"
        style={{ display: "block", margin: "1rem auto" }}
      />
      <Typography.Title className="textCenter">Overview</Typography.Title>
      <PieChart />
    </>
  );
}

export default Overview;
