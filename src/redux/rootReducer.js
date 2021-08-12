import { combineReducers } from 'redux';
import { SelectedNewsReducer } from './slices/selectedNews';
import { TodayDataReducer } from './slices/todayData';
import { YesterdayDataReducer } from './slices/yesterdatData';
import { ThemeReducer } from './slices/theme';
import { LanguageReducer } from './slices/language';
const rootReducer = combineReducers({
  SelectedNewsReducer,
  TodayDataReducer,
  YesterdayDataReducer,
  ThemeReducer,
  LanguageReducer,
});

export default rootReducer;
