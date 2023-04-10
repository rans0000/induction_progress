import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Link to="/">Home</Link>
        <Link to="/login">login</Link>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Box>
    </Container>
  );
}
