import * as React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import map from "highcharts/modules/map";
import world from "@highcharts/map-collection/custom/world.geo.json";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
map(Highcharts);

export default function Maps(props) {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    axios
      .get("https://disease.sh/v3/covid-19/countries")
      .then((res) => setCountries(res.data))
      .catch((e) => console.log(e));
  }, []);
  const options = {
    chart: {
      map: world,
      height: 500,
      animation: true,
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
    title: {
      text: "Active cases by country",
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        align: "left",
        x: 10,
      },
      enableDoubleClickZoomTo: true,
    },
    tooltip: {
      borderWidth: 1,
      shadow: false,
      padding: 10,
      useHTML: true,
      pointFormat:
        '<span class="f32"><span class="flag {point.properties.hc-key}">' +
        "</span></span> {point.name}<br>" +
        '<span style="font-size:20px">{point.value} cases</span>',
    },
    legend: {
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
      floating: false,
      align: "left",
      verticalAlign: "bottom",
      layout: "horizontal",
      backgroundColor:
        (Highcharts.defaultOptions &&
          Highcharts.defaultOptions.legend &&
          Highcharts.defaultOptions.legend.backgroundColor) ||
        "rgba(255, 255, 255, 0.85)",
      symbolRadius: 0,
    },

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
    series: [
      {
        data: countries.map((country) => [
          country.countryInfo.iso3,
          country.active,
          country.countryInfo.flag,
        ]),
        keys: ["iso-a3", "value", "flag"],
        joinBy: "iso-a3",
        name: "Active cases",
        states: {
          hover: {
            color: "#a4edba",
          },
        },
        dataLabels: {
          enabled: true,
          format: "{point.properties.postal}",
        },
      },
    ],
    credits: {
      enabled: false,
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
  };
  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType="mapChart"
        options={options}
      />
    </>
  );
}
