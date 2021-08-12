import React, { useMemo, useRef } from 'react';
import HighStock from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

function BarChart(props) {
  const { title, data } = props;
  const theme = useSelector((state) => state.ThemeReducer.theme);
  const { t } = useTranslation();
  const chartRef = useRef();
  HighStock.setOptions({
    lang: {
      rangeSelectorZoom: 'Filter by',
      rangeSelectorFrom: t('HomePage.Visualize.Chart.Filter.From'),
      rangeSelectorTo: t('HomePage.Visualize.Chart.Filter.To'),
    },
  });
  const options = useMemo(() => {
    return {
      chart: {
        backgroundColor: 'transparent',
        height: 500,
      },
      colors: ['#185ADB', '#ff4d4f', '#52c41a'],
      rangeSelector: {
        buttonTheme: {
          // styles for the buttons
          fill: 'none',
          stroke: 'none',
          'stroke-width': 0,
          padding: 10,
          r: 5,
          style: {
            color: '#039',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          },
          states: {
            hover: {
              style: {
                color: 'black',
              },
            },
            select: {
              fill: '#039',
              style: {
                color: 'white',
              },
            },
            // disabled: { ... }
          },
        },
        buttons: [
          {
            type: 'month',
            count: 1,
            text: '1m',
            title: t('HomePage.Visualize.Chart.Filter.1_Month'),
          },
          {
            type: 'month',
            count: 3,
            text: '3m',
            title: t('HomePage.Visualize.Chart.Filter.3_Month'),
          },
          {
            type: 'month',
            count: 6,
            text: '6m',
            title: t('HomePage.Visualize.Chart.Filter.6_Month'),
          },
          {
            type: 'ytd',
            text: 'YTD',
            title: t('HomePage.Visualize.Chart.Filter.Year_to_date'),
          },
          {
            type: 'year',
            count: 1,
            text: '1y',
            title: t('HomePage.Visualize.Chart.Filter.1_Year'),
          },
          {
            type: 'all',
            text: 'All',
            title: t('HomePage.Visualize.Chart.Filter.All'),
          },
        ],
        dropdown: 'always',
        selected: 5,
        inputBoxBorderColor: 'gray',
        inputBoxWidth: 110,
        inputBoxHeight: 18,
        inputStyle: {
          color: theme === 'dark' ? '#eee' : '#039',
          fontWeight: 'bold',
        },
        labelStyle: {
          color: theme === 'dark' ? '#eee' : '#171717',
          fontWeight: 'bold',
        },
      },
      title: {
        text:
          title === 'Global'
            ? t('HomePage.Visualize.Chart.Title.Global_Situation')
            : title + ' ' + t('HomePage.Visualize.Chart.Title.Situation'),
        style: {
          fontSize: '25px',
          color: theme === 'dark' ? '#eee' : '#171717',
        },
      },
      yAxis: {
        x: 25,
        title: {
          text: ' ',
        },
        gridLineColor: 'rgba(0, 0, 0, 0.1)',
        labels: {
          style: {
            color: theme === 'dark' ? 'white' : '#0a0a0a',
          },
        },
      },
      xAxis: {
        type: 'datetime',
        labels: {
          style: {
            color: theme === 'dark' ? 'white' : '#0a0a0a',
          },
        },
      },
      scrollbar: {
        enabled: false,
      },
      legend: {
        enabled: true,
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'top',
        itemStyle: {
          color: theme === 'dark' ? '#eee' : '#171717',
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
                layout: 'vertical',
                align: 'top',
                verticalAlign: 'top',
              },
            },
          },
        ],
      },
      credits: {
        enabled: false,
      },
    };
  }, [data, t, theme, title]);

  return (
    <Row className='boxShadow'>
      <Col span={24}>
        <HighchartsReact
          highcharts={HighStock}
          constructorType={'stockChart'}
          options={options}
          ref={chartRef}
        />
      </Col>
    </Row>
  );
}

export default BarChart;
