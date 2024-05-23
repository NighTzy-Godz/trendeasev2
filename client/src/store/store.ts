// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import rootReducer from "./reducers/reducer";
import { productsApi } from "./apis/productsApi";
import { userApi } from "./apis/userApi";
import { storeApi } from "./apis/storeApi";
import { cartApi } from "./apis/cartApi";
import { orderApi } from "./apis/orderApi";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(userApi.middleware)
      .concat(storeApi.middleware)
      .concat(cartApi.middleware)
      .concat(orderApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;

// Define the store's dispatch type
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
