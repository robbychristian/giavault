import { Schema, model, models } from "mongoose";

export const PolicySchema = new Schema(
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

const Policy = models.Policy || model("Policy", PolicySchema);

export default Policy;

export const PolicySchemaNew = new Schema({
  giaArNo: {
    type: String,
    required: true,
  },
  giaArDate: {
    type: Date,
    required: true,
  },
  insurerOrNo: {
    type: String,
    required: true,
  },
  insurerOrDate: {
    type: Date,
    required: true,
  },
  giaOrNo: {
    type: String,
    required: true,
  },
  giaOrDate: {
    type: Date,
    required: true,
  },
  saNo: {
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
  mailingAddress: {
    type: String,
    required: true,
  },
  locationOfRisk: {
    type: String,
    required: true,
  },
  policy: {
    type: String,
    required: true,
  },
  issuedDate: {
    type: Date,
    required: true,
  },
  inception: {
    type: Date,
    required: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
  particulars: {
    type: String,
    required: true,
  },
  plate: {
    type: String,
    required: true,
  },
  sumInsured: {
    type: Number,
    required: true,
  },
  premium: {
    type: Number,
    required: true,
  },
  lgt: {
    type: Number,
    required: true,
  },
  vat: {
    type: Number,
    required: true,
  },
  dst: {
    type: Number,
    required: true,
  },
  otherCharges: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  line: {
    type: String,
    required: true,
  },
  deductible: {
    type: Number,
    required: true,
  },
  serial: {
    type: String,
    required: true,
  },
  chassisNo: {
    type: String,
    required: true,
  },
  mvFile: {
    type: String,
    required: true,
  },
  mortgagee: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  od: {
    type: Number,
    required: true,
  },
  theft: {
    type: Number,
    required: true,
  },
  vBi: {
    type: Number,
    required: true,
  },
  vPd: {
    type: Number,
    required: true,
  },
  autoPA: {
    type: Number,
    required: true,
  },
  aog: {
    type: Number,
    required: true,
  },
  rscc: {
    type: Number,
    required: true,
  },
  lossOfUse: {
    type: Number,
    required: true,
  },
  odPrem: {
    type: Number,
    required: true,
  },
  theftPrem: {
    type: Number,
    required: true,
  },
  vBiPrem: {
    type: Number,
    required: true,
  },
  vPdPrem: {
    type: Number,
    required: true,
  },
  autoPAPrem: {
    type: Number,
    required: true,
  },
  aogPrem: {
    type: Number,
    required: true,
  },
  lossOfUseOrPrem: {
    type: Number,
    required: true,
  },
  accidentalDeathOrDismemberment: {
    type: Number,
    required: true,
  },
  medicalExpenses: {
    type: Number,
    required: true,
  },
  uma: {
    type: Number,
    required: true,
  },
  building1: {
    type: Number,
    required: true,
  },
  building2: {
    type: Number,
    required: true,
  },
  contents1: {
    type: Number,
    required: true,
  },
  contents2: {
    type: Number,
    required: true,
  },
  others: {
    type: Number,
    required: true,
  },
  invoiceNoMarineOnly: {
    type: String,
  },
  blNoMarineOnly: {
    type: String,
  },
  remarks1: {
    type: String,
  },
  remarks2: {
    type: String,
  },
  remarks3: {
    type: String,
  },
  remarks4: {
    type: String,
  },
  etc1: {
    type: String,
  },
  etc2: {
    type: String,
  },
});
