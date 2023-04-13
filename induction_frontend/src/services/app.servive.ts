import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AuthUser, Token } from "../models/auth.model";

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASEURL }),
  endpoints: (builder) => ({
    // getLoginToken: builder.query<object, undefined>({
    //   query: () => "/users/login",
    // }),
    getLoginToken: builder.mutation<string, AuthUser>({
      query: (user) => ({ url: "/users/login", method: "POST", body: user }),
      transformResponse: (response: Token) => response.token,
    }),
  }),
});

export const { useGetLoginTokenMutation } = appApi;
