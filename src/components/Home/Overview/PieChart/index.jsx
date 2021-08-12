import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import axios from 'axios';
import HighchartsReact from 'highcharts-react-official';
import { Highcharts } from 'highcharts';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
function PieChart(props) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const theme = useSelector((state) => state.ThemeReducer.theme);
  const { t } = useTranslation();
  useEffect(() => {
    axios
      .get('https://disease.sh/v3/covid-19/all')
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);
  const options = useMemo(() => {
    return {
      chart: {
        backgroundColor: 'transparent',
        type: 'pie',
      },
      colors: ['#185ADB', '#ff4d4f', '#52c41a'],
      credits: {
        enabled: false,
      },
      legend: {
        itemStyle: {
          color: theme === 'dark' ? '#eee' : '#171717',
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
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
          name: t('HomePage.Overview.PieChart.Title'),
          data: [
            {
              name: t('HomePage.Overview.PieChart.Legends.Active'),
              y: data.active,
            },
            {
              name: t('HomePage.Overview.PieChart.Legends.Deaths'),
              y: data.deaths,
            },
            {
              name: t('HomePage.Overview.PieChart.Legends.Recovered'),
              y: data.recovered,
            },
          ],
        },
      ],
      title: {
        verticalAlign: 'middle',
        style: {
          transform: 'translate(0,-50%)',
          textAlign: 'center',
          color: theme === 'dark' ? '#eee' : '#171717',
        },
        text: `${t(
          'HomePage.Overview.PieChart.Title'
        )}<br/>${data?.cases?.toLocaleString()}`,
        useHTML: true,
      },
    };
  }, [data.active, data?.cases, data.deaths, data.recovered, t, theme]);
  return (
    <Spin spinning={isLoading}>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'chart'}
        options={options}
      />
    </Spin>
  );
}

export default React.memo(PieChart);
