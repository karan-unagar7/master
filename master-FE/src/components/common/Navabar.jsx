import { useEffect, useState, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";
import useAuth from "../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { name, image, roleId } = user;

  const handleMenuClick = (path) => {
    setDropdownOpen(false);
    navigate(path);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-300 to-purple-400 min-h-[50px] px-3 flex justify-between items-center border-b-2 border-indigo-200 sticky top-0 z-10">
      <div className="text-white font-bold">
        <Link
          to={`${
            roleId === 4
              ? "/student/dashboard"
              : roleId === 1
              ? "/admin/dashboard"
              : "/staff/dashboard"
          }`}
          className="text-2xl text-[#4b4949] ml-5 hover:text-white"
        >
          LMS
        </Link>
      </div>
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center space-x-2 min-h-[50px] px-[9px] focus:outline-none transition-all duration-300 ease-in-out hover:bg-purple-500"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <img src={image} alt="Profile" className="w-9 h-9 object-cover" />
          <span className="text-white">{name}</span>
          <FaChevronDown className="text-white ml-2" />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
            <button
              onClick={() =>
                handleMenuClick(
                  `${
                    roleId === 4
                      ? "/student/profile"
                      : roleId === 1
                      ? "/admin/profile"
                      : "/staff/profile"
                  }`
                )
              }
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              My Profile
            </button>
            <button
              onClick={() => {
                logout();
                handleMenuClick("/signin");
              }}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
