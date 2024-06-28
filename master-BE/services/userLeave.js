const { leave } = require("../models/leave");
const { user } = require("../models/user");
const { userLeave } = require("../models/userLeave");

const createUserLeave = async (userId) => {
  return await userLeave.create({
    userId,
    totalLeave: 20,
    availableLeave: 20,
    usedLeave: 0,
    totalWorkingDays: 220,
    academicYear: new Date().getFullYear(),
    attendancePercentage: 100,
  });
};

const findOneUserLeave = async (id) => {
  return await userLeave.findOne({
    where: { userId: id },
  });
};

const findAllUserLeave = async (userId) => {
  return await userLeave.findAll({
    where: { userId },
  });
};

const findUserLeave = async (role,offset,limit) => {
  return await userLeave.findAll({
    include: {
      model: user,
      where: { roleId: role },
      attributes: {
        exclude: ["password", "class", "roleId", "createdAt", "updatedAt"],
      },
    },
    offset,
    limit,
    order: [["usedLeave", "DESC"]],
  });
};

const countUserLeave = async (roleId) => {
  return await userLeave.count({
    include: {
      model: user,
      where: { roleId },
    },
  });
};

module.exports = {
  createUserLeave,
  findOneUserLeave,
  findAllUserLeave,
  findUserLeave,
  countUserLeave
};
