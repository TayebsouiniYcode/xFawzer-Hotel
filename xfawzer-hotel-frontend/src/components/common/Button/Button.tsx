import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  href,
  type = 'button',
  onClick,
  className = '',
}) => {
  const baseClasses = 'rounded-md transition font-medium focus:outline-none ';
  
  const variantClasses = {
    primary: 'bg-blue-900 text-white hover:bg-blue-900',
    secondary: 'bg-amber-500 text-white hover:bg-yellow-600',
    outline: 'border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white',
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2',
    lg: 'px-8 py-3 text-lg',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;
  
  if (href) {
    return (
      <a href={href} className={`${classes} inline-block text-center`}>
        {children}
      </a>
    );
  }
  
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
