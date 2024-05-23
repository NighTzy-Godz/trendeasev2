// rootReducer.ts
import { Action, combineReducers } from "@reduxjs/toolkit";
import { productsApi } from "../apis/productsApi";
import uiReducer from "../slices/ui";
import { userApi } from "../apis/userApi";
import authReducer from "../slices/auth";
import userReducer from "../slices/user";
import { storeApi } from "../apis/storeApi";
import { cartApi } from "../apis/cartApi";
import { orderApi } from "../apis/orderApi";

const appReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  currUser: userReducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [storeApi.reducerPath]: storeApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
});

type RootState = ReturnType<typeof appReducer>;

const rootReducer = (
  state: RootState | undefined,
  action: Action
): RootState => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
