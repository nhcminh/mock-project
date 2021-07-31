import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { getCountriesLastestData } from "../API/AxiosClient";

function SearchBar(props) {
  const [searchData, setSearchData] = useState("");
  const history = useHistory();
  useEffect(() => {
    getCountriesLastestData().then((res) => setSearchData(res.data));
  }, []);
  const handleChange = useCallback(
    (value) => {
      if (value) history.push(`/details/${value.value}`);
    },
    [history]
  );
  return (
    <>
      {searchData && (
        <Select
          name="countries"
          styles={{
            menu: (provided) => ({ ...provided, zIndex: 9999 }),
          }}
          options={searchData.map((item) => {
            return { value: item.countryInfo.iso2, label: item.country };
          })}
          className="basic-multi-select"
          classNamePrefix="select"
          isClearable={true}
          onChange={handleChange}
        />
      )}
    </>
  );
}

export default SearchBar;
