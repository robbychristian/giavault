import { Box, Button, Container, Divider, Grid, InputLabel, Paper, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

const InsuranceForm = () => {
  const [dates, setDates] = useState({
    inception: new Date(),
    issueDate: new Date(),
    expiry: new Date(),
  });

  const handleSubmit = (e: any) => {
    let data: any = {};
    e.preventDefault();
    const formValues = new FormData(e.target);
    formValues.forEach((value, key) => {
      data[key] = value;
    });
    console.log(data);
  };

  return (
    <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden", marginTop: 5 }}>
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 5,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Typography component="h1" variant="h4" align="center" sx={{ mb: 5 }}>
            Add Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography id="premium" key={`prem`} component="h3" variant="h6" sx={{ fontStyle: "bold" }}>
                  Details *
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField label="Sum Assured" name="sa" fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Insurer" name="insurer" fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Assured" name="assured" fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Address" name="address" fullWidth />
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
                <TextField label="Policy" name="policy" fullWidth />
              </Grid>
              <Grid item xs={6}>
                {/* <TextField label="Expiry" name="expiry" fullWidth /> */}
                <DatePicker label="Expiry" value={moment(dates.expiry)} onChange={(e: any) => setDates({ ...dates, expiry: e! })} slotProps={{ textField: { fullWidth: true } }} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Sum Insured" name="sumInsured" fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Deductible" name="deductible" fullWidth />
              </Grid>
              <Grid item xs={6}>
                {/* <TextField label="Issue Date" name="issueDate" fullWidth /> */}
                <DatePicker label="Issue Date" value={moment(dates.issueDate)} onChange={(e: any) => setDates({ ...dates, issueDate: e! })} slotProps={{ textField: { fullWidth: true } }} />
              </Grid>
              <Grid item xs={6}>
                {/* <TextField label="Inception" name="inception" fullWidth /> */}
                <DatePicker label="Inception" value={moment(dates.inception)} onChange={(e: any) => setDates({ ...dates, inception: e! })} slotProps={{ textField: { fullWidth: true } }} />
              </Grid>
              <Grid item xs={12} mt={2} mb={1}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography id="premium" key={`prem`} component="h3" variant="h6" sx={{ fontStyle: "bold" }}>
                  Car Details *
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField label="Serial" name="serial" fullWidth />
              </Grid>
              <Grid item xs={3}>
                <TextField label="Motor" name="motor" fullWidth />
              </Grid>
              <Grid item xs={3}>
                <TextField label="Model/Make Risk" name="modelMakeRisk" fullWidth />
              </Grid>
              <Grid item xs={3}>
                <TextField label="Plate" name="plate" fullWidth />
              </Grid>
              <Grid item xs={3}>
                <TextField label="MV File" name="mvFile" fullWidth />
              </Grid>
              <Grid item xs={3}>
                <TextField label="OD" name="od" fullWidth />
              </Grid>
              <Grid item xs={3}>
                <TextField label="V-BI" name="vbi" fullWidth />
              </Grid>
              <Grid item xs={3}>
                <TextField label="V-PD" name="vpd" fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField label="THEFT" name="theft" fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Auto PA" name="autoPa" fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField label="AOG" name="aog" fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Loss of Use" name="lossOfUse" fullWidth />
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
                <TextField label="ODPREM" name="odPrem" fullWidth />
              </Grid>
              <Grid item xs={3}>
                <TextField label="THEFTPREM" name="theftPrem" fullWidth />
              </Grid>
              <Grid item xs={3}>
                <TextField label="V-BI/PREM" name="vBiOrPrem" fullWidth />
              </Grid>
              <Grid item xs={3}>
                <TextField label="V-PD/PREM" name="vPdOrPrem" fullWidth />
              </Grid>
              <Grid item xs={3}>
                <TextField label="Auto PA/PREM" name="autoPaOrPrem" fullWidth />
              </Grid>
              <Grid item xs={3}>
                <TextField label="AOG/PREM" name="aogOrPrem" fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Total Prem" name="totalPrem" fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Gross Prem" name="grossPrem" fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Loss of Use/PREM" name="lossOfUseOrPrem" fullWidth />
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Submit
              </Button>
            </Grid>
          </form>
        </LocalizationProvider>
      </Box>
    </Paper>
  );
};

export default InsuranceForm;
