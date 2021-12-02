import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  baby_list: [],
};

const babySlice = createSlice({
  name: "baby",
  initialState,
  reducers: {
    _addNewBaby: (state, action) => {
      state.baby_list = [...action.payload];
    },
  },
});

export const { _addNewBaby } = babySlice.actions;

export default babySlice.reducer;
