import { combineReducers } from "redux";
import { CountriesReducer } from "./slices/countriesSlice";
import { NewsViewReducer } from "./slices/newsView";
import { TodayDataReducer } from "./slices/todayData";
import { YesterdayDataReducer } from "./slices/yesterdatData";
const rootReducer = combineReducers({
  CountriesReducer,
  NewsViewReducer,
  TodayDataReducer,
  YesterdayDataReducer,
});

export default rootReducer;
