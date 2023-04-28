import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FC, useEffect, useState } from "react";
import { formatDate } from "@helper/date";
import { InsurancePolicy, User } from "@typedefs/user";
import { Roles } from "@typedefs/roles";
import Pagination from "../Pagination";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import { DeleteUserClient } from "@helper/client/user/userClient";
import { useSession } from "next-auth/react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InsuranceForm from "@components/Agent/InsuranceForm";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  height: 500,
};

interface IPolicyTable {
  data: InsurancePolicy[];
  refetch?: () => void;
}

const PolicyTable: FC<IPolicyTable> = ({ data, refetch }) => {
  const { data: session } = useSession({ required: true });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({
    selectedData: null,
    isView: false,
  });
  const [dataIndexed, setDataIndexed] = useState({
    data: data,
    page: 0,
    offset: 5,
  });

  useEffect(() => {
    console.log("session?.user.role ", session?.user.role == Roles.ADMIN);
    setDataIndexed({ ...dataIndexed, data: data.slice(0, dataIndexed.offset) });
  }, [data]);

  useEffect(() => {
    if (selectedData.selectedData && selectedData.isView) setIsModalOpen(!isModalOpen);
  }, [selectedData]);

  const handleClose = () => {
    refetch && refetch();
    setSelectedData({ selectedData: null, isView: false });
    setIsModalOpen(!isModalOpen);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Car Serial</TableCell>
            <TableCell align="right">Issue Date</TableCell>
            <TableCell align="right">Expiry</TableCell>
            <TableCell align="center">View</TableCell>
            {session?.user.role == Roles.ADMIN ? <TableCell align="center">Delete</TableCell> : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataIndexed?.data?.map((row: InsurancePolicy) => (
            <TableRow key={row?._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row?.serial}
              </TableCell>
              <TableCell align="right">{row?.issueDate}</TableCell>
              <TableCell align="right">{row?.expiry}</TableCell>
              <TableCell align="center">
                <IconButton onClick={() => setSelectedData({ selectedData: row as any, isView: true })}>
                  <VisibilityIcon />
                </IconButton>
              </TableCell>
              {session?.user.role == Roles.ADMIN ? (
                <TableCell align="center">
                  <IconButton onClick={() => setSelectedData({ selectedData: row as any, isView: false })}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              ) : null}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination data={data} dataIndexed={dataIndexed} setDataIndexed={setDataIndexed} />
      <InsuranceModal open={isModalOpen} onClose={handleClose} data={selectedData} onConfirm={DeleteUserClient} />
    </TableContainer>
  );
};

const InsuranceModal = ({ open, onClose, onConfirm, data }: any) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Policy</DialogTitle>
      <DialogContent>
        <InsuranceForm data={data.selectedData} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PolicyTable;
