import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AuthUser, Token } from "../models/auth.model";
import { User } from "../models/user.models";
import { prepareHeaders } from "../utils/authHeaders";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASEURL,
    prepareHeaders: prepareHeaders,
  }),

  endpoints: (builder) => ({
    fetchLoginToken: builder.mutation<Token, AuthUser>({
      query: (user) => ({ url: "/users/login", method: "POST", body: user }),
      transformResponse: (response: Token) => response,
    }),

    fetchLoggedInUser: builder.mutation<User, void>({
      query: () => ({ url: "/users/current-user", method: "GET" }),
      transformResponse: (response: User) => response,
    }),
  }),
});

export const { useFetchLoginTokenMutation, useFetchLoggedInUserMutation } =
  authApi;
