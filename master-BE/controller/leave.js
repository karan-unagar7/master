const { validateDataForLeave, leave } = require("../models/leave");
const {
  createLeave,
  findOneLeave,
  findAllLeave,
  findLeave,
  findAllLeaveAdmin,
  countLeave,
  countLeaveStaffAdmin,
} = require("../services/leaveRequest");
const { findById } = require("../services/user");
const {
  findOneUserLeave,
  findAllUserLeave,
  findUserLeave,
  countUserLeave,
} = require("../services/userLeave");
const { userMsg, errorMsg } = require("../utility/message");
const validateDates = require("../utility/validateDates");
const fs = require("fs");
const sendEmail = require("../utility/mail");
const handlebars = require("handlebars");
const { admin, staff, hod, student } = require("../utility/roleId");
const moment = require("moment");
const { user } = require("../models/user");
const { userLeave } = require("../models/userLeave");

const applyLeave = async (req, res) => {
  try {
    const { id } = req.user;
    const { startDate, endDate, leaveType, reason, requestId } = req.body;

    const { error } = validateDataForLeave(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    const userLeaveDetail = await findOneUserLeave(id);

    if (!userLeaveDetail) {
      return res
        .status(404)
        .json({ success: false, message: errorMsg.userNotFound });
    }

    if (userLeaveDetail.availableLeave <= 0) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.notApplyForLeave });
    }

    const dates = { startDate, endDate };
    const checkDates = validateDates(dates);
    if (!checkDates.valid) {
      return res.status(400).json({ message: checkDates.message });
    }

    await createLeave(id, startDate, endDate, requestId, leaveType, reason);

    const leaveDet = await findOneLeave(id);
    const studentDetail = await findById(id);
    const staffDetail = await findById(requestId);

    const filePath = "./template/applyLeave.html";
    const source = fs.readFileSync(filePath, "utf8");
    const template = handlebars.compile(source);
    const start = moment(leaveDet.startDate, "YYYY-MM-DD");
    const end = moment(leaveDet.endDate, "YYYY-MM-DD");
    const emailTemp = template({
      name: staffDetail.name,
      startDate: start.format("YYYY-MM-DD"),
      endDate: end.format("YYYY-MM-DD"),
      day: end.diff(start, "days") + 1,
      reason: leaveDet.reason,
      myname: studentDetail.name,
    });

    const mailOptions = {
      to: staffDetail.email,
      subject: "Leave Application",
      html: emailTemp,
    };
    await sendEmail(mailOptions);

    return res.status(200).json({ success: true, message: userMsg.applyLeave });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const viewLeaveAvailability = async (req, res) => {
  try {
    const { id } = req.user;
    const leaveList = await findAllUserLeave(id);

    if (!leaveList || leaveList.length == 0) {
      return res
        .status(404)
        .json({ success: false, message: errorMsg.noLeave });
    }
    return res.status(200).json({ success: true, data: leaveList });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const viewLeaveStatus = async (req, res) => {
  try {
    const { id } = req.user;
    const { leavestatus, page, limit } = req.query;
    if (!["pending", "rejected", "approved", "all"].includes(leavestatus)) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.invalidStatus });
    }
    filter = {};
    if (leavestatus === "pending") {
      filter.status = "Pending";
    } else if (leavestatus === "approved") {
      filter.status = "Approved";
    } else if (leavestatus === "rejected") {
      filter.status = "Rejected";
    } else {
      filter = filter;
    }

    const pageCount = Number(page) || 1;
    const limitDoc = Number(limit) || 5;

    const totalLeave = await countLeave(id, filter);

    const maxPage =
      totalLeave <= limitDoc ? 1 : Math.ceil(totalLeave / limitDoc);
    if (pageCount > maxPage) {
      return res
        .status(400)
        .json({ message: `There are only ${maxPage} page.` });
    }
    const skip = (pageCount - 1) * limitDoc;
    const leaveList = await findAllLeave(id, filter, skip, limitDoc);
    return res.status(200).json({ success: true, data: leaveList, maxPage });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const leaveReport = async (req, res) => {
  try {
    const { id, roleId } = req.user;
    const { leavestatus, page, limit } = req.query;
    if (roleId === student) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.notShow });
    }
    if (!["pending", "rejected", "approved", "all"].includes(leavestatus)) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.invalidStatus });
    }

    if (roleId === staff || roleId === hod) {
      filter = { requestId: id };
    } else filter = {};

    if (leavestatus === "pending") {
      filter.status = "Pending";
    } else if (leavestatus === "approved") {
      filter.status = "Approved";
    } else if (leavestatus === "rejected") {
      filter.status = "Rejected";
    } else {
      filter = filter;
    }

    const pageCount = Number(page) || 1;
    const limitDoc = Number(limit) || 5;

    const totalLeave = await countLeaveStaffAdmin(filter);

    const maxPage =
      totalLeave <= limitDoc ? 1 : Math.ceil(totalLeave / limitDoc);
    if (pageCount > maxPage) {
      return res
        .status(400)
        .json({ message: `There are only ${maxPage} page.` });
    }
    const skip = (pageCount - 1) * limitDoc;
    const leaveList = await findLeave(filter, skip, limitDoc);
    return res.status(200).json({ success: true, data: leaveList, maxPage });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// const filterLeaveStatus = async (req, res) => {
//   try {
//     const { id, roleId } = req.user;
//     const { leavestatus } = req.query;

//     if (!(roleId === staff || roleId === hod)) {
//       return res
//         .status(400)
//         .json({ success: false, message: errorMsg.notShow });
//     }

//     if (!["Pending", "Rejected", "Approved"].includes(leavestatus)) {
//       return res
//         .status(400)
//         .json({ success: false, message: errorMsg.invalidStatus });
//     }
//     const filter = { status: leavestatus, requestId: id };

//     const leaveList = await leave.findAll({ where: filter });

//     return res.status(200).json({ success: true, data: leaveList });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

const setApproval = async (req, res) => {
  try {
    const { roleId } = req.user;
    if (!(roleId === staff || roleId === hod)) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.notShow });
    }
    const { id } = req.params;
    const leaveDetail = await leave.findByPk(id, {
      include: [
        { model: user, as: "userDetail" },
        { model: user, as: "requestedTo" },
        { model: userLeave, as: "leaveReport" },
      ],
    });

    if (!leaveDetail) {
      return res
        .status(404)
        .json({ success: false, message: errorMsg.dataNotFound });
    }

    const start = moment(leaveDetail.startDate, "YYYY-MM-DD");
    const end = moment(leaveDetail.endDate, "YYYY-MM-DD");
    const totalLeaveDays = start.isSame(end, "day")
      ? 0.5
      : end.diff(start, "days") + 1;

    leaveDetail.status = "Approved";
    await leaveDetail.save();

    leaveDetail.leaveReport.usedLeave += totalLeaveDays;
    leaveDetail.leaveReport.availableLeave =
      leaveDetail.leaveReport.totalLeave - leaveDetail.leaveReport.usedLeave;
    leaveDetail.leaveReport.totalWorkingDays -= totalLeaveDays;
    leaveDetail.leaveReport.attendancePercentage =
      (leaveDetail.leaveReport.totalWorkingDays / 220) * 100;

    await leaveDetail.leaveReport.save();

    const filePath = "./template/approvalLeave.html";
    const source = fs.readFileSync(filePath, "utf8");
    const template = handlebars.compile(source);
    const emailTemp = template({
      name: leaveDetail.userDetail.name,
      startDate: leaveDetail.startDate,
      endDate: leaveDetail.endDate,
      reason: leaveDetail.reason,
      myname: leaveDetail.requestedTo.name,
      department: leaveDetail.requestedTo.department,
    });

    const mailOptions = {
      to: leaveDetail.userDetail.email,
      subject: "Leave Approval Successfully",
      html: emailTemp,
    };

    await sendEmail(mailOptions);

    return res
      .status(200)
      .json({ success: true, message: userMsg.leaveApproved });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const setReject = async (req, res) => {
  try {
    const { roleId } = req.user;
    if (!(roleId === staff || roleId === hod)) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.notShow });
    }
    const { id } = req.params;
    const leaveDetail = await leave.findByPk(id, {
      include: [
        { model: user, as: "userDetail" },
        { model: user, as: "requestedTo" },
      ],
    });
    if (!leaveDetail) {
      return res
        .status(404)
        .json({ success: false, message: errorMsg.dataNotFound });
    }
    leaveDetail.status = "Rejected";
    await leaveDetail.save();

    const filePath = "./template/rejectLeave.html";
    const source = fs.readFileSync(filePath, "utf8");
    const template = handlebars.compile(source);
    const emailTemp = template({
      name: leaveDetail.userDetail.name,
      startDate: leaveDetail.startDate,
      endDate: leaveDetail.endDate,
      reason: leaveDetail.reason,
      myname: leaveDetail.requestedTo.name,
      department: leaveDetail.requestedTo.department,
    });
    const mailOptions = {
      to: leaveDetail.userDetail.email,
      subject: "Leave Rejected",
      html: emailTemp,
    };

    await sendEmail(mailOptions);

    return res
      .status(200)
      .json({ success: true, message: userMsg.leaveRejected });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const leaveReportAdmin = async (req, res) => {
  try {
    const { roleId } = req.user;
    const { role, page, limit } = req.query;
    if (!(roleId === admin)) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.onlyAdmin });
    }
    let filter;
    if (role === "student") {
      filter = student;
    } else if (role === "hod") {
      filter = hod;
    } else if (role === "staff") {
      filter = staff;
    } else {
      filter = [2, 3, 4];
    }
    const pageCount = Number(page) || 1;
    const limitDoc = Number(limit) || 5;

    const totalLeave = await countUserLeave(filter);

    const maxPage =
      totalLeave <= limitDoc ? 1 : Math.ceil(totalLeave / limitDoc);
    if (pageCount > maxPage) {
      return res
        .status(400)
        .json({ message: `There are only ${maxPage} page.` });
    }
    const skip = (pageCount - 1) * limitDoc;

    const LeaveReportList = await findUserLeave(filter, skip, limitDoc);
    return res
      .status(200)
      .json({ success: true, data: LeaveReportList, maxPage });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const allLeaveShowAdmin = async (req, res) => {
  try {
    const { roleId } = req.user;
    if (!(roleId === admin)) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.onlyAdmin });
    }
    const leaveList = await findAllLeaveAdmin();
    if (!leaveList || leaveList.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: errorMsg.dataNotFound });
    }
    return res.status(200).json({ success: true, data: leaveList });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = {
  applyLeave,
  viewLeaveAvailability,
  viewLeaveStatus,
  leaveReport,
  setApproval,
  setReject,
  leaveReportAdmin,
  allLeaveShowAdmin,
};
