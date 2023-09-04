import { FC } from "react";
import { Divider, Grid, TextField, Typography } from "@mui/material";
import { InsurancePolicy } from "@typedefs/policy";
import { handleChange } from "@helper/objects/setter";
import { NumericFormat } from "react-number-format";

interface IMotorForm {
  data: Partial<InsurancePolicy>;
  setData: (data: InsurancePolicy) => void;
}

const MotorForm: FC<IMotorForm> = ({ data, setData }) => {
  return (
    <Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography id="premium" key={`prem`} component="h3" variant="h6" sx={{ fontStyle: "bold" }}>
            Car Details *
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField label="Serial" name="serial" fullWidth defaultValue={data?.motor?.serial} disabled={data?._id ? true : false} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Motor" name="motor" fullWidth defaultValue={data?.motor?.motor} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Year/Model" name="modelMakeRisk" fullWidth defaultValue={data?.motor?.modelMakeRisk} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Plate" name="plate" fullWidth defaultValue={data?.motor?.plate} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="MV File" name="mvFile" fullWidth defaultValue={data?.motor?.mvFile} onChange={(e) => handleChange(e, data, setData, true)} />
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
          <TextField label="OD Sum Insured" name="od" fullWidth defaultValue={data?.motor?.od} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="OD Premium" name="odP" fullWidth defaultValue={data?.motor?.odP} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="V-BI Sum Insured" name="vbi" fullWidth defaultValue={data?.motor?.vbi} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="V-BI Premium" name="vbiP" fullWidth defaultValue={data?.motor?.vbiP} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="V-PD Sum Insured" name="vpd" fullWidth defaultValue={data?.motor?.vpd} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="V-PD Premium" name="vpdP" fullWidth defaultValue={data?.motor?.vpdP} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="THEFT Sum Insured" name="theft" fullWidth defaultValue={data?.motor?.theft} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="THEFT Premium" name="theftP" fullWidth defaultValue={data?.motor?.theftP} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Auto PA Sum Insured" name="autoPa" fullWidth defaultValue={data?.motor?.autoPa} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Auto PA Premium" name="autoPaP" fullWidth defaultValue={data?.motor?.autoPaP} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="AOG Sum Insured" name="aog" fullWidth defaultValue={data?.motor?.aog} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="AOG Premium" name="aogP" fullWidth defaultValue={data?.motor?.aogP} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={4}>
          <TextField placeholder="Others" name="fieldName" fullWidth defaultValue={data?.motor?.other?.fieldName} onChange={(e) => handleChange(e, data, setData, true, true)} />
        </Grid>
        <Grid item xs={4}>
          <NumericFormat
            fullWidth
            placeholder="Sum Insured"
            name="sumIssued"
            value={data?.motor?.other?.sumIssued}
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
            value={data?.motor?.other?.premium}
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
