import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { OnboardTask } from "../models/onboardtask.model";
import { prepareHeaders } from "../utils/authHeaders";

export const onboardTaskApi = createApi({
  reducerPath: "onboardTaskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASEURL,
    prepareHeaders,
  }),
  tagTypes: ["OnboardTask"],
  endpoints: (builder) => ({
    fetchOnboardTasks: builder.query<OnboardTask[], void>({
      query: () => ({ url: `boarding-tasks` }),
      providesTags: ["OnboardTask"],
    }),
    createOnboardTask: builder.mutation<OnboardTask, OnboardTask>({
      query: (task: OnboardTask) => ({
        url: "boarding-tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["OnboardTask"],
    }),
    deleteOnboardTask: builder.mutation<void, string>({
      query: (taskId) => ({
        url: `boarding-tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["OnboardTask"],
    }),
  }),
});

export const {
  useFetchOnboardTasksQuery,
  useCreateOnboardTaskMutation,
  useDeleteOnboardTaskMutation,
} = onboardTaskApi;
