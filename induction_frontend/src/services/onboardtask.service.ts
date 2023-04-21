import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { OnboardTask } from "../models/onboardtask.model";
import { prepareHeaders } from "../utils/authHeaders";

export const onboardTaskApi = createApi({
  reducerPath: "onboardTaskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASEURL,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    fetchOnboardTasks: builder.query<OnboardTask[], void>({
      query: () => ({ url: `boarding-tasks` }),
    }),
  }),
});

export const { useFetchOnboardTasksQuery } = onboardTaskApi;
