import React, { useMemo, useRef } from "react";
import HighStock from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { useSelector } from "react-redux";
import { Col, Row } from "antd";
import { useEffect } from "react";

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
  const chartRef = useRef();
  useEffect(() => {}, [theme]);
  const options = useMemo(() => {
    return {
      chart: {
        backgroundColor: "transparent",
        height: 500,
        events: {
          load: function () {
            console.log(this.rangeSelector);
            this.rangeSelector.dropdown.style.backgroundColor =
              theme === "dark" ? "white" : "gainbroso";
            this.rangeSelector.dropdown.style.color =
              theme === "light" ? "black" : "black";
          },
        },
      },
      colors: ["#185ADB", "#ff4d4f", "#52c41a"],
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
            hover: {
              style: {
                color: "black",
              },
            },
            select: {
              fill: "#039",
              style: {
                color: "white",
              },
            },
            // disabled: { ... }
          },
        },
        dropdown: "always",
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
          text: " ",
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
        layout: "horizontal",
        align: "center",
        verticalAlign: "top",
        itemStyle: {
          color: theme === "dark" ? "#eee" : "#171717",
        },
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
                layout: "vertical",
                align: "top",
                verticalAlign: "top",
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
    <Row className="boxShadow">
      <Col span={24}>
        <HighchartsReact
          highcharts={HighStock}
          constructorType={"stockChart"}
          options={options}
          ref={chartRef}
        />
      </Col>
    </Row>
  );
}

export default BarChart;
