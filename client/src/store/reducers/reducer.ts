import { combineReducers } from "@reduxjs/toolkit";
import { productsApi } from "../apis/productsApi";
import uiReducer from "../slices/ui";
import { userApi } from "../apis/userApi";
import authReducer from "../slices/auth";
import userReducer from "../slices/user";

export default combineReducers({
  ui: uiReducer,
  auth: authReducer,
  currUser: userReducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});
