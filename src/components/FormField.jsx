import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

const FormField = ({
  label,
  name,
  control,
  type = "text",
  placeholder,
  rules,
}) => (
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
          <input
            className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
            type={type}
            placeholder={placeholder}
            {...field}
          />
          {error && (
            <span className="text-red-500 text-sm">{error.message}</span>
          )}
        </>
      )}
    />
  </div>
);

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  rules: PropTypes.object,
};

export default FormField;
