import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import OnboardTaskForm from "../components/OnboardTaskForm";
import { OnboardTask } from "../models/onboardtask.model";
import {
  useCreateOnboardTaskMutation,
  useFetchOnboardTaskQuery,
  useUpdateOnboardTaskMutation,
} from "../services/onboardtask.service";

type OnboardAddEditTaskFormProps = {
  action: "Create" | "Edit";
};

const initialTask = {
  title: "",
  body: "",
  enabled: true,
} as OnboardTask;

const OnboardAddEditTaskForm = (props: OnboardAddEditTaskFormProps) => {
  const navigate = useNavigate();
  const { taskId = "" } = useParams();
  const { data: task = initialTask as OnboardTask } = useFetchOnboardTaskQuery(
    taskId || "",
    {
      skip: props.action === "Create",
    }
  );
  const [updateOnboardTask] = useUpdateOnboardTaskMutation();
  const [createOnboardTask] = useCreateOnboardTaskMutation();

  const onCreateTask = async (taskObj: OnboardTask) => {
    await createOnboardTask(taskObj).unwrap();
    navigate(-1);
  };

  const onUpdateTask = async (taskObj: OnboardTask) => {
    await updateOnboardTask(taskObj).unwrap();
    navigate(-1);
  };

  return (
    <>
      <Typography variant="h5">Onboarding Details</Typography>
      <OnboardTaskForm
        action={props.action}
        task={task}
        onSubmit={props.action === "Create" ? onCreateTask : onUpdateTask}
      />
    </>
  );
};

export default OnboardAddEditTaskForm;
