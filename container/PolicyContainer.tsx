import { Box, CssBaseline } from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import { SideDrawer } from "@components/Drawer";
import TableContainer from "@containers/TableContainer";
import { TableTypes } from "@typedefs/components/Table.type";
import { InsurancePolicy } from "@typedefs/user";
import { useSession } from "next-auth/react";
import { refetchPolicies } from "@helper/client/policy";
import MemoizedComponent from "@helper/hooks/memoization";

interface IPolicyContainer {
  data: InsurancePolicy[];
}

export const PolicyContainer: FC<IPolicyContainer> = ({ data }) => {
  const { data: session } = useSession({ required: true });
  const [policyData, setPolicyData] = useState<any>(data);

  const refetch = () => refetchPolicies(session?.user.accessToken!, setPolicyData);

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
        <MemoizedComponent dependency={[policyData, refetch]}>
          <TableContainer placeholder="Search by serial, plate" data={policyData} type={TableTypes.POLICY} refetch={refetch} />
        </MemoizedComponent>
      </Box>
    </Box>
  );
};
