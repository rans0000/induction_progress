import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashPage from "./pages/AdminDashPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin">
            <Route index element={<AdminDashPage />}></Route>
          </Route>
        </Routes>
      </Box>
    </Container>
  );
}
