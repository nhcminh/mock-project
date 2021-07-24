import { combineReducers } from "redux";
import { CountriesReducer } from "./slices/countriesSlice";

const rootReducer = combineReducers({
  CountriesReducer,
});

export default rootReducer;
