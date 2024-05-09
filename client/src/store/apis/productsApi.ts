import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/product",
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
            headers: {
              "x-auth-token": localStorage.getItem("token") || "",
            },
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
} = productsApi;
export { productsApi };
