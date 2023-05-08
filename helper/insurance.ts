import { User } from "@typedefs/user";
import Policy from "@models/policy.model";
import { session } from "@libs/mongoose/session.handler";
import { Query } from "@typedefs/query";
import { toInteger } from "lodash";
import { Types } from "mongoose";

import { convertDateToIso } from "@helper/date";
import { InsurancePolicy } from "@typedefs/policy";

export const savePolicy = async (insurancePolicy: InsurancePolicy | InsurancePolicy[], agentDetails: Partial<User>) => {
  const mongoSession = await session();
  const { username, _id } = agentDetails;
  try {
    const policy = (Array.isArray(insurancePolicy) ? insurancePolicy : [insurancePolicy]).map((e: InsurancePolicy) => ({
      updateOne: {
        filter: { serial: e.serial, issueDate: convertDateToIso(e.issueDate) },
        update: {
          ...e,
          creator: _id,
          updatedByAgent: _id,
          updatedByAgentName: username,
          issueDate: convertDateToIso(e.issueDate),
          inception: convertDateToIso(e.inception),
          expiry: convertDateToIso(e.expiry),
          giaArDate: convertDateToIso(e.giaArDate),
          insurerOrDate: convertDateToIso(e.insurerOrDate),
          giaOrDate: convertDateToIso(e.giaOrDate),
        },
        upsert: true,
      },
    }));
    // const response = await Policy.bulkWrite(policy, { session: mongoSession }); // use this for session
    const response = await Policy.bulkWrite(policy);
    return response;
  } catch (e) {
    console.log("error", e);
    // mongoSession.abortTransaction();
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

export const updatePolicy = async (insurancePolicy: InsurancePolicy | InsurancePolicy[], agentDetails: Partial<User>) => {
  const mongoSession = await session();
  try {
    const policy = (Array.isArray(insurancePolicy) ? insurancePolicy : [insurancePolicy]).map((e: InsurancePolicy) => {
      const { _id, ...rest } = e;
      const { username, _id: agentId } = agentDetails;
      return {
        updateOne: {
          filter: { _id: new Types.ObjectId(_id) },
          update: { rest, updatedByAgentName: username, updatedByAgent: new Types.ObjectId(agentId) },
        },
        upsert: true,
      };
    });
    console.log("policy", JSON.stringify(policy));
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

export const deletePolicy = async (_id: string) => {
  const mongoSession = await session();
  try {
    const response = await Policy.deleteOne({ _id: new Types.ObjectId(_id) });
    console.log("response", response);
    return response;
  } catch (e) {
    console.log("error", e);
    mongoSession.abortTransaction();
    return null;
  }
};
