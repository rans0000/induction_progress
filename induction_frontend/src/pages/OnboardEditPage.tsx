import Container from "@mui/material/Container";
import React from "react";
import OnboardAddEditTaskFormProps from "../components/OnboardAddEditTaskForm";

type OnboardEditPageProps = {
  action: "Create" | "Edit";
};

const OnboardEditPage = (props: OnboardEditPageProps) => {
  return (
    <Container maxWidth="lg">
      <OnboardAddEditTaskFormProps action={props.action} />
    </Container>
  );
};

export default OnboardEditPage;
