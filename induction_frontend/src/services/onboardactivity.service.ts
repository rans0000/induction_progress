import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "../utils/authHeaders";

export const onboardActivityApi = createApi({
  reducerPath: "onboardActivityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASEURL,
    prepareHeaders,
  }),
  tagTypes: ["OnboardActivities"],
  endpoints: (builder) => ({
    fetchOnboardActivity: builder.query<any, string>({
      query: (userId) => ({ url: `boarding-activities/${userId}` }),
      providesTags: ["OnboardActivities"],
    }),
  }),
});

export const { useFetchOnboardActivityQuery } = onboardActivityApi;
