import { memo } from "react";
import { Input } from "antd";

const InputWithError = memo(
  ({ type, name, placeholder, value, onChange, error }) => (
    <div className="flex flex-col w-full">
      <Input
        type={type}
        className={`text-slate-800 text-lg p-3 rounded-lg w-full bg-smoke ${
          error ? "border-red-500" : ""
        }`}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        value={value}
        required
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  )
);

InputWithError.displayName = "InputWithError";

export default InputWithError;
