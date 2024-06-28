import { useState } from "react";
import { FaCamera, FaEdit } from "react-icons/fa";
import { changeProfileImageApi } from "../../services/apiCall";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import useAuth from "../../context/AuthProvider";
import { Oval } from "react-loader-spinner";

function Profile() {
  const { user, setUserData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [btnDis, setBtnDis] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleEditImageClick = () => {
    setIsModalOpen(true);
  };

  const handleFileChange = (event) => {
    setBtnDis(false);
    setSelectedFile(event.target.files[0]);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
    setBtnDis(true);
  };

  const handleSave = async () => {
    if (selectedFile) {
      try {
        setBtnDis(true);
        setLoading(true);
        const response = await changeProfileImageApi(selectedFile);
        toast.success(response.data.message);
        setUserData({ ...user, image: response.data.image });
        setIsModalOpen(false);
      } catch (error) {
        setLoading(true);
        console.log(`error :-  , ${error}`);
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
        setBtnDis(true);
      }
    }
  };

  return (
    <section className="bg-gradient-to-r from-indigo-300 to-purple-300 min-h-screen p-8">
      <Toaster position="top-right" />
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 flex flex-col items-center relative">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Your Profile
        </h1>
        <div className="relative mb-8">
          {user.image && (
            <img
              src={user.image}
              alt="Profile"
              className="w-48 h-48 object-cover rounded-full"
            />
          )}
          <button
            className="absolute bottom-2 right-[-4px] bg-gray-800 text-white p-1 rounded-full hover:bg-gray-600"
            onClick={handleEditImageClick}
          >
            <FaCamera />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Personal Information
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Name:
              </label>
              <p className="text-gray-700">{user.name}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Email:
              </label>
              <p className="text-gray-700">{user.email}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Gender:
              </label>
              <p className="text-gray-700">{user.gender}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Phone:
              </label>
              <p className="text-gray-700">{user.phone}</p>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Additional Information
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Address:
              </label>
              <p className="text-gray-700">{user.address}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Department:
              </label>
              <p className="text-gray-700">
                {user.department ? user.department.toUpperCase() : ""}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Role:
              </label>
              <p className="text-gray-700">
                {user.roleId === 4
                  ? "STUDENT"
                  : user.roleId === 2
                  ? "HOD"
                  : user.roleId === 3
                  ? "STAFF"
                  : "ADMIN"}
              </p>
            </div>
          </div>
        </div>
        <Link
          to={`${
            user.roleId === 4
              ? "/student/editprofile"
              : user.roleId === 1
              ? "/admin/editprofile"
              : "/staff/editprofile"
          }`}
          state={{ user }}
          className="block text-center mt-6 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Edit Profile
        </Link>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Profile Image</h2>
            <input type="file" onChange={handleFileChange} className="mb-4" />
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                disabled={btnDis}
                onClick={handleSave}
                className={`bg-indigo-600 text-white py-2 px-4 rounded flex justify-center ${
                  btnDis
                    ? `bg-indigo-400 cursor-not-allowed`
                    : `hover:bg-indigo-500`
                }`}
              >
                {loading ? (
                  <>
                    <Oval
                      height={20}
                      width={20}
                      color="#ffffff"
                      wrapperStyle={{ marginRight: "8px" }}
                      visible={true}
                      ariaLabel="oval-loading"
                      secondaryColor="#ffffff"
                      strokeWidth={2}
                      strokeWidthSecondary={2}
                    />
                    Please Wait
                  </>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Profile;
