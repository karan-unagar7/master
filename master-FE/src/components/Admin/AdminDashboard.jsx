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
  },
  {
    title: "Update Profile",
    description: "Update your leave profile",
    icon: <FaUserCog />,
  },
  {
    title: "Add Users",
    description: "You can add student,staff & hod",
    icon: <FaUserPlus />,
  },
  {
    title: "Update Users",
    description: "You can update student,staff & hod",
    icon: <FaUserEdit />,
  },
  {
    title: "Delete Users",
    description: "You can delete student,staff & hod",
    icon: <FaUserMinus />,
  },
  {
    title: "View Users Leave Availability",
    description: "View All Users Leave availability & filter role wise",
    icon: <FaClipboardCheck />,
  },
  {
    title: "Leave Calender",
    description: "View All Users Leave",
    icon: <FaCalendarAlt />,
  },
  {
    title: "Logout",
    description: "Logout from your account",
    icon: <FaSignOutAlt />,
  },
];

function AdminDashboard() {
  return <Dashboard title="Admin Dashboard" cardData={cardData} />;
}

export default AdminDashboard;
