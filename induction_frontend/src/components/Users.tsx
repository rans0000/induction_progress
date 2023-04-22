import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
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
      <Typography variant="h5">Users</Typography>
      <List dense component="nav">
        {users.length > 0 &&
          users.map((user) => (
            <ListItem key={user._id}>
              <ListItemButton>
                <ListItemText
                  primary={user.name}
                  secondary={user.role}
                ></ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Container>
  );
};

export default Users;
