const { Router } = require("express");
const {
  applyLeave,
  viewLeaveAvailability,
  viewLeaveStatus,
  leaveReport,
  setApproval,
  setReject,
  leaveReportAdmin,
  allLeaveShowAdmin,
} = require("../controller/leave");
const verifyUser = require("../middleware/auth");

const router = Router();

router.use(verifyUser);
router.post("/applyleave", applyLeave);
router.get("/viewavailableleave", viewLeaveAvailability);
router.get("/viewleavestatus", viewLeaveStatus);
router.get("/leavereport", leaveReport);
router.get("/setapprove/:id", setApproval);
router.get("/setreject/:id", setReject);
router.get("/leavereportadmin", leaveReportAdmin);
router.get("/viewallleaveadmin", allLeaveShowAdmin);

module.exports = router;
