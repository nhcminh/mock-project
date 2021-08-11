import React, { useState } from 'react';
import { Col, Row, Space, Typography } from 'antd';
import { useEffect } from 'react';
import Chart from '../../../HOC/Chart';
import { getHistorical } from '../../API/AxiosClient';

function Visualization(props) {
  const [data, setData] = useState({});
  useEffect(() => {
    getHistorical('all')
      .then((res) => setData(res.data))
      .catch((e) => console.log(e));
  }, []);
  const { cases, deaths, recovered } = data;
  return (
    <>
      {cases && (
        <>
          <Row gutter={24}>
            <Col xs={{ span: 24 }} md={{ span: 8 }}>
              <Space
                className='boxShadow'
                direction='vertical'
                style={{ width: '100%' }}
                align='center'
              >
                <img
                  src='https://image.flaticon.com/icons/png/512/2927/2927614.png'
                  alt='meh'
                  width='40px'
                />
                <Typography.Text style={{ fontSize: '12px' }}>
                  Lasted Cases
                </Typography.Text>
                <Typography.Paragraph
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#185ADB',
                  }}
                >
                  {Math.abs(
                    Object.values(cases)[Object.values(cases).length - 1] -
                      Object.values(cases)[Object.values(cases).length - 2]
                  ).toLocaleString()}
                </Typography.Paragraph>
              </Space>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 8 }}>
              <Space
                className='boxShadow'
                direction='vertical'
                style={{ width: '100%' }}
                align='center'
              >
                <img
                  src='https://image.flaticon.com/icons/png/512/2927/2927524.png'
                  alt='meh'
                  width='40px'
                />
                <Typography.Text style={{ fontSize: '12px' }}>
                  Lasted Deaths
                </Typography.Text>
                <Typography.Paragraph
                  type='danger'
                  style={{ fontSize: '24px', fontWeight: 'bold' }}
                >
                  {Math.abs(
                    Object.values(deaths)[Object.values(deaths).length - 1] -
                      Object.values(deaths)[Object.values(deaths).length - 2]
                  ).toLocaleString()}
                </Typography.Paragraph>
              </Space>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 8 }}>
              <Space
                className='boxShadow'
                direction='vertical'
                style={{ width: '100%' }}
                align='center'
              >
                <img
                  src='https://image.flaticon.com/icons/png/512/2927/2927764.png'
                  alt='meh'
                  width='40px'
                />
                <Typography.Text style={{ fontSize: '12px' }}>
                  Lasted Recovered
                </Typography.Text>
                <Typography.Paragraph
                  type='success'
                  style={{ fontSize: '24px', fontWeight: 'bold' }}
                >
                  {Math.abs(
                    Object.values(recovered)[
                      Object.values(recovered).length - 1
                    ] -
                      Object.values(recovered)[
                        Object.values(recovered).length - 2
                      ]
                  ).toLocaleString()}
                </Typography.Paragraph>
              </Space>
            </Col>
          </Row>
          <Chart
            title='Global'
            data={[
              { name: 'Cases', data: Object.values(cases) },
              { name: 'Deaths', data: Object.values(deaths) },
              { name: 'Recovered', data: Object.values(recovered) },
            ]}
            label='Confirmed Cases'
          />
        </>
      )}
    </>
  );
}

export default Visualization;
