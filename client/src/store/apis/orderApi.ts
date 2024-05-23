import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { AddOrderData } from "../../interfaces/orderInteraces";

const orderApi = createApi({
  reducerPath: "order",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/order",
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
      addOrder: builder.mutation({
        invalidatesTags: ["CartItem"],
        query: (order: AddOrderData) => {
          return {
            url: "/addOrder",
            method: "POST",
            body: order,
          };
        },
      }),
    };
  },
});

export const { useAddOrderMutation } = orderApi;

export { orderApi };
