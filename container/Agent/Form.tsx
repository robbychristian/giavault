import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { SideDrawer } from "@components/Drawer";
import InsuranceForm from "@components/Agent/InsuranceForm";
import { Paper } from "@mui/material";

const Form = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <SideDrawer />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900]),
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "auto", marginTop: 15, height: '80vh' }}>
          <InsuranceForm />
        </Paper>
      </Box>
    </Box>
  );
};

export default Form;
