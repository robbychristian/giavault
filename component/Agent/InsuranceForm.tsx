import { Box, Button, Divider, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import React, { FC, useEffect, useState } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { InsurancePolicy, PolicyTypes } from "@typedefs/policy";
import { AddPolicy, UpdatePolicy } from "@helper/client/policy";
import { useSession } from "next-auth/react";
import SnackBarComponent from "@components/Snackbar";
import GiaForm from "./GiaForm";
import FormRenderer from "./FormRenderer";
import Remarks from "./Remarks";
import { useRouter } from "next/router";

interface IInsuranceForm {
  data?: InsurancePolicy;
  onClose?: () => void;
}

const InsuranceForm: FC<IInsuranceForm> = ({ data, onClose }) => {
  const router = useRouter();
  const [entries, setEntries] = useState<Partial<InsurancePolicy>>(
    data ?? {
      type: PolicyTypes.MOTOR, // default
    }
  );
  const { data: session } = useSession({ required: true });
  const [snackbar, setSnackbar] = useState<any>({
    isOpen: false,
    isError: false,
    message: null,
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (data?._id) {
      const { _id } = data;
      UpdatePolicy({ ...entries, _id }, session?.user.accessToken!, setSnackbar);
      return onClose && onClose();
    }
    AddPolicy({ ...entries }, session?.user.accessToken!, setSnackbar);
    return router.push("/insurance/list");
  };

  useEffect(() => {
    console.log("entries", entries);
  }, [entries]);

  return (
    <>
      <SnackBarComponent setSnackbar={setSnackbar} snackbar={snackbar} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 5,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterMoment}>
          {data?._id ? null : (
            <Typography component="h1" variant="h4" align="center" sx={{ mb: 5 }}>
              Add Form
            </Typography>
          )}
          <form
            onSubmit={handleSubmit}
            onKeyDown={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography id="premium" key={`prem`} component="h3" variant="h6" sx={{ fontStyle: "bold" }}>
                  GIA Details *
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <GiaForm data={entries} setData={setEntries} />
              </Grid>
              <Grid item xs={12}>
                <Typography id="premium" key={`prem`} component="h3" variant="h6" sx={{ fontStyle: "bold" }}>
                  Policy Type *
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Policy Type"
                  value={entries?.type}
                  name="type"
                  // onChange={(e) => setEntries({ ...entries, type: e.target.value as PolicyTypes })}
                  onChange={(e) => {
                    const newType = e.target.value as PolicyTypes;
                    const updatedEntries = { ...entries };
                    if (entries.hasOwnProperty(entries.type!?.toLowerCase())) {
                      delete updatedEntries[entries.type!.toLowerCase() as keyof InsurancePolicy];
                    }
                    updatedEntries.type = newType;
                    setEntries(updatedEntries);
                  }}
                >
                  <MenuItem value="">Select Policy Type</MenuItem>
                  {Object.values(PolicyTypes).map((policyType) => (
                    <MenuItem key={policyType} value={policyType}>
                      {policyType}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography id="premium" key={`prem`} component="h3" variant="h6" sx={{ fontStyle: "bold" }}>
                  Details *
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormRenderer data={entries} setData={setEntries} type={entries?.type as PolicyTypes} />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography id="premium" key={`prem`} component="h3" variant="h6" sx={{ fontStyle: "bold" }}>
                  Remarks *
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Remarks data={entries} setData={setEntries} />
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                {data?._id ? "Update" : "Submit"}
              </Button>
            </Grid>
          </form>
        </LocalizationProvider>
      </Box>
    </>
  );
};

export default InsuranceForm;
