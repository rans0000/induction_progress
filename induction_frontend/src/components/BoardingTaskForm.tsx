import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { OnboardTask } from "../models/onboardtask.model";
import { useCreateOnboardTaskMutation } from "../services/onboardtask.service";

const initialTask = {
  title: "",
  body: "",
  enabled: true,
};

const BoardingTaskForm = () => {
  const navigate = useNavigate();
  const [createOnboardTask] = useCreateOnboardTaskMutation();
  const [task, setTask] = useState<OnboardTask>(initialTask as OnboardTask);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    console.log(task);
    await createOnboardTask(task);
    navigate(-1);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h6">Forms</Typography>
      <Stack
        component="form"
        noValidate
        autoComplete="off"
        direction="column"
        spacing={2}
        onSubmit={onSubmit}
      >
        <TextField
          name="title"
          label="Title"
          variant="outlined"
          value={task.title}
          onChange={onChange}
        />
        <TextField
          multiline
          minRows={4}
          name="body"
          label="Description"
          variant="outlined"
          value={task.body}
          onChange={onChange}
        />
        <Button type="submit" variant="contained" size="large">
          Submit
        </Button>
      </Stack>
    </Container>
  );
};

export default BoardingTaskForm;
