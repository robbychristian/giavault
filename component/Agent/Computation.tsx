import { handleChange } from "@helper/objects/setter";
import { Grid, TextField } from "@mui/material";
import { InsurancePolicy, PolicyTypes } from "@typedefs/policy";
import { FC, useEffect } from "react";
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
  if (input === "" || input === null) {
    return 0;
  }

  // Remove commas and parse to float
  const sanitizedInput = String(input).replace(/,/g, "");
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
      const { odP, theftP, vbiP, vpdP, autoPaP, aogP, other } = data?.motor! ?? {};
      let { premium } = other! ?? 0;
      let sum: number = parseFloat((odP ?? "0")?.replace(/[, ]/g, "")) + parseFloat((vbiP ?? "0")?.replace(/[, ]/g, "")) + parseFloat((vpdP ?? "0")?.replace(/[, ]/g, "")) + parseFloat((theftP ?? "0")?.replace(/[, ]/g, "")) + parseFloat((autoPaP ?? "0")?.replace(/[, ]/g, "")) + parseFloat((aogP ?? "0")?.replace(/[, ]/g, "")) + parseFloat((premium ?? "0")?.replace(/[, ]/g, ""));
      let amtdue: number = (sum ?? 0) + parseStringNumber(data?.docStamp) + parseStringNumber(data?.vat) + parseStringNumber(data?.others) + parseStringNumber(data?.govtTax);
      setAmtDue(amtdue);
      setTotalPrem(sum);
      premium = String(sum);
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
    }
  }, [data]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <NumericFormat
          fullWidth
          label="Total Premium"
          value={totalPrem}
          decimalScale={2}
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
        <NumericFormat customInput={TextField} thousandSeparator="," label="Doc. Stamp" name="docStamp" fullWidth value={data?.docStamp} onChange={(e) => handleChange(e, data, setData)} />
        {/* <TextField variant="outlined" label="Doc. Stamp" name="docStamp" fullWidth defaultValue={formatNumber(data?.docStamp)} onChange={(e) => handleChange(e, data, setData)} /> */}
        {/* <InputMask label="Doc. Stamp" name="docStamp" mask="999,999,999.99" maskChar="" alwaysShowMask={true} value={data?.docStamp} onChange={(e: any) => handleChange(e, data, setData)}></InputMask> */}
      </Grid>
      <Grid item xs={12}>
        <NumericFormat customInput={TextField} thousandSeparator="," label="VAT" type="text" name="vat" fullWidth value={data?.vat} onChange={(e) => handleChange(e, data, setData)} />
      </Grid>
      <Grid item xs={12}>
        <NumericFormat customInput={TextField} thousandSeparator="," label="Local Gov't Tax" name="govtTax" fullWidth value={data?.govtTax} onChange={(e) => handleChange(e, data, setData)} />
      </Grid>
      <Grid item xs={12}>
        <NumericFormat customInput={TextField} thousandSeparator="," label="Others" name="others" fullWidth value={data?.others} onChange={(e) => handleChange(e, data, setData)} />
      </Grid>
      <Grid item xs={12}>
        <NumericFormat
          fullWidth
          label="Amount Due"
          value={amtDue}
          customInput={TextField}
          decimalScale={2}
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
