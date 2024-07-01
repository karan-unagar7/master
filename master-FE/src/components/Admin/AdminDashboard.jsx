import {
  FaCalendarAlt,
  FaClipboardCheck,
  FaSignOutAlt,
  FaUser,
  FaUserCog,
  FaUserEdit,
  FaUserMinus,
  FaUserPlus,
} from "react-icons/fa";
import Dashboard from "../common/Dashboard";
const cardData = [
  {
    title: "Your Profile",
    description: "View your leave profile",
    icon: <FaUser />,
    path: "/admin/profile",
  },
  {
    title: "Update Profile",
    description: "Update your leave profile",
    icon: <FaUserCog />,
    path: "/admin/editprofile",
  },
  {
    title: "Add Users",
    description: "You can add student,staff & hod",
    icon: <FaUserPlus />,
    path: "/admin/addstudent",
  },
  {
    title: "Update Users",
    description: "You can update student,staff & hod",
    icon: <FaUserEdit />,
    path: "/admin/viewstudent",
  },
  {
    title: "Delete Users",
    description: "You can delete student,staff & hod",
    icon: <FaUserMinus />,
    path: "/admin/viewstudent",
  },
  {
    title: "View Users Leave Availability",
    description: "View All Users Leave availability & filter role wise",
    icon: <FaClipboardCheck />,
    path: "/admin/useravailableleave",
  },
  {
    title: "Leave Calender",
    description: "View All Users Leave",
    icon: <FaCalendarAlt />,
    path: "/admin/leavereport",
  },
  {
    title: "Logout",
    description: "Logout from your account",
    icon: <FaSignOutAlt />,
    path: "logout",
  },
];

function AdminDashboard() {
  return <Dashboard title="Admin Dashboard" cardData={cardData} />;
}

export default AdminDashboard;
