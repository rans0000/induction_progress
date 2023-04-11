import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useLoginApi } from "../hooks/useLoginApi";

const LoginPage: React.FunctionComponent = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSuccess = () => {
    console.log("success...");
  };
  const onError = () => {
    console.log("error...");
  };
  const {
    isLoading,
    data: userDetails,
    isError,
    refetch,
  } = useLoginApi(email, password, onSuccess, onError);

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
          <Button variant="contained" size="large" type="submit">
            Login
          </Button>
        </Stack>
        <p>{userDetails?.name}</p>
      </Box>
    </Container>
  );
};

export default LoginPage;
