import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "../models/user.models";
import { prepareHeaders } from "../utils/authHeaders";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASEURL,
    prepareHeaders,
  }),
  endpoints: (builer) => ({
    fetchUsers: builer.query<User[], void>({
      query: () => ({ url: "users" }),
    }),
  }),
});

export const { useFetchUsersQuery } = userApi;
