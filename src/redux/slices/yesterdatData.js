import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCountriesYesterdayData,
  getGlobalYesterdayData,
} from "../../components/API/AxiosClient";

const initialState = {
  yesterday: [],
};
export const fetchGlobalYesterdayData = createAsyncThunk(
  "fetchGlobalYesterday",
  async () => {
    const res = await getGlobalYesterdayData();
    return res.data;
  }
);

export const fetchCountriesYesterdayData = createAsyncThunk(
  "fetchCountriesYesterday",
  async () => {
    const res = await getCountriesYesterdayData();
    return res.data;
  }
);
const YesterdayData = createSlice({
  name: "yesterdayData",
  initialState,
  reducers: {
    resetData(state, { payload }) {
      state.yesterday = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGlobalYesterdayData.fulfilled, (state, action) => {
      const { cases, deaths, todayCases, todayDeaths } = action.payload;
      state.yesterday.push({
        key: new Date().getTime() + "global",
        info: {
          name: "Global",
          flag: "",
        },
        cases,
        deaths,
        todayCases,
        todayDeaths,
      });
    });

    builder.addCase(fetchCountriesYesterdayData.fulfilled, (state, action) => {
      action.payload.forEach((item) => {
        const { country, countryInfo, cases, deaths, todayCases, todayDeaths } =
          item;
        state.yesterday.push({
          key: new Date().getTime() + country,
          info: {
            name: country,
            iso2: countryInfo.iso2,
            flag: countryInfo.flag,
          },
          cases,
          deaths,
          todayCases,
          todayDeaths,
        });
      });
    });
  },
});

const { actions, reducer } = YesterdayData;
export { actions as YesterdayDataActions, reducer as YesterdayDataReducer };
