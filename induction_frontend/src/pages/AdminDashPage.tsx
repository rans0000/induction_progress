import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React from "react";
import OnboardTasks from "../components/OnboardTasks";
import Users from "../components/Users";

const AdminDashPage = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const onChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Tabs value={tabValue} onChange={onChangeTab}>
        <Tab label="Tasks" />
        <Tab label="Users" />
      </Tabs>
      <Box sx={{ p: 2 }} />
      {tabValue === 0 && <OnboardTasks />}
      {tabValue === 1 && <Users />}
    </Container>
  );
};

export default AdminDashPage;
