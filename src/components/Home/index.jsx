import React from 'react';
import Visualization from './Visualization';
import Statistic from './Statistic';
import Maps from './Maps';
import { Col, Row } from 'antd';
import Overview from './Overview';

function Home(props) {
  return (
    <>
      <Maps />
      <Row style={{ padding: '1rem' }} justify='space-between' gutter={[0, 16]}>
        <Col
          className='boxShadow'
          xs={{ span: 24 }}
          md={{ span: 8 }}
          xxl={{ span: 5 }}
        >
          <Overview />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 15 }} xxl={{ span: 18 }}>
          <Visualization />
        </Col>
        <Col span={24} className='boxShadow'>
          <Statistic />
        </Col>
      </Row>
    </>
  );
}

export default Home;
