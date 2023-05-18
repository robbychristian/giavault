import { arrayToObject, objectToArray } from "@helper/objects/setter";
import { Button, Grid, TextField } from "@mui/material";
import { InsurancePolicy } from "@typedefs/policy";
import React, { FC, useEffect, useState, useMemo } from "react";

interface IDynamicForm {
  data: Partial<InsurancePolicy>;
  setData: (formData: Partial<InsurancePolicy>) => void;
}

export const DynamicForm: FC<IDynamicForm> = ({ data, setData }) => {
  const [entries, setEntries] = useState<any>([]);

  useEffect(() => {
    const { type } = data;
    if (data[type?.toLowerCase() as keyof InsurancePolicy]) {
      const mappedEntries = objectToArray(data[type?.toLowerCase() as keyof InsurancePolicy]);
      if (mappedEntries.length >= 1) {
        setEntries(mappedEntries);
      }
    }
  }, []);

  useMemo(() => {
    const { type } = data;
    setData({ ...data, [type?.toLowerCase() as keyof InsurancePolicy]: { fields: arrayToObject(entries) } });
  }, [entries]);

  const handleAddField = () => {
    setEntries([...entries, { key: "", value: "" }]);
  };

  const handleChange = (index: number, field: string, value: string) => {
    const updatedFields = [...entries];
    updatedFields[index][field] = value;
    setEntries(updatedFields);
  };

  return (
    <React.Fragment>
      <Grid>
        <Grid container spacing={2}>
          {entries.map((e: { key: string; value: any }, index: number) => {
            return (
              <>
                <Grid item xs={6}>
                  <TextField fullWidth label="Header" name={`${e.key}`} value={e.key} onChange={(e) => handleChange(index, "key", e.target.value)} />
                </Grid>
                <Grid item xs={6}>
                  <TextField label="Value" name={`${e.value}`} fullWidth value={e.value} onChange={(e) => handleChange(index, "value", e.target.value)} />
                </Grid>
              </>
            );
          })}
          <Grid item xs={12} textAlign="right">
            <Button variant="contained" onClick={handleAddField}>
              Add more field
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
