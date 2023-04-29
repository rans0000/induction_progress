import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { OnboardActivityRequest } from "../models/onboardActivity.model";
import { prepareHeaders } from "../utils/authHeaders";

/**@todo: use code splitting */

export const onboardActivityApi = createApi({
  reducerPath: "onboardActivityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASEURL,
    prepareHeaders,
  }),
  tagTypes: ["OnboardActivities", "OnboardTasks"],
  endpoints: (builder) => ({
    fetchOnboardActivity: builder.query<OnboardActivityRequest, string>({
      query: (userId) => ({ url: `boarding-activities/user/${userId}` }),
      providesTags: ["OnboardActivities", "OnboardTasks"],
    }),
    createOnboardActivity: builder.mutation<
      OnboardActivityRequest,
      OnboardActivityRequest
    >({
      query: (activity) => {
        return {
          url: `boarding-activities/user`,
          method: "POST",
          body: activity,
        };
      },
      invalidatesTags: ["OnboardActivities", "OnboardTasks"],
    }),
    updateOnboardActivity: builder.mutation<
      OnboardActivityRequest,
      OnboardActivityRequest
    >({
      query: (activity) => {
        const userId = activity.userId;
        return {
          url: `boarding-activities/user/${userId}`,
          method: "PUT",
          body: activity,
        };
      },
      invalidatesTags: ["OnboardActivities", "OnboardTasks"],
    }),
  }),
});

export const {
  useFetchOnboardActivityQuery,
  useCreateOnboardActivityMutation,
  useUpdateOnboardActivityMutation,
} = onboardActivityApi;
