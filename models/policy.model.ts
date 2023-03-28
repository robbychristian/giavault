import { Schema, model, models, Document, Model } from "mongoose";

const PolicySchema = new Schema(
  {
    sa: {
      type: String,
      required: true,
    },
    insurer: {
      type: String,
      required: true,
    },
    assured: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    policy: {
      type: String,
      required: true,
    },
    issueDate: {
      type: String,
      required: true,
    },
    inception: {
      type: String,
      required: true,
    },
    expiry: {
      type: String,
      required: true,
    },
    modelMakeRisk: {
      type: String,
      required: true,
    },
    plate: {
      type: String,
      required: true,
    },
    sumInsured: {
      type: String,
      required: true,
    },
    totalPrem: {
      type: String,
      required: true,
    },
    grossPrem: {
      type: String,
      required: true,
    },
    deductible: {
      type: String,
      required: true,
    },
    serial: {
      type: String,
      required: true,
    },
    motor: {
      type: String,
      required: true,
    },
    mvFile: {
      type: String,
      required: true,
    },
    od: {
      type: String,
      required: true,
    },
    theft: {
      type: String,
      required: true,
    },
    vbi: {
      type: String,
      required: true,
    },
    vpd: {
      type: String,
      required: true,
    },
    autoPa: {
      type: String,
      required: true,
    },
    aog: {
      type: String,
      required: true,
    },
    lossOfUse: {
      type: String,
      required: true,
    },
    odPrem: {
      type: String,
      required: true,
    },
    theftPrem: {
      type: String,
      required: true,
    },
    vBiOrPrem: {
      type: String,
      required: true,
    },
    vPdOrPrem: {
      type: String,
      required: true,
    },
    autoPaOrPrem: {
      type: String,
      required: true,
    },
    aogOrPrem: {
      type: String,
      required: true,
    },
    lossOfUseOrPrem: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Policy = models.PolicySchema || model("policy", PolicySchema);

export default Policy;
