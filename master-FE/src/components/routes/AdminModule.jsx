import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../Admin/AdminDashboard";
import AddStudent from "../Admin/AddStudent";
import AddHod from "../Admin/AddHod";
import AddStaff from "../Admin/AddStaff";
import ViewStudentList from "../Admin/ViewStudentList";
import ViewHodList from "../Admin/ViewHodList";
import ViewStaffList from "../Admin/ViewStaffList";
import EditUserProfile from "../Admin/EditUserProfile";
import UserLeaveAvailable from "../Admin/UserLeaveAvailable";
import UserLeave from "../Admin/UserLeave";
import LeaveReportAdmin from "../Admin/LeaveReportAdmin";
import Profile from "../Student/Profile";
import EditProfile from "../Student/EditProfile";

const AdminModule = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/editprofile" element={<EditProfile />} />
      <Route path="/addstudent" element={<AddStudent />} />
      <Route path="/addhod" element={<AddHod />} />
      <Route path="/addstaff" element={<AddStaff />} />
      <Route path="/viewstudent" element={<ViewStudentList />} />
      <Route path="/viewhod" element={<ViewHodList />} />
      <Route path="/viewstaff" element={<ViewStaffList />} />
      <Route path="/edituserprofile" element={<EditUserProfile />} />
      <Route path="/useravailableleave" element={<UserLeaveAvailable />} />
      <Route path="/userleave" element={<UserLeave />} />
      <Route path="/leavereport" element={<LeaveReportAdmin />} />
    </Routes>
  );
};

export default AdminModule;
