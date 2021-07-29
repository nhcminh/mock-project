import { combineReducers } from "redux";
import { NewsViewReducer } from "./slices/newsView";
import { TodayDataReducer } from "./slices/todayData";
import { YesterdayDataReducer } from "./slices/yesterdatData";
const rootReducer = combineReducers({
  NewsViewReducer,
  TodayDataReducer,
  YesterdayDataReducer,
});

export default rootReducer;
