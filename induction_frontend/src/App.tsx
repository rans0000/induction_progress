import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashPage from "./pages/AdminDashPage";
import OnboardEditPage from "./pages/OnboardEditPage";
import LoginPage from "./pages/LoginPage";
import MemberDashboardPage from "./pages/MemberDashboardPage";

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="dashboard" element={<MemberDashboardPage />}></Route>
          <Route path="/admin">
            <Route index element={<AdminDashPage />}></Route>
            <Route
              path="onboarding-tasks/create"
              element={<OnboardEditPage action="Create" />}
            ></Route>
            <Route
              path="onboarding-tasks/:taskId"
              element={<OnboardEditPage action="Edit" />}
            ></Route>
          </Route>
        </Routes>
      </Box>
    </Container>
  );
}
