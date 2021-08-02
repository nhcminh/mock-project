import React, { useEffect, useMemo, useRef } from "react";
import HighStock from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { useSelector } from "react-redux";

HighStock.setOptions({
  lang: {
    rangeSelectorZoom: "Filter by",
    rangeSelectorFrom: "From",
    rangeSelectorTo: "To",
  },
});
function BarChart(props) {
  const { title, data } = props;
  const theme = useSelector((state) => state.ThemeReducer.theme);
  const chart = useRef();
  useEffect(() => {
    const chartObj = chart.current.chart;
    chartObj.showLoading();
    if (data) {
      chartObj.hideLoading();
    }
  }, [data]);
  const options = useMemo(() => {
    return {
      chart: {
        backgroundColor: theme === "light" ? "#eeeeee" : "rgba(20,20,20,1)",
        height: 500,
      },
      colors: ["#77a1e5", "#c42525", "#a6c96a"],
      rangeSelector: {
        buttonTheme: {
          // styles for the buttons
          fill: "none",
          stroke: "none",
          "stroke-width": 0,
          padding: 10,
          r: 5,
          style: {
            color: "#039",
            fontWeight: "bold",
            textTransform: "uppercase",
          },
          states: {
            hover: {},
            select: {
              fill: "#039",
              style: {
                color: "white",
              },
            },
            // disabled: { ... }
          },
        },
        selected: 5,
        inputBoxBorderColor: "gray",
        inputBoxWidth: 110,
        inputBoxHeight: 18,
        inputStyle: {
          color: theme === "dark" ? "#eee" : "#039",
          fontWeight: "bold",
        },
        labelStyle: {
          color: theme === "dark" ? "#eee" : "#171717",
          fontWeight: "bold",
        },
      },
      title: {
        text: title + " Situation",
        style: {
          fontSize: "25px",
          color: theme === "dark" ? "#eee" : "#171717",
        },
      },
      yAxis: {
        title: {
          text: "Number of Cases",
        },
      },
      xAxis: {
        type: "datetime",
      },
      scrollbar: {
        enabled: false,
      },
      legend: {
        enabled: true,
        layout: "vertical",
        align: "top",
        verticalAlign: "middle",
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
          pointStart: Date.UTC(2020, 0, 22),
          pointInterval: 24 * 3600 * 1000, // one day
        },
      },
      series: data,
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
              },
            },
          },
        ],
      },
      credits: {
        enabled: false,
      },
    };
  }, [data, theme, title]);

  return (
    <>
      <HighchartsReact
        highcharts={HighStock}
        constructorType={"stockChart"}
        options={options}
        ref={chart}
      />
    </>
  );
}

export default BarChart;
