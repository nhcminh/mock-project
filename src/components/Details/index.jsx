import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import BarChart from "../../HOC/BarChart";
import PageNotFound from "../PageNotFound";
import OverviewBarChart from "../Home/Overview/OverviewBarChart";
import { getHistorical } from "../API/AxiosClient";
import { Spin } from "antd";
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
  return (
    <>
      {area.name === "Global" && <OverviewBarChart />}
      {isError ? (
        <PageNotFound />
      ) : (
        data.timeline && (
          <Spin spinning={isLoading}>
            <BarChart
              title={data.country}
              data={[
                { name: "cases", data: Object.values(data?.timeline.cases) },
                { name: "deaths", data: Object.values(data?.timeline.deaths) },
                {
                  name: "recoverd",
                  data: Object.values(data?.timeline.recovered),
                },
              ]}
            />
          </Spin>
        )
      )}
    </>
  );
}

export default Details;
