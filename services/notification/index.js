const { createExpiringPoliciesNotification } = require("./notification");
const { CronJob } = require("cron");

const createNotifs = () => {
  createExpiringPoliciesNotification();
  //   return new CronJob("* * * * *", () => {
  //     createExpiringPoliciesNotification();
  //   }).start();
};

module.exports = { createNotifs };
