import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashPage from "./pages/AdminDashPage";
import BoardingEditPage from "./pages/BoardingEditPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin">
            <Route index element={<AdminDashPage />}></Route>
            <Route
              path="onboarding-tasks/ceate"
              element={<BoardingEditPage />}
            ></Route>
            <Route
              path="onboarding-tasks/:taskId"
              element={<BoardingEditPage />}
            ></Route>
          </Route>
        </Routes>
      </Box>
    </Container>
  );
}
