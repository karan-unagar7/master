import { Outlet } from "react-router-dom";
import Navbar from "./common/Navabar";
import Sidebar from "./common/Sidebar";
import { AuthProvider } from "../context/AuthProvider";
import { useEffect, useState } from "react";
import { getProfileApi } from "../services/apiCall";
import { Toaster } from "react-hot-toast";

export default function LayOut() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfileApi();
        setUser(response.data.data);
      } catch (error) {
        console.log(`Error while fetch profile :- ${error}`);
      }
    };
    fetchProfile();
  }, [setUser]);

  const logout = () => {
    localStorage.removeItem("token");
  };

  const setUserData = (data) => {
    setUser(data);
  };

  return (
    <>
      <AuthProvider value={{ user, logout, setUserData }}>
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <Outlet>
              <Toaster />
            </Outlet>
          </div>
        </div>
      </AuthProvider>
    </>
  );
}
