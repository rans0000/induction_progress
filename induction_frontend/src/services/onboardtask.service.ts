import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { OnboardTask } from "../models/onboardtask.model";
import { prepareHeaders } from "../utils/authHeaders";

export const onboardTaskApi = createApi({
  reducerPath: "onboardTaskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASEURL,
    prepareHeaders,
  }),
  tagTypes: ["OnboardTasks"],
  endpoints: (builder) => ({
    fetchOnboardTasks: builder.query<OnboardTask[], void>({
      query: () => ({ url: `boarding-tasks` }),
      providesTags: ["OnboardTasks"],
    }),
    fetchOnboardTask: builder.query<OnboardTask, string>({
      query: (taskId: string) => ({ url: `boarding-tasks/${taskId}` }),
      providesTags: ["OnboardTasks"],
    }),
    createOnboardTask: builder.mutation<OnboardTask, OnboardTask>({
      query: (task: OnboardTask) => ({
        url: "boarding-tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["OnboardTasks"],
    }),
    deleteOnboardTask: builder.mutation<void, string>({
      query: (taskId) => ({
        url: `boarding-tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["OnboardTasks"],
    }),
  }),
});

export const {
  useFetchOnboardTasksQuery,
  useFetchOnboardTaskQuery,
  useCreateOnboardTaskMutation,
  useDeleteOnboardTaskMutation,
} = onboardTaskApi;
