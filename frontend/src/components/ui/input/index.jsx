import React from 'react';

const TextInput = ({ label, name, type = "text", value, placeholder, onChange, required = false,readOnly }) => {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        onChange={onChange}
        required={required}
        className="w-full text-white bg-background p-3 rounded border-0 outline-none focus:ring-1 focus:ring-golden hover:border-golden"
      />
    </div>
  );
};

export default TextInput;
