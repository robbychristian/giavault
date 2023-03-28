import { Schema, model, models, Document, Model } from "mongoose";
import { Logs as LogsType } from "../typedefs/logs";

export const LogsSchema = new Schema<LogsType>({
  username: { type: String, required: true },
  IP: { type: String, required: true },
  role: { type: String }, // only needed for logged in users
  method: { type: String, required: true },
  action: { type: String, required: true },
  createdAt: { type: String },
});

const Logs = models.Logs || model("Logs", LogsSchema);

export default Logs;
