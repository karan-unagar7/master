const { Router } = require("express");
const authRouter = require("./auth");
const userRouter = require("./user");
const leaveRouter = require("./leave")

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/leave", leaveRouter);



module.exports = router;
