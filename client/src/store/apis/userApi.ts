import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  LoginData,
  RegisterUserData,
  UpdateUserProfileData,
} from "../../interfaces/userInterfaces";

const token = localStorage.getItem("token") || "";

const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    headers: {
      "x-auth-token": token,
    },
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
} = userApi;
export { userApi };
