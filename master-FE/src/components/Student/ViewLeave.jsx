import { useEffect, useState, useMemo } from "react";
import { getLeaveStatusApi } from "../../services/apiCall";
import Table from "../common/Table";

function ViewLeave() {
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
        const response = await getLeaveStatusApi(status, page, limit);
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
  ];

  return (
    <Table
      columns={columns}
      data={sortedData}
      loading={loading}
      title="Your Leave"
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

export default ViewLeave;
