import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import BarChart from "../../HOC/BarChart";
import PageNotFound from "../PageNotFound";
import LoadingSpinner from "../../HOC/LoadingSpinner";
import OverviewBarChart from "../Home/Overview/OverviewBarChart";
function Details(props) {
  const area = useParams();
  const [data, setData] = useState({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (area.name !== "Global")
      axios
        .get(
          `https://disease.sh/v3/covid-19/historical/${area.name}?lastdays=all`
        )
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        })
        .catch((e) => {
          setIsError(true);
          setIsLoading(false);
        });
    setIsLoading(false);
  }, [area.name]);
  return (
    <>
      {isLoading && <LoadingSpinner />}
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
