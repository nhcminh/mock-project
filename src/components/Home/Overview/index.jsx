import { Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import PieChart from './PieChart';

function Overview(props) {
  const { t } = useTranslation();
  return (
    <>
      <Typography.Title className='textCenter'>
        {t('HomePage.Overview.Title')}
      </Typography.Title>
      <PieChart />
    </>
  );
}

export default Overview;
