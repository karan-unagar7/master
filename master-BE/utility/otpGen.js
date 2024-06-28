const otp = require("otp-generator");

const otpGenerate = () => {
  return otp.generate(4, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
};

module.exports = otpGenerate;
