import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginData, RegisterUserData } from "../../interfaces/userInterfaces";

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
      registerUser: builder.mutation({
        query: (body: RegisterUserData) => {
          return {
            method: "POST",
            body,
            url: "/user/registerUser",
          };
        },
      }),
    };
  },
});

export const { useLoginUserMutation, useRegisterUserMutation } = userApi;
export { userApi };
