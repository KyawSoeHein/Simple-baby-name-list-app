import { createSlice } from "@reduxjs/toolkit";
import demo from "../demo";

const initialState = {
  baby_list: demo,
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
