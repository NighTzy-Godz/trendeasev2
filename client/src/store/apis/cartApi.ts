import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cartApi = createApi({
  reducerPath: "cart",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/cart",
  }),
  endpoints(builder) {
    return {
      addToCart: builder.mutation({
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

export const { useAddToCartMutation } = cartApi;

export { cartApi };
