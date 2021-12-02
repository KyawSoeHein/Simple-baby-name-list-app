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

    _changeStrike: (state, action) => {
        let temp = [...state.baby_list];
        let obj = temp[action.payload];
        obj.strike = !obj.strike;
        temp[action.payload] = obj;
  
        state.baby_list = [...temp];
      },
  },
});

export const { _addNewBaby, _changeStrike } = babySlice.actions;

export default babySlice.reducer;
