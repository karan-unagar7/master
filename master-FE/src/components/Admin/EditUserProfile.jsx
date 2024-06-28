import toast from "react-hot-toast";
import { departmentOptions } from "../../assets/constant";
import { updateProfileSchema } from "../../services/validationSchema";
import GenericForm from "../common/Form";
import { getUserDataApi, updateUserApi } from "../../services/apiCall";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function EditUserProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [user, setUser] = useState({
    name: "",
    email: "",
    gender: "",
    phone: "",
    address: "",
    department: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDataApi(state);
        const { data } = response.data;
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserDetails();
  }, [state]);

  const initialProfileData = {
    name: user.name,
    email: user.email,
    gender: user.gender,
    phone: user.phone,
    address: user.address,
    department: user.department,
  };

  const onSubmit = async (values) => {
    try {
      let role;
      if (user.roleId === 4) {
        role = "student";
      } else if (user.roleId === 2) {
        role = "hod";
      } else {
        role = "staff";
      }
      const response = await updateUserApi(user.id, role, values);
      toast.success(response.data.message);
      if (user.roleId === 4) {
        setTimeout(() => navigate("/admin/viewstudent"), 1000);
      } else if (user.roleId === 2) {
        setTimeout(() => navigate("/admin/viewhod"), 1000);
      } else {
        setTimeout(() => navigate("/admin/viewstaff"), 1000);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response.data.message);
    }
  };

  const fields = {
    title: "Edit Profile",
    items: [
      {
        type: "input",
        labelName: "Name",
        inputType: "text",
        inputName: "name",
        placeholder: "Enter your name",
      },
      {
        type: "input",
        labelName: "Email",
        inputType: "email",
        inputName: "email",
        placeholder: "Enter your email",
      },
      {
        type: "radio",
        name: "gender",
        labelName: "Gender",
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ],
      },
      {
        type: "input",
        labelName: "Phone",
        inputType: "text",
        inputName: "phone",
        placeholder: "Enter your phone number",
      },
      {
        type: "textarea",
        name: "address",
        labelName: "Your Address",
        placeholder: "Enter your address",
      },
      {
        type: "select",
        name: "department",
        labelName: "Department",
        options: departmentOptions,
      },
    ],
    btnDis: false,
    submitButtonText: "Submit",
    footerText: "Need help? Contact support.",
    acceptingText: false,
  };

  return (
    <GenericForm
      initialValues={initialProfileData}
      validationSchema={updateProfileSchema()}
      onSubmit={onSubmit}
      fields={fields}
    />
  );
}

export default EditUserProfile;
