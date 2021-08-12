import { Button, Col, List, Row, Skeleton, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getNews } from '../API/AxiosClient';
import { SelectedNewsActions } from '../../redux/slices/selectedNews';
import { useTranslation } from 'react-i18next';
function News(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitLoading, setIsInitLoading] = useState(true);
  const [count, setCount] = useState(4);
  const [newsList, setNewsList] = useState([]);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const getData = useCallback(
    (callback) => {
      getNews(count)
        .then((res) => {
          callback(res);
        })
        .catch((e) => console.log(e));
    },
    [count]
  );
  useEffect(() => {
    getData((res) => {
      setIsInitLoading(false);
      setData(res.data);
      setNewsList(res.data);
    });
  }, [getData]);
  const onLoadMore = useCallback(() => {
    setIsLoading(true);
    setNewsList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
        }))
      )
    );
    getData((res) => {
      const newData = data.concat(res.data);
      setNewsList(newData);
      setData(newData);
      setIsLoading(false);
      setCount(count + 4);
      // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
      // In real scene, you can using public method of react-virtualized:
      // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
      window.dispatchEvent(new Event('resize'));
    });
  }, [count, data, getData]);

  const loadMore = useMemo(() => {
    return !isInitLoading && !isLoading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>{t('NewsPage.BtnLoadMore')}</Button>
      </div>
    ) : null;
  }, [isInitLoading, isLoading, onLoadMore, t]);
  const handleNewsSelect = (news) => {
    dispatch(SelectedNewsActions.changeNews(news));
  };
  return (
    <>
      <Row justify={'center'}>
        <Col span={22}>
          <Typography.Title style={{ textAlign: 'center' }}>
            {t('NewsPage.Title')}
          </Typography.Title>
          <List
            dataSource={newsList}
            loadMore={loadMore}
            loading={isInitLoading}
            itemLayout='vertical'
            size='large'
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    onClick={() => {
                      handleNewsSelect(item);
                    }}
                  >
                    {t('NewsPage.BtnReadMore')}
                  </Button>,
                ]}
                extra={<img alt='cover' src={item.urlToImage} width={272} />}
              >
                <Skeleton title={false} loading={item.loading} active>
                  <List.Item.Meta
                    title={
                      <Link
                        to={`/news/${item.id}`}
                        onClick={() => {
                          handleNewsSelect(item);
                        }}
                      >
                        {item.title}
                      </Link>
                    }
                    description={
                      <Typography.Paragraph
                        style={{ fontStyle: 'italic', fontSize: '14px' }}
                        ellipsis={{ rows: 1 }}
                      >
                        {item.description}
                      </Typography.Paragraph>
                    }
                  />
                  <Typography.Paragraph ellipsis={{ rows: 2 }}>
                    {item.content}
                  </Typography.Paragraph>
                </Skeleton>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
}

export default News;
