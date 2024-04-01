import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  tagTypes: ["Product"],
  endpoints(builder) {
    return {
      addProduct: builder.mutation({
        invalidatesTags: ["Product"],
        query: () => {
          return {
            method: "POST",
            url: "/",
          };
        },
      }),

      getAllProducts: builder.query({
        // providesTags: (result, error, user) => {
        //   return [{ type: "Product", id: user.id }];
        // },
        query: () => {
          return {
            url: "/product/getAllProducts",

            method: "GET",
          };
        },
      }),
    };
  },
});

// productsApi.useGetAllProductsQuery()
export const { useGetAllProductsQuery } = productsApi;
export { productsApi };
