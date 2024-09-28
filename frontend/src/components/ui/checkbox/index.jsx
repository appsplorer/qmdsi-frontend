const CheckboxInput = ({ label, name, checked, onChange, required = false }) => {
    return (
      <div className="checkbox-group">
        <label>
          <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={onChange}
            required={required}
          />
          {label}
        </label>
      </div>
    );
  };
  
  export default CheckboxInput;
  