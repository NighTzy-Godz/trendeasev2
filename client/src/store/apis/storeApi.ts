import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateStoreData } from "../../interfaces/storeInterfaces";
import { IProduct } from "../../interfaces/productInterfaces";

const storeApi = createApi({
  reducerPath: "store",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  tagTypes: ["StoreProduct", "Product"],
  endpoints(builder) {
    return {
      createStore: builder.mutation({
        query: (body: CreateStoreData) => {
          return {
            method: "POST",
            body,
            url: "/store/createStore",
            headers: {
              "x-auth-token": localStorage.getItem("token") || "",
            },
          };
        },
      }),
    };
  },
});

export const { useCreateStoreMutation } = storeApi;
export { storeApi };
