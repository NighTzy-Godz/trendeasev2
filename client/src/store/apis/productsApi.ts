import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),

  tagTypes: ["Product", "StoreProduct"],

  endpoints(builder) {
    return {
      getStoreProducts: builder.query({
        providesTags: ["StoreProduct"],
        query: (user) => {
          return {
            url: `/product/getStoreProducts/${user?.store}`,
            method: "GET",
            headers: {
              "x-auth-token": localStorage.getItem("token") || "",
            },
          };
        },
      }),

      addProduct: builder.mutation({
        invalidatesTags: ["StoreProduct"],
        query: (body) => {
          return {
            method: "POST",
            url: "/product/createProduct",
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

export const { useAddProductMutation, useGetStoreProductsQuery } = productsApi;
export { productsApi };
