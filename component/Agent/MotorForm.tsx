import { FC } from "react";
import { Divider, Grid, TextField, Typography } from "@mui/material";
import { InsurancePolicy } from "@typedefs/policy";
import { handleChange } from "@helper/objects/setter";
import { NumericFormat } from "react-number-format";

interface IMotorForm {
  data: Partial<InsurancePolicy>;
  setData: (data: InsurancePolicy) => void;
  totalPrem: any;
  setTotalPrem: any;
}
const formatNumber = (value: any) => {
  if (value != null) {
    value = parseFloat(value?.replace(/[, ]/g, ""));
    if (!isNaN(value) && value !== "") {
      const formattedValue = Number(value).toLocaleString("en-US").toString();
      return formattedValue;
    }
  }
  return "0";
};

const MotorForm: FC<IMotorForm> = ({ data, setData, totalPrem, setTotalPrem }) => {
  return (
    <Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography id="premium" key={`prem`} component="h3" variant="h6" sx={{ fontStyle: "bold" }}>
            Car Details *
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField label="Serial" name="serial" fullWidth value={data?.motor?.serial} disabled={data?._id ? true : false} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Motor" name="motor" fullWidth value={data?.motor?.motor} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Year/Model" name="modelMakeRisk" fullWidth value={data?.motor?.modelMakeRisk} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Plate" name="plate" fullWidth value={data?.motor?.plate} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="MV File" name="mvFile" fullWidth value={data?.motor?.mvFile} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography id="premium" key={`prem`} component="h3" variant="h6" sx={{ fontStyle: "bold" }}>
            Premiums *
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField label="OD Sum Insured" name="od" fullWidth value={formatNumber(data?.motor?.od)} defaultValue={0.0} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="OD Premium" name="odP" fullWidth value={formatNumber(data?.motor?.odP)} defaultValue={0.0} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="THEFT Sum Insured" name="theft" fullWidth value={formatNumber(data?.motor?.theft)} defaultValue={0.0} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="THEFT Premium" name="theftP" fullWidth value={formatNumber(data?.motor?.theftP)} defaultValue={0.0} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="V-BI Sum Insured" name="vbi" fullWidth value={formatNumber(data?.motor?.vbi)} defaultValue={0.0} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="V-BI Premium" name="vbiP" fullWidth value={formatNumber(data?.motor?.vbiP)} defaultValue={0.0} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="V-PD Sum Insured" name="vpd" fullWidth value={formatNumber(data?.motor?.vpd)} defaultValue={0.0} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="V-PD Premium" name="vpdP" fullWidth value={formatNumber(data?.motor?.vpdP)} defaultValue={0.0} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Auto PA Sum Insured" name="autoPa" fullWidth value={formatNumber(data?.motor?.autoPa)} defaultValue={0.0} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Auto PA Premium" name="autoPaP" fullWidth value={formatNumber(data?.motor?.autoPaP)} defaultValue={0.0} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="AOG Sum Insured" name="aog" fullWidth value={formatNumber(data?.motor?.aog)} defaultValue={0.0} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="AOG Premium" name="aogP" fullWidth value={formatNumber(data?.motor?.aogP)} defaultValue={0.0} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={12}>
          <NumericFormat
            fullWidth
            placeholder="Sum Insured"
            name="sumIssued"
            value={formatNumber(String(data?.motor?.other?.sumIssued))}
            customInput={TextField}
            thousandSeparator=","
            // prefix="₱"
            inputProps={{
              style: { textAlign: "right" },
              step: "any",
            }}
            onValueChange={(values, sourceInfo) => {
              console.log(values, sourceInfo);
              // handleChange(values.floatValue!);
              handleChange(sourceInfo.event, data, setData, true, true, values);
            }}
          />
        </Grid>
        {/* <Grid item xs={4}>
          <NumericFormat
            fullWidth
            placeholder="Premium"
            name="premium"
            value={Number(data?.motor?.other?.premium) ?? 0}
            customInput={TextField}
            thousandSeparator=","
            // prefix="₱"
            inputProps={{
              style: { textAlign: "right" },
              step: "any",
            }}
            onValueChange={(values, sourceInfo) => {
              console.log(values, sourceInfo);
              // handleChange(values.floatValue!);
              handleChange(sourceInfo.event, data, setData, true, true, values);
            }}
          />
        </Grid> */}
      </Grid>
    </Grid>
  );
};

export default MotorForm;
