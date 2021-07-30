import { Button, Card, Col, List, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useMemo } from "react";
import { getNews } from "../API/AxiosClient";
function News(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitLoading, setIsInitLoading] = useState(true);
  const [isLoadMore, setIsLoadMore] = useState(true);
  const [newsList, setNewsList] = useState({});
  const [data, setData] = useState([]);
  useEffect(() => {
    getNews()
      .then((res) => {
        setNewsList(res.data);
        setData(res.data.data.splice(0, 8));
        setIsInitLoading(false);
        setTimeout(setIsLoading(false), 1500);
      })
      .catch((e) => console.log(e));
  }, []);
  const onLoadMore = useCallback(() => {
    if (newsList.data.splice(data.length, 8).length < 8) {
      setIsLoadMore(false);
    }
    setData([...data, ...newsList.data.splice(data.length, 8)]);
  }, [data, newsList.data]);
  const loadMore = useMemo(() => {
    return !isInitLoading ? (
      <div
        style={{
          display: isLoadMore ? "block" : "none",
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;
  }, [isInitLoading, isLoadMore, onLoadMore]);

  return (
    <>
      <Row justify={"center"}>
        <Col span={22} style={{ padding: "2rem 0" }}>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 4,
              xxl: 4,
            }}
            dataSource={data}
            loadMore={loadMore}
            loading={isInitLoading}
            renderItem={(item) => (
              <List.Item>
                <Card
                  title={item.tradeName[0]}
                  actions={[<span>Read more...</span>]}
                  loading={isLoading}
                >
                  <Typography.Title
                    level={5}
                    style={{ width: 200 }}
                    ellipsis={true}
                  >
                    Category: {item.medicationClass}
                  </Typography.Title>
                  <Typography.Text style={{ width: 200 }} ellipsis={true}>
                    {item.details}
                  </Typography.Text>
                </Card>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
}

export default News;
