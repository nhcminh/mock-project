import { Button, Col, List, Row, Skeleton, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getNews } from "../API/AxiosClient";
import { SelectedNewsActions } from "../../redux/slices/selectedNews";
import { fetchGlobalYesterdayData } from "../../redux/slices/yesterdatData";
function News(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitLoading, setIsInitLoading] = useState(true);
  const [count, setCount] = useState(4);
  const [newsList, setNewsList] = useState([]);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
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
      setData(res.data.articles);
      setNewsList(res.data.articles);
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
      const newData = data.concat(res.data.articles);
      setNewsList(newData);
      setData(newData);
      setIsLoading(fetchGlobalYesterdayData);
      setCount(count + 4);
      // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
      // In real scene, you can using public method of react-virtualized:
      // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
      window.dispatchEvent(new Event("resize"));
    });
  }, [count, data, getData]);

  const loadMore = useMemo(() => {
    return !isInitLoading && !isLoading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;
  }, [isInitLoading, isLoading, onLoadMore]);
  const handleNewsSelect = (news) => {
    dispatch(SelectedNewsActions.changeNews(news));
  };
  return (
    <>
      <Row justify={"center"} style={{ marginTop: "1rem" }}>
        <Col span={22} style={{ padding: "2rem 0", backgroundColor: "white" }}>
          <Typography.Title style={{ textAlign: "center" }}>
            Covid News
          </Typography.Title>
          <List
            dataSource={newsList}
            loadMore={loadMore}
            loading={isInitLoading}
            itemLayout="vertical"
            size="large"
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    onClick={() => {
                      handleNewsSelect(item);
                    }}
                  >
                    Read More
                  </Button>,
                ]}
                extra={<img alt="cover" src={item.urlToImage} width={272} />}
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
                        style={{ fontStyle: "italic", fontSize: "14px" }}
                        ellipsis={{ rows: 1 }}
                      >
                        {item.description}
                      </Typography.Paragraph>
                    }
                  />
                  <Typography.Paragraph ellipsis={{ rows: 2 }}>
                    {item.content.slice(0, 200)}
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
