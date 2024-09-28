import React from 'react';

const TextareaInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder = '', 
  rows = 4, 
  required = false 
}) => {
  return (
    <div className="textarea-group">
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className="w-full text-white bg-background p-3 rounded border-0 outline-none focus:ring-1 focus:ring-golden hover:border-golden"
      />
    </div>
  );
};

export default TextareaInput;
