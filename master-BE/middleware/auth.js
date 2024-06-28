const { user } = require("../models/user");
const { errorMsg } = require("../utility/message");
const { verifyToken } = require("../utility/token");

const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res
        .status(404)
        .json({ success: false, message: errorMsg.tokenNotFound });
    }
    const decodeToken = verifyToken(token);
    if (!decodeToken) {
      return res
        .status(401)
        .json({ success: false, message: errorMsg.unAuthorizedUser });
    }

    const isUser = await user.findByPk(decodeToken?.id, {
      attributes: { exclude: ["password", "updatedAt", "createdAt",] },
    });

    if (!isUser) {
      return res.status(404).json({ message: errorMsg.userNotFound });
    }
    req.user = isUser;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = verifyUser;
