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
    path: "/student/profile",
  },
  {
    title: "Update Profile",
    description: "Update your leave profile",
    icon: <FaUserCog />,
    path: "/student/editprofile",
  },
  {
    title: "Apply Leave",
    description: "Request a leave of absence",
    icon: <FaFileAlt />,
    path: "/student/applyleave",
  },
  {
    title: "View Leave Status",
    description: "Check your leave request status",
    icon: <FaClipboardList />,
    path: "/student/viewleave",
  },
  {
    title: "View Leave Availability",
    description: "View your leave availability",
    icon: <FaClipboardList />,
    path: "/student/viewleavebalance",
  },
  {
    title: "Logout",
    description: "Logout from your account",
    icon: <FaSignOutAlt />,
    path: "logout",
  },
];

function StudentDashboard() {
  return <Dashboard title="Student Dashboard" cardData={cardData} />;
}

export default StudentDashboard;
