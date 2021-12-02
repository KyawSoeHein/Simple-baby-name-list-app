import { createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_NAME } from "../utils/constants";

const initialState = {
  baby_list:
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME)) == null
      ? []
      : JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME)),
  original_list: [],
  current_sort: "0",
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

      let temp =
        localStorage.getItem(LOCAL_STORAGE_NAME) == null
          ? []
          : JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
      temp.push({
        name: action.payload.trim(),
        strike: false,
        date: Date.now(),
      });

      localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(temp));

      babySlice.caseReducers._sortBabyList(state, {
        type: "baby/_sortBabyList",
        payload: state.current_sort,
      });
    },

    _changeStrike: (state, action) => {
      let temp = [...state.baby_list];
      let obj = temp[action.payload];
      obj.strike = !obj.strike;
      temp[action.payload] = obj;

      state.baby_list = [...temp];
    },

    _copyOriginalList: (state) => {
      state.original_list = [...state.baby_list];
    },

    _clearOriginalList: (state) => {
      state.baby_list = [...state.original_list];
      state.original_list = [];
    },

    _searchBaby: (state, action) => {
      state.baby_list = state.original_list.filter((element) =>
        element.name.startsWith(action.payload)
      );
    },

    _sortBabyList: (state, action) => {
      console.log("I am called");
      console.log(action);
      state.current_sort = action.payload;

      switch (action.payload) {
        case "0":
          state.baby_list = [...sortByTime(state.baby_list)];
          break;
        case "1":
          state.baby_list = [...sortByAlphbet(state.baby_list)];
          break;
        case "2":
          state.baby_list = [...sortByLength(state.baby_list)];
          break;
      }
    },
  },
});

export const {
  _addNewBaby,
  _changeStrike,
  _copyOriginalList,
  _clearOriginalList,
  _searchBaby,
  _sortBabyList,
} = babySlice.actions;

function sortByAlphbet(babyList) {
  babyList.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }

    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }

    return 0;
  });
  return babyList;
}

function sortByTime(babyList) {
  babyList.sort((a, b) => {
    console.log(a.date);
    return b.date - a.date;
  });

  return babyList;
}

function sortByLength(babyList) {
  babyList.sort((a, b) => {
    console.log(a.date);
    return a.name.length - b.name.length;
  });

  return babyList;
}

export default babySlice.reducer;
