import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import BarChart from "../../HOC/BarChart";
import PageNotFound from "../PageNotFound";
import OverviewBarChart from "../Home/Overview/OverviewBarChart";
import { getHistorical } from "../API/AxiosClient";
import { Card, Col, Row, Spin, Typography } from "antd";
function Details(props) {
  const area = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    if (area.name !== "Global")
      getHistorical(area.name)
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        })
        .catch((e) => {
          setIsError(true);
        });
  }, [area.name]);
  console.log(area.name.toLowerCase());
  return (
    <>
      {area.name === "Global" && <OverviewBarChart />}
      {isError ? (
        <PageNotFound />
      ) : (
        data.timeline && (
          <>
            <Row
              gutter={[8, 8]}
              style={{
                marginTop: "0.5rem",
                marginBottom: "0.5rem",
                marginLeft: "0.5rem",
                marginRight: "0.5rem",
              }}
              justify="center"
              align="middle"
            >
              <Col md={{ span: 24 }}>
                <img
                  src={`https://disease.sh/assets/img/flags/${area.name.toLowerCase()}.png`}
                  alt={area.name.toLowerCase()}
                  style={{ display: "block", margin: "auto" }}
                />
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 8 }}>
                <Card
                  title="Total Active Cases"
                  headStyle={{
                    textAlign: "center",
                    textTransform: "uppercase",
                  }}
                >
                  <Typography.Paragraph
                    style={{
                      textAlign: "center",
                      fontSize: "1.5rem",
                      color: "#FB9300",
                    }}
                  >
                    {Object.values(data?.timeline.cases).pop().toLocaleString()}
                  </Typography.Paragraph>
                </Card>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 8 }}>
                <Card
                  title="Total Death Cases"
                  headStyle={{
                    textAlign: "center",
                    textTransform: "uppercase",
                  }}
                >
                  <Typography.Paragraph
                    style={{
                      textAlign: "center",
                      fontSize: "1.5rem",
                      color: "#FF4C29",
                    }}
                  >
                    {Object.values(data?.timeline.deaths)
                      .pop()
                      .toLocaleString()}
                  </Typography.Paragraph>
                </Card>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 8 }}>
                <Card
                  title="Total Recovered Cases"
                  headStyle={{
                    textAlign: "center",
                    textTransform: "uppercase",
                  }}
                >
                  <Typography.Paragraph
                    style={{
                      textAlign: "center",
                      fontSize: "1.5rem",
                      color: "#66DE93",
                    }}
                  >
                    {Object.values(data?.timeline.recovered)
                      .pop()
                      .toLocaleString()}
                  </Typography.Paragraph>
                </Card>
              </Col>
            </Row>
            <Spin spinning={isLoading}>
              <Row style={{ margin: "0.5rem" }}>
                <Col span={24}>
                  <BarChart
                    title={data.country}
                    data={[
                      {
                        name: "cases",
                        data: Object.values(data?.timeline.cases),
                      },
                      {
                        name: "deaths",
                        data: Object.values(data?.timeline.deaths),
                      },
                      {
                        name: "recoverd",
                        data: Object.values(data?.timeline.recovered),
                      },
                    ]}
                  />
                </Col>
              </Row>
            </Spin>
          </>
        )
      )}
    </>
  );
}

export default Details;
