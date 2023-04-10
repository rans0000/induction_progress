import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React from "react";

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
      {tabValue === 0 && <div>Tasks</div>}
      {tabValue === 1 && <div>Users</div>}
    </Container>
  );
};

export default AdminDashPage;
