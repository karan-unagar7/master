import axios from "axios";

import {
  studentSignUp,
  signIn,
  getFacultyList,
  applyLeave,
  getLeaveStatus,
  getLeaveBalance,
  getProfile,
  changeProfilePic,
  updateStudentProfile,
  getLeaveReport,
  setApproved,
  setRejected,
  hodSignUp,
  staffSignUp,
  getAllUser,
  updateUser,
  deleteUser,
  userData,
  getLeaveReportAdmin,
  getAllLeaveAdmin,
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "../assets/apis";

const studentSignUpApi = async (formData) => {
  console.log(`values :- ${formData}`);
  return await axios.post(studentSignUp, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const hodSignUpApi = async (formData) => {
  return await axios.post(hodSignUp, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const staffSignUpApi = async (formData) => {
  return await axios.post(staffSignUp, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const signInApi = async (values) => {
  return await axios.post(signIn, values);
};

const getFacultyListApi = async () => {
  return await axios.get(getFacultyList);
};

const applyLeaveApi = async (values) => {
  return await axios.post(applyLeave, values, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const getLeaveStatusApi = async (status, page, limit) => {
  return await axios.get(getLeaveStatus, {
    params: { leavestatus: status, page, limit },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const getLeaveBalanceApi = async () => {
  return await axios.get(getLeaveBalance, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const getProfileApi = async () => {
  return await axios.get(getProfile, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const changeProfileImageApi = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axios.post(changeProfilePic, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response;
};

const updateStudentProfileApi = async (values) => {
  return await axios.put(updateStudentProfile, values, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const getLeaveReportApi = async (status, page, limit) => {
  return await axios.get(getLeaveReport, {
    params: { leavestatus: status, page, limit },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const setApprovedApi = async (id) => {
  return await axios.get(`${setApproved}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const setRejectedApi = async (id) => {
  return await axios.get(`${setRejected}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const getAllUserApi = async (role,page,limit,search) => {
  return axios.get(getAllUser, {
    params: { role,page,limit,search },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const updateUserApi = async (id, role, values) => {
  return axios.put(`${updateUser}/${id}`, values, {
    params: { role },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const deleteUserApi = async (id, role) => {
  return axios.delete(`${deleteUser}/${id}`, {
    params: { role },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const getUserDataApi = async (id) => {
  return await axios.get(`${userData}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const getLeaveReportAdminApi = async (role,page,limit) => {
  return await axios.get(getLeaveReportAdmin, {
    params: { role,page,limit },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const getAllLeaveAdminApi = async () => {
  return await axios.get(getAllLeaveAdmin, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const forgotPasswordApi = async (values) => {
  return await axios.post(forgotPassword, values);
};

const verifyOtpApi = async (values) => {
  return await axios.post(verifyOtp, values);
};

const resetPasswordApi = async (values) => {
  return await axios.post(resetPassword, values);
};

// const filterLeaveStatusApi = async (status) => {
//   return await axios.get(`${getFilterLeave}?leavestatus=${status}`, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   });
// };

export {
  studentSignUpApi,
  hodSignUpApi,
  staffSignUpApi,
  signInApi,
  getFacultyListApi,
  applyLeaveApi,
  getLeaveStatusApi,
  getLeaveBalanceApi,
  getProfileApi,
  changeProfileImageApi,
  updateStudentProfileApi,
  getLeaveReportApi,
  setApprovedApi,
  setRejectedApi,
  getAllUserApi,
  updateUserApi,
  deleteUserApi,
  getUserDataApi,
  getLeaveReportAdminApi,
  getAllLeaveAdminApi,
  forgotPasswordApi,
  verifyOtpApi,
  resetPasswordApi,
};
