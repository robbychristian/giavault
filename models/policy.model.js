"use strict";
// import { Schema, Types, model, models } from "mongoose";
Object.defineProperty(exports, "__esModule", { value: true });
// // export const PolicySchema = new Schema(
// //   {
// //     creator: {
// //       type: Types.ObjectId,
// //
// //     },
// //     updatedByAgent: {
// //       type: Types.ObjectId,
// //
// //     },
// // updatedByAgentName: {
// //   type: String,
// //
// // },
// //     sa: {
// //       type: String,
// //
// //     },
// //     insurer: {
// //       type: String,
// //
// //     },
// //     assured: {
// //       type: String,
// //
// //     },
// //     address: {
// //       type: String,
// //
// //     },
// //     policy: {
// //       type: String,
// //
// //     },
// //     issueDate: {
// //       type: Date,
// //
// //     },
// //     inception: {
// //       type: Date,
// //
// //     },
// //     expiry: {
// //       type: Date,
// //
// //     },
// //     modelMakeRisk: {
// //       type: String,
// //
// //     },
// //     plate: {
// //       type: String,
// //
// //     },
// //     sumInsured: {
// //       type: String,
// //
// //     },
// //     totalPrem: {
// //       type: String,
// //
// //     },
// //     grossPrem: {
// //       type: String,
// //
// //     },
// //     deductible: {
// //       type: String,
// //
// //     },
// //     serial: {
// //       type: String,
// //
// //       unique: true,
// //     },
// //     motor: {
// //       type: String,
// //
// //     },
// //     mvFile: {
// //       type: String,
// //
// //     },
// //     od: {
// //       type: String,
// //
// //     },
// //     theft: {
// //       type: String,
// //
// //     },
// //     vbi: {
// //       type: String,
// //
// //     },
// //     vpd: {
// //       type: String,
// //
// //     },
// //     autoPa: {
// //       type: String,
// //
// //     },
// //     aog: {
// //       type: String,
// //
// //     },
// //     lossOfUse: {
// //       type: String,
// //
// //     },
// //     odPrem: {
// //       type: String,
// //
// //     },
// //     theftPrem: {
// //       type: String,
// //
// //     },
// //     vBiOrPrem: {
// //       type: String,
// //
// //     },
// //     vPdOrPrem: {
// //       type: String,
// //
// //     },
// //     autoPaOrPrem: {
// //       type: String,
// //
// //     },
// //     aogOrPrem: {
// //       type: String,
// //
// //     },
// //     lossOfUseOrPrem: {
// //       type: String,
// //
// //     },
// //   },
// //   { timestamps: true, versionKey: false }
// // );
// export const PolicySchema = new Schema(
//   {
//     creator: {
//       type: Types.ObjectId,
//
//     },
//     updatedByAgent: {
//       type: Types.ObjectId,
//
//     },
//     updatedByAgentName: {
//       type: String,
//
//     },
//     giaArNo: {
//       type: String,
//
//     },
//     giaArDate: {
//       type: Date,
//
//     },
//     insurerOrNo: {
//       type: String,
//
//     },
//     insurerOrDate: {
//       type: Date,
//
//     },
//     giaOrNo: {
//       type: String,
//
//     },
//     giaOrDate: {
//       type: Date,
//
//     },
//     saNo: {
//       type: String,
//
//     },
//     insurer: {
//       type: String,
//
//     },
//     assured: {
//       type: String,
//
//     },
//     mailingAddress: {
//       type: String,
//
//     },
//     locationOfRisk: {
//       type: String,
//
//     },
//     policy: {
//       type: String,
//
//     },
//     issueDate: {
//       type: Date,
//
//     },
//     inception: {
//       type: Date,
//
//     },
//     expiry: {
//       type: Date,
//
//     },
//     particulars: {
//       type: String,
//
//     },
//     plate: {
//       type: String,
//
//     },
//     sumInsured: {
//       type: Number,
//
//     },
//     premium: {
//       type: Number,
//
//     },
//     lgt: {
//       type: Number,
//
//     },
//     vat: {
//       type: Number,
//
//     },
//     dst: {
//       type: Number,
//
//     },
//     otherCharges: {
//       type: Number,
//
//     },
//     totalAmount: {
//       type: Number,
//
//     },
//     line: {
//       type: String,
//
//     },
//     deductible: {
//       type: Number,
//
//     },
//     serial: {
//       type: String,
//
//     },
//     chassisNo: {
//       type: String,
//
//     },
//     mvFile: {
//       type: String,
//
//     },
//     mortgagee: {
//       type: String,
//
//     },
//     color: {
//       type: String,
//
//     },
//     od: {
//       type: Number,
//
//     },
//     theft: {
//       type: Number,
//
//     },
//     vBi: {
//       type: Number,
//
//     },
//     vPd: {
//       type: Number,
//
//     },
//     autoPA: {
//       type: Number,
//
//     },
//     aog: {
//       type: Number,
//
//     },
//     rscc: {
//       type: Number,
//
//     },
//     lossOfUse: {
//       type: Number,
//
//     },
//     odPrem: {
//       type: Number,
//
//     },
//     theftPrem: {
//       type: Number,
//
//     },
//     vBiPrem: {
//       type: Number,
//
//     },
//     vPdPrem: {
//       type: Number,
//
//     },
//     autoPAPrem: {
//       type: Number,
//
//     },
//     aogPrem: {
//       type: Number,
//
//     },
//     lossOfUseOrPrem: {
//       type: Number,
//
//     },
//     accidentalDeathOrDismemberment: {
//       type: Number,
//
//     },
//     medicalExpenses: {
//       type: Number,
//
//     },
//     uma: {
//       type: Number,
//
//     },
//     building1: {
//       type: Number,
//
//     },
//     building2: {
//       type: Number,
//
//     },
//     contents1: {
//       type: Number,
//
//     },
//     contents2: {
//       type: Number,
//
//     },
//     others: {
//       type: Number,
//
//     },
//     invoiceNoMarineOnly: {
//       type: String,
//     },
//     blNoMarineOnly: {
//       type: String,
//     },
//     remarks1: {
//       type: String,
//     },
//     remarks2: {
//       type: String,
//     },
//     remarks3: {
//       type: String,
//     },
//     remarks4: {
//       type: String,
//     },
//     etc1: {
//       type: String,
//     },
//     etc2: {
//       type: String,
//     },
//   },
//   { timestamps: true, versionKey: false }
// );
// const Policy = models.Policy || model("Policy", PolicySchema);
// export default Policy;
var mongoose_1 = require("mongoose");
var fireSchema = new mongoose_1.Schema({
    fields: {
        type: Map,
        of: mongoose_1.Schema.Types.Mixed,
    },
}, { _id: false });
var motorSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.Mixed,
    },
    theft: {
        type: mongoose_1.Schema.Types.Mixed,
    },
    vbi: String,
    vpd: String,
    autoPa: String,
    aog: String,
    aogPrem: Number,
    lossOfUse: String,
    chassisNo: String,
    color: String,
}, { _id: false });
var cglSchema = new mongoose_1.Schema({
    fields: {
        type: Map,
        of: mongoose_1.Schema.Types.Mixed,
    },
}, { _id: false });
var bondSchema = new mongoose_1.Schema({
    fields: {
        type: Map,
        of: mongoose_1.Schema.Types.Mixed,
    },
}, { _id: false });
var marineSchema = new mongoose_1.Schema({
    fields: {
        type: Map,
        of: mongoose_1.Schema.Types.Mixed,
    },
}, { _id: false });
var personalAccidentSchema = new mongoose_1.Schema({
    fields: {
        type: Map,
        of: mongoose_1.Schema.Types.Mixed,
    },
}, { _id: false });
var endorsementSchema = new mongoose_1.Schema({
    fields: {
        type: Map,
        of: mongoose_1.Schema.Types.Mixed,
    },
}, { _id: false });
var remarksSchema = new mongoose_1.Schema({
    note: String,
}, { _id: false });
var PolicySchema = new mongoose_1.Schema({
    type: {
        type: String,
        require: true,
    },
    insurer: String,
    line: String,
    giaIssuedDate: {
        type: Date,
    },
    policyNo: String,
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
    insuranceOrNo: String,
    insuranceOrNoDate: {
        type: Date,
    },
    remarks: {
        type: [remarksSchema],
    },
    motor: motorSchema,
    fire: fireSchema,
    cgl: cglSchema,
    bond: bondSchema,
    marine: marineSchema,
    personalAccident: personalAccidentSchema,
    endorsement: endorsementSchema,
}, { timestamps: true, versionKey: false });
var Policy = mongoose_1.models.Policy || (0, mongoose_1.model)("Policy", PolicySchema);
exports.default = Policy;
