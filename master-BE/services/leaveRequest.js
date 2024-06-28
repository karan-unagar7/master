const { leave } = require("../models/leave");
const { user } = require("../models/user");
const { userLeave } = require("../models/userLeave");

const createLeave = async (
  userId,
  startDate,
  endDate,
  requestId,
  leaveType,
  reason
) => {
  return await leave.create({
    userId,
    startDate,
    endDate,
    requestId,
    leaveType,
    reason,
  });
};

const findOneLeave = async (userId) => {
  return await leave.findOne({
    where: { userId },
    order: [["createdAt", "DESC"]],
  });
};

const findAllLeave = async (userId, filter, skip, limitDoc) => {
  return await leave.findAll({
    where: { userId, ...filter },
    offset: skip,
    limit: limitDoc,
  });
};

const findLeave = async (filter, skip, limitDoc) => {
  return await leave.findAll({
    where: { ...filter },
    include: [
      {
        model: user,
        as: "userDetail",
        attributes: {
          exclude: ["password", "class", "roleId", "createdAt", "updatedAt"],
        },
      },
      {
        model: userLeave,
        as: "leaveReport",
        attributes: {
          exclude: ["id", "userId", "totalLeave", "createdAt", "updatedAt"],
        },
      },
    ],
    offset: skip,
    limit: limitDoc,
  });
};

const findAllLeaveAdmin = async () => {
  return await leave.findAll({
    include: {
      model: user,
      as: "userDetail",
      attributes: {
        exclude: ["password", "class", "roleId", "createdAt", "updatedAt"],
      },
    },
  });
};

const countLeave = async (userId, filter) => {
  return await leave.count({ where: { userId, ...filter } });
};

const countLeaveStaffAdmin = async (filter) => {
  return await leave.count({ where: { ...filter } });
};

module.exports = {
  createLeave,
  findOneLeave,
  findAllLeave,
  findLeave,
  findAllLeaveAdmin,
  countLeave,
  countLeaveStaffAdmin,
};
