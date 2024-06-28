// EditProfile.js
import { useNavigate } from "react-router-dom";
import { updateStudentProfileApi } from "../../services/apiCall";
import { toast } from "react-hot-toast";
import GenericForm from "../common/Form";
import useAuth from "../../context/AuthProvider";
import { updateProfileSchema } from "../../services/validationSchema";
import { departmentOptions } from "../../assets/constant";

function EditProfile() {
  const { user, setUserData } = useAuth();
  const navigate = useNavigate();
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
      const response = await updateStudentProfileApi(values);
      console.log("Updated Profile Data:", response);
      setUserData({ ...user, ...values });
      toast.success(response.data.message);
      setTimeout(
        () =>
          navigate(
            `${
              user.roleId === 4
                ? "/student/profile"
                : user.roleId === 1
                ? "/admin/profile"
                : "/staff/profile"
            }`
          ),
        1000
      );
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

export default EditProfile;
