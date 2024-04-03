import { combineReducers } from "@reduxjs/toolkit";
import { productsApi } from "../apis/productsApi";
import uiReducer from "../slices/ui";
import { userApi } from "../apis/userApi";

export default combineReducers({
  ui: uiReducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});
