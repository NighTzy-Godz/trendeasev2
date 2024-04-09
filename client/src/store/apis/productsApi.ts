import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateProductData } from "../../interfaces/productInterfaces";

const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),

  endpoints(builder) {
    return {
      addProduct: builder.mutation({
        query: (body: CreateProductData) => {
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

// productsApi.useGetAllProductsQuery()
export const { useAddProductMutation } = productsApi;
export { productsApi };
