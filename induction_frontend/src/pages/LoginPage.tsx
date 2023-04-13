import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux.hooks";
import {
  useFetchLoggedInUserMutation,
  useFetchLoginTokenMutation,
} from "../services/auth.servive";
import { saveLoggedInUser, saveLoginToken } from "../state/auth.slice";
import { Roles } from "../utils/enums";

const LoginPage: React.FunctionComponent = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fetchLoginToken] = useFetchLoginTokenMutation();
  const [fetchLoggedInUser] = useFetchLoggedInUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      const { token } = await fetchLoginToken({ email, password }).unwrap();
      dispatch(saveLoginToken(token));
      const user = await fetchLoggedInUser().unwrap();
      dispatch(saveLoggedInUser(user));

      if (user.role == Roles.ADMIN) {
        navigate("/admin");
      }
    } catch (err) {}
  };

  return (
    <Container>
      <Box component="form" noValidate autoComplete="off" onSubmit={onSubmit}>
        <Stack spacing={2} direction="column" alignItems="center">
          <Typography variant="h4">Login</Typography>
          <TextField
            focused
            label="email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            label="password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            variant="contained"
            size="large"
            type="submit"
            // disabled={isLoading}
          >
            Login
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default LoginPage;
