import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { skipToken } from "@reduxjs/toolkit/query/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  OnboardActivity,
  OnboardActivityRequest,
  OnboardActivityTask,
  OnboardActivityTaskRequest,
} from "../models/onboardActivity.model";
import { OnboardTask } from "../models/onboardtask.model";
import { User } from "../models/user.models";
import {
  useCreateOnboardActivityMutation,
  useFetchOnboardActivityQuery,
  useUpdateOnboardActivityMutation,
} from "../services/onboardactivity.service";
import { useFetchOnboardTasksQuery } from "../services/onboardtask.service";
import { ActivityStatus } from "../utils/enums";
import { RootState } from "../utils/store";

/**
 * main components
 */

const BoardActivities = () => {
  const user = useSelector((state: RootState) => state.auth.loggedInUser);
  const [activity, setActivity] = useState<OnboardActivity | null>(null);
  const { data: tasks, isSuccess: isTasksSuccess } =
    useFetchOnboardTasksQuery();
  const { data: activityRemote = null, isSuccess: isActivitySuccess } =
    useFetchOnboardActivityQuery(user?._id ?? skipToken);
  const [createOnboardActivity] = useCreateOnboardActivityMutation();
  const [updateOnboardActivity] = useUpdateOnboardActivityMutation();

  const handleToggle = (value: any) => () => {
    const tempTasks = activity!.tasks.map((task) =>
      task._id === value._id
        ? { ...task, isCompleted: !task.isCompleted }
        : task
    );
    setActivity({ ...activity, tasks: tempTasks } as OnboardActivity);
  };

  const onSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    if (!user || !activity) return;
    const request = prepareRequest(activity, activityRemote, user);
    !activityRemote
      ? await createOnboardActivity(request).unwrap()
      : await updateOnboardActivity(request).unwrap();
  };

  useEffect(() => {
    if (tasks && tasks?.length) {
      const data = prepareActivity(tasks, activityRemote, user?._id!);
      setActivity(data);
    }
  }, [tasks, isActivitySuccess]);

  /**@todo: call automatic auth api & remove the below check condition */
  if (!user) return null;

  return (
    <Container maxWidth="lg">
      <Typography variant="h5">Onboarding Activities</Typography>
      {activity !== null && activity.tasks.length > 0 && (
        <Box component="form" onSubmit={onSubmit}>
          <List dense>
            {activity.tasks.map((task) => (
              <ListItem key={task._id}>
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(task)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={task.isCompleted}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": task._id }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={task.title}
                    secondary={task.body}
                  ></ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      )}
    </Container>
  );
};

/**
 * initial vars
 */

const getInitialActivity = (userId: string): OnboardActivity => ({
  userId,
  status: ActivityStatus.PENDING,
  isMemberCompleted: false,
  tasks: [] as OnboardActivityTask[],
});

/**
 * create activity object from two apis
 */
const prepareActivity = (
  tasks: OnboardTask[],
  activityRemote: OnboardActivityRequest | null,
  userId: string
): OnboardActivity => {
  let activity = getInitialActivity(userId);

  if (activityRemote === null) {
    const activityTasks = tasks.map<OnboardActivityTask>((task) => ({
      ...task,
      isCompleted: false,
    }));
    activity.tasks = activityTasks;
  } else {
    const activityTasks = tasks.map<OnboardActivityTask>((task) => {
      const tempActivity = activityRemote.tasks.find(
        (rTask) => rTask.taskId === task._id
      );

      const tempTasks: OnboardActivityTask = {
        ...task,
        isCompleted: tempActivity?.isCompleted ?? false,
      };
      return tempTasks;
    });
    activity.tasks = activityTasks as OnboardActivityTask[];
  }
  return activity as OnboardActivity;
};

/**
 * prepare request
 */
const prepareRequest = (
  activity: OnboardActivity,
  activityRemote: OnboardActivityRequest | null,
  user: User
): OnboardActivityRequest => ({
  userId: user!._id!,
  isMemberCompleted: activity!.tasks.every((task) => task.isCompleted === true),
  status: activityRemote?.status ?? ActivityStatus.PENDING,
  tasks: activity!.tasks.map<OnboardActivityTaskRequest>((task) => ({
    taskId: task._id!,
    isCompleted: task.isCompleted,
  })),
});

export default BoardActivities;
