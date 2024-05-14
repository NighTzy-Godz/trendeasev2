import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cartApi = createApi({
  reducerPath: "cart",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/cart",
  }),

  tagTypes: ["CartItem"],
  endpoints(builder) {
    return {
      getUserCart: builder.query({
        providesTags: ["CartItem"],
        query: () => {
          return {
            url: "/getUserCart",
            method: "GET",
            headers: {
              "x-auth-token": localStorage.getItem("token") || "",
            },
          };
        },
      }),

      addToCart: builder.mutation({
        invalidatesTags: ["CartItem"],
        query: (productId) => {
          return {
            url: `/addToCart/${productId}`,
            method: "POST",
            headers: {
              "x-auth-token": localStorage.getItem("token") || "",
            },
          };
        },
      }),
    };
  },
});

export const { useAddToCartMutation, useGetUserCartQuery } = cartApi;

export { cartApi };
