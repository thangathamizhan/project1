import React from "react";
import clsx from "clsx";

const Input_l = ({
  type = "text",
  onChange,
  className = "",
  value = "",
  variant = "default",
  name = "",
  disabled = false,
  label = "",
  id = "",
  errortext = "",
  ...props
}) => {
  const variants = {
    default:
      "border border-gray-300 px-4 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
    error:
      "border border-red-500 px-4 py-1 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2",
    success:
      "border border-green-300 px-4 py-1 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2",
  };

  const variantClasses = variants[variant] || variants.default;
  return (
    <div className="flex flex-col gap-3  mb-4 ">
      {label && (
        <label className="font-semibold text-gray-700 mb-1" htmlFor={id}>
          {label}
        </label>
      )}

      <input
        type={type}
        onChange={onChange}
        value={value}
        name={name}
        disabled={disabled}
        className={clsx(variantClasses, className)}
        id={id}
        {...props}
      />
      {variant == "error" && errortext && (
        <p className="mt-1 text-sm text-red-500">{errortext}</p>
      )}
    </div>
  );
};

export default Input_l;
