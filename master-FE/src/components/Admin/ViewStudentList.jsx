import { useEffect, useMemo, useState } from "react";
import Table from "../common/Table";
import { deleteUserApi, getAllUserApi } from "../../services/apiCall";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "../../confimbox.css";

function ViewStudentList() {
  const [studentData, setstudentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 5;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeavedData = async (page = 1, limit, search = "") => {
      try {
        setTimeout(async () => {
          const response = await getAllUserApi("student", page, limit, search);
          const { data, maxPage } = response.data;
          setstudentData(data);
          setTotalPages(maxPage);
          setLoading(false);
        }, 1000);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchLeavedData(currentPage, limit, searchTerm);
  }, [currentPage, searchTerm]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    let sortableItems = [...studentData];
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
  }, [studentData, sortConfig]);

  const handleUpdate = (row) => {
    navigate("/admin/edituserprofile", { state: row.id });
  };

  const handleDelete = async (row) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-alert-overlay">
            <div className="custom-alert">
              <h1>Confirm to delete</h1>
              <p>Are you sure you want to delete this student?</p>
              <button
                onClick={async () => {
                  try {
                    const response = await deleteUserApi(row.id, "student");
                    setstudentData(
                      studentData.filter((student) => student.id !== row.id)
                    );
                    toast.success(response.data.message);
                  } catch (error) {
                    toast.error(error.response.data.message);
                  }
                  onClose();
                }}
              >
                Yes
              </button>
              <button onClick={onClose} className="cancel">
                No
              </button>
            </div>
          </div>
        );
      },
    });
  };

  const columns = [
    { header: "Id", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "E-mail", accessor: "email" },
    { header: "Gender", accessor: "gender" },
    { header: "Phone", accessor: "phone" },
    { header: "Address", accessor: "address" },
    { header: "Department", accessor: "department" },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleUpdate(row)}
            className="text-green-700 bg-green-300 py-2 px-3 rounded hover:text-green-900"
          >
            Update
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="text-red-700 bg-red-300 py-2 px-3 rounded hover:text-red-900"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={sortedData}
      loading={loading}
      title="Student List"
      onSort={handleSort}
      sortConfig={sortConfig}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      searchInput={true}
      searchFunction={handleSearch}
    />
  );
}

export default ViewStudentList;
