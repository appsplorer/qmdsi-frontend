const SelectInput = ({ label, name, value, options, onChange, required = false }) => {
    return (
      <div className="select-group relative">
        <label htmlFor={name}>{label}</label>
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full text-white bg-background p-3 rounded border-0 outline-none focus:ring-1 focus:ring-golden hover:border-golden hover:bg-silver/40 appearance-none"
          style={{
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23c0c0c0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>')`,
            backgroundPosition: 'right 12px center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '16px', 
          }}
        >
          <option value="">Select an option</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default SelectInput;
  