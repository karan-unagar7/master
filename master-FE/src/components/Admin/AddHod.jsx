import toast from "react-hot-toast";
import GenericForm from "../common/Form";
import { signUpSchema } from "../../services/validationSchema";
import { departmentOptions } from "../../assets/constant";
import { useRef, useState } from "react";
import { hodSignUpApi } from "../../services/apiCall";

function AddHod() {
  const [btnDis, setBtnDis] = useState(false);
  const fileInputRef = useRef(null);

  const initialValues = {
    name: "",
    email: "",
    gender: "",
    image: null,
    phone: "",
    address: "",
    department: "",
    password: "",
    terms: false,
    acceptingText: true,
  };

  const fields = {
    title: "Create a Hod Account",
    items: [
      {
        type: "input",
        labelName: "Your Name",
        inputType: "text",
        inputName: "name",
        placeholder: "John Doe",
      },
      {
        type: "input",
        labelName: "Your Email",
        inputType: "email",
        inputName: "email",
        placeholder: "name@company.com",
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
        type: "file",
        name: "image",
        labelName: "Profile Image",
        placeholder: "Enter image URL",
      },
      {
        type: "select",
        name: "department",
        labelName: "Department",
        options: departmentOptions,
      },
      {
        type: "textarea",
        name: "address",
        labelName: "Your Address",
        placeholder: "Enter your address",
      },
      {
        type: "input",
        labelName: "Phone Number",
        inputType: "text",
        inputName: "phone",
        placeholder: "Enter your phone number",
      },
      {
        type: "input",
        labelName: "Password",
        inputType: "password",
        inputName: "password",
        placeholder: "••••••••",
      },
      {
        type: "checkbox",
        name: "terms",
        labelName: "I accept the Terms and Conditions",
      },
    ],
    btnDis,
    setBtnDis,
    submitButtonText: "Create an account",
    acceptingText: true,
  };

  const onSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("gender", values.gender);
    formData.append("image", values.image);
    formData.append("phone", values.phone);
    formData.append("address", values.address);
    formData.append("department", values.department);
    formData.append("class", values.class);
    formData.append("password", values.password);
    try {
      setBtnDis(true);
      const response = await hodSignUpApi(formData);
      if (response.status === 201) {
        toast.success(response.data.message);
      }
      resetForm();

      // formik don't reset file type input so we mannually reset it :-
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (e) {
      setBtnDis(true);
      toast.error(e.response.data.message);
    } finally {
      setBtnDis(false);
    }
  };

  return (
    <GenericForm
      initialValues={initialValues}
      validationSchema={signUpSchema()}
      onSubmit={onSubmit}
      fields={fields}
      fileInputRef={fileInputRef}
    />
  );
}

export default AddHod;
