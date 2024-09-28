import React from 'react';

const CustomButton = ({ 
  onClick, 
  label, 
  type = 'button', 
  className = '', 
  disabled = false 
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`px-4 py-2 rounded-md text-white bg-golden hover:bg-golden/80 focus:ring-2 focus:ring-golden/50 ${className}`}
    >
      {label}
    </button>
  );
};

export default CustomButton;
