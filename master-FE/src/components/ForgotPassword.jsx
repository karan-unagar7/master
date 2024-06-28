import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { forgotPasswordSchema } from "../services/validationSchema";
import { forgotPasswordApi } from "../services/apiCall";
import InputField from "./common/Input";
import { useState } from "react";

const ForgotPassword = () => {
  const [btnDis, setBtnDis] = useState(false);
  const navigate = useNavigate();
  const validationSchema = forgotPasswordSchema();

  return (
    <section className="bg-gradient-to-r from-indigo-300 to-purple-300 min-h-screen flex items-center justify-center">
      <Toaster position="top-right" />
      <div className="w-full max-w-md bg-indigo-100 rounded-lg shadow-lg px-6 py-8 sm:px-10 md:px-16">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6 sm:text-3xl">
          Forgot Password
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Enter your email address below and we&apos;ll send OTP for reset your
          password.
        </p>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              setBtnDis(true);
              const response = await forgotPasswordApi(values);
              toast.success(response.data.message);
              resetForm();
              setTimeout(() => navigate("/verifyotp", { state: values }), 300);
            } catch (e) {
              setBtnDis(true);
              console.error("Password reset failed:", e);
              toast.error(e.response.data.message);
            } finally {
              setBtnDis(false);
            }
          }}
        >
          {() => (
            <Form>
              <InputField
                labelName="Your E-mail"
                inputType="email"
                inputName="email"
                placeholder="name@company.com"
              />
              <button
                type="submit"
                className={`w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  btnDis ? "cursor-not-allowed" : "hover:bg-indigo-700"
                }`}
              >
                Send OTP
              </button>
              <p className="text-center text-gray-700 mt-6">
                Remembered your password?{" "}
                <Link
                  to="/signin"
                  className="text-indigo-600 hover:text-indigo-800 font-bold"
                >
                  Sign in
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default ForgotPassword;
