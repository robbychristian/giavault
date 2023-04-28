import { InsurancePolicy } from "@typedefs/user";
import Policy from "@models/policy.model";
import { session } from "@libs/mongoose/session.handler";
import { Query } from "@typedefs/query";
import { toInteger } from "lodash";

export const savePolicy = async (insurancePolicy: InsurancePolicy | InsurancePolicy[]) => {
  const mongoSession = await session();
  try {
    const policy = (Array.isArray(insurancePolicy) ? insurancePolicy : [insurancePolicy]).map((e: InsurancePolicy) => ({
      updateOne: {
        filter: { serial: e.serial, issueDate: e.issueDate },
        update: e,
        upsert: true,
      },
    }));
    console.log("policy", policy);
    // const response = await Policy.bulkWrite(policy, { session: mongoSession }); // use this for session
    const response = await Policy.bulkWrite(policy);
    console.log("response", response);
    return response;
  } catch (e) {
    console.log("error", e);
    mongoSession.abortTransaction();
    return null;
  }
};

export const getPolicies = async (query: Query) => {
  try {
    const { limit, page, search } = query;
    return await Policy.aggregate([
      {
        $match: {
          $or: [
            { serial: { $regex: search ?? "", $options: "i" } },
            { plate: { $regex: search ?? "", $options: "i" } },
            { modelMakeRisk: { $regex: search ?? "", $options: "i" } },
            { theft: { $regex: search ?? "", $options: "i" } },
            { autoPa: { $regex: search ?? "", $options: "i" } },
            { aog: { $regex: search ?? "", $options: "i" } },
            { lossOfUse: { $regex: search ?? "", $options: "i" } },
          ],
        },
      },
    ])
      .limit(toInteger(limit))
      .skip(toInteger(page))
      .sort({ createdAt: -1 });
  } catch (e) {}
};
