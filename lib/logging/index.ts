import Logs from "../../models/logs.model";
import { Logs as LogType } from "../../typedefs/logs";

export const LogAction = async (data: LogType) => {
  const res = await Logs.create(data);
  console.log("res", res);
  return res;
};
