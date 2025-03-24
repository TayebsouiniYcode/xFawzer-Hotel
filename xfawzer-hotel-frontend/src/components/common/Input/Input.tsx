import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {
  label?: string;
  type?: string;
  rows?: number;
  options?: { value: string; label: string }[];
  fullWidth?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  rows = 4,
  options,
  fullWidth = true,
  className = '',
  ...props
}) => {
  const baseClasses = 'px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary';
  const widthClass = fullWidth ? 'w-full' : '';
  const inputClasses = `${baseClasses} ${widthClass} ${className}`;
  
  const renderInput = () => {
    if (type === 'textarea') {
      return (
        <textarea
          id={name}
          name={name}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={inputClasses}
          {...props}
        />
      );
    } else if (type === 'select') {
      return (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={inputClasses}
          {...props}
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    } else {
      return (
        <input
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={inputClasses}
          {...props}
        />
      );
    }
  };
  
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-gray-700 mb-2">
          {label}
        </label>
      )}
      {renderInput()}
    </div>
  );
};

export default Input;