/* eslint-disable react/prop-types */
// import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import ReactPaginate from "react-paginate";
import "react-loading-skeleton/dist/skeleton.css";
import "../../table.css";

function Table({
  columns,
  data,
  loading,
  title,
  search = false,
  searchFunction,
  searchRole = false,
  sorting = true,
  onSort,
  sortConfig,
  currentPage,
  totalPages,
  onPageChange,
  pagination = true,
  searchInput,
}) {
  return (
    <section className="bg-gradient-to-r from-indigo-300 to-purple-300 min-h-screen flex items-center justify-center p-8">
      <Toaster position="top-right" />
      <div className="w-full max-w-7xl bg-white rounded-lg shadow-lg px-5 py-6 sm:px-7.5 xl:py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {title}
        </h1>
        {search && (
          <div className="flex justify-end mb-2 items-center">
            <label htmlFor="leave-status" className="mr-2">
              Select Leave Status:
            </label>
            <select
              id="leave-status"
              className="appearance-none bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => searchFunction(e.target.value)}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        )}
        {searchRole && (
          <div className="flex justify-end mb-2 items-center">
            <label htmlFor="leave-status" className="mr-2">
              Select Role:
            </label>
            <select
              id="leave-status"
              className="appearance-none bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => searchFunction(e.target.value)}
            >
              <option value="all">All</option>
              <option value="student">Student</option>
              <option value="hod">Hod</option>
              <option value="staff">Staff</option>
            </select>
          </div>
        )}
        {searchInput && (
          <div className="flex justify-end mb-4">
            <input
              type="text"
              placeholder="Search By Name & E-Mail"
              className="border border-gray-300 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => searchFunction(e.target.value)}
            />
          </div>
        )}

        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-indigo-500 text-left text-white">
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="min-w-[120px] py-4 px-4 font-medium border text-center border-gray-200"
                  >
                    <button
                      className="flex items-center justify-center"
                      onClick={() => onSort(column.accessor)}
                    >
                      {column.header.toUpperCase()}
                      {sorting &&
                        (sortConfig.key === column.accessor ? (
                          sortConfig.direction === "ascending" ? (
                            <svg
                              className="w-4 h-4 ml-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 15l7-7 7 7"
                              ></path>
                            </svg>
                          ) : (
                            <svg
                              className="w-4 h-4 ml-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                              ></path>
                            </svg>
                          )
                        ) : (
                          <svg
                            className="w-4 h-4 ml-2 opacity-50"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 15l7-7 7 7"
                            ></path>
                          </svg>
                        ))}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="border-b border-gray-200 py-5 px-4"
                  >
                    <Skeleton
                      count={5}
                      height={30}
                      style={{
                        backgroundColor: "#e5e7eb",
                        borderRadius: "4px",
                        marginBottom: "8px",
                        animation: "pulse 2s infinite ease-in-out",
                      }}
                    />
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr className="hover:bg-slate-200">
                  <td
                    colSpan={columns.length}
                    className="border-b text-center border-gray-200 py-5 px-4 pl-9 xl:pl-11"
                  >
                    <h5 className="font-medium text-gray-800 bg-yellow-100 py-2 px-4 rounded-md">
                      No Data Found
                    </h5>
                  </td>
                </tr>
              ) : (
                data.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-slate-200">
                    {columns.map((column, colIndex) => (
                      <td
                        key={colIndex}
                        className={`border-b border-gray-200 py-5 px-4  ${
                          column.accessor === "department" ? "uppercase" : null
                        }`}
                      >
                        {column.render
                          ? column.render(row)
                          : column.accessor
                              .split(".")
                              .reduce((o, i) => o?.[i], row)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {pagination &&
          (data.length === 0 ? null : (
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={onPageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
              previousClassName={currentPage === 1 ? "disabled" : ""}
              nextClassName={currentPage === totalPages ? "disabled" : ""}
              previousLinkClassName={"pagination-link"}
              nextLinkClassName={"pagination-link"}
              disabledClassName={"pagination-disabled"}
              pageClassName={"pagination-page"}
              pageLinkClassName={"pagination-link"}
              breakClassName={"pagination-break"}
              breakLinkClassName={"pagination-link"}
              forcePage={currentPage - 1}
            />
          ))}
      </div>
    </section>
  );
}

export default Table;
