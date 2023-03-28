import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { FC, useEffect, useState } from "react";
import LogsTable from "../component/LogsTable";
import { useSession } from "next-auth/react";
import { searchLogsClient } from "../helper/userLog";

interface ITable {
  placeholder: string;
  data: any[];
  hasButton?: boolean;
  buttonText?: string;
}

const TableContainer: FC<ITable> = ({ placeholder, data, hasButton, buttonText }) => {
  const { data: session } = useSession({ required: true });
  const [searchData, setSearchData] = useState<any>(data);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (searchInput.length > 1) {
      searchLogsClient(searchInput, session?.user?.accessToken!, setSearchData);
    } else if (searchInput.length <= 1) {
      setSearchData(null);
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
                <Button variant="contained" sx={{ mr: 1 }}>
                  {buttonText}
                </Button>
              )}
              {/* <Tooltip title="Reload">
                <IconButton>
                  <RefreshIcon color="inherit" sx={{ display: "block" }} />
                </IconButton>
              </Tooltip> */}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <LogsTable data={searchData ?? data} />
    </Paper>
  );
};

export default TableContainer;
