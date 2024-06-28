import {
  FaClipboardList,
  FaFileAlt,
  FaSignOutAlt,
  FaUser,
  FaUserCog,
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
    title: "Apply Leave",
    description: "Request a leave of absence",
    icon: <FaFileAlt />,
  },
  {
    title: "View Leave Status",
    description: "Check your leave request status",
    icon: <FaClipboardList />,
  },
  {
    title: "View Leave Availability",
    description: "View your leave availability",
    icon: <FaClipboardList />,
  },
  {
    title: "Logout",
    description: "Logout from your account",
    icon: <FaSignOutAlt />,
  },
];

function StudentDashboard() {
  return <Dashboard title="Student Dashboard" cardData={cardData} />;
}

export default StudentDashboard;
