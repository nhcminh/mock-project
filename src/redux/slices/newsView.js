import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  view: "overview",
};

const newsView = createSlice({
  name: "newsView",
  initialState,
  reducers: {
    changeView(state, { payload }) {
      state.view = payload;
    },
  },
});

const { actions, reducer } = newsView;
export { actions as NewsViewActions, reducer as NewsViewReducer };
