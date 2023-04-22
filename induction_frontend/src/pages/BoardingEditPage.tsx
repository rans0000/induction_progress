import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import React from "react";
import BoardingTaskForm from "../components/BoardingTaskForm";

const BoardingEditPage = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h5">Onboarding Details</Typography>
      <BoardingTaskForm />
    </Container>
  );
};

export default BoardingEditPage;
