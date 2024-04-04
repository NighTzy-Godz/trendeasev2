import { combineReducers } from "@reduxjs/toolkit";
import { productsApi } from "../apis/productsApi";
import uiReducer from "../slices/ui";
import { userApi } from "../apis/userApi";
import authReducer from "../slices/auth";

export default combineReducers({
  ui: uiReducer,
  auth: authReducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});
