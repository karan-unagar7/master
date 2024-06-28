const { validateDataForUser, user } = require("../models/user");
const { userMsg, errorMsg } = require("../utility/message");
const {
  fileUpload,
  profilePicDeleteOnCloudinary,
} = require("../utility/cloudinary");
const { student, admin, staff, hod } = require("../utility/roleId");
const sendEmail = require("../utility/mail");
const handlebars = require("handlebars");
const fs = require("fs");
const {
  findByEmail,
  createUser,
  updateUser,
  findById,
  countUser,
  findAllUser,
  findByIdAndRoleId,
  deleteUser,
} = require("../services/user");
const { createUserLeave } = require("../services/userLeave");

const studentSignup = async (req, res) => {
  try {
    const { error } = validateDataForUser(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.imageRequired });
    }

    const { name, email, password, gender, phone, address, department } =
      req.body;
    const studentDetail = await findByEmail(email);
    if (studentDetail) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.userAlreadyExicts });
    }
    const { secure_url } = await fileUpload(req.file?.path);

    const studentCreate = await createUser(
      name,
      email,
      password,
      gender,
      secure_url,
      phone,
      address,
      department,
      student
    );

    await createUserLeave(studentCreate.id);

    const filePath = "./template/signUp.html";
    const source = fs.readFileSync(filePath, "utf8");
    const template = handlebars.compile(source);
    const emailTemp = template({
      name: studentCreate.name,
      email: studentCreate.email,
    });

    const mailOptions = {
      to: studentCreate.email,
      subject: "Sign-Up Successfully",
      html: emailTemp,
    };

    await sendEmail(mailOptions);

    return res.status(201).json({ success: true, message: userMsg.signUp });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const staffSignup = async (req, res) => {
  try {
    const { roleId } = req.user;
    if (!(roleId === admin)) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.onlyAdmin });
    }
    const { error } = validateDataForUser(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.imageRequired });
    }
    const { name, email, password, gender, phone, address, department } =
      req.body;
    const staffDetail = await findByEmail(email);
    if (staffDetail) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.userAlreadyExicts });
    }
    const { secure_url } = await fileUpload(req.file?.path);
    const staffCreate = await createUser(
      name,
      email,
      password,
      gender,
      secure_url,
      phone,
      address,
      department,
      staff
    );

    await createUserLeave(staffCreate.id);

    const filePath = "./template/signUp.html";
    const source = fs.readFileSync(filePath, "utf8");
    const template = handlebars.compile(source);
    const emailTemp = template({
      name: staffCreate.name,
      email: staffCreate.email,
    });

    const mailOptions = {
      to: staffCreate.email,
      subject: "Sign-Up Successfully",
      html: emailTemp,
    };

    await sendEmail(mailOptions);

    return res.status(201).json({ success: true, message: userMsg.signUp });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const hodSignup = async (req, res) => {
  try {
    const { roleId } = req.user;
    if (!(roleId === admin)) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.onlyAdmin });
    }
    const { error } = validateDataForUser(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.imageRequired });
    }
    const { name, email, password, gender, phone, address, department } =
      req.body;
    const hodDetail = await findByEmail(email);
    if (hodDetail) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.userAlreadyExicts });
    }
    const { secure_url } = await fileUpload(req.file?.path);
    const hodCreate = await await createUser(
      name,
      email,
      password,
      gender,
      secure_url,
      phone,
      address,
      department,
      hod
    );
    await createUserLeave(hodCreate.id);
    const filePath = "./template/signUp.html";
    const source = fs.readFileSync(filePath, "utf8");
    const template = handlebars.compile(source);
    const emailTemp = template({
      name: hodCreate.name,
      email: hodCreate.email,
    });

    const mailOptions = {
      to: hodCreate.email,
      subject: "Sign-Up Successfully",
      html: emailTemp,
    };

    await sendEmail(mailOptions);
    return res.status(201).json({ success: true, message: userMsg.signUp });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const profile = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ success: true, data: req.user, message: userMsg.getProfile });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const { name, email, password, gender, phone, address, department } =
      req.body;

    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (password) updates.password = password;
    if (gender) updates.gender = gender;
    if (phone) updates.phone = phone;
    if (address) updates.address = address;
    if (department) updates.department = department;

    await updateUser(updates, id);

    return res.status(200).json({ success: true, message: userMsg.updateMsg });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const changeProfileImage = async (req, res) => {
  try {
    const { id } = req.user;
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.imageRequired });
    }

    const userDetail = await findById(id);
    if (!userDetail) {
      return res
        .status(404)
        .json({ success: false, message: errorMsg.userNotFound });
    }

    const { image } = userDetail;

    await profilePicDeleteOnCloudinary(image);
    const { secure_url } = await fileUpload(req.file?.path);

    userDetail.image = secure_url;
    await userDetail.save();
    return res.status(200).json({
      success: true,
      image: userDetail.image,
      message: userMsg.changeProfileImage,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// const getStudent = async (req, res) => {
//   try {
//     const { roleId } = req.user;
//     if (!(roleId === admin)) {
//       return res
//         .status(400)
//         .json({ success: false, message: errorMsg.onlyAdmin });
//     }
//     const { page, limit } = req.query;
//     const pageCount = page || 1;
//     const limitDoc = Number(limit) || 5;
//     const totalStudents = await countUser(student);
//     const maxPage =
//       totalStudents <= limitDoc ? 1 : Math.ceil(totalStudents / limitDoc);

//     if (pageCount > maxPage) {
//       return res
//         .status(400)
//         .json({ message: `There are only ${maxPage} page.` });
//     }
//     const skip = (pageCount - 1) * limitDoc;
//     // const studentList = await user.findAll({
//     //   where: { roleId: student },
//     //   offset: skip,
//     //   limit: limitDoc,
//     // });
//     const studentList = await findAllUser(student, {
//       offset: skip,
//       limit: limitDoc,
//     });
//     if (!studentList || studentList.length === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: errorMsg.dataNotFound });
//     }
//     return res.status(200).json({ success: true, data: studentList });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// const getHod = async (req, res) => {
//   try {
//     const { roleId } = req.user;
//     if (!(roleId === admin)) {
//       return res
//         .status(400)
//         .json({ success: false, message: errorMsg.onlyAdmin });
//     }
//     const { page, limit } = req.query;
//     const pageCount = page || 1;
//     const limitDoc = Number(limit) || 5;
//     const totalHods = await countUser(hod);
//     const maxPage = totalHods <= limitDoc ? 1 : Math.ceil(totalHods / limitDoc);

//     if (pageCount > maxPage) {
//       return res
//         .status(400)
//         .json({ message: `There are only ${maxPage} page.` });
//     }
//     const skip = (pageCount - 1) * limitDoc;
//     const hodList = await findAllUser(hod, { offset: skip, limit: limitDoc });
//     if (!hodList || hodList.length === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: errorMsg.dataNotFound });
//     }
//     return res.status(200).json({ success: true, data: hodList });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// const getStaff = async (req, res) => {
//   try {
//     const { roleId } = req.user;
//     if (!(roleId === admin)) {
//       return res
//         .status(400)
//         .json({ success: false, message: errorMsg.onlyAdmin });
//     }
//     const { page, limit } = req.query;
//     const pageCount = page || 1;
//     const limitDoc = Number(limit) || 5;
//     const totalStaffs = await countUser(staff);
//     const maxPage =
//       totalStaffs <= limitDoc ? 1 : Math.ceil(totalStaffs / limitDoc);

//     if (pageCount > maxPage) {
//       return res
//         .status(400)
//         .json({ message: `There are only ${maxPage} page.` });
//     }
//     const skip = (pageCount - 1) * limitDoc;
//     const staffList = await findAllUser(staff, {
//       offset: skip,
//       limit: limitDoc,
//     });
//     if (!staffList || staffList.length === 0) {
//       return res
//         .status(404)
//         .json({ success: false, message: errorMsg.dataNotFound });
//     }
//     return res.status(200).json({ success: true, data: staffList });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

const getUsers = async (req, res) => {
  try {
    const { roleId } = req.user;
    if (!(roleId === admin)) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.onlyAdmin });
    }

    const { role, page, limit, search } = req.query;

    let userRole;
    if (role === "student") {
      userRole = student;
    } else if (role === "hod") {
      userRole = hod;
    } else if (role === "staff") {
      userRole = staff;
    } else {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    const pageCount = Number(page) || 1;
    const limitDoc = Number(limit) || 5;

    const totalUser = await countUser(userRole, search);
    
    const maxPage = totalUser <= limitDoc ? 1 : Math.ceil(totalUser / limitDoc);
    if (pageCount > maxPage) {
      return res
        .status(400)
        .json({ message: `There are only ${maxPage} page.` });
    }
    const skip = (pageCount - 1) * limitDoc;

    const userList = await findAllUser(userRole, skip, limitDoc, search);

    return res.status(200).json({ success: true, data: userList, maxPage });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// const updateStudent = async (req, res) => {
//   try {
//     const { roleId } = req.user;
//     if (!(roleId === admin)) {
//       return res
//         .status(400)
//         .json({ success: false, message: errorMsg.onlyAdmin });
//     }
//     const { id } = req.params;
//     const studentDetail = await user.findOne({
//       where: { id, roleId: student },
//     });
//     if (!studentDetail) {
//       return res
//         .status(404)
//         .json({ success: false, message: errorMsg.dataNotFound });
//     }
//     const { name, email, password, gender, phone, address, department } =
//       req.body;

//     if (
//       (name ||
//         email ||
//         password ||
//         gender ||
//         phone ||
//         address ||
//         department) === undefined
//     ) {
//       return res
//         .status(400)
//         .json({ success: false, message: errorMsg.fieldRequired });
//     }

//     await user.update(
//       { name, email, password, gender, phone, address, department },
//       { where: { id } }
//     );
//     return res.status(200).json({ success: true, message: userMsg.updateMsg });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// const updateHod = async (req, res) => {
//   try {
//     const { roleId } = req.user;
//     if (!(roleId === admin)) {
//       return res
//         .status(400)
//         .json({ success: false, message: errorMsg.onlyAdmin });
//     }
//     const { id } = req.params;
//     const hodDetail = await user.findOne({ where: { id, roleId: hod } });
//     if (!hodDetail) {
//       return res
//         .status(404)
//         .json({ success: false, message: errorMsg.dataNotFound });
//     }
//     const { name, email, password, gender, phone, address, department } =
//       req.body;

//     if (
//       (name ||
//         email ||
//         password ||
//         gender ||
//         phone ||
//         address ||
//         department) === undefined
//     ) {
//       return res
//         .status(400)
//         .json({ success: false, message: errorMsg.fieldRequired });
//     }

//     await user.update(
//       { name, email, password, gender, phone, address, department },
//       { where: { id } }
//     );

//     return res.status(200).json({ success: true, message: userMsg.updateMsg });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// const updateStaff = async (req, res) => {
//   try {
//     const { roleId } = req.user;
//     if (!(roleId === admin)) {
//       return res
//         .status(400)
//         .json({ success: false, message: errorMsg.onlyAdmin });
//     }
//     const { id } = req.params;
//     const staffDetail = await user.findOne({ where: { id, roleId: staff } });
//     if (!staffDetail) {
//       return res
//         .status(404)
//         .json({ success: false, message: errorMsg.dataNotFound });
//     }
//     const { name, email, password, gender, phone, address, department } =
//       req.body;

//     if (
//       (name ||
//         email ||
//         password ||
//         gender ||
//         phone ||
//         address ||
//         department) === undefined
//     ) {
//       return res
//         .status(400)
//         .json({ success: false, message: errorMsg.fieldRequired });
//     }

//     await user.update(
//       { name, email, password, gender, phone, address, department },
//       { where: { id } }
//     );
//     return res.status(200).json({ success: true, message: userMsg.updateMsg });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

const updateOneUser = async (req, res) => {
  try {
    const { roleId } = req.user;
    if (!(roleId === admin)) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.onlyAdmin });
    }
    const { id } = req.params;
    const { role } = req.query;

    let userRole;
    if (role === "student") {
      userRole = student;
    } else if (role === "hod") {
      userRole = hod;
    } else if (role === "staff") {
      userRole = staff;
    } else {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }
    const userDetail = await findByIdAndRoleId(id, userRole);
    if (!userDetail) {
      return res
        .status(404)
        .json({ success: false, message: errorMsg.dataNotFound });
    }
    const { name, email, password, gender, phone, address, department } =
      req.body;

    // if (
    //   (name ||
    //     email ||
    //     password ||
    //     gender ||
    //     phone ||
    //     address ||
    //     department) === undefined
    // ) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: errorMsg.fieldRequired });
    // }

    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (password) updates.password = password;
    if (gender) updates.gender = gender;
    if (phone) updates.phone = phone;
    if (address) updates.address = address;
    if (department) updates.department = department;

    await updateUser(updates, id);

    return res.status(200).json({ success: true, message: userMsg.updateMsg });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// const deleteStudent = async (req, res) => {
//   try {
//     const { roleId } = req.user;
//     if (!(roleId === admin)) {
//       return res
//         .status(400)
//         .json({ success: false, message: errorMsg.onlyAdmin });
//     }
//     const { id } = req.params;
//     const studentDetail = await user.findOne({
//       where: { id, roleId: student },
//     });
//     if (!studentDetail) {
//       return res
//         .status(404)
//         .json({ success: false, message: errorMsg.dataNotFound });
//     }
//     await user.destroy({ where: { id } });
//     return res.status(200).json({ success: true, message: userMsg.deleteMsg });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// const deleteHod = async (req, res) => {
//   try {
//     const { roleId } = req.user;
//     if (!(roleId === admin)) {
//       return res
//         .status(400)
//         .json({ success: false, message: errorMsg.onlyAdmin });
//     }
//     const { id } = req.params;
//     const hodDetail = await user.findOne({
//       where: { id, roleId: hod },
//     });
//     if (!hodDetail) {
//       return res
//         .status(404)
//         .json({ success: false, message: errorMsg.dataNotFound });
//     }
//     await user.destroy({ where: { id } });
//     return res.status(200).json({ success: true, message: userMsg.deleteMsg });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// const deleteFaculty = async (req, res) => {
//   try {
//     const { roleId } = req.user;
//     if (!(roleId === admin)) {
//       return res
//         .status(400)
//         .json({ success: false, message: errorMsg.onlyAdmin });
//     }
//     const { id } = req.params;
//     const staffDetail = await user.findOne({
//       where: { id, roleId: staff },
//     });
//     if (!staffDetail) {
//       return res
//         .status(404)
//         .json({ success: false, message: errorMsg.dataNotFound });
//     }
//     await user.destroy({ where: { id } });
//     return res.status(200).json({ success: true, message: userMsg.deleteMsg });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

const deleteOneUser = async (req, res) => {
  try {
    const { roleId } = req.user;
    if (!(roleId === admin)) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.onlyAdmin });
    }
    const { id } = req.params;
    const { role } = req.query;

    let userRole;
    if (role === "student") {
      userRole = student;
    } else if (role === "hod") {
      userRole = hod;
    } else if (role === "staff") {
      userRole = staff;
    } else {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }
    const userDetail = await findByIdAndRoleId(id, userRole);
    if (!userDetail) {
      return res
        .status(404)
        .json({ success: false, message: errorMsg.dataNotFound });
    }

    const { image } = userDetail;
    await profilePicDeleteOnCloudinary(image);
    await deleteUser(id);
    return res.status(200).json({ success: true, message: userMsg.deleteMsg });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getStaffList = async (req, res) => {
  try {
    const staffDetails = await user.findAll({
      where: { roleId: [staff, hod] },
      attributes: ["id", "name", "roleId"],
    });
    if (!staffDetails) {
      return res
        .status(404)
        .json({ success: false, message: errorMsg.dataNotFound });
    }
    return res.status(200).json({ success: true, data: staffDetails });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getUserData = async (req, res) => {
  try {
    const { roleId } = req.user;
    const { id } = req.params;
    if (!(roleId === admin)) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.onlyAdmin });
    }
    const userDetail = await findById(id);
    if (!userDetail) {
      return res
        .status(404)
        .json({ success: false, message: errorMsg.dataNotFound });
    }
    return res.status(200).json({ success: true, data: userDetail });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
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
};
