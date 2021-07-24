import React from "react";
import { Bar } from "react-chartjs-2";

function BarChart(props) {
  const { data, sort, numCases, label, change } = props;
  const labels = Object.keys(data).map((data, index) => {
    return data;
  });
  const valuesOfData = Object.values(data).map((item, index) => {
    return change === "cucumlative"
      ? item
      : index % sort === 0
      ? item - Object.values(data)[index - sort]
      : null;
  });
  const config = {
    aspectRatio: window.innerWidth < 576 ? 1 : 3,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          callback: function (val, index) {
            return index % 16 === 0
              ? new Date(this.getLabelForValue(val)).toLocaleString("default", {
                  month: "short",
                  year: "numeric",
                })
              : "";
          },
          color: "black",
        },
      },
      y: {
        grid: {
          display: false,
        },
        beginAtZero: true,
        position: "right",
        ticks: {
          color: "black",
          callback: function (val) {
            return val > 999999
              ? Math.floor(val / 1000000) + "M"
              : Math.floor(val / 1000) + "K";
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        align: "middle",
        // position: "left",
        labels: {
          boxWidth: 0,
          font: {
            size: 10,
          },
          color: "black",
        },
        title: {
          display: true,
          color: "black",
          text: numCases,
          font: {
            size: 30,
          },
        },
      },
      tooltip: {
        callbacks: {
          footer: (tooltipItems) => {
            const { dataIndex, raw, dataset } = tooltipItems[0];
            const sum = raw - dataset.data[dataIndex - sort];
            const raito = (sum / raw) * 100;
            const filter = sort > 1 ? "Weekly" : "Daily";
            const type = sum > 0 ? "Increase" : " Decrease";
            return `${filter} ${type}: ${sum.toLocaleString()}
${filter} Change: ${raito.toLocaleString()}%`;
          },
        },
      },
    },
  };
  return (
    <>
      <Bar
        data={{
          labels: labels,
          datasets: [
            {
              label: label,
              backgroundColor: "#afadad",
              hoverBackgroundColor: "#0093d5",
              data: valuesOfData,
              barPercentage: 1.0,
              categoryPercentage: 1.0,
              barThickness: sort > 1 ? 7 : 2,
            },
          ],
        }}
        width="350px"
        height="100px"
        options={config}
      />
    </>
  );
}

export default BarChart;
