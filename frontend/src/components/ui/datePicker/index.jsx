import React from 'react';

const CustomDatePicker = ({ selectedDate, onChange, label }) => {
  return (
    <div className="date-picker-group">
      <label>{label}</label>
      <input
        selected={selectedDate}
        onChange={onChange}
        type='date'
        className="appearance-none w-full text-white bg-background p-3 rounded border-0 outline-none focus:ring-1 focus:ring-golden hover:border-golden"
      />
    </div>
  );
};

export default CustomDatePicker;
