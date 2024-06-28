const { Router } = require("express");
const passport = require("passport");
const {
  signIn,
  forgotPassword,
  verifyOtp,
  resetPassword,
  googleLogin,
} = require("../controller/auth");
const { CLIENT_URL } = require("../utility/config");
require("../googleStrategy");
require("../facebookStrategy");

const router = Router();

router.use(passport.initialize());
router.use(passport.session());

router.post("/signin", signIn);
router.post("/forgotpassword", forgotPassword);
router.post("/verifyotp", verifyOtp);
router.post("/resetpassword", resetPassword);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/signin",
  }),
  googleLogin
);

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/user/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.json({ succes: true });
  }
);

module.exports = router;
