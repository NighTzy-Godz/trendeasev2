import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  LoginData,
  RegisterUserData,
  UpdateUserPasswordData,
  UpdateUserProfileData,
} from "../../interfaces/userInterfaces";
import { RootState } from "../store";

const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
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

  tagTypes: ["User"],
  endpoints(builder) {
    return {
      getUserData: builder.query({
        providesTags: ["User"],
        query: () => {
          return {
            method: "GET",
            url: "/user/getUserData",
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

      updateUserPassword: builder.mutation({
        query: (body: UpdateUserPasswordData) => {
          return {
            url: "/user/changePassword",
            method: "PUT",
            body,
          };
        },
      }),

      updateUser: builder.mutation({
        invalidatesTags: ["User"],
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
  useUpdateUserPasswordMutation,
} = userApi;
export { userApi };
