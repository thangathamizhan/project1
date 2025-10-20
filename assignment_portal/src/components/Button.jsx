import React from 'react'
import clsx from 'clsx';

const Button = ({
    children,
    className = '',
    type = 'button',
    onClick,
    variant = 'primary', 
    size = 'md',
    disabled = false
}) => {

   const variants = {
    primary: 'bg-blue-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 focus:outline-none active:scale-95',
    secondary: 'bg-gray-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 focus:outline-none active:scale-95',
    danger: 'bg-red-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-800 focus:outline-none active:scale-95',
    caution: 'bg-yellow-400 text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-500 focus:outline-none active:scale-95',
    success: 'bg-green-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 focus:outline-none active:scale-95',
    destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
    outline: 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:outline-none active:scale-95',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:outline-none active:scale-95',
   };

   const sizes = {
    sm: 'px-3 py-1 text-sm rounded',
    md: 'px-4 py-2 text-base rounded-md',
    lg: 'px-6 py-3 text-lg rounded-lg',
    xl: 'px-8 py-4 text-xl rounded-xl',
   };

    const baseClasses = 'transition duration-200 ease-in-out';
    
    const variantClasses = variants[variant] || variants.primary;
    const sizeClasses = sizes[size] || sizes.md;

    return (
        <button 
            className={clsx(baseClasses, variantClasses, sizeClasses, className)} 
            onClick={onClick} 
            type={type} 
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button