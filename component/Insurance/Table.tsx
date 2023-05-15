import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FC, useEffect, useState } from "react";
import { formatDate } from "@helper/date";
import { InsurancePolicy } from "@typedefs/user";
import { Roles } from "@typedefs/roles";
import Pagination from "../Pagination";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InsuranceForm from "@components/Agent/InsuranceForm";
import { DeletePolicy } from "@helper/client/policy";

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
  // to-do: range date
  const { data: session } = useSession({ required: true });
  const [selectedData, setSelectedData] = useState({
    selectedData: null,
    isUpdate: false,
    isDelete: false,
  });

  const [dataIndexed, setDataIndexed] = useState({
    data: data,
    page: 0,
    offset: 5,
  });

  useEffect(() => {
    console.log("data changing", data);
    setDataIndexed({ ...dataIndexed, data: data.slice(0, dataIndexed.offset) });
  }, [data]);

  // useEffect(() => {
  //   if (selectedData.selectedData && selectedData.isView) setIsModalOpen({ ...isModalOpen, updateModal: !isModalOpen.updateModal });
  //   if (selectedData.selectedData && !selectedData.isView) setIsModalOpen({ ...isModalOpen, deleteModal: !isModalOpen.deleteModal });
  // }, [selectedData.selectedData]);

  const handleClose = () => {
    refetch && refetch();
    setSelectedData({ selectedData: null, isUpdate: false, isDelete: false });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Serial</TableCell>
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
              <TableCell align="right">{formatDate(row?.issueDate)}</TableCell>
              <TableCell align="right">{formatDate(row?.expiry)}</TableCell>
              <TableCell align="center">
                <IconButton onClick={() => setSelectedData({ ...selectedData, selectedData: row as any, isUpdate: true })}>
                  <VisibilityIcon />
                </IconButton>
              </TableCell>
              {session?.user.role == Roles.ADMIN ? (
                <TableCell align="center">
                  <IconButton onClick={() => setSelectedData({ ...selectedData, selectedData: row as any, isDelete: true })}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              ) : null}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination data={data} dataIndexed={dataIndexed} setDataIndexed={setDataIndexed} />
      <InsuranceModal open={selectedData.isUpdate} onClose={handleClose} data={selectedData} />
      <InsuranceModalDelete open={selectedData.isDelete} onClose={handleClose} data={selectedData} onConfirm={DeletePolicy} />
    </TableContainer>
  );
};

export const InsuranceModal = ({ open, onClose, data }: any) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle>Edit Policy</DialogTitle>
      <DialogContent>
        <InsuranceForm data={data.selectedData} onClose={onClose} />
      </DialogContent>
      <DialogActions>
        {data?.selectedData?.updatedByAgent ? (
          <Typography display="flex" alignItems="start" sx={{ textAlign: "left" }}>
            Updated by {data?.selectedData?.updatedByAgentName} on {formatDate(data?.selectedData?.updatedAt!)}
          </Typography>
        ) : null}
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

const InsuranceModalDelete = ({ open, onClose, onConfirm, data, session }: any) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle>Delete Policy</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete "{data?.selectedData?.serial}"? This action cannot be undone.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onConfirm(data?.selectedData?._id, session?.user.accessToken, onClose)} color="error" autoFocus>
          Delete
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
export default PolicyTable;
