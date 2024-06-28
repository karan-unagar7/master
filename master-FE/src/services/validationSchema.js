import * as Yup from "yup";

const signUpSchema = () => {
  return Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    gender: Yup.string().required("Gender is required"),
    image: Yup.string().required("Image is required"),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters")
      .max(8, "Password must be not 8 or more characters")
      .required("Password is required"),
    phone: Yup.string().required("Phone No is required").length(10),
    address: Yup.string().required("Address is required"),
    department: Yup.string().required("department is required"),
    terms: Yup.boolean().oneOf(
      [true],
      "Accept Terms and Conditions is required"
    ),
  });
};

const signInSchema = () => {
  return Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
};

const applyLeaveSchema = () => {
  return Yup.object().shape({
    startDate: Yup.date().required("Start-Date is required"),
    endDate: Yup.date().required("End-Date is required"),
    leaveType: Yup.string().required("Leave-Type is required"),
    reason: Yup.string().required("Reason is required"),
    requestId: Yup.number().required("Please Choose faculty"),
  });
};

const updateProfileSchema = () => {
  return Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    gender: Yup.string().required("Gender is required"),
    phone: Yup.string().required("Phone No is required").length(10),
    address: Yup.string().required("Address is required"),
    department: Yup.string().required("department is required"),
  });
};

const forgotPasswordSchema = () => {
  return Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });
};

const resetPasswordSchema = () => {
  return Yup.object().shape({
    password: Yup.string()
      .min(4, "Password must be at least 4 characters")
      .max(8, "Password must be not 8 or more characters")
      .required("New Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });
};

export {
  signUpSchema,
  signInSchema,
  applyLeaveSchema,
  updateProfileSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
};
