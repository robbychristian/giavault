import { handleChange } from "@helper/objects/setter";
import { Grid, TextField, Typography } from "@mui/material";
import { DynamicField } from "@typedefs/policy";
import { InsurancePolicy, PolicyTypes } from "@typedefs/policy";
import { FC, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

interface IComputation {
  data: Partial<InsurancePolicy>;
  setData: (data: InsurancePolicy) => void;
  totalPrem: any;
  setTotalPrem: any;
  amtDue: any;
  setAmtDue: any;
}

const Computation: FC<IComputation> = ({ data, setData, totalPrem, setTotalPrem, amtDue, setAmtDue }) => {
  useEffect(() => {
    if (data.type === PolicyTypes.MOTOR) {
      const { odP, vbiP, vpdP, theftP, autoPaP, aogP, other } = data?.motor! ?? {};
      let { premium } = other! ?? 0;
      let sum: number = parseFloat(odP ?? "0") + parseFloat(vbiP ?? "0") + parseFloat(vpdP ?? "0") + parseFloat(theftP ?? "0") + parseFloat(autoPaP ?? "0") + parseFloat(aogP ?? "0") + parseFloat(premium ?? "0");
      let amtdue: number = sum + parseFloat(data?.docStamp ?? "0") + parseFloat(data?.vat ?? "0") + parseFloat(data?.others ?? "0") + parseFloat(data?.govtTax ?? "0");
      setAmtDue(amtdue);
      setTotalPrem(sum);
      premium = String(sum);
    } else {
      console.log(" Compute ", data);
      const dataOthers: any = data[data?.type?.toLowerCase() as keyof InsurancePolicy];
      let sum: number = 0;
      let amtdue: number = 0;
      for (const key in dataOthers) {
        if (dataOthers.hasOwnProperty(key) && typeof dataOthers[key] === "object" && "premium" in dataOthers[key]) {
          const value = parseFloat(dataOthers[key]["premium"].replace(",", ""));
          if (!isNaN(value)) {
            sum += value;
          }
        } else {
          const value = parseFloat(dataOthers[key]);
          if (!isNaN(value)) {
            amtdue += value;
          }
        }
      }
      setAmtDue(sum + parseFloat(data?.docStamp ?? "0") + parseFloat(data?.vat ?? "0") + parseFloat(data?.others ?? "0") + parseFloat(data?.govtTax ?? "0"));
      setTotalPrem(sum);
    }
  }, [data]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <NumericFormat
          fullWidth
          label="Total Premium"
          value={totalPrem}
          customInput={TextField}
          thousandSeparator=","
          // prefix="₱"
          inputProps={{
            style: { textAlign: "right" },
            step: "any",
          }}
          disabled
        />
        {/* <TextField label="Total Premium" name="prem" disabled fullWidth value={totalPrem} /> */}
      </Grid>
      <Grid item xs={12}>
        <TextField label="Doc. Stamp" name="docStamp" fullWidth defaultValue={0.0} value={data?.docStamp} onChange={(e) => handleChange(e, data, setData)} />
      </Grid>
      <Grid item xs={12}>
        <TextField label="VAT" name="vat" fullWidth defaultValue={0.0} value={data?.vat} onChange={(e) => handleChange(e, data, setData)} />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Local Gov't Tax" name="govtTax" fullWidth defaultValue={0.0} value={data?.govtTax} onChange={(e) => handleChange(e, data, setData)} />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Others" name="others" fullWidth defaultValue={0.0} value={data?.others} onChange={(e) => handleChange(e, data, setData)} />
      </Grid>
      <Grid item xs={12}>
        <NumericFormat
          fullWidth
          label="Amount Due"
          value={amtDue}
          customInput={TextField}
          thousandSeparator=","
          // prefix="₱"
          inputProps={{
            style: { textAlign: "right" },
            step: "any",
          }}
          disabled
        />
      </Grid>
    </Grid>
  );
};

export default Computation;
