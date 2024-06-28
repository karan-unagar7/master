import { Routes, Route } from "react-router-dom";
import StaffDashboard from "../staff/StaffDashboard";
import ViewLeaveReport from "../staff/ViewLeaveReport";
import Profile from "../Student/Profile";
import EditProfile from "../Student/EditProfile";


const StaffModule = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<StaffDashboard />} />
      <Route path="/leavereport" element={<ViewLeaveReport />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/editprofile" element={<EditProfile />} />
    </Routes>
  );
};

export default StaffModule;
