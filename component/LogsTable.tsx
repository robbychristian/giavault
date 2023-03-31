import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Logs as LogType } from "@typedefs/logs";
import { FC } from "react";
import { formatDate } from "@helper/date";
import { Roles } from "@typedefs/roles";

interface ILogsTable {
  data: LogType[];
}

const LogsTable: FC<ILogsTable> = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="right">IP</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Method</TableCell>
            <TableCell align="right">Action</TableCell>
            <TableCell align="right">Date Accessed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: LogType) => (
            <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row?.username}
              </TableCell>
              <TableCell align="right">{row?.IP}</TableCell>
              <TableCell align="right">{Roles[row?.role as any] ?? "N/A"}</TableCell>
              <TableCell align="right">{row?.method}</TableCell>
              <TableCell align="right">{row?.action}</TableCell>
              <TableCell align="right">{formatDate(row?.createdAt!)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LogsTable;
