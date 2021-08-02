import React, { useEffect, useMemo, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import map from "highcharts/modules/map";
import world from "@highcharts/map-collection/custom/world.geo.json";
import { getAllCountries } from "../../../API/AxiosClient";
import { Spin } from "antd";
import { useSelector } from "react-redux";
map(Highcharts);

function Maps(props) {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useSelector((state) => state.ThemeReducer.theme);
  useEffect(() => {
    getAllCountries()
      .then((res) => {
        setCountries(
          res.data.map((country) => [
            country.countryInfo.iso3,
            country.active,
            country.countryInfo.flag,
          ])
        );
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);
  const options = useMemo(() => {
    return {
      chart: {
        backgroundColor:
          theme === "dark" ? "#bbbbbb" : "rgba(255,255,255,0.75)",
      },
      colors: [
        "rgba(19,64,117,0.05)",
        "rgba(19,64,117,0.2)",
        "rgba(19,64,117,0.4)",
        "rgba(19,64,117,0.5)",
        "rgba(19,64,117,0.6)",
        "rgba(19,64,117,0.8)",
        "rgba(19,64,117,1)",
      ],
      colorAxis: {
        dataClasses: [
          {
            to: 1000,
          },
          {
            from: 1000,
            to: 10000,
          },
          {
            from: 10000,
            to: 100000,
          },
          {
            from: 100000,
            to: 500000,
          },
          {
            from: 500000,
            to: 1000000,
          },
          {
            from: 1000000,
            to: 1500000,
          },
          {
            from: 1500000,
          },
        ],
      },
      credits: {
        enabled: false,
      },
      legend: {
        align: "left",
        backgroundColor:
          (Highcharts.defaultOptions &&
            Highcharts.defaultOptions.legend &&
            Highcharts.defaultOptions.legend.backgroundColor) ||
          "rgba(255, 255, 255, 0.85)",
        floating: false,
        layout: "horizontal",
        symbolRadius: 0,
        title: {
          text: "Active cases",
          style: {
            color:
              (Highcharts.defaultOptions &&
                Highcharts.defaultOptions.legend &&
                Highcharts.defaultOptions.legend.title &&
                Highcharts.defaultOptions.legend.title.style &&
                Highcharts.defaultOptions.legend.title.style.color) ||
              "black",
          },
        },
        verticalAlign: "bottom",
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          align: "left",
          x: 10,
        },
      },
      responsive: {
        rules: [
          {
            condition: {
              minWidth: 1200,
            },
            chartOptions: {
              legend: {
                floating: true,
                layout: "vertical",
              },
            },
          },
        ],
      },
      series: [
        {
          borderColor: "rgba(0,0,0,0.75)",
          data: countries,
          dataLabels: {
            enabled: true,
            format: "{point.properties.postal}",
          },
          joinBy: "iso-a3",
          keys: ["iso-a3", "value", "flag"],
          mapData: world,
          name: "Active cases",
          states: {
            hover: {
              color: "#a4edba",
            },
          },
        },
      ],
      title: {
        text: "Active cases by country",
      },
      tooltip: {
        borderWidth: 1,
        padding: 10,
        shadow: false,
        useHTML: true,
        pointFormat:
          '<span class="f32"><span class="flag {point.properties.hc-key}">' +
          "</span></span> {point.name}<br>" +
          '<span style="font-size:20px">{point.value} cases</span>',
      },
    };
  }, [countries, theme]);
  return (
    <>
      <Spin spinning={isLoading}>
        <HighchartsReact
          highcharts={Highcharts}
          constructorType="mapChart"
          options={options}
        />
      </Spin>
    </>
  );
}
export default React.memo(Maps);
