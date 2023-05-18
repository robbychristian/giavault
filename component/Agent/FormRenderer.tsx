import { InsurancePolicy, PolicyTypes } from "@typedefs/policy";
import MotorForm from "./MotorForm";
import { DynamicForm } from "./DynamicForm";
import { FC } from "react";

interface IFormRenderer {
  type: PolicyTypes;
  data: Partial<InsurancePolicy>;
  setData: any;
}
const FormRenderer: FC<IFormRenderer> = ({ type, data, setData }) => {
  switch (type) {
    case PolicyTypes.MOTOR: {
      return <MotorForm data={data} setData={setData} />;
    }
    case null: {
      return null;
    }
    case undefined: {
      return null;
    }
    default: {
      return <DynamicForm data={data} setData={setData} />;
    }
  }
};

export default FormRenderer;
