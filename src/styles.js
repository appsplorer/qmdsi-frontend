export const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "rgb(30 30 32 / var(--tw-bg-opacity))",
    borderColor: "#1E1E20",
    minHeight: "50px",
    height: "50px",
    outline: "none",
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: "40px",
    display: "flex",
    alignItems: "center",
  }),
  input: (provided) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "50px",
    borderColor: "#1E1E20",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#1E1E20",
    borderRadius: "5px",
    marginTop: "0px",
    padding: "5px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "blue"
      : state.isFocused
      ? "lightblue"
      : "white",
    color: state.isSelected ? "white" : "black",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "white",
  }),
};
