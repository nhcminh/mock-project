import { RiseOutlined, StockOutlined } from "@ant-design/icons";
import { Button, Col, Row, Tooltip, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BarChart from "../../../HOC/BarChart";
function OverviewBarChart(props) {
  const [data, setData] = useState({});
  const [sort, setSort] = useState(7);
  const [change, setChange] = useState("daily");

  useEffect(() => {
    axios
      .get("https://disease.sh/v3/covid-19/historical/all?lastdays=357")
      .then((res) => setData(res.data))
      .catch((e) => console.log(e));
  }, [sort]);
  const { cases, deaths, recovered } = data;
  const numCases = (cases) => {
    return Object.values(cases)
      .sort((a, b) => {
        return b - a;
      })[0]
      .toLocaleString();
  };
  return (
    <>
      {cases && (
        <>
          <Typography style={{ textAlign: "center" }}>
            <Typography.Text>Globally, as of </Typography.Text>
            <Typography.Text mark>
              {`${new Date().toLocaleTimeString()} ${new Date().toDateString()}`}
            </Typography.Text>
            , there have been
            <Typography.Text type="warning">{` ${numCases(
              cases
            )} confirmed cases  `}</Typography.Text>
            of COVID-19, including{" "}
            <Typography.Text type="danger">{` ${numCases(
              deaths
            )} deaths, `}</Typography.Text>
            {`reported to WHO. As of 19 July 2021, a total of `}
            <Typography.Text type="success">
              {numCases(recovered)}
            </Typography.Text>
            {` patients has recovered.`}
          </Typography>
          <br />
          <Row justify="end" gutter={12}>
            <Col>
              <Tooltip title="Daily Change">
                <Button
                  icon={<RiseOutlined />}
                  onClick={() => setChange("daily")}
                ></Button>
              </Tooltip>
              <Tooltip title="Cucumlative">
                <Button
                  icon={<StockOutlined />}
                  onClick={() => setChange("cucumlative")}
                ></Button>
              </Tooltip>
            </Col>
            <Col>
              <Button
                style={{ verticalAlign: "middle" }}
                onClick={() => setSort(1)}
              >
                Daily
              </Button>
              <Button
                style={{ verticalAlign: "middle" }}
                onClick={() => setSort(7)}
              >
                Weekly
              </Button>
            </Col>
          </Row>

          <br />
          <Col>
            <BarChart
              data={cases}
              sort={sort}
              change={change}
              numCases={numCases(cases)}
              label="Confirmed Cases"
            />
          </Col>
          <br />
          <BarChart
            data={deaths}
            sort={sort}
            change={change}
            numCases={numCases(deaths)}
            label="Death Cases"
          />
        </>
      )}
    </>
  );
}

export default OverviewBarChart;
