export const baseUrl = `http://localhost:3001/api/v1`;

// Auth Apis :-
const signIn = `${baseUrl}/auth/signin`;
const forgotPassword = `${baseUrl}/auth/forgotpassword`;
const verifyOtp = `${baseUrl}/auth/verifyotp`;
const resetPassword = `${baseUrl}/auth/resetpassword`;

// User Apis :-
const studentSignUp = `${baseUrl}/user/studentsignup`;
const hodSignUp = `${baseUrl}/user/hodsignup`;
const staffSignUp = `${baseUrl}/user/staffsignup`;
const getFacultyList = `${baseUrl}/user/facultylist`;
const getProfile = `${baseUrl}/user/profile`;
const updateStudentProfile = `${baseUrl}/user/updateprofile`;
const changeProfilePic = `${baseUrl}/user/changeprofileimage`;
const getAllUser = `${baseUrl}/user/alluser`;
const updateUser = `${baseUrl}/user/updateuser`;
const deleteUser = `${baseUrl}/user/deleteuser`;
const userData = `${baseUrl}/user/getuserdata`;

// Leave Apis :-
const applyLeave = `${baseUrl}/leave/applyleave`;
const getLeaveStatus = `${baseUrl}/leave/viewleavestatus`;
const getLeaveBalance = `${baseUrl}/leave/viewavailableleave`;
const getLeaveReport = `${baseUrl}/leave/leavereport`;
const setApproved = `${baseUrl}/leave/setapprove`;
const setRejected = `${baseUrl}/leave/setreject`;
const getLeaveReportAdmin = `${baseUrl}/leave/leavereportadmin`;
const getAllLeaveAdmin = `${baseUrl}/leave/viewallleaveadmin`;

export {
  signIn,
  forgotPassword,
  verifyOtp,
  resetPassword,
  studentSignUp,
  hodSignUp,
  staffSignUp,
  getFacultyList,
  getProfile,
  updateStudentProfile,
  changeProfilePic,
  getAllUser,
  updateUser,
  deleteUser,
  applyLeave,
  getLeaveStatus,
  getLeaveBalance,
  getLeaveReport,
  getLeaveReportAdmin,
  setApproved,
  setRejected,
  userData,
  getAllLeaveAdmin,
};
