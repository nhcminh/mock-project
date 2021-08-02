import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedNews: {},
};

const selectedNews = createSlice({
  name: "selectedNews",
  initialState,
  reducers: {
    changeNews(state, { payload }) {
      state.selectedNews = { ...payload };
    },
  },
});

const { actions, reducer } = selectedNews;
export { actions as SelectedNewsActions, reducer as SelectedNewsReducer };
