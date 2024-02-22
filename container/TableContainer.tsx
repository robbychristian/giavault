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
import { Box, Container, Dialog, DialogActions, DialogContent, IconButton, Modal, Tooltip, Typography, DialogTitle } from "@mui/material";
import { searchUsersClient } from "@helper/client/user/userClient";
import RefreshIcon from "@mui/icons-material/Refresh";
import { searchPolicyClient } from "@helper/client/policy";

interface ITable {
  placeholder: string;
  data: any[];
  type: TableTypes;
  hasButton?: boolean;
  buttonText?: string;
  modalChildren?: React.ReactNode;
  refetch?: () => void;
}

const TableContainer: FC<ITable> = ({ placeholder, data, hasButton, buttonText, type, modalChildren, refetch }) => {
  const { data: session } = useSession({ required: true });
  const [searchData, setSearchData] = useState<any>(null);
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
          searchPolicyClient(searchInput, session?.user.accessToken!, setSearchData);
          return;
      }
    } else if (searchInput.length <= 1) {
      setSearchData(null);
    }
  }, [searchInput]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ maxWidth: "auto", margin: "auto", overflow: "hidden" }}>
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
        <Dialog open={isModalOpen} onClose={handleClose} maxWidth="lg">
          <DialogTitle>
            <Typography component="h1" variant="h4" align="center" sx={{ mb: 5 }}>
              Add Form
            </Typography>
          </DialogTitle>
          <DialogContent>{modalChildren}</DialogContent>
          <DialogActions>
            <Button form="policyForm" type="submit" onClick={() => handleClose()} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {"Submit"}
            </Button>
            {/* <Button variant="contained" onClick={onPrint}>
              <LocalPrintshopIcon /> Print
            </Button> */}
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default TableContainer;
