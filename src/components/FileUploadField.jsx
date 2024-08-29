import PropTypes from "prop-types";

const FileUploadField = ({ label, name, setValue }) => (
  <div className="w-full mb-4">
    <label className="block text-sm mb-2" htmlFor={name}>
      {label}
    </label>
    <input
      type="file"
      name={name}
      onChange={(e) => setValue(name, e.target.files[0])}
      className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
    />
  </div>
);

FileUploadField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default FileUploadField;
