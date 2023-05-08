import Notification from "../../models/notification.model";
import Policy from "../../models/policy.model";
import { ExpiringPolicies } from "../../typedefs/notifications";
import { Types } from "mongoose";

const today = new Date();
// argument example: today.getTime() + 30 * 24 * 60 * 60 * 1000 this calculate the date 30 days from now
export const getExpiringPolicies = async (daysBeforeExpiry: Date) => {
  return Policy.aggregate([
    {
      $match: {
        expiryDate: {
          $gte: today.toISOString(), // policies that will expire from today
          $lte: daysBeforeExpiry.toISOString(), // policies that will expire within the next 30 days
        },
      },
    },
    {
      $project: {
        _id: 1,
        creator: 1,
        updatedByAgent: 1,
      },
    },
  ]);
};

export const createExpiringPoliciesNotification = async () => {
  try {
    const expiryDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000); // equal to 30 days
    const expiringPolicies = await getExpiringPolicies(expiryDate);
    const notifications = expiringPolicies.map((e: ExpiringPolicies) => {
      return {
        updateOne: {
          filter: { policyId: { $eq: new Types.ObjectId(e._id) }, agentId: new Types.ObjectId(e.creator) },
          update: {
            policyId: new Types.ObjectId(e._id),
            agentId: new Types.ObjectId(e.creator),
            updaterAgentId: new Types.ObjectId(e.updatedByAgent),
          },
        },
      };
    });
    await Notification.bulkWrite(notifications);
    return;
  } catch (e) {
    console.log("error in creating notifs: ", e);
  }
};

/* 
How to handle this date format in mongoose?

Date formats:
12/11/23
December 11, 2023
12/11/2023
12-11-2023

What I want to achieve is that the date will be converted to mongodb's accepted date value.

*/
