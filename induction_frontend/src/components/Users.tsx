import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React from "react";
import { useFetchUsersQuery } from "../services/user.service";

const Users = () => {
  const { data: users = [], isError } = useFetchUsersQuery();

  if (isError) {
    return null;
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h5">Onboarding Tasks</Typography>
      <List>
        {users.length > 0 &&
          users.map((user) => (
            <ListItem key={user._id}>
              <ListItemText
                primary={user.name}
                secondary={user.role}
              ></ListItemText>
            </ListItem>
          ))}
      </List>
    </Container>
  );
};

export default Users;
