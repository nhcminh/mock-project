import { Typography } from 'antd';
import React from 'react';
import PieChart from './PieChart';

function Overview(props) {
  return (
    <>
      <Typography.Title className='textCenter'>Overview</Typography.Title>
      <PieChart />
    </>
  );
}

export default Overview;
