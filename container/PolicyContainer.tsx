import { Box, CssBaseline } from "@mui/material";
import { FC } from "react";
import { SideDrawer } from "@components/Drawer";
import TableContainer from "@containers/TableContainer";
import { TableTypes } from "@typedefs/components/Table.type";
import { InsurancePolicy } from "@typedefs/user";

interface IPolicyContainer {
  data: InsurancePolicy[];
}

export const PolicyContainer: FC<IPolicyContainer> = ({ data }) => {
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
        <TableContainer placeholder="Search by serial, plate" data={data} type={TableTypes.POLICY} />
      </Box>
    </Box>
  );
};
