import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import { getCountriesLastestData } from '../API/AxiosClient';

function SearchBar(props) {
  const [searchData, setSearchData] = useState('');
  const history = useHistory();
  const { t } = useTranslation();
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
          className='basic-multi-select'
          classNamePrefix='select'
          name='countries'
          styles={{
            menu: (provided) => ({ ...provided, zIndex: 9999 }),
            option: (styles, { isDisabled, isFocused, isSelected }) => {
              return {
                ...styles,
                backgroundColor: isDisabled
                  ? null
                  : isSelected
                  ? '#185ADB'
                  : isFocused
                  ? '#d9e2ec'
                  : null,
                color: isDisabled ? '#ccc' : isSelected ? 'white' : 'black',
                cursor: isDisabled ? 'not-allowed' : 'default',
              };
            },
          }}
          options={searchData.map((item) => {
            return { value: item.countryInfo.iso2, label: item.country };
          })}
          isClearable={true}
          onChange={handleChange}
          placeholder={t('Header.SearchBar.Select')}
        />
      )}
    </>
  );
}

export default SearchBar;
