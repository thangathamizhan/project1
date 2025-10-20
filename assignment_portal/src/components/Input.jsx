import React from "react";
import clsx from "clsx";

const Input = ({
  type = "text",
  onChange,
  className = "",
  value,
  variant = "default",
  name = "",
  disabled = false,
  ...props
}) => {
  const variants = {
    default:
      "border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
    error:
      "border border-red-500 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2",
    success:
      "border border-green-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2",
  };

  const variantClasses = variants[variant] || variants.default ;
  return (
    <input
      type={type}
      onChange={onChange}
      value={value}
      name={name}
      disabled={disabled}
      className={clsx(variantClasses,className)}
      {...props}
    />
  );
};

export default Input;
