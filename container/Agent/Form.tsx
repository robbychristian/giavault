import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Copyright from "@components/Copyright";
import { SideDrawer } from "@components/Drawer";
import InsuranceForm from "@components/Agent/InsuranceForm";

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
        <InsuranceForm />
      </Box>
    </Box>
  );
};

export default Form;
