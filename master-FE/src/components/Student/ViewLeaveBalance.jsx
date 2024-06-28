import { useEffect, useState } from "react";
import { getLeaveBalanceApi } from "../../services/apiCall";
import Table from "../common/Table";

function ViewLeaveBalance() {
  const [leaveBalanceData, setLeaveBalanceData] = useState([]);

  useEffect(() => {
    const fetchLeaveBalanceData = async () => {
      try {
        const response = await getLeaveBalanceApi();
        const { data } = response.data;
        console.log(data);
        setLeaveBalanceData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLeaveBalanceData();
  }, []);

  const columns = [
    { header: "Total Leave", accessor: "totalLeave" },
    { header: "Available Leave", accessor: "availableLeave" },
    { header: "Used Leave", accessor: "usedLeave" },
    { header: "Total Working Days", accessor: "totalWorkingDays" },
    { header: "Academic Year", accessor: "academicYear" },
    { header: "Attendance Percentage", accessor: "attendancePercentage" },
  ];

  return (
    <Table
      columns={columns}
      data={leaveBalanceData}
      title="Your Leave Balance"
      sorting={false}
      pagination={false}
    />
  );
}

export default ViewLeaveBalance;
