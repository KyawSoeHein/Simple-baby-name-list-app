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
      state.baby_list = [
        ...state.baby_list,
        { name: action.payload.trim(), strike: false, date: Date.now() },
      ];
    },
  },
});

export const { _addNewBaby } = babySlice.actions;

export default babySlice.reducer;
