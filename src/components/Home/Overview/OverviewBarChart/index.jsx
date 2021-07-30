import { RiseOutlined, StockOutlined } from "@ant-design/icons";
import { Button, Col, Row, Tooltip } from "antd";
import React, { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import BarChart from "../../../../HOC/BarChart";
import { getHistorical } from "../../../API/AxiosClient";
function OverviewBarChart(props) {
  const [data, setData] = useState({});
  const [change, setChange] = useState("daily");
  useEffect(() => {
    getHistorical("all")
      .then((res) => setData(res.data))
      .catch((e) => console.log(e));
  }, []);
  const { cases, deaths, recovered } = data;
  const calculateDailyChange = useCallback((object) => {
    const data = Object.values(object);
    data.pop();
    return data.map((item, index) => {
      return index > 0 ? item - data[index - 1] : item;
    });
  }, []);
  return (
    <>
      {cases && (
        <>
          <Row
            justify="end"
            gutter={12}
            align="middle"
            style={{ marginTop: "1rem" }}
          >
            <Col>
              <Tooltip title="Daily Change">
                <Button
                  icon={<RiseOutlined />}
                  onClick={() => setChange("daily")}
                >
                  Daily Change
                </Button>
              </Tooltip>
            </Col>
            <Col>
              <Tooltip title="Cucumlative">
                <Button
                  icon={<StockOutlined />}
                  onClick={() => setChange("cucumlative")}
                >
                  Cucumlative
                </Button>
              </Tooltip>
            </Col>
          </Row>

          <br />
          <Col>
            <BarChart
              title="Global"
              data={
                change === "daily"
                  ? [
                      { name: "cases", data: calculateDailyChange(cases) },
                      { name: "deaths", data: calculateDailyChange(deaths) },
                      {
                        name: "recoverd",
                        data: calculateDailyChange(recovered),
                      },
                    ]
                  : [
                      { name: "cases", data: Object.values(cases) },
                      { name: "deaths", data: Object.values(deaths) },
                      { name: "recoverd", data: Object.values(recovered) },
                    ]
              }
              label="Confirmed Cases"
            />
          </Col>
          <br />
        </>
      )}
    </>
  );
}

export default OverviewBarChart;
