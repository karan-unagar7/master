// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";
// import { resetPasswordApi } from "../services/apiCall";

// function ResetPassword() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const email = location.state || "";
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [btnDis, setBtnDis] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       if (password !== confirmPassword) {
//         toast.error("Passwords do not match.");
//         return;
//       }
//       setBtnDis(true);
//       const response = await resetPasswordApi({ email, password });
//       toast.success(response.data.message);
//       setTimeout(() => {
//         navigate("/signin");
//       }, 1000);
//     } catch (error) {
//       console.log(error.response.data.message);
//       toast.error(error.response.data.message);
//     } finally {
//       setBtnDis(false);
//     }
//   };

//   return (
//     <div className="bg-gradient-to-r from-indigo-300 to-purple-300 min-h-screen flex items-center justify-center">
//       <Toaster position="top-right" />
//       <form
//         className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
//         onSubmit={handleSubmit}
//       >
//         <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
//           Reset Password
//         </h2>
//         <div className="mb-4">
//           <label
//             htmlFor="password"
//             className="block text-gray-700 font-medium mb-2"
//           >
//             New Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-700"
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="confirmPassword"
//             className="block text-gray-700 font-medium mb-2"
//           >
//             Confirm Password
//           </label>
//           <input
//             type="password"
//             id="confirmPassword"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-700"
//           />
//         </div>
//         <button
//           type="submit"
//           disabled={btnDis}
//           className={`w-full py-2 px-4 mt-4 text-white font-semibold rounded-md ${
//             btnDis ? "bg-gray-400" : "bg-purple-500 hover:bg-purple-600"
//           } focus:outline-none focus:ring-2 focus:ring-purple-500`}
//         >
//           Reset Password
//         </button>
//       </form>
//     </div>
//   );
// }

// export default ResetPassword;

import { Formik, Form } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { resetPasswordApi } from "../services/apiCall";
import InputField from "./common/Input";
import { resetPasswordSchema } from "../services/validationSchema";
import { useState } from "react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state || "";
  const [btnDis, setBtnDis] = useState(false);

  const validationSchema = resetPasswordSchema();

  return (
    <section className="bg-gradient-to-r from-indigo-300 to-purple-300 min-h-screen flex items-center justify-center">
      <Toaster position="top-right" />
      <div className="w-full max-w-md bg-indigo-100 rounded-lg shadow-lg px-6 py-8 sm:px-10 md:px-16">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6 sm:text-3xl">
          Reset Password
        </h1>
        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              setBtnDis(true);
              const response = await resetPasswordApi({
                email,
                password: values.password,
              });
              toast.success(response.data.message);
              resetForm();
              setTimeout(() => navigate("/signin"), 700);
            } catch (error) {
              setBtnDis(true);
              console.error("Password reset failed:", error);
              toast.error(error.response.data.message);
            }finally{
              setBtnDis(false)
            }
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <InputField
                labelName="New Password"
                inputType="password"
                inputName="password"
                placeholder="••••••••"
              />
              <InputField
                labelName="Confirm Password"
                inputType="password"
                inputName="confirmPassword"
                placeholder="••••••••"
              />
              <button
                type="submit"
                className={`w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  btnDis ? "cursor-not-allowed" : "hover:bg-indigo-700"
                }`}
              >
                Reset Password
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default ResetPassword;
