const nodemailer = require("nodemailer");
const { EMAIL, EMAIL_PASSWORD } = require("./config");

const smtpConfig = {
  EMAIL: EMAIL,
  PASSWORD: EMAIL_PASSWORD,
  HOST: "smtp.gmail.com",
  PORT: 587,
  FROM_EMAIL: EMAIL,
};

const transporter = nodemailer.createTransport(
  {
    host: smtpConfig.HOST,
    port: smtpConfig.PORT,
    secure: false,
    auth: {
      user: smtpConfig.EMAIL,
      pass: smtpConfig.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  },
  { sendmail: true }
);

async function sendEmail(mailOptions) {
  transporter.verify(async (error) => {
    if (error) {
      return { error: error.message };
    }
  });
  await transporter.sendMail(mailOptions);
  return { result: "Email sent successfully" };
}

module.exports = sendEmail;
