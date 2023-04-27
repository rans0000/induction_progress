import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { skipToken } from "@reduxjs/toolkit/query/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { OnboardActivity } from "../models/onboardActivity.model";
import { OnboardTask } from "../models/onboardtask.model";
import { useFetchOnboardActivityQuery } from "../services/onboardactivity.service";
import { useFetchOnboardTasksQuery } from "../services/onboardtask.service";
import { ActivityStatus } from "../utils/enums";
import { RootState } from "../utils/store";

const getInitialActivity = (userId: string): OnboardActivity => ({
  userId,
  isCompleted: false,
  tasks: [] as OnboardTask[],
});

const prepareActivity = (
  tasks: OnboardTask[],
  activityRemote: OnboardActivity,
  userId: string
): OnboardActivity => {
  let activity = getInitialActivity(userId);
  // tasks.map(task => act);
  if (activityRemote === null) {
    const activityTasks = tasks.map((task) => ({
      ...task,
      status: ActivityStatus.PENDING,
    }));
    activity.tasks = activityTasks;
  } else {
    const activityTasks = tasks.map((task) => {
      const tempActivity = activityRemote.tasks.filter(
        (rTask) => rTask._id === task._id
      );
      return tempActivity
        ? { ...task, ...activityRemote }
        : { ...task, status: ActivityStatus.PENDING };
    });
    activity.tasks = activityTasks;
  }
  console.log(tasks, activityRemote, activity);
  return activity as OnboardActivity;
};

const BoardActivities = () => {
  const user = useSelector((state: RootState) => state.auth.loggedInUser);
  const { data: tasks, isSuccess: isTasksSuccess } =
    useFetchOnboardTasksQuery();
  const { data: activityRemote, isSuccess: isActivitySuccess } =
    useFetchOnboardActivityQuery(user?._id ?? skipToken);

  useEffect(() => {
    if (isActivitySuccess && tasks) {
      const activity = prepareActivity(tasks, activityRemote, user?._id!);
    }
  }, [isActivitySuccess]);

  if (!user) return null;

  return (
    <Container maxWidth="lg">
      <Typography variant="h5">Onboarding Activities</Typography>
      {tasks?.map((task) => (
        <p key={task._id}>{task.title}</p>
      ))}
    </Container>
  );
};

export default BoardActivities;
