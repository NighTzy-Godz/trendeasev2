import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  LoginData,
  RegisterUserData,
  UpdateUserProfileData,
} from "../../interfaces/userInterfaces";

const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  endpoints(builder) {
    return {
      getUserData: builder.query({
        query: () => {
          return {
            method: "GET",
            url: "/user/getUserData",
            headers: {
              "x-auth-token": localStorage.getItem("token") || "",
            },
          };
        },
      }),

      loginUser: builder.mutation({
        query: (body: LoginData) => {
          return {
            method: "POST",
            body,
            url: "/user/loginUser",
          };
        },
      }),

      updateUser: builder.mutation({
        query: (body: UpdateUserProfileData) => {
          return {
            method: "PUT",
            body,
            url: "/user/updateUser",
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

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useUpdateUserMutation,
  useGetUserDataQuery,
} = userApi;
export { userApi };
