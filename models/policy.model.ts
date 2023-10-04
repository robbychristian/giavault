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
    serial: {
      type: String,
    },
    od: {
      type: Schema.Types.Mixed,
    },
    odP: {
      type: Schema.Types.Mixed,
    },
    vbi: {
      type: Schema.Types.Mixed,
    },
    vbiP: {
      type: Schema.Types.Mixed,
    },
    vpd: {
      type: Schema.Types.Mixed,
    },
    vpdP: {
      type: Schema.Types.Mixed,
    },
    theft: {
      type: Schema.Types.Mixed,
    },
    theftP: {
      type: Schema.Types.Mixed,
    },
    autoPa: {
      type: Schema.Types.Mixed,
    },
    autoPaP: {
      type: Schema.Types.Mixed,
    },
    aog: {
      type: Schema.Types.Mixed,
    },
    aogP: {
      type: Schema.Types.Mixed,
    },
    docStamp: {
      type: Schema.Types.Mixed,
    },
    vat: {
      type: Schema.Types.Mixed,
    },
    others: {
      type: Schema.Types.Mixed,
    },
    govtTax: {
      type: Schema.Types.Mixed,
    },
    // lossOfUse: String,
    other: {
      fieldName: String,
      sumIssued: String,
      premium: String,
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
    soaNo: {
      type: String,
      unique: true,
    },
    creator: {
      type: Types.ObjectId,
    },
    updatedByAgent: {
      type: Types.ObjectId,
    },
    updatedByAgentName: {
      type: String,
    },
    producer: {
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
    docStamp: {
      type: String,
    },
    vat: {
      type: String,
    },
    others: {
      type: String,
    },
    govtTax: {
      type: String,
    },
    amountDue: { type: String },
  },
  { timestamps: true, versionKey: false, _id: true }
);

const Policy = models.Policy || model("Policy", PolicySchema);

export default Policy;
