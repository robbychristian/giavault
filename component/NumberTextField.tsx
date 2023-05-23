import { TextField } from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import { NumericFormat } from "react-number-format";

interface INumberTextField {
  type: React.InputHTMLAttributes<unknown>["type"];
  label: string;
  name: string;
  value: any;
  onChange: any;
  index: any;
}

const NumberTextField: FC<INumberTextField> = ({ type, label, name, value, onChange, index }) => {
  const [inputValue, setInputValue] = useState(value ?? 0);

  useEffect(() => {
    console.log("inputValue: ", inputValue);
  }, [inputValue]);

  const handleChange = (value: number) => {
    setInputValue(value);
    onChange(index, "value", value);
  };

  return (
    <NumericFormat
      fullWidth
      value={inputValue}
      customInput={TextField}
      thousandSeparator=","
      prefix="₱"
      inputProps={{
        style: { textAlign: "right" },
        step: "any",
      }}
      onValueChange={(values, sourceInfo) => {
        console.log(values, sourceInfo);
        handleChange(values.floatValue!);
      }}
    />
    // <TextField
    //   // type={type}
    //   label={label}
    //   name={name}
    //   defaultValue={inputValue}
    //   onChange={handleChange}
    //   fullWidth
    // inputProps={{
    //   style: { textAlign: "right" },
    //   step: "any",
    // }}
    //   onBlur={(e) => setInputValue(parseFloat(e.target.value).toFixed(1))}
    // />
  );
};

export default NumberTextField;
