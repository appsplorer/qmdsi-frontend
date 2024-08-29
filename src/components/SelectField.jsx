import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { customStyles } from "../styles";

const SelectField = ({ label, name, control, options, placeholder, rules }) => (
  <div className="w-full mb-4">
    <label className="block text-sm mb-2" htmlFor={name}>
      {label}
    </label>
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <>
          <Select
            {...field}
            options={options}
            styles={customStyles}
            onChange={(selectedOption) => field.onChange(selectedOption.value)}
            placeholder={placeholder}
            value={options.find((option) => option.value === field.value)}
          />
          {error && (
            <span className="text-red-500 text-sm">{error.message}</span>
          )}
        </>
      )}
    />
  </div>
);

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  rules: PropTypes.object,
};

export default SelectField;
