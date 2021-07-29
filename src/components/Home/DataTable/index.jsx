import { Button, Col, Row, Table } from "antd";
import Column from "antd/lib/table/Column";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import {
  fetchCountriesTodayData,
  fetchGlobalTodayData,
  TodayDataActions,
} from "../../../redux/slices/todayData";
import {
  fetchCountriesYesterdayData,
  fetchGlobalYesterdayData,
  YesterdayDataActions,
} from "../../../redux/slices/yesterdatData";

function DataTable(props) {
  const [filter, setFilter] = useState("today");
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const data = useSelector((state) =>
    filter === "today"
      ? state.TodayDataReducer.today
      : state.YesterdayDataReducer.yesterday
  );
  const dispatch = useDispatch();
  const getTodayData = useCallback(() => {
    dispatch(TodayDataActions.resetData());
    dispatch(fetchGlobalTodayData());
    dispatch(fetchCountriesTodayData());
  }, [dispatch]);
  const getYesterdayData = useCallback(() => {
    dispatch(YesterdayDataActions.resetData());
    dispatch(fetchGlobalYesterdayData());
    dispatch(fetchCountriesYesterdayData());
  }, [dispatch]);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    filter === "today" ? getTodayData() : getYesterdayData();
    return () => {
      clearTimeout();
    };
  }, [filter, getTodayData, getYesterdayData]);
  const handleSearchValueChange = useCallback((value) => {
    value ? setSearchValue(value.value) : setSearchValue("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  return (
    <Row justify="center">
      <Col span={23}>
        <Row
          justify="end"
          gutter={8}
          align="middle"
          style={{ margin: "1rem 0" }}
        >
          <Col xs={{ span: 11 }} md={{ span: 10 }}>
            <Select
              defaultValue={data[0]}
              name="colors"
              styles={{
                menu: (provided) => ({ ...provided, zIndex: 9999 }),
              }}
              options={data.map((item) => {
                return { value: item.info.name, label: item.info.name };
              })}
              className="basic-multi-select"
              classNamePrefix="select"
              isClearable={true}
              onChange={handleSearchValueChange}
            />
          </Col>
          <Col>
            <Button onClick={() => setFilter("today")}>Today</Button>
            <Button onClick={() => setFilter("yesterday")}>Yesterday</Button>
          </Col>
        </Row>

        {data && (
          <Table
            loading={loading}
            dataSource={
              searchValue
                ? data.filter((item) => {
                    return item.info.name === searchValue;
                  })
                : data
            }
            scroll={{ x: 1080 }}
            summary={() => (
              <Table.Summary fixed>
                <Table.Summary.Row></Table.Summary.Row>
              </Table.Summary>
            )}
          >
            <Column
              title="Name"
              dataIndex="info"
              key="name"
              render={(info) => (
                <>
                  {info?.flag && (
                    <img width="30px" src={info?.flag} alt={info.name} />
                  )}{" "}
                  <Link to={`/details/${info.name}`}>{info.name}</Link>{" "}
                </>
              )}
              fixed="left"
              width="150px"
            />
            <Column
              title="Cases - Cucumlative Total"
              dataIndex="cases"
              key="cases"
              sorter={(a, b) => a.cases - b.cases}
              defaultSortOrder="descend"
            />
            <Column
              title="Cases - newly reported in last 24 hours"
              dataIndex="todayCases"
              key="todayCases"
            />
            <Column
              title="Deaths - Cucumlative Total"
              dataIndex="deaths"
              key="deaths"
            />
            <Column
              title="Deaths - newly reported in last 24 hours"
              dataIndex="todayDeaths"
              key="todayDeaths"
            />
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default DataTable;
