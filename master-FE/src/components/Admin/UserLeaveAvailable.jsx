import { useEffect, useMemo, useState } from "react";
import { getLeaveReportAdminApi } from "../../services/apiCall";
import Table from "../common/Table";

function UserLeaveAvailable() {
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;
  const fetchLeavedData = async (status = "all", page = 1, limit) => {
    try {
      setTimeout(async () => {
        const response = await getLeaveReportAdminApi(status, page, limit);
        const { data, maxPage } = response.data;
        setLeaveData(data);
        setTotalPages(maxPage);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeavedData(role, currentPage);
  }, [role, currentPage]);

  const handleStatusChange = (status) => {
    setRole(status);
    setCurrentPage(1);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };
  const sortedData = useMemo(() => {
    let sortableItems = [...leaveData];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [leaveData, sortConfig]);
  const columns = [
    { header: "name", accessor: "user.name" },
    { header: "e-mail", accessor: "user.email" },
    // { header: "phone", accessor: "user.phone" },
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
      data={sortedData}
      loading={loading}
      title="List of Available Leave"
      searchRole={true}
      searchFunction={handleStatusChange}
      onSort={handleSort}
      sortConfig={sortConfig}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}

export default UserLeaveAvailable;
