import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCountriesLastestData,
  getGlobalLastestData,
} from "../../components/API/AxiosClient";

const initialState = {
  today: [],
};
export const fetchGlobalTodayData = createAsyncThunk(
  "fetchGlobalToday",
  async () => {
    const res = await getGlobalLastestData();
    return res.data;
  }
);
export const fetchCountriesTodayData = createAsyncThunk(
  "fetchCountriesToday",
  async () => {
    const res = await getCountriesLastestData();
    return res.data;
  }
);
const todayData = createSlice({
  name: "todayData",
  initialState,
  reducers: {
    resetData(state, { payload }) {
      state.today = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGlobalTodayData.fulfilled, (state, action) => {
      const { cases, deaths, todayCases, todayDeaths } = action.payload;
      state.today.push({
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
    builder.addCase(fetchCountriesTodayData.fulfilled, (state, action) => {
      action.payload.forEach((item) => {
        const { country, countryInfo, cases, deaths, todayCases, todayDeaths } =
          item;
        state.today.push({
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

const { actions, reducer } = todayData;
export { actions as TodayDataActions, reducer as TodayDataReducer };
