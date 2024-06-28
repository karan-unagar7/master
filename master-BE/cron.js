const cron = require("node-cron");
const sendEmail = require("./utility/mail");
const { leave } = require("./models/leave");
const { user } = require("./models/user");
const handlebars = require("handlebars");
const fs = require("fs");

const getPendingLeave = async () => {
  const PendingLeaves = await leave.findAll({ where: { status: "Pending" } });
  return PendingLeaves;
};

const findUser = async (requestId) => {
  const userDetails = await user.findOne({ where: { id: requestId } });
  return userDetails;
};

const sendReminderEmail = async (PendingLeaves) => {
  for (const leave of PendingLeaves) {
    const userDetail = await findUser(leave.requestId);

    const filePath = "./template/remainderEmail.html";
    const source = fs.readFileSync(filePath, "utf8");
    const template = handlebars.compile(source);
    const emailTemp = template({
      name: userDetail.name,
      leaveType: leave.leaveType,
      startDate: leave.startDate,
      endDate: leave.endDate,
      reason: leave.reason,
    });
    const mailOptions = {
      to: userDetail.email,
      subject: "Leave Reminder",
      html: emailTemp,
    };
    await sendEmail(mailOptions);
  }
};

cron.schedule("0 9 * * *", async () => {
  const PendingLeaves = await getPendingLeave();
  await sendReminderEmail(PendingLeaves);
});
