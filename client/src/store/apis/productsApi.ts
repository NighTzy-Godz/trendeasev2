import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/product",
    prepareHeaders: (headers, { getState }) => {
      const token =
        localStorage.getItem("token") ||
        (getState() as RootState).auth.authToken;

      if (token) headers.set("x-auth-token", token);
      return headers;
    },
  }),

  tagTypes: ["Product", "StoreProduct"],

  endpoints(builder) {
    return {
      getStoreProducts: builder.query({
        providesTags: ["StoreProduct"],
        query: (user) => {
          return {
            url: `/getStoreProducts/${user?.store}`,
            method: "GET",
          };
        },
      }),

      getAllProducts: builder.query({
        query: (params) => {
          return {
            url: "/getAllProducts",
            method: "GET",
            params,
          };
        },
      }),

      getProductDetails: builder.query({
        query: (productId) => {
          return {
            url: `/getProductDetails/${productId}`,
            method: "GET",
          };
        },
      }),

      addProduct: builder.mutation({
        invalidatesTags: ["StoreProduct"],
        query: (body) => {
          return {
            method: "POST",
            url: "/createProduct",
            body,
            headers: {
              "x-auth-token": localStorage.getItem("token") || "",
            },
          };
        },
      }),
    };
  },
});

export const {
  useAddProductMutation,
  useGetStoreProductsQuery,
  useGetProductDetailsQuery,
  useGetAllProductsQuery,
} = productsApi;
export { productsApi };
