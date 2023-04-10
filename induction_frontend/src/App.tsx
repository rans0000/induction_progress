import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import AdminDashPage from "./pages/AdminDashPage";
import LoginPage from "./pages/LoginPage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          {/* 
          <Link to="/">Home</Link>
          <Link to="/login">login</Link> 
          */}
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/admin">
              <Route index element={<AdminDashPage />}></Route>
            </Route>
          </Routes>
        </Box>
      </Container>
    </QueryClientProvider>
  );
}
