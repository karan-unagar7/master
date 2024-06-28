import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { applyLeaveApi, getFacultyListApi } from "../../services/apiCall";
import { applyLeaveSchema } from "../../services/validationSchema";
import { Toaster, toast } from "react-hot-toast";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

export default function ApplyLeave() {
  const [btnDis, setBtnDis] = useState(false);
  const [faculty1, setFaculty] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getFaculty = async () => {
      try {
        const response = await getFacultyListApi();
        const { data } = response.data;
        setFaculty(data);
      } catch (error) {
        console.log(error);
      }
    };
    getFaculty();
  }, []);

  return (
    <section className="bg-gradient-to-r from-indigo-300 to-purple-300 min-h-screen flex items-center justify-center">
      <Toaster position="top-right" />
      <div className="w-full max-w-md bg-indigo-100 rounded-lg shadow-lg px-6 py-8 sm:px-10 md:px-16">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6 sm:text-3xl">
          Apply for Leave
        </h1>
        <Formik
          initialValues={{
            startDate: null,
            endDate: null,
            leaveType: "",
            reason: "",
            requestId: "",
          }}
          validationSchema={applyLeaveSchema}
          onSubmit={async (values, { resetForm, setFieldValue }) => {
            try {
              setBtnDis(true);
              const formattedValues = {
                ...values,
                startDate: values.startDate
                  ? format(values.startDate, "yyyy-MM-dd")
                  : null,
                endDate: values.endDate
                  ? format(values.endDate, "yyyy-MM-dd")
                  : null,
              };
              const response = await applyLeaveApi(formattedValues);
              toast.success(response.data.message);
              resetForm();
              setFieldValue("startDate", null);
              setFieldValue("endDate", null);
              navigate("/student/viewleave");
            } catch (error) {
              console.log(error);
              toast.error(error.response.data.message);
            } finally {
              setBtnDis(false);
            }
          }}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="startDate"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Start Date
                </label>
                <DatePicker
                  selected={values.startDate}
                  name="startDate"
                  onChange={(date) => setFieldValue("startDate", date)}
                  selectsStart
                  startDate={values.startDate}
                  endDate={values.endDate}
                  dateFormat="yyyy-MM-dd"
                  className="shadow appearance-none border rounded w-[317px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="startDate"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="endDate"
                  className="block text-gray-700 font-bold mb-2"
                >
                  End Date
                </label>
                <DatePicker
                  selected={values.endDate}
                  name="endDate"
                  onChange={(date) => setFieldValue("endDate", date)}
                  selectsEnd
                  startDate={values.startDate}
                  endDate={values.endDate}
                  minDate={values.startDate}
                  dateFormat="yyyy-MM-dd"
                  className="shadow appearance-none border rounded w-[317px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="endDate"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="leaveType"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Leave Type
                </label>
                <Field
                  as="select"
                  name="leaveType"
                  id="leaveType"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="" label="Select Leave Type" />
                  <option value="FirstHalf" label="First Half" />
                  <option value="SecondHalf" label="Second Half" />
                  <option value="FullDay" label="Full Leave" />
                </Field>
                <ErrorMessage
                  name="leaveType"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="reason"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Reason
                </label>
                <Field
                  as="textarea"
                  name="reason"
                  id="reason"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Reason for leave"
                />
                <ErrorMessage
                  name="reason"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="requestId"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Requested To
                </label>
                <Field
                  as="select"
                  name="requestId"
                  id="requestId"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="" label="Select manager" />
                  {faculty1.map((faculty) => (
                    <option key={faculty.id} value={faculty.id}>
                      {faculty.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="requestId"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>
              <button
                disabled={btnDis}
                type="submit"
                className={`w-full bg-indigo-500  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline
                  ${
                    btnDis
                      ? "cursor-not-allowed"
                      : "hover:bg-indigo-700 cursor-pointer"
                  }
                `}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
