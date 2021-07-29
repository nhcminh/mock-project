import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import BarChart from "../../HOC/BarChart";
import PageNotFound from "../PageNotFound";

function Details(props) {
  const area = useParams();
  const [data, setData] = useState({});
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    axios
      .get(
        `https://disease.sh/v3/covid-19/historical/${area.name}?lastdays=all`
      )
      .then((res) => setData(res.data))
      .catch((e) => setIsError(true));
  }, [area.name]);
  return (
    <>
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
