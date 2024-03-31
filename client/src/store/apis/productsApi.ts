import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  endpoints(builder) {
    return {
      addProduct: builder.mutation({
        query: () => {
          return {
            method: "POST",
            url: "/",
          };
        },
      }),

      getAllProducts: builder.query({
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
