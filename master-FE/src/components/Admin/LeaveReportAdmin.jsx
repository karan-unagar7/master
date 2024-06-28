import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getAllLeaveAdminApi } from "../../services/apiCall";

const localizer = momentLocalizer(moment);

const LeaveReportAdmin = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await getAllLeaveAdminApi();
        const { data } = response.data;
        const leaveEvents = data.map((leave) => ({
          title: `${leave.userDetail.name} - ${leave.leaveType}`,
          start: new Date(leave.startDate),
          end: new Date(leave.endDate),
          allDay: true,
          status: leave.status,
          leaveType: leave.leaveType,
        }));
        setEvents(leaveEvents);
      } catch (error) {
        console.error("Failed to fetch leave data:", error);
      }
    };

    fetchLeaveData();
  }, []);
  const getEventStyle = (event) => {
    let backgroundColor, borderColor;
    switch (event.status) {
      case "Approved":
        if (event.leaveType === "FullDay") {
          backgroundColor = "rgba(16, 185, 129, 0.8)";
          borderColor = "#047857";
        } else {
          backgroundColor = "rgba(95, 106, 106 ,0.9)";
          borderColor = "#9CA3AF";
        }
        break;
      case "Pending":
        backgroundColor = "rgba(255, 167, 38, 0.7)";
        borderColor = "#FFA726";
        break;
      default:
        backgroundColor = "rgba(239, 68, 68, 0.8)";
        borderColor = "#B91C1C";
    }

    return {
      style: {
        backgroundColor,
        borderLeft: `4px solid ${borderColor}`,
        color: "#FFFFFF",
        borderRadius: "4px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        padding: "2px 5px",
        fontSize: "0.85em",
        fontWeight: "700",
        textTransform: "capitalize",
      },
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-300 to-purple-300 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <h1 className="text-4xl font-bold text-center py-6 text-gray-800 bg-gradient-to-r from-indigo-200 to-purple-200">
          Leave Report Admin
        </h1>
        <div className="p-6">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            eventPropGetter={getEventStyle}
            views={["month", "week", "day"]}
            toolbar={true}
            popup={true}
            selectable={true}
            className="rounded-lg overflow-hidden shadow-inner"
          />
        </div>
      </div>
    </div>
  );
};

export default LeaveReportAdmin;
