import { Box, Button, Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { FC, useState } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { InsurancePolicy } from "@typedefs/user";
import { AddPolicy, UpdatePolicy } from "@helper/client/policy";
import { useSession } from "next-auth/react";
import SnackBarComponent from "@components/Snackbar";

interface IInsuranceForm {
  data?: InsurancePolicy;
  onClose?: () => void;
}

const InsuranceForm: FC<IInsuranceForm> = ({ data, onClose }) => {
  const { data: session } = useSession({ required: true });
  const [snackbar, setSnackbar] = useState<any>({
    isOpen: false,
    isError: false,
    message: null,
  });

  const [dates, setDates] = useState({
    inception: new Date(),
    issueDate: new Date(),
    expiry: new Date(),
  });

  const handleSubmit = (e: any) => {
    let dataSubmit: any = {};
    e.preventDefault();
    const formValues = new FormData(e.target);
    formValues.forEach((value, key) => {
      dataSubmit[key] = value;
    });

    if (data?._id) {
      const { _id } = data;
      UpdatePolicy({ ...dataSubmit, ...dates, _id }, session?.user.accessToken!, setSnackbar);
      return onClose && onClose();
    }

    return AddPolicy({ ...dataSubmit, ...dates }, session?.user.accessToken!, setSnackbar);
  };

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
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography id="premium" key={`prem`} component="h3" variant="h6" sx={{ fontStyle: "bold" }}>
                  Details *
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField label="Sum Assured" name="sa" fullWidth defaultValue={data?.sa} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Insurer" name="insurer" fullWidth defaultValue={data?.insurer} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Assured" name="assured" fullWidth defaultValue={data?.assured} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Address" name="address" fullWidth defaultValue={data?.address} />
              </Grid>
              <Grid item xs={12} mt={2} mb={1}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography id="premium" key={`prem`} component="h3" variant="h6" sx={{ fontStyle: "bold" }}>
                  Policy *
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField label="Policy" name="policy" fullWidth defaultValue={data?.policy} />
              </Grid>
              <Grid item xs={6}>
                <DatePicker label="Expiry" value={moment(dates.expiry)} onChange={(e: any) => setDates({ ...dates, expiry: e! })} slotProps={{ textField: { fullWidth: true } }} defaultValue={data?.expiry} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Sum Insured" name="sumInsured" fullWidth defaultValue={data?.sumInsured} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Deductible" name="deductible" fullWidth defaultValue={data?.deductible} />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  label="Issue Date"
                  value={data?.issueDate ? moment(data?.issueDate) : moment(dates.issueDate)}
                  onChange={(e: any) => setDates({ ...dates, issueDate: e! })}
                  slotProps={{ textField: { fullWidth: true } }}
                  defaultValue={data?.issueDate}
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  label="Inception"
                  value={data?.inception ? moment(data.inception) : moment(dates.inception)}
                  onChange={(e: any) => setDates({ ...dates, inception: e! })}
                  slotProps={{ textField: { fullWidth: true } }}
                  defaultValue={data?.inception}
                />
              </Grid>
              <Grid item xs={12} mt={2} mb={1}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography id="premium" key={`prem`} component="h3" variant="h6" sx={{ fontStyle: "bold" }}>
                  Details *
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField label="Serial" name="serial" fullWidth defaultValue={data?.serial} disabled={data?.serial ? true : false} />
              </Grid>
              <Grid item xs={3}>
                <TextField label="Motor" name="motor" fullWidth defaultValue={data?.motor} />
              </Grid>
              <Grid item xs={3}>
                <TextField label="Model/Make Risk" name="modelMakeRisk" fullWidth defaultValue={data?.modelMakeRisk} />
              </Grid>
              <Grid item xs={3}>
                <TextField label="Plate" name="plate" fullWidth defaultValue={data?.plate} />
              </Grid>
              <Grid item xs={3}>
                <TextField label="MV File" name="mvFile" fullWidth defaultValue={data?.mvFile} />
              </Grid>
              <Grid item xs={3}>
                <TextField label="OD" name="od" fullWidth defaultValue={data?.od} />
              </Grid>
              <Grid item xs={3}>
                <TextField label="V-BI" name="vbi" fullWidth defaultValue={data?.vbi} />
              </Grid>
              <Grid item xs={3}>
                <TextField label="V-PD" name="vpd" fullWidth defaultValue={data?.vpd} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="THEFT" name="theft" fullWidth defaultValue={data?.theft} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Auto PA" name="autoPa" fullWidth defaultValue={data?.autoPa} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="AOG" name="aog" fullWidth defaultValue={data?.aog} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Loss of Use" name="lossOfUse" fullWidth defaultValue={data?.lossOfUse} />
              </Grid>
              <Grid item xs={12} mt={2} mb={1}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography id="premium" key={`prem`} component="h3" variant="h6" sx={{ fontStyle: "bold" }}>
                  Premium *
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField label="ODPREM" name="odPrem" fullWidth defaultValue={data?.odPrem} />
              </Grid>
              <Grid item xs={3}>
                <TextField label="THEFTPREM" name="theftPrem" fullWidth defaultValue={data?.theftPrem} />
              </Grid>
              <Grid item xs={3}>
                <TextField label="V-BI/PREM" name="vBiOrPrem" fullWidth defaultValue={data?.vBiOrPrem} />
              </Grid>
              <Grid item xs={3}>
                <TextField label="V-PD/PREM" name="vPdOrPrem" fullWidth defaultValue={data?.vPdOrPrem} />
              </Grid>
              <Grid item xs={3}>
                <TextField label="Auto PA/PREM" name="autoPaOrPrem" fullWidth defaultValue={data?.autoPaOrPrem} />
              </Grid>
              <Grid item xs={3}>
                <TextField label="AOG/PREM" name="aogOrPrem" fullWidth defaultValue={data?.aogOrPrem} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Total Prem" name="totalPrem" fullWidth defaultValue={data?.totalPrem} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Gross Prem" name="grossPrem" fullWidth defaultValue={data?.grossPrem} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Loss of Use/PREM" name="lossOfUseOrPrem" fullWidth defaultValue={data?.lossOfUseOrPrem} />
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
