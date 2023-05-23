import { FC } from "react";
import { Grid, TextField } from "@mui/material";
import { InsurancePolicy } from "@typedefs/policy";
import { handleChange } from "@helper/objects/setter";

interface IMotorForm {
  data: Partial<InsurancePolicy>;
  setData: (data: InsurancePolicy) => void;
}

const MotorForm: FC<IMotorForm> = ({ data, setData }) => {
  return (
    <Grid>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField label="Serial" name="serial" fullWidth defaultValue={data?.motor?.serial} disabled={data?._id ? true : false} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={3}>
          <TextField label="Motor" name="motor" fullWidth defaultValue={data?.motor?.motor} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={3}>
          <TextField label="Model/Make Risk" name="modelMakeRisk" fullWidth defaultValue={data?.motor?.modelMakeRisk} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={3}>
          <TextField label="Plate" name="plate" fullWidth defaultValue={data?.motor?.plate} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={3}>
          <TextField label="MV File" name="mvFile" fullWidth defaultValue={data?.motor?.mvFile} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={3}>
          <TextField label="OD" name="od" fullWidth defaultValue={data?.motor?.od} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={3}>
          <TextField label="V-BI" name="vbi" fullWidth defaultValue={data?.motor?.vbi} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={3}>
          <TextField label="V-PD" name="vpd" fullWidth defaultValue={data?.motor?.vpd} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="THEFT" name="theft" fullWidth defaultValue={data?.motor?.theft} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Auto PA" name="autoPa" fullWidth defaultValue={data?.motor?.autoPa} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="AOG" name="aog" fullWidth defaultValue={data?.motor?.aog} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Loss of Use" name="lossOfUse" fullWidth defaultValue={data?.motor?.lossOfUse} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MotorForm;
