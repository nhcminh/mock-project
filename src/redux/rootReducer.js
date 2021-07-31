import { combineReducers } from "redux";
import { SelectedNewsReducer } from "./slices/selectedNews";
import { TodayDataReducer } from "./slices/todayData";
import { YesterdayDataReducer } from "./slices/yesterdatData";
const rootReducer = combineReducers({
  SelectedNewsReducer,
  TodayDataReducer,
  YesterdayDataReducer,
});

export default rootReducer;
