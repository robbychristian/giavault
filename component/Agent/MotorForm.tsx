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
          <TextField label="OD Sum Insured" name="od" fullWidth value={data?.motor?.od} defaultValue={0.0} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="OD Premium" name="odP" fullWidth value={data?.motor?.odP} defaultValue={0.0} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="THEFT Sum Insured" name="theft" fullWidth value={Number(data?.motor?.theft) ?? 0} defaultValue={0.0} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="THEFT Premium" name="theftP" fullWidth value={Number(data?.motor?.theftP) ?? 0} defaultValue={0.0} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="V-BI Sum Insured" name="vbi" fullWidth value={Number(data?.motor?.vbi) ?? 0} defaultValue={0.0} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="V-BI Premium" name="vbiP" fullWidth value={Number(data?.motor?.vbiP) ?? 0} defaultValue={0.0} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="V-PD Sum Insured" name="vpd" fullWidth value={Number(data?.motor?.vpd) ?? 0} defaultValue={0.0} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="V-PD Premium" name="vpdP" fullWidth value={Number(data?.motor?.vpdP) ?? 0} defaultValue={0.0} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Auto PA Sum Insured" name="autoPa" fullWidth value={Number(data?.motor?.autoPa) ?? 0} defaultValue={0.0} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Auto PA Premium" name="autoPaP" fullWidth value={Number(data?.motor?.autoPaP) ?? 0} defaultValue={0.0} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="AOG Sum Insured" name="aog" fullWidth value={Number(data?.motor?.aog) ?? 0} defaultValue={0.0} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="AOG Premium" name="aogP" fullWidth value={Number(data?.motor?.aogP) ?? 0} defaultValue={0.0} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={4}>
          <TextField placeholder="Others" name="fieldName" fullWidth value={Number(data?.motor?.other?.fieldName) ?? 0} defaultValue={0.0} onChange={(e) => handleChange(e, data, setData, true, true)} />
        </Grid>
        <Grid item xs={4}>
          <NumericFormat
            fullWidth
            placeholder="Sum Insured"
            name="sumIssued"
            value={Number(data?.motor?.other?.sumIssued) ?? 0}
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
        <Grid item xs={4}>
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
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MotorForm;
