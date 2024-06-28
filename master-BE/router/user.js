const { Router } = require("express");
const {
  studentSignup,
  staffSignup,
  hodSignup,
  profile,
  updateProfile,
  changeProfileImage,
  getUsers,
  updateOneUser,
  deleteOneUser,
  getStaffList,
  getUserData,
} = require("../controller/user");
const verifyUser = require("../middleware/auth");
const upload = require("../middleware/multer");

const router = Router();

router.post("/studentsignup", upload.single("image"), studentSignup);
router.get("/facultylist", getStaffList);

router.use(verifyUser);
router.post("/staffsignup", upload.single("image"), staffSignup);
router.post("/hodsignup", upload.single("image"), hodSignup);
router.get("/profile", profile);
router.put("/updateprofile", updateProfile);
router.post("/changeprofileimage", upload.single("image"), changeProfileImage);
router.get("/alluser", getUsers);
router.put("/updateuser/:id", updateOneUser);
router.delete("/deleteuser/:id", deleteOneUser);
router.get("/getuserdata/:id" , getUserData)

module.exports = router;
