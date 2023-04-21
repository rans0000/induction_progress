import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React from "react";
import { useFetchOnboardTasksQuery } from "../services/onboardtask.service";

const BoardingTasks = () => {
  const { data: tasks = [], isError } = useFetchOnboardTasksQuery();

  if (isError) {
    return null;
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h5">Onboarding Tasks</Typography>
      <List>
        {tasks.length > 0 &&
          tasks.map((task) => (
            <ListItem key={task._id}>
              <ListItemText primary={task.title}></ListItemText>
            </ListItem>
          ))}
      </List>
    </Container>
  );
};

export default BoardingTasks;
