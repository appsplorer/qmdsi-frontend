const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#2d2d2d",
    border: "none",
    minHeight: "40px",
    height: "max-content",
    outline: "none",
    borderRadius: "12px",
    cursor: "pointer",
    width: "150px",
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
  indicatorSeparator: (provided) => ({
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
};

export default customStyles;
