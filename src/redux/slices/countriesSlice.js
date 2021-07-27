const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");

const initialState = {};
export const fetchCountries = createAsyncThunk("fetchCountries", async () => {
  const response = await axios.get("https://disease.sh/v3/covid-19/countries");
  return response.data;
});
const countries = createSlice({
  name: "countriesSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      // Add user to the state array
      state.countries = action.payload;
    });
  },
});

const { actions, reducer } = countries;
export { actions as CountriesActions, reducer as CountriesReducer };
