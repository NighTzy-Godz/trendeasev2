import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateStoreData,
  UpdateStoreData,
} from "../../interfaces/storeInterfaces";

import { RootState } from "../store";

const storeApi = createApi({
  reducerPath: "store",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    prepareHeaders: (headers, { getState }) => {
      const token =
        localStorage.getItem("token") ||
        (getState() as RootState).auth.authToken;
      if (token) headers.set("x-auth-token", token);
      return headers;
    },
  }),
  tagTypes: ["StoreProduct", "Product", "Store"],
  endpoints(builder) {
    return {
      getMyStoreData: builder.query({
        providesTags: ["Store"],
        query: () => {
          return {
            url: "/store/getMyStoreData",
            method: "GET",
          };
        },
      }),

      createStore: builder.mutation({
        query: (body: CreateStoreData) => {
          return {
            method: "POST",
            body,
            url: "/store/createStore",
          };
        },
      }),

      updateStore: builder.mutation({
        invalidatesTags: ["Store"],
        query: (body: UpdateStoreData) => {
          return {
            method: "PUT",
            body,
            url: "/store/updateStore",
          };
        },
      }),
    };
  },
});

export const {
  useCreateStoreMutation,
  useUpdateStoreMutation,
  useGetMyStoreDataQuery,
} = storeApi;
export { storeApi };
