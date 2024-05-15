import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const cartApi = createApi({
  reducerPath: "cart",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/cart",
    prepareHeaders: (headers, { getState }) => {
      const token =
        localStorage.getItem("token") ||
        (getState() as RootState).auth.authToken;

      if (token) {
        headers.set("x-auth-token", token);
      }
      return headers;
    },
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
          };
        },
      }),

      addToCart: builder.mutation({
        invalidatesTags: ["CartItem"],
        query: (productId) => {
          return {
            url: `/addToCart/${productId}`,
            method: "POST",
          };
        },
      }),

      deleteCart: builder.mutation({
        invalidatesTags: ["CartItem"],
        query: (cartId) => {
          return {
            url: `/deleteCart/${cartId}`,
            method: "DELETE",
          };
        },
      }),

      updateCartQty: builder.mutation({
        invalidatesTags: ["CartItem"],
        query: ({ qty, cartId }) => {
          return {
            url: `/updateCart/${cartId}`,
            method: "PUT",
            body: { qty },
          };
        },
      }),
    };
  },
});

export const {
  useAddToCartMutation,
  useGetUserCartQuery,
  useDeleteCartMutation,
  useUpdateCartQtyMutation,
} = cartApi;

export { cartApi };
