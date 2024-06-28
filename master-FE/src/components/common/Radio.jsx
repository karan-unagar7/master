/* eslint-disable react/prop-types */
import React from "react";
import { Field, ErrorMessage } from "formik";

// eslint-disable-next-line react/prop-types
const RadioGroup = ({ name, label, options }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 font-bold mb-2">
        {label}
      </label>
      <div className="flex items-center space-x-3">
        {/* // eslint-disable-next-line react/prop-types */}
        {options.map((option) => (
          <React.Fragment key={option.value}>
            <Field
              type="radio"
              id={option.value}
              name={name}
              value={option.value}
              className="form-radio h-5 w-5 text-indigo-600"
            />
            <label htmlFor={option.value} className="text-gray-700 font-bold">
              {option.label}
            </label>
          </React.Fragment>
        ))}
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-2"
      />
    </div>
  );
};

export default RadioGroup;
