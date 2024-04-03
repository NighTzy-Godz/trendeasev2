import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginData } from "../../interfaces/userInterfaces";

const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  endpoints(builder) {
    return {
      loginUser: builder.mutation({
        query: (body: LoginData) => {
          return {
            method: "POST",
            body,
            url: "/user/loginUser",
          };
        },
      }),
    };
  },
});

export const { useLoginUserMutation } = userApi;
export { userApi };
