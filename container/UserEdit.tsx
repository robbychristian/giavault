import { useState, ChangeEvent, FC } from "react";
import Head from "next/head";
import { Container, Tabs, Tab, Grid, CssBaseline } from "@mui/material";
import { styled } from "@mui/material/styles";
import UserEdit from "../component/UserEdit";
import { Box } from "@mui/system";
import { SideDrawer } from "../component/Drawer";
import { User } from "../typedefs/user";

export interface IUserSetting {
  data: User;
}

const UserSetting: FC<IUserSetting> = ({ data }) => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Head>
          <title>User Settings</title>
        </Head>
        <CssBaseline />
        <SideDrawer />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900]),
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            mt: 5,
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
              <Grid item xs={12}>
                <UserEdit data={data} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default UserSetting;
