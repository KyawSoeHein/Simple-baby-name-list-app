import { configureStore } from "@reduxjs/toolkit";
import babySlice from "./reducer";

const store = configureStore({
  reducer: babySlice,
});

export default store;
