import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteOnboardTaskMutation,
  useFetchOnboardTasksQuery,
} from "../services/onboardtask.service";

const OnboardTasks = () => {
  const { data: tasks = [], isError } = useFetchOnboardTasksQuery();
  const [deleteOnboardTask] = useDeleteOnboardTaskMutation();
  const navigate = useNavigate();

  const onSelectTask = (taskId: string) => () => {
    navigate(`/admin/onboarding-tasks/${taskId}`);
  };

  const onDeleteTask = (taskId: string) => async () => {
    await deleteOnboardTask(taskId);
  };

  if (isError) return null;

  return (
    <Container maxWidth="lg">
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5">Onboarding Tasks</Typography>
        <Button
          variant="outlined"
          onClick={() => {
            navigate(`/admin/onboarding-tasks/create`);
          }}
        >
          Create Task
        </Button>
      </Stack>
      <List component="nav" dense>
        {tasks.length > 0 &&
          tasks.map((task) => (
            <ListItem
              key={task._id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={onDeleteTask(task._id!)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemButton onClick={onSelectTask(task._id!)}>
                <ListItemText
                  primary={task.title}
                  secondary={task.body}
                ></ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Container>
  );
};

export default OnboardTasks;
