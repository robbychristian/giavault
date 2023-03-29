import { Box, CssBaseline } from "@mui/material";
import { useSession } from "next-auth/react";
import { FC, useState } from "react";
import { SideDrawer } from "../component/Drawer";
import { RegistrationAdmin } from "../component/UserRegister";
import { refetchUsers } from "../helper/userClient";
import { TableTypes } from "../typedefs/components/Table.type";
import { User } from "../typedefs/user";
import TableContainer from "./TableContainer";

interface IUserContainer {
  data: User[];
}

export const UserContainer: FC<IUserContainer> = ({ data }) => {
  const { data: session } = useSession({ required: true });
  const [userData, setUserData] = useState<any>(data);
  const refetch = () => refetchUsers(session?.user.accessToken!, setUserData);

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
        <TableContainer
          placeholder="Search by username, first name, or last name"
          data={userData}
          type={TableTypes.USER}
          hasButton={true}
          buttonText={"Add User"}
          modalChildren={<RegistrationAdmin />}
          refetch={refetch}
        />
      </Box>
    </Box>
  );
};
