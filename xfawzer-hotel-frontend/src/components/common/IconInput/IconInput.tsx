import React, { useState } from 'react';

export interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: string;
  label?: string;
  rightIcon?: string;
  rightIconAction?: () => void;
  fullWidth?: boolean;
}

const IconInput: React.FC<IconInputProps> = ({
  icon,
  label,
  rightIcon,
  rightIconAction,
  fullWidth = true,
  id,
  className = '',
  ...props
}) => {
  const baseClasses = 'pl-10 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary';
  const widthClass = fullWidth ? 'w-full' : '';
  const inputClasses = `${baseClasses} ${widthClass} ${className}`;
  
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
          <i className={icon}></i>
        </span>
        <input 
          id={id}
          className={inputClasses}
          {...props}
        />
        {rightIcon && (
          <button 
            type="button" 
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
            onClick={rightIconAction}
            aria-label="Toggle visibility"
          >
            <i className={rightIcon}></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default IconInput;