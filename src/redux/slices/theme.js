import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};

const theme = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme(state, { payload }) {
      state.theme = payload;
    },
  },
});

const { actions, reducer } = theme;
export { actions as ThemeActions, reducer as ThemeReducer };
