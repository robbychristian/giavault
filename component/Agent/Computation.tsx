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
const formatNumber = (value: any) => {
  if (value != null) {
    value = parseFloat(value?.replace(/[, ]/g, ""));
    if (!isNaN(value) && value !== "") {
      const formattedValue = Number(value).toLocaleString("en-US").toString();
      return formattedValue;
    }
  }
};
function parseStringNumber(input: any): number {
  if (input === "") {
    return 0;
  }

  // Remove commas and parse to float
  const sanitizedInput = input.replace(/,/g, "");
  const parsedFloat = parseFloat(sanitizedInput);

  // Check if parsing was successful
  if (isNaN(parsedFloat)) {
    return 0;
  }

  return parsedFloat;
}
const Computation: FC<IComputation> = ({ data, setData, totalPrem, setTotalPrem, amtDue, setAmtDue }) => {
  useEffect(() => {
    if (data.type === PolicyTypes.MOTOR) {
      const { odP, vbiP, vpdP, theftP, autoPaP, aogP, other } = data?.motor! ?? {};
      let { premium } = other! ?? 0;
      let sum: number = parseFloat((odP ?? "0")?.replace(/[, ]/g, "")) + parseFloat((vbiP ?? "0")?.replace(/[, ]/g, "")) + parseFloat((vpdP ?? "0")?.replace(/[, ]/g, "")) + parseFloat((theftP ?? "0")?.replace(/[, ]/g, "")) + parseFloat((autoPaP ?? "0")?.replace(/[, ]/g, "")) + parseFloat((aogP ?? "0")?.replace(/[, ]/g, "")) + parseFloat((premium ?? "0")?.replace(/[, ]/g, ""));
      console.log(" Compute Sum: ", sum);
      let amtdue: number = (sum ?? 0) + parseStringNumber(data?.docStamp) + parseStringNumber(data?.vat) + parseStringNumber(data?.others) + parseStringNumber(data?.govtTax);
      setAmtDue(amtdue);
      setTotalPrem(sum);
      premium = String(sum);
      console.log(" Compute Amtdue: ", amtdue);
    } else {
      const dataOthers: any = data[data?.type?.toLowerCase() as keyof InsurancePolicy];
      let sum: number = 0;
      let amtdue: number = 0;
      for (const key in dataOthers) {
        if (dataOthers.hasOwnProperty(key) && typeof dataOthers[key] === "object" && "premium" in dataOthers[key]) {
          const value = parseFloat(dataOthers[key]["premium"]?.replace(/[, ]/g, ""));
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
      setAmtDue(sum + parseFloat((data?.docStamp?.replace(/[, ]/g, "") ?? "0")?.replace(/[, ]/g, "")) + parseFloat((data?.vat ?? "0")?.replace(/[, ]/g, "")) + parseFloat((data?.others ?? "0")?.replace(/[, ]/g, "")) + parseFloat((data?.govtTax ?? "0")?.replace(/[, ]/g, "")));
      setTotalPrem(sum);
      console.log(" Compute Amtdue: ", amtdue);
      console.log(" Compute Sum: ", sum);
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
        <TextField label="Doc. Stamp" name="docStamp" fullWidth defaultValue={0.0} value={formatNumber(data?.docStamp)} onChange={(e) => handleChange(e, data, setData)} />
      </Grid>
      <Grid item xs={12}>
        <TextField label="VAT" name="vat" fullWidth defaultValue={0.0} value={formatNumber(data?.vat)} onChange={(e) => handleChange(e, data, setData)} />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Local Gov't Tax" name="govtTax" fullWidth defaultValue={0.0} value={formatNumber(data?.govtTax)} onChange={(e) => handleChange(e, data, setData)} />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Others" name="others" fullWidth defaultValue={0.0} value={formatNumber(data?.others)} onChange={(e) => handleChange(e, data, setData)} />
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
