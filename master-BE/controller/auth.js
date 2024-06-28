const { user, validatePasswordForReset } = require("../models/user");
const otptbl = require("../models/otp");
const { findByEmailAndRoleId, findByEmail } = require("../services/user");
const { userMsg, errorMsg } = require("../utility/message");
const otpGenerate = require("../utility/otpGen");
const { student, admin, staff, hod } = require("../utility/roleId");
const { generateToken } = require("../utility/token");
const fs = require("fs");
const sendEmail = require("../utility/mail");
const handlebars = require("handlebars");


const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.fieldRequired });
    }

    const isStudent = await findByEmailAndRoleId(email, student);
    const isAdmin = await findByEmailAndRoleId(email, admin);
    const isFaculty = await findByEmailAndRoleId(email, [hod, staff]);

    if (!(isStudent || isAdmin || isFaculty)) {
      return res
        .status(404)
        .json({ success: false, message: errorMsg.userNotFound });
    }

    let userRole, isMatch;
    if (isStudent) {
      userRole = isStudent;
      isMatch = await isStudent.checkPassword(password);
    } else if (isAdmin) {
      userRole = isAdmin;
      isMatch = await isAdmin.checkPassword(password);
    } else {
      userRole = isFaculty;
      isMatch = await isFaculty.checkPassword(password);
    }

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.invalidCredintial });
    }

    const userData = await user.findByPk(userRole.id, {
      attributes: { exclude: ["password"] },
    });
    const token = generateToken({ id: userRole.id });

    return res.status(200).json({
      success: true,
      data: userData,
      token: token,
      message: userMsg.signIn,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.fieldRequired });
    }
    const userDetail = await findByEmail(email);
    if (!userDetail) {
      return res
        .status(404)
        .json({ success: false, message: errorMsg.userNotFound });
    }
    const otp = otpGenerate();
    const filePath = "./template/sendOtp.html";
    const source = fs.readFileSync(filePath, "utf8");
    const template = handlebars.compile(source);
    const emailTemp = template({
      otp: otp,
    });
    const mailOptions = {
      to: userDetail.email,
      subject: "Don't Worry, Resetting Your Password is Easy",
      html: emailTemp,
    };
    await sendEmail(mailOptions);

    await otptbl.destroy({ where: { email: userDetail.email } });
    await otptbl.create({
      email: userDetail.email,
      otp: otp,
    });
    setTimeout(async () => {
      await otptbl.destroy({
        where: {
          email: userDetail.email,
        },
      });
    }, 1000 * 60);
    return res.status(200).json({ success: true, message: userMsg.otpSend });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!otp) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.fieldRequired });
    }
    const isMatchOtp = await otptbl.findOne({ where: { email, otp } });
    if (!isMatchOtp) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.wrongOtp });
    }
    return res.status(200).json({ success: true, message: userMsg.trueOtp });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { error } = validatePasswordForReset(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
    const { email, password } = req.body;
    const userDetail = await user.findOne({ where: { email } });
    if (!userDetail) {
      return res
        .status(404)
        .json({ success: false, message: errorMsg.userNotFound });
    }
    userDetail.password = password;
    await userDetail.save();
    return res
      .status(200)
      .json({ success: true, message: userMsg.resetPassword });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const googleLogin = async (req, res) => {
  try {
    const jwtData = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      roleId: req.user.roleId,
    };
    const token = generateToken(jwtData);
    res.redirect(`http://localhost:5173/student/studentdashboard?token=${token}`)
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  signIn,
  forgotPassword,
  verifyOtp,
  resetPassword,
  googleLogin,
};
