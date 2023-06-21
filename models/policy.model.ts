import { Schema, model, Document, models, Types } from "mongoose";

const motorSchema = new Schema(
  {
    issueDate: String,
    inception: String,
    expiry: String,
    insurer: String,
    assured: String,
    address: String,
    modelMakeRisk: String,
    plate: String,
    totalPrem: Number,
    grossPrem: Number,
    deductible: Number,
    motor: String,
    mvFile: String,
    od: {
      type: Schema.Types.Mixed,
    },
    theft: {
      type: Schema.Types.Mixed,
    },
    vbi: String,
    vpd: String,
    autoPa: String,
    aog: String,
    aogPrem: Number,
    // lossOfUse: String,
    other: {
      fieldName: String,
      value: String,
    },
    chassisNo: String,
    color: String,
  },
  { _id: false }
);

const remarksSchema = new Schema(
  {
    note: String,
  },
  { _id: false }
);

const particularDynamicFieldSchema = new Schema(
  {
    particularHeaderName: { type: String },
    particular: { type: String },
    premium: { type: String },
  },
  { _id: false }
);

const PolicySchema = new Schema(
  {
    creator: {
      type: Types.ObjectId,
    },
    updatedByAgent: {
      type: Types.ObjectId,
    },
    updatedByAgentName: {
      type: String,
    },
    type: {
      type: String,
      require: true,
    },
    insurer: String,
    line: String,
    giaIssuedDate: {
      type: Date,
    },
    policyNo: {
      type: String,
      unique: true,
    },
    inception: {
      type: Date,
    },
    assured: String,
    expiry: {
      type: Date,
    },
    mailingAddress: String,
    giaAr: String,
    giaDate: {
      type: Date,
    },
    giaOr: String,
    giaARDate: Date,
    insuranceOrNo: String,
    insuranceOrNoDate: {
      type: Date,
    },
    remarks: {
      type: [remarksSchema],
    },
    motor: motorSchema,
    fire: [particularDynamicFieldSchema],
    cgl: [particularDynamicFieldSchema],
    bond: [particularDynamicFieldSchema],
    marine: [particularDynamicFieldSchema],
    personalAccident: [particularDynamicFieldSchema],
    endorsement: [particularDynamicFieldSchema],
  },
  { timestamps: true, versionKey: false }
);

const Policy = models.Policy || model("Policy", PolicySchema);

export default Policy;
