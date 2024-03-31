import { combineReducers } from "@reduxjs/toolkit";
import { productsApi } from "../apis/productsApi";

export default combineReducers({
  [productsApi.reducerPath]: productsApi.reducer,
});
