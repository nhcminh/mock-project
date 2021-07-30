import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import BarChart from "../../HOC/BarChart";
import PageNotFound from "../PageNotFound";
import OverviewBarChart from "../Home/Overview/OverviewBarChart";
import { getHistorical } from "../API/AxiosClient";
function Details(props) {
  const area = useParams();
  const [data, setData] = useState({});
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    if (area.name !== "Global")
      getHistorical(area.name)
        .then((res) => {
          setData(res.data);
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
        )
      )}
    </>
  );
}

export default Details;
