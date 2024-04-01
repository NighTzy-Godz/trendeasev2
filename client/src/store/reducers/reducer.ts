import { combineReducers } from "@reduxjs/toolkit";
import { productsApi } from "../apis/productsApi";
import uiReducer from "../slices/ui";

export default combineReducers({
  ui: uiReducer,
  [productsApi.reducerPath]: productsApi.reducer,
});
