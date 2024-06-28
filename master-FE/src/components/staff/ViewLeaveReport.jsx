import { useEffect, useMemo, useState } from "react";
import {
  getLeaveReportApi,
  setApprovedApi,
  setRejectedApi,
} from "../../services/apiCall";
import Table from "../common/Table";

function ViewLeaveReport() {
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [leaveStatus, setLeaveStatus] = useState("all");
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
        const response = await getLeaveReportApi(status, page, limit);
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
    fetchLeavedData(leaveStatus, currentPage);
  }, [leaveStatus, currentPage]);

  const handleStatusChange = (status) => {
    setLeaveStatus(status);
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

  const handleApprove = async (row) => {
    try {
      await setApprovedApi(row.id);
      const updatedData = leaveData.map((item) =>
        item.id === row.id ? { ...item, status: "Approved" } : item
      );
      setLeaveData(updatedData);
    } catch (error) {
      console.error("Failed to approve leave:", error);
    }
  };

  const handleReject = async (row) => {
    try {
      await setRejectedApi(row.id);
      const updatedData = leaveData.map((item) =>
        item.id === row.id ? { ...item, status: "Rejected" } : item
      );
      setLeaveData(updatedData);
    } catch (error) {
      console.error("Failed to reject leave:", error);
    }
  };

  const columns = [
    { header: "Start Date", accessor: "startDate" },
    { header: "End Date", accessor: "endDate" },
    { header: "Leave Type", accessor: "leaveType" },
    { header: "Reason", accessor: "reason" },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <p
          className={`inline-flex rounded bg-opacity-10 py-1 px-3 text-sm font-medium ${
            row.status === "Approved"
              ? "bg-green-950 text-green-800"
              : row.status === "Rejected"
              ? "bg-red-950 text-red-800"
              : "bg-yellow-950 text-yellow-800"
          }`}
        >
          {row.status}
        </p>
      ),
    },
    {
      header: "Actions",
      render: (row) =>
        row.status === "Pending" ? (
          <div className="flex space-x-2">
            <button
              onClick={() => handleApprove(row)}
              className="text-green-700 bg-green-300 py-2 px-3 rounded hover:text-green-900"
            >
              Approve
            </button>
            <button
              onClick={() => handleReject(row)}
              className="text-red-700 bg-red-300 py-2 px-5 rounded hover:text-red-900"
            >
              Reject
            </button>
          </div>
        ) : row.status === "Approved" ? (
          <p className="text-green-800 text-center">Approved</p>
        ) : (
          <p className="text-red-800 text-center">Rejected</p>
        ),
    },
  ];
  return (
    <Table
      columns={columns}
      data={sortedData}
      loading={loading}
      title="Leave Report"
      search={true}
      searchFunction={handleStatusChange}
      onSort={handleSort}
      sortConfig={sortConfig}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}

export default ViewLeaveReport;
