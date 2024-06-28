import { Routes, Route } from "react-router-dom";
import StudentDashboard from "../Student/StudentDashboard";
import ApplyLeave from "../Student/ApplyLeave";
import ViewLeave from "../Student/ViewLeave";
import ViewLeaveBalance from "../Student/ViewLeaveBalance";
import Profile from "../Student/Profile";
import EditProfile from "../Student/EditProfile";

const StudentModule = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<StudentDashboard />} />
      <Route path="/applyleave" element={<ApplyLeave />} />
      <Route path="/viewleave" element={<ViewLeave />} />
      <Route path="/viewleavebalance" element={<ViewLeaveBalance />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/editprofile" element={<EditProfile />} />
    </Routes>
  );
};

export default StudentModule;
