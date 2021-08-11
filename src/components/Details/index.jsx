import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Chart from '../../HOC/Chart';
import PageNotFound from '../PageNotFound';
import Visualization from '../Home/Visualization';
import { getHistorical } from '../API/AxiosClient';
import { Col, Row, Space, Spin, Typography } from 'antd';
function Details(props) {
  const area = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    if (area.name !== 'Global')
      getHistorical(area.name)
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        })
        .catch((e) => {
          setIsError(true);
        });
  }, [area.name]);
  return (
    <>
      {area.name === 'Global' && <Visualization />}
      <Spin spinning={isLoading}>
        {isError ? (
          <PageNotFound />
        ) : (
          data.timeline && (
            <>
              <Col md={{ span: 24 }}>
                <img
                  src={`https://disease.sh/assets/img/flags/${area.name.toLowerCase()}.png`}
                  alt={area.name.toLowerCase()}
                  style={{ display: 'block', margin: '1rem auto' }}
                />
              </Col>
              <Row justify='center'>
                <Col span={23}>
                  <Row gutter={24} justify='space-between'>
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
                          Today Case
                        </Typography.Text>
                        <Typography.Paragraph
                          style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#185ADB',
                          }}
                        >
                          {Math.abs(
                            Object.values(data?.timeline.cases)[
                              Object.values(data?.timeline.cases).length - 1
                            ] -
                              Object.values(data?.timeline.cases)[
                                Object.values(data?.timeline.cases).length - 2
                              ]
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
                          Today Death
                        </Typography.Text>
                        <Typography.Paragraph
                          type='danger'
                          style={{ fontSize: '24px', fontWeight: 'bold' }}
                        >
                          {Math.abs(
                            Object.values(data?.timeline.deaths)[
                              Object.values(data?.timeline.deaths).length - 1
                            ] -
                              Object.values(data?.timeline.deaths)[
                                Object.values(data?.timeline.deaths).length - 2
                              ]
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
                          Today Recovered
                        </Typography.Text>
                        <Typography.Paragraph
                          type='success'
                          style={{ fontSize: '24px', fontWeight: 'bold' }}
                        >
                          {Math.abs(
                            Object.values(data?.timeline.recovered)[
                              Object.values(data?.timeline.recovered).length - 1
                            ] -
                              Object.values(data?.timeline.recovered)[
                                Object.values(data?.timeline.recovered).length -
                                  2
                              ]
                          ).toLocaleString()}
                        </Typography.Paragraph>
                      </Space>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row justify='center'>
                <Col span={23}>
                  <Chart
                    title={data.country}
                    data={[
                      {
                        name: 'Cases',
                        data: Object.values(data?.timeline.cases),
                      },
                      {
                        name: 'Deaths',
                        data: Object.values(data?.timeline.deaths),
                      },
                      {
                        name: 'Recoverd',
                        data: Object.values(data?.timeline.recovered),
                      },
                    ]}
                  />
                </Col>
              </Row>
            </>
          )
        )}
      </Spin>
    </>
  );
}

export default Details;
