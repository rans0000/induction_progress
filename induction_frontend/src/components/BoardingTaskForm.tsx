import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import type { OnboardTask } from "../models/onboardtask.model";

type BoardingTaskFormProps = {
  action: "Create" | "Edit";
  task: OnboardTask;
  onSubmit: (task: OnboardTask) => void;
};

const BoardingTaskForm = (props: BoardingTaskFormProps) => {
  const [task, setTask] = useState<OnboardTask>(props.task);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    props.onSubmit(task);
  };

  useEffect(() => {
    setTask(props.task);
  }, [props.task]);

  return (
    <Container maxWidth="lg">
      <Typography variant="h6">{props.action} Task</Typography>
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
