import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

const InsuranceForm = () => {
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
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField label="SA" name="sa" fullWidth />
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
        <Grid item xs={6}>
          <TextField label="Policy" name="policy" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Issue Date" name="issueDate" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Inception" name="inception" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Expiry" name="expiry" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Model/Make Risk" name="modelMakeRisk" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Plate" name="plate" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Sum Insured" name="sumInsured" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Total Prem" name="totalPrem" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Gross Prem" name="grossPrem" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Deductible" name="deductible" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Serial" name="serial" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Motor" name="motor" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="MV File" name="mvFile" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="OD" name="od" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="THEFT" name="theft" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="V-BI" name="vbi" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="V-PD" name="vpd" fullWidth />
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
        <Grid item xs={6}>
          <TextField label="ODPREM" name="odPrem" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="THEFTPREM" name="theftPrem" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="V-BI/PREM" name="vBiOrPrem" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="V-PD/PREM" name="vPdOrPrem" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Auto PA/PREM" name="autoPaOrPrem" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="AOG/PREM" name="aogOrPrem" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Loss of Use/PREM" name="lossOfUseOrPrem" fullWidth />
        </Grid>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Submit
        </Button>
      </Grid>
    </form>
  );
};

export default InsuranceForm;
