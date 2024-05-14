import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsApi } from "./apis/productsApi";

import reducer from "./reducers/reducer";
import { userApi } from "./apis/userApi";
import { storeApi } from "./apis/storeApi";
import { cartApi } from "./apis/cartApi";

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(userApi.middleware)
      .concat(storeApi.middleware)
      .concat(cartApi.middleware),
});

export type RootState = ReturnType<typeof reducer>;

setupListeners(store.dispatch);
