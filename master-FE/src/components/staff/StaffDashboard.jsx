import {
  FaCheckCircle,
  FaClipboardList,
  FaSignOutAlt,
  FaTimesCircle,
  FaUser,
  FaUserCog,
} from "react-icons/fa";
import Dashboard from "../common/Dashboard";

const cardData = [
  {
    title: "Your Profile",
    description: "View your leave profile",
    icon: <FaUser />,
    path: "/staff/profile",
  },
  {
    title: "Update Profile",
    description: "Update your leave profile",
    icon: <FaUserCog />,
    path: "/staff/editprofile",
  },

  {
    title: "View Leave Report",
    description: "View leave that comes from the student",
    icon: <FaClipboardList />,
    path: "/staff/leavereport",
  },
  {
    title: "Approve Leave",
    description: "You can approve a student leave",
    icon: <FaCheckCircle />,
    path: "/staff/leavereport",
  },
  {
    title: "Reject Leave",
    description: "You can reject a student leave",
    icon: <FaTimesCircle />,
    path: "/staff/leavereport",
  },
  {
    title: "Logout",
    description: "Logout from your account",
    icon: <FaSignOutAlt />,
    path: "logout",
  },
];

function StaffDashboard() {
  return <Dashboard title="Faculty Dashboard" cardData={cardData} />;
}

export default StaffDashboard;
