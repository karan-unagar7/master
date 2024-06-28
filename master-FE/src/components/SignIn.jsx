import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";
import { signInSchema } from "../services/validationSchema";
import { signInApi } from "../services/apiCall";
import InputField from "./common/Input";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { baseUrl } from "../assets/apis";

const SignIn = () => {
  const [btnDis, setBtnDis] = useState(false);
  const navigate = useNavigate();
  const validationSchema = signInSchema();

  const handleGoogleSignIn = () => {
    toast.error("Google sign-in is not implemented yet.");
  };

  const handleFacebookSignIn = () => {
    // Handle Facebook sign-in logic
    toast.error("Facebook sign-in is not implemented yet.");
  };

  return (
    <section className="bg-gradient-to-r from-indigo-300 to-purple-300 min-h-screen flex items-center justify-center">
      <Toaster position="top-right" />
      <div className="w-full max-w-md bg-indigo-100 rounded-lg shadow-lg px-6 py-8 sm:px-10 md:px-16 xyz">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6 sm:text-3xl">
          Sign in to your account
        </h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              setBtnDis(true);
              const response = await signInApi(values);
              localStorage.setItem("token", response.data.token);
              toast.success(response.data.message);
              resetForm();
              if (response.status === 200) {
                if (response.data.data.roleId === 4) {
                  setTimeout(() => navigate("/student/dashboard"), 1000);
                } else if (
                  response.data.data.roleId === 3 ||
                  response.data.data.roleId === 2
                ) {
                  setTimeout(() => navigate("/staff/dashboard"), 1000);
                } else {
                  setTimeout(() => navigate("/admin/dashboard"), 1000);
                }
              }
            } catch (e) {
              console.error("Login failed:", e);
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
              <InputField
                labelName="Password"
                inputType="password"
                inputName="password"
                placeholder="••••••••"
              />
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Field
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-indigo-600"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-gray-700 font-bold"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgotpassword"
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                disabled={btnDis}
                type="submit"
                className={`w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  btnDis ? "cursor-not-allowed" : "hover:bg-indigo-700"
                }`}
              >
                Sign in
              </button>
              <div className="mt-4">
                <p className="text-center text-gray-700 mb-2">
                  Or continue with
                </p>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="flex items-center justify-center w-full bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 focus:outline-none"
                  >
                    <FaGoogle className="w-5 h-5 mr-2" />
                    Google
                  </button>
                  <button
                    type="button"
                    onClick={handleFacebookSignIn}
                    className="flex items-center justify-center w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 focus:outline-none"
                  >
                    <FaFacebook className="w-5 h-5 mr-2" />
                    Facebook
                  </button>
                </div>
              </div>
              <p className="text-center text-gray-700 mt-6">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-indigo-600 hover:text-indigo-800 font-bold"
                >
                  Sign up
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default SignIn;
