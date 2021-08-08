import { Button, Col, Row, Space, Table } from "antd";
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

function Statistic(props) {
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
    <>
      <Row justify="end" gutter={8} align="middle">
        <Col xs={{ span: 24 }} md={{ span: 10 }}>
          <Select
            defaultValue={data[0]}
            name="colors"
            styles={{
              menu: (provided) => ({ ...provided, zIndex: 9999 }),
              option: (styles, { isDisabled, isFocused, isSelected }) => {
                return {
                  ...styles,
                  backgroundColor: isDisabled
                    ? null
                    : isSelected
                    ? "#185ADB"
                    : isFocused
                    ? "#d9e2ec"
                    : null,
                  color: isDisabled ? "#ccc" : isSelected ? "white" : "black",
                  cursor: isDisabled ? "not-allowed" : "default",
                };
              },
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
          scroll={{ x: 768 }}
          summary={() => (
            <Table.Summary fixed>
              <Table.Summary.Row></Table.Summary.Row>
            </Table.Summary>
          )}
          pagination={{ responsive: true }}
        >
          <Column
            title="Name"
            dataIndex="info"
            key="name"
            render={(info) => (
              <Space>
                {info?.flag && (
                  <img width="30px" src={info?.flag} alt={info.name} />
                )}
                <Link to={`/details/${info.iso2}`}>{info.name}</Link>
              </Space>
            )}
            fixed="left"
            ellipsis={true}
            width="150px"
          />
          <Column
            title="Total Cases"
            dataIndex="cases"
            key="cases"
            sorter={(a, b) => a.cases - b.cases}
            render={(cases) => cases.toLocaleString()}
            align="right"
          />
          <Column
            title="Total Deaths"
            dataIndex="deaths"
            key="deaths"
            sorter={(a, b) => a.cases - b.cases}
            render={(deaths) => deaths.toLocaleString()}
            align="right"
          />
          <Column
            title={filter === "today" ? "Today Cases" : "Yesterday Cases"}
            dataIndex="todayCases"
            key="todayCases"
            sorter={(a, b) => a.cases - b.cases}
            render={(cases) => cases.toLocaleString()}
            align="right"
          />
          <Column
            title={filter === "today" ? "Today Deaths" : "Yesterday Deaths"}
            dataIndex="todayDeaths"
            key="todayDeaths"
            sorter={(a, b) => a.cases - b.cases}
            render={(deaths) => deaths.toLocaleString()}
            align="right"
          />
        </Table>
      )}
    </>
  );
}

export default Statistic;