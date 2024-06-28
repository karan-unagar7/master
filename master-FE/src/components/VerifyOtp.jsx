import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { verifyOtpApi } from "../services/apiCall";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [timer, setTimer] = useState(60);
  const [btnDis, setBtnDis] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  return (
    <section className="bg-gradient-to-r from-indigo-300 to-purple-300 min-h-screen flex items-center justify-center">
      <Toaster position="top-right" />
      <div className="w-full max-w-md bg-indigo-100 rounded-lg shadow-lg px-6 py-8 sm:px-10 md:px-16">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6 sm:text-3xl">
          Verify OTP
        </h1>
        <p className="text-center text-gray-700 mb-4">
          Enter the OTP sent to <span className="font-bold">{email}</span>
        </p>
        <Formik
          initialValues={{ otp: "" }}
          onSubmit={async (values) => {
            try {
              setBtnDis(true);
              const response = await verifyOtpApi({ email, otp: otp.join("") });
              toast.success(response.data.message);
              setTimeout(
                () => navigate("/resetpassword", { state: email }),
                700
              );
            } catch (error) {
              setBtnDis(true);
              console.error("OTP verification failed:", error);
              toast.error(error.response.data.message);
            } finally {
              setBtnDis(false);
            }
          }}
        >
          {({ handleSubmit }) => (
            <Form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
              <div className="flex space-x-2 mb-4">
                {otp.map((data, index) => (
                  <Field
                    key={index}
                    type="text"
                    name={`otp${index}`}
                    maxLength="1"
                    className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                  />
                ))}
              </div>
              <button
                type="submit"
                className={`w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  btnDis ? "cursor-not-allowed" : "hover:bg-indigo-700"
                }`}
              >
                Verify OTP
              </button>
              <p className="text-center mt-4 text-gray-600">
                {timer > 0 ? `Expired OTP in ${timer} seconds` : "OTP expired"}
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default VerifyOtp;
