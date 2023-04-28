import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import React, { FC, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { searchLogsClient } from "@helper/userLog";
import { TableTypes } from "@typedefs/components/Table.type";
import { TableSwitch } from "@components/TableSwitch";
import { Box, IconButton, Modal, Tooltip, Typography } from "@mui/material";
import { searchUsersClient } from "@helper/client/user/userClient";
import RefreshIcon from "@mui/icons-material/Refresh";

interface ITable {
  placeholder: string;
  data: any[];
  type: TableTypes;
  hasButton?: boolean;
  buttonText?: string;
  modalChildren?: React.ReactNode;
  refetch?: () => void;
}

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

const TableContainer: FC<ITable> = ({ placeholder, data, hasButton, buttonText, type, modalChildren, refetch }) => {
  const { data: session } = useSession({ required: true });
  const [searchData, setSearchData] = useState<any>(data);
  const [searchInput, setSearchInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    refetch && refetch();
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (searchInput.length > 1) {
      switch (type) {
        case TableTypes.LOGS:
          searchLogsClient(searchInput, session?.user?.accessToken!, setSearchData);
          return;
        case TableTypes.USER:
          searchUsersClient(searchInput, session?.user.accessToken!, setSearchData);
          return;
        case TableTypes.POLICY:
          // to do search policy
          return;
      }
    } else if (searchInput.length <= 1) {
      setSearchData(data);
    }
  }, [searchInput]);

  return (
    <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden", marginTop: 20 }}>
      <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon color="inherit" sx={{ display: "block" }} />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder={placeholder}
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: "default" },
                }}
                variant="standard"
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </Grid>
            <Grid item>
              {!hasButton ? null : (
                <>
                  <Button variant="contained" sx={{ mr: 1 }} onClick={() => setIsModalOpen(!isModalOpen)}>
                    {buttonText}
                  </Button>
                  <Tooltip title="Reload" onClick={() => refetch && refetch()}>
                    <IconButton>
                      <RefreshIcon color="inherit" sx={{ display: "block" }} />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <TableSwitch tableType={type} data={data} searchData={searchData} refetch={refetch} />
      <Modal open={isModalOpen} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>{modalChildren}</Box>
      </Modal>
    </Paper>
  );
};

export default TableContainer;
