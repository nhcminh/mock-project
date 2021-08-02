import { combineReducers } from "redux";
import { SelectedNewsReducer } from "./slices/selectedNews";
import { TodayDataReducer } from "./slices/todayData";
import { YesterdayDataReducer } from "./slices/yesterdatData";
import { ThemeReducer } from "./slices/theme";
const rootReducer = combineReducers({
  SelectedNewsReducer,
  TodayDataReducer,
  YesterdayDataReducer,
  ThemeReducer,
});

export default rootReducer;
