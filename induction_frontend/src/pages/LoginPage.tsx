import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { UseQueryResult } from "react-query";
import { useNavigate } from "react-router-dom";
import { useLoginApi } from "../hooks/useLoginApi";
import { User } from "../models/user.models";
import { Roles } from "../utils/enums";

const LoginPage: React.FunctionComponent = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const onSuccess = (user: User) => {
    console.log("success...", user);
    if (user.role == Roles.ADMIN) {
      navigate("/admin");
    }
  };
  const onError = (error: object) => {
    console.log("error...");
  };
  const {
    isLoading,
    data: user,
    isError,
    refetch,
  } = useLoginApi(email, password, onSuccess, onError) as UseQueryResult<User>;

  const onSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    refetch();
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
            disabled={isLoading}
          >
            Login
          </Button>
        </Stack>
        {isError && <Typography variant="body1">Login error</Typography>}
        <p>{user?.name}</p>
      </Box>
    </Container>
  );
};

export default LoginPage;
