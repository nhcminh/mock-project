import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lang: localStorage.getItem('lang') || 'en',
};

const languageSlice = createSlice({
  name: 'languageSlice',
  initialState,
  reducers: {
    function(state, { payload }) {
      state.lang = payload;
    },
  },
});

const { actions, reducer } = languageSlice;

export { actions as LanguageActions, reducer as LanguageReducer };
