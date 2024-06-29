/* eslint-disable react/prop-types */
import { Formik, Form, Field, ErrorMessage } from "formik";
import RadioGroup from "./Radio";
import InputField from "./Input";
import SelectField from "./Select";
import { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const GenericForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  fields,
  fileInputRef,
  btnSize = false,
}) => {
  return (
    <section className="bg-gradient-to-r from-indigo-300 to-purple-300 min-h-screen flex items-center justify-center">
      <Toaster position="top-right" />
      <div className="w-[50vw] bg-indigo-100 rounded-lg shadow-lg px-6 py-8 sm:px-10 md:px-16 mt-10">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6 sm:text-3xl">
          {fields.title}
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {({ setFieldValue }) => (
            <Form encType="multipart/form-data">
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${
                  btnSize ? "md:grid-cols-1" : null
                }`}
              >
                {fields.items.map((field, index) => {
                  switch (field.type) {
                    case "input":
                      return (
                        <InputField
                          key={index}
                          labelName={field.labelName}
                          inputType={field.inputType}
                          inputName={field.inputName}
                          placeholder={field.placeholder}
                        />
                      );
                    case "radio":
                      return (
                        <RadioGroup
                          key={index}
                          name={field.name}
                          label={field.labelName}
                          options={field.options}
                        />
                      );
                    case "file":
                      return (
                        <div key={index} className="mb-4">
                          <label
                            htmlFor={field.name}
                            className="block text-gray-700 font-bold mb-2"
                          >
                            {field.labelName}
                          </label>
                          <input
                            type="file"
                            name={field.name}
                            id={field.name}
                            ref={fileInputRef}
                            className="shadow appearance-none bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder={field.placeholder}
                            onChange={(event) => {
                              setFieldValue(
                                field.name,
                                event.currentTarget.files[0]
                              );
                            }}
                          />
                          <ErrorMessage
                            name={field.name}
                            component="div"
                            className="text-red-500 text-sm mt-2"
                          />
                        </div>
                      );
                    case "select":
                      return (
                        <SelectField
                          key={index}
                          name={field.name}
                          label={field.labelName}
                          options={field.options}
                        />
                      );
                    case "textarea":
                      return (
                        <div key={index} className="mb-4">
                          <label
                            htmlFor={field.name}
                            className="block text-gray-700 font-bold mb-2"
                          >
                            {field.labelName}
                          </label>
                          <Field
                            as="textarea"
                            name={field.name}
                            id={field.name}
                            rows="3"
                            className="shadow appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder={field.placeholder}
                          />
                          <ErrorMessage
                            name={field.name}
                            component="div"
                            className="text-red-500 text-sm mt-2"
                          />
                        </div>
                      );
                    default:
                      return null;
                  }
                })}
              </div>

              {fields.acceptingText && (
                <div className="flex items-start mb-6">
                  <div className="flex items-center h-5">
                    <Field
                      type="checkbox"
                      id="terms"
                      name="terms"
                      className="form-checkbox h-5 w-5 text-indigo-600"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-medium text-gray-700 flex items-center"
                    >
                      I accept the{" "}
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-800 ml-1"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                    <ErrorMessage
                      name="terms"
                      component="div"
                      className="text-red-500 text-sm mt-2"
                    />
                  </div>
                </div>
              )}
              <button
                disabled={fields.btnDis}
                type="submit"
                className={`w-full bg-indigo-500  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline
                  ${
                    fields.btnDis
                      ? "cursor-not-allowed"
                      : "hover:bg-indigo-700 cursor-pointer"
                  }
                `}
              >
                {fields.btnDis ? (
                  <FontAwesomeIcon
                    icon={faSpinner}
                    spin
                    className="mx-auto text-xl"
                  />
                ) : (
                  fields.submitButtonText
                )}
              </button>
              {fields.footerText && (
                <p className="text-center text-gray-700 mt-6">
                  {fields.footerText}
                </p>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default GenericForm;
