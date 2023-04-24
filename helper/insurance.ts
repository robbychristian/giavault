import { InsurancePolicy } from "@typedefs/user";
import Policy from "@models/policy.model";
import { session } from "@libs/mongoose/session.handler";

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
  } catch (error) {
    console.log("error", error);
    mongoSession.abortTransaction();
    return null;
  }
};
