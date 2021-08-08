import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import axios from "axios";
import HighchartsReact from "highcharts-react-official";
import { Highcharts } from "highcharts";
import { useSelector } from "react-redux";
function PieChart(props) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState({});
  const theme = useSelector((state) => state.ThemeReducer.theme);

  useEffect(() => {
    axios
      .get("https://disease.sh/v3/covid-19/all")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
        setOptions({
          chart: {
            backgroundColor: "transparent",
            type: "pie",
          },
          colors: ["#185ADB", "#ff4d4f", "#52c41a"],
          credits: {
            enabled: false,
          },
          legend: {
            itemStyle: {
              color: theme === "dark" ? "#eee" : "#171717",
            },
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: "pointer",
              dataLabels: {
                enabled: false,
              },
              innerSize: 200,
              showInLegend: true,
              tooltip: {
                pointFormatter: function () {
                  return `${this.y.toLocaleString()}`;
                },
              },
            },
          },
          series: [
            {
              name: "Total",
              data: [
                { name: "Active", y: data.active },
                { name: "Death", y: data.deaths },
                { name: "Recovered", y: data.recovered },
              ],
            },
          ],
          title: {
            verticalAlign: "middle",
            style: {
              transform: "translate(0,-50%)",
              textAlign: "center",
              color: theme === "dark" ? "#eee" : "#171717",
            },
            text: `Total Cases<br/>${data?.cases?.toLocaleString()}`,
            useHTML: true,
          },
        });
      })
      .catch((e) => console.log(e));
  }, [data.active, data?.cases, data.deaths, data.recovered, theme]);
  return (
    <Spin spinning={isLoading}>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"chart"}
        options={options}
      />
    </Spin>
  );
}

export default PieChart;
