import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FC } from "react";
import { formatDate } from "@helper/date";
import { User } from "@typedefs/user";
import { Roles } from "@typedefs/roles";

interface IUserTable {
  data: User[];
}

const UserTable: FC<IUserTable> = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Creation Date</TableCell>
            <TableCell align="right">Last Login Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: User) => (
            <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row?.username}
              </TableCell>
              <TableCell align="right">{row?.firstName}</TableCell>
              <TableCell align="right">{row?.lastName}</TableCell>
              <TableCell align="right">{Roles[row?.role]}</TableCell>
              <TableCell align="right">{formatDate(row?.createdAt!)}</TableCell>
              <TableCell align="right">{row?.lastLogin ? formatDate(row?.lastLogin) : "User hasn't logged in yet"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
