import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useFetchOnboardTasksQuery } from "../services/onboardtask.service";

const BoardingTasks = () => {
  const { data: tasks = [], isError } = useFetchOnboardTasksQuery();
  const navigate = useNavigate();

  const onSelectTask = (taskId: string) => () => {
    console.log("details page...");
    // navigate(`/admin/onboarding-tasks/${taskId}`);
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
      <List component="nav">
        {tasks.length > 0 &&
          tasks.map((task) => (
            <ListItemButton key={task._id} onClick={onSelectTask(task._id)}>
              <ListItemText
                primary={task.title}
                secondary={task.body}
              ></ListItemText>
            </ListItemButton>
          ))}
      </List>
    </Container>
  );
};

export default BoardingTasks;
