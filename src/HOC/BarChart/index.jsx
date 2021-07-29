import React from "react";
import HighStock from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

HighStock.setOptions({
  lang: {
    rangeSelectorZoom: "Filter by",
    rangeSelectorFrom: "From",
    rangeSelectorTo: "To",
  },
});
function BarChart(props) {
  const { title, data } = props;
  const options = {
    chart: {
      height: 500,
    },
    rangeSelector: {
      selected: 5,
      inputBoxBorderColor: "gray",
      inputBoxWidth: 110,
      inputBoxHeight: 18,
      inputStyle: {
        color: "#039",
        fontWeight: "bold",
      },
      labelStyle: {
        color: "silver",
        fontWeight: "bold",
      },
    },
    title: {
      text: title + " Situation",
      style: {
        fontSize: "25px",
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

  return (
    <>
      <HighchartsReact
        highcharts={HighStock}
        constructorType={"stockChart"}
        options={options}
      />
    </>
  );
}

export default BarChart;
